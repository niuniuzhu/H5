using Core.Misc;
using System;
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
		private uint _remoteConnID;
		private long _pingTime;

		public KCPConnection( INetSession session )
		{
			this.session = session;
			this._kcpProxy = new KCPProxy( this.session.id, this.OnKCPOutout );
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
			this._remoteConnID = 0;
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

		public void SetOpt( SocketOptionName optionName, object opt ) => this.socket.SetSocketOption( SocketOptionLevel.Socket, optionName, opt );

		private void OnKCPOutout( byte[] buf, int size )
		{
			byte[] sdata = new byte[size + KCPConfig.SIZE_OF_CONN_KEY];
			int offset = ByteUtils.Encode32u( sdata, 0, KCPConfig.CONN_KEY );
			Buffer.BlockCopy( buf, 0, sdata, offset, size );
			offset += size;
			this.SendDirect( sdata, 0, offset );
		}

		public void StartPing()
		{
			this._pingScheduler = new SimpleScheduler();
			this._pingScheduler.Start( KCPConfig.PING_INTERVAL, this.SendPing );
		}

		public bool Send( byte[] data, int offset, int size )
		{
			this._kcpProxy.Send( data, offset, size );
			return true;
		}

		public void SendDirect( byte[] data, int offset, int size )
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
			do
			{
				//处理数据
				byte[] data = recvEventArgs.Buffer;
				int offset = recvEventArgs.Offset;
				if ( !this.VerifyConnKey( data, ref offset, ref size ) )
					break;

				switch ( this.state )
				{
					case KCPConnectionState.Connecting:
						//验证握手回应消息
						if ( !this.VerifyHandshakeAck( data, ref offset, ref size ) )
							break;

						//获取远程SessionID
						if ( !this.VerifyConnID( data, ref offset, ref size, ref this._remoteConnID ) )
							break;

						this.state = KCPConnectionState.Connected;

						NetEvent netEvent = NetworkMgr.instance.PopEvent();
						netEvent.type = NetEvent.Type.Establish;
						netEvent.session = this.session;
						NetworkMgr.instance.PushEvent( netEvent );
						break;

					case KCPConnectionState.Connected:
						//处理ping
						if ( this.IsPing( data, offset, size ) )
						{
							this.SendPong();
							break;
						}
						this.ProcessData( data, offset, size );
						break;
				}
			} while ( false );
			//重新开始接收
			this.StartReceive();
		}

		public void ProcessData( byte[] data, int offset, int size )
		{
			if ( this.IsPong( data, offset, size ) )
			{
				return;
			}
			this._kcpProxy.ProcessData( data, offset, size, this.OnKCPOutput );
		}

		private void OnKCPOutput( byte[] outData )
		{
			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Recv;
			netEvent.session = this.session;
			netEvent.data = outData;
			NetworkMgr.instance.PushEvent( netEvent );
		}

		private void OnError( string error )
		{
			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Error;
			netEvent.session = this.session;
			netEvent.error = error;
			NetworkMgr.instance.PushEvent( netEvent );
		}

		private void SendPing()
		{
			byte[] data = new byte[KCPConfig.SIZE_OF_CONN_KEY + KCPConfig.SIZE_OF_SIGNATURE];
			int offset = ByteUtils.Encode32u( data, 0, KCPConfig.CONN_KEY );
			offset += ByteUtils.Encode16u( data, offset, KCPConfig.PING_SIGNATURE );
			this.SendDirect( data, 0, offset );
		}

		private void SendPong()
		{
			byte[] data = new byte[KCPConfig.SIZE_OF_CONN_KEY + KCPConfig.SIZE_OF_SESSION_ID + KCPConfig.SIZE_OF_SIGNATURE];
			int offset = ByteUtils.Encode32u( data, 0, KCPConfig.CONN_KEY );
			offset += ByteUtils.Encode32u( data, offset, this._remoteConnID );
			offset += ByteUtils.Encode16u( data, offset, KCPConfig.PONG_SIGNATURE );
			this.SendDirect( data, 0, offset );
		}

		public void SendHandShake()
		{
			byte[] data = new byte[KCPConfig.SIZE_OF_CONN_KEY + KCPConfig.SIZE_OF_SIGNATURE];
			int offset = ByteUtils.Encode32u( data, 0, KCPConfig.CONN_KEY );
			offset += ByteUtils.Encode16u( data, offset, KCPConfig.HANDSHAKE_SIGNATURE );
			this.SendDirect( data, 0, offset );
		}

		public void Update( UpdateContext updateContext )
		{
			switch ( this.state )
			{
				case KCPConnectionState.Connected:
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

		private bool VerifyConnKey( byte[] buffer, ref int offset, ref int size )
		{
			if ( size < KCPConfig.SIZE_OF_CONN_KEY )
				return false;

			uint key = ByteUtils.Decode32u( buffer, offset );
			if ( key != KCPConfig.CONN_KEY )
				return false;

			offset += KCPConfig.SIZE_OF_CONN_KEY;
			size -= KCPConfig.SIZE_OF_CONN_KEY;
			return true;
		}

		private bool VerifyHandshakeAck( byte[] data, ref int offset, ref int size )
		{
			if ( size < KCPConfig.SIZE_OF_SIGNATURE )
				return false;

			ushort signature = ByteUtils.Decode16u( data, offset );
			if ( signature != KCPConfig.HANDSHAKE_SIGNATURE )
				return false;

			offset += KCPConfig.SIZE_OF_SIGNATURE;
			size -= KCPConfig.SIZE_OF_SIGNATURE;
			return true;
		}

		private bool VerifyConnID( byte[] data, ref int offset, ref int size, ref uint id )
		{
			if ( size < KCPConfig.SIZE_OF_SESSION_ID )
				return false;

			ByteUtils.Decode32u( data, offset, ref id );
			offset += KCPConfig.SIZE_OF_SESSION_ID;
			size -= KCPConfig.SIZE_OF_SESSION_ID;
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
	}
}