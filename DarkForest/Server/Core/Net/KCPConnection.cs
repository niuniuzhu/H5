using System;
using Core.Misc;
using Core.Structure;
using System.Net;
using System.Net.Sockets;

namespace Core.Net
{
	public class KCPConnection : IKCPConnection
	{
		public KCPConnectionState state { get; set; }
		public Socket socket { get; set; }
		public EndPoint remoteEndPoint
		{
			private get => this._recvEventArgs.RemoteEndPoint;
			set => this._recvEventArgs.RemoteEndPoint = value;
		}
		public INetSession session { get; }
		public int recvBufSize { set => this._recvEventArgs.SetBuffer( new byte[value], 0, value ); }
		public bool connected => true;

		private readonly KCPProxy _kcpProxy;
		private readonly SocketAsyncEventArgs _recvEventArgs;
		private SimpleScheduler _pingScheduler;
		private uint _connID;
		private long _pingTime;
		private readonly SwitchQueue<StreamBuffer> _sendQueue = new SwitchQueue<StreamBuffer>();
		private readonly SwitchQueue<StreamBuffer> _recvQueue = new SwitchQueue<StreamBuffer>();
		private readonly ThreadSafeObejctPool<StreamBuffer> _bufferPool = new ThreadSafeObejctPool<StreamBuffer>();

		public KCPConnection( INetSession session )
		{
			this.session = session;
			this._connID = this.session.id;
			this._kcpProxy = new KCPProxy( this.OnKCPOutout );
			this._recvEventArgs = new SocketAsyncEventArgs { UserToken = this };
			this._recvEventArgs.Completed += this.OnReceiveComplete;
		}

		public void Dispose()
		{
			this._recvEventArgs.Completed -= this.OnReceiveComplete;
			this._recvEventArgs.Dispose();
		}

		public void Release()
		{
		}

		public void Close()
		{
			if ( this.socket == null )
				return;
			this._kcpProxy.Release();
			this._connID = 0;
			this._pingTime = 0;
			this.socket.Shutdown( SocketShutdown.Both );
			this.socket.Close();
			this.socket = null;
			this.state = KCPConnectionState.Disconnect;
			if ( this._pingScheduler != null )
			{
				this._pingScheduler.Stop();
				this._pingScheduler = null;
			}
		}

		private void OnError( string error )
		{
			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Error;
			netEvent.session = this.session;
			netEvent.error = error;
			NetworkMgr.instance.PushEvent( netEvent );
		}

		public void SetOpt( SocketOptionName optionName, object opt ) => this.socket.SetSocketOption( SocketOptionLevel.Socket, optionName, opt );

		private void OnKCPOutout( byte[] data, int size )
		{
			byte[] sdata = new byte[size + KCPConfig.SIZE_OF_SESSION_ID];
			int offset = ByteUtils.Encode32u( sdata, 0, this._connID );
			Buffer.BlockCopy( data, 0, sdata, offset, size );
			offset += size;
			this.SendDirect( sdata, 0, offset );
		}

		public bool Send( byte[] data, int offset, int size )
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( false );
			buffer.Write( data, offset, size );
			this._sendQueue.Push( buffer );
			return true;
		}

		private void SendDirect( byte[] data, int offset, int size )
		{
			this.socket.SendTo( data, offset, size, SocketFlags.None, this.remoteEndPoint );

			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Send;
			netEvent.session = this.session;
			NetworkMgr.instance.PushEvent( netEvent );
		}

		public bool StartReceive()
		{
			bool asyncResult;
			try
			{
				asyncResult = this.socket.ReceiveFromAsync( this._recvEventArgs );
			}
			catch ( SocketException e )
			{
				this.OnError( $"socket receive error, code:{e.SocketErrorCode} " );
				return false;
			}
			if ( !asyncResult )//有一个挂起的IO操作需要马上处理
				this.ProcessReceive( this._recvEventArgs );
			return true;
		}

		private void OnReceiveComplete( object sender, SocketAsyncEventArgs asyncEventArgs ) => this.ProcessReceive( asyncEventArgs );

		private void ProcessReceive( SocketAsyncEventArgs recvEventArgs )
		{
			if ( recvEventArgs.SocketError != SocketError.Success )
			{
				//网络错误
				this.OnError( $"receive error, remote endpoint:{this.remoteEndPoint}, code:{recvEventArgs.SocketError}" );
				return;
			}
			int size = recvEventArgs.BytesTransferred;
			if ( size == 0 )
			{
				//远端可能已经关闭连接
				this.OnError( $"Receive zero bytes, remote endpoint: {this.remoteEndPoint}, code:{SocketError.NoData}" );
				return;
			}
			//处理数据
			byte[] data = recvEventArgs.Buffer;
			int offset = recvEventArgs.Offset;
			uint connID = 0;
			switch ( this.state )
			{
				case KCPConnectionState.Connecting:
					//验证握手回应消息
					if ( this.VerifyHandshakeAck( data, ref offset, ref size, ref connID ) )
					{
						this._connID = connID;
						this.state = KCPConnectionState.Connected;

						NetEvent netEvent = NetworkMgr.instance.PopEvent();
						netEvent.type = NetEvent.Type.Establish;
						netEvent.session = this.session;
						NetworkMgr.instance.PushEvent( netEvent );
					}
					break;

				case KCPConnectionState.Connected:
					//验证connID
					if ( this.VerifyConnID( data, ref offset, ref size, ref connID ) && connID == this._connID )
						this.SendDataToMainThread( data, offset, size );
					break;
			}
			//重新开始接收
			this.StartReceive();
		}

		public void SendDataToMainThread( byte[] data, int offset, int size )
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( data, offset, size );
			this._recvQueue.Push( buffer );
		}

		private void OnKCPOutput( byte[] data )
		{
			byte flag = 0;
			int offset = ByteUtils.Decode8u( data, 0, ref flag );
			int size = data.Length - offset;
			if ( flag > 0 ) //内部协议
			{
				if ( this.IsPing( data, offset, size ) )
				{
					this.SendPong();
					return;
				}
				if ( this.IsPong( data, offset, size ) )
				{
					Logger.Log( "pong" );
					return;
				}
			}
			else
			{
				NetEvent netEvent = NetworkMgr.instance.PopEvent();
				netEvent.type = NetEvent.Type.Recv;
				netEvent.session = this.session;
				netEvent.data = data;
				NetworkMgr.instance.PushEvent( netEvent );
			}
		}

		public void StartPing()
		{
			this._pingScheduler = new SimpleScheduler();
			this._pingScheduler.Start( KCPConfig.PING_INTERVAL, this.SendPing, true );
		}

		private void SendPing( int count )
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( true );
			buffer.Write( KCPConfig.PING_SIGNATURE );
			this._sendQueue.Push( buffer );
		}

		private void SendPong()
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( true );
			buffer.Write( KCPConfig.PONG_SIGNATURE );
			this._sendQueue.Push( buffer );
		}

		public void SendHandShake()
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( ( uint )0 );
			buffer.Write( KCPConfig.CONN_KEY );
			buffer.Write( KCPConfig.HANDSHAKE_SIGNATURE );
			this.SendDirect( buffer.GetBuffer(), 0, ( int )buffer.length );
			buffer.Clear();
			this._bufferPool.Push( buffer );
		}

		public void SendHandShakeAck()
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( ( uint )0 );
			buffer.Write( KCPConfig.HANDSHAKE_SIGNATURE );
			buffer.Write( this.session.id );
			this.SendDirect( buffer.GetBuffer(), 0, ( int )buffer.length );
			buffer.Clear();
			this._bufferPool.Push( buffer );
		}

		private bool VerifyConnID( byte[] data, ref int offset, ref int size, ref uint connID )
		{
			if ( size < KCPConfig.SIZE_OF_SESSION_ID )
				return false;

			ByteUtils.Decode32u( data, offset, ref connID );
			if ( connID == KCPConfig.INVALID_SESSION_ID )
				return false;

			offset += KCPConfig.SIZE_OF_SESSION_ID;
			size -= KCPConfig.SIZE_OF_SESSION_ID;
			return true;
		}

		private bool VerifyHandshakeAck( byte[] data, ref int offset, ref int size, ref uint connID )
		{
			if ( size < KCPConfig.SIZE_OF_SESSION_ID + KCPConfig.SIZE_OF_SIGNATURE + KCPConfig.SIZE_OF_SESSION_ID )
				return false;

			int mOffset = offset;

			mOffset += ByteUtils.Decode32u( data, mOffset, ref connID );
			if ( connID != KCPConfig.INVALID_SESSION_ID )
				return false;

			ushort signature = 0;
			mOffset += ByteUtils.Decode16u( data, mOffset, ref signature );
			if ( signature != KCPConfig.HANDSHAKE_SIGNATURE )
				return false;

			mOffset += ByteUtils.Decode32u( data, mOffset, ref connID );
			if ( connID == KCPConfig.INVALID_SESSION_ID )
				return false;

			offset = mOffset;
			size -= mOffset;

			return true;
		}

		private bool IsPing( byte[] data, int offset, int size )
		{
			if ( size < KCPConfig.SIZE_OF_SIGNATURE )
				return false;

			ushort signature = 0;
			ByteUtils.Decode16u( data, offset, ref signature );
			if ( signature != KCPConfig.PING_SIGNATURE )
				return false;

			this._pingTime = TimeUtils.utcTime;
			return true;
		}

		private bool IsPong( byte[] data, int offset, int size )
		{
			if ( size < KCPConfig.SIZE_OF_SIGNATURE )
				return false;

			ushort signature = 0;
			ByteUtils.Decode16u( data, offset, ref signature );
			return signature == KCPConfig.PONG_SIGNATURE;
		}

		public void Update( UpdateContext updateContext )
		{
			this._sendQueue.Switch();
			while ( !this._sendQueue.isEmpty )
			{
				StreamBuffer buffer = this._sendQueue.Pop();
				this._kcpProxy.Send( buffer.GetBuffer(), 0, ( int )buffer.length );
				buffer.Clear();
				this._bufferPool.Push( buffer );
			}
			switch ( this.state )
			{
				case KCPConnectionState.Connected:
					this._recvQueue.Switch();
					while ( !this._recvQueue.isEmpty )
					{
						StreamBuffer buffer = this._recvQueue.Pop();
						this._kcpProxy.ProcessData( buffer.GetBuffer(), 0, ( int )buffer.length, this.OnKCPOutput );
						buffer.Clear();
						this._bufferPool.Push( buffer );
					}
					this._kcpProxy.Update( updateContext.deltaTime );
					break;
			}
		}

		public void OnHeartBeat( long dt )
		{
			switch ( this.state )
			{
				case KCPConnectionState.Connected:
					this._pingScheduler?.Update( dt );
					break;
			}
		}
	}
}