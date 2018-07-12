﻿using Core.Misc;
using Core.Structure;
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
			set
			{
				this._sendEventArgs.RemoteEndPoint = value;
				this._recvEventArgs.RemoteEndPoint = value;
			}
		}
		public INetSession session { get; }
		public int recvBufSize { set => this._recvEventArgs.SetBuffer( new byte[value], 0, value ); }
		public bool connected => true;
		public long activeTime { get; set; }

		private readonly KCPProxy _kcpProxy;
		private readonly SocketAsyncEventArgs _sendEventArgs;
		private readonly SocketAsyncEventArgs _recvEventArgs;
		private SimpleScheduler _pingScheduler;
		private uint _connID;
		private readonly SwitchQueue<StreamBuffer> _sendQueue = new SwitchQueue<StreamBuffer>();
		private readonly SwitchQueue<StreamBuffer> _recvQueue = new SwitchQueue<StreamBuffer>();
		private readonly ThreadSafeObejctPool<StreamBuffer> _bufferPool = new ThreadSafeObejctPool<StreamBuffer>();

		public KCPConnection( INetSession session )
		{
			this.session = session;
			this._connID = this.session.id;
			this._kcpProxy = new KCPProxy( this.OnKCPOutout );
			this._sendEventArgs = new SocketAsyncEventArgs { UserToken = this };
			this._recvEventArgs = new SocketAsyncEventArgs { UserToken = this };
			this._sendEventArgs.Completed += this.OnIOComplete;
			this._recvEventArgs.Completed += this.OnIOComplete;
		}

		public void Dispose()
		{
			this._sendEventArgs.Completed -= this.OnIOComplete;
			this._recvEventArgs.Completed -= this.OnIOComplete;
			this._sendEventArgs.Dispose();
			this._recvEventArgs.Dispose();
			this._kcpProxy.Dispose();
		}

		public void Close()
		{
			if ( this.socket == null )
				return;
			this._kcpProxy.Release();
			this._connID = 0;
			this.activeTime = 0;
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
			byte[] sdata = new byte[size + sizeof( byte ) + KCPConfig.SIZE_OF_CONN_KEY + KCPConfig.SIZE_OF_SESSION_ID];
			int offset = ByteUtils.Encode32u( sdata, 0, KCPConfig.CONN_KEY );//connKey
			offset += ByteUtils.Encode32u( sdata, offset, this._connID );//connID
			offset += ByteUtils.Encode8u( sdata, offset, 1 );//通过kcp传输
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

		private bool SendDirect( byte[] data, int offset, int size )
		{
			this._sendEventArgs.SetBuffer( data, offset, size );
			bool asyncResult;
			try
			{
				asyncResult = this.socket.SendToAsync( this._sendEventArgs );
			}
			catch ( ObjectDisposedException )
			{
				return false;
			}
			catch ( SocketException e )
			{
				this.OnError( $"socket send error, code:{e.SocketErrorCode} " );
				return false;
			}
			if ( !asyncResult )
				this.ProcessSend( this._sendEventArgs );
			return true;
		}

		private int SendDirectSync( byte[] data, int offset, int size )
		{
			int ret;
			try
			{
				ret = this.socket.SendTo( data, offset, size, SocketFlags.None, this.remoteEndPoint );
			}
			catch ( ObjectDisposedException )
			{
				return -1;
			}
			catch ( SocketException e )
			{
				this.OnError( e.ToString() );
				return -1;
			}

			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Send;
			netEvent.session = this.session;
			NetworkMgr.instance.PushEvent( netEvent );
			return ret;
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

		private void OnIOComplete( object sender, SocketAsyncEventArgs asyncEventArgs )
		{
			switch ( asyncEventArgs.LastOperation )
			{
				case SocketAsyncOperation.ReceiveFrom:
					this.ProcessReceive( asyncEventArgs );
					break;

				case SocketAsyncOperation.SendTo:
					this.ProcessSend( asyncEventArgs );
					break;
			}
		}

		private void ProcessSend( SocketAsyncEventArgs sendEventArgs )
		{
			if ( sendEventArgs.SocketError != SocketError.Success )
			{
				//网络错误
				this.OnError( $"socket send error, code:{sendEventArgs.SocketError}" );
				return;
			}

			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Send;
			netEvent.session = this.session;
			NetworkMgr.instance.PushEvent( netEvent );
		}

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
			if ( size >= KCPConfig.SIZE_OF_HEAD )
			{
				byte[] data = recvEventArgs.Buffer;
				int offset = recvEventArgs.Offset;
				if ( VerifyConnKey( data, ref offset, ref size ) )
					this.SendDataToMainThread( data, offset, size );//发送到主线程处理数据
			}
			this.StartReceive();
		}

		public void SendDataToMainThread( byte[] data, int offset, int size )
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( data, offset, size );
			this._recvQueue.Push( buffer );
		}

		private void ProcessData( byte[] data, int offset, int size, uint transConnID )
		{
			uint connID = 0;
			if ( transConnID == 0 )//未建立连接
			{
				//验证握手回应消息
				if ( VerifyHandshakeAck( data, ref offset, ref size, ref connID ) )
				{
					this._connID = connID;
					this.activeTime = TimeUtils.utcTime;
					this.state = KCPConnectionState.Connected;

					NetEvent netEvent = NetworkMgr.instance.PopEvent();
					netEvent.type = NetEvent.Type.Establish;
					netEvent.session = this.session;
					NetworkMgr.instance.PushEvent( netEvent );
				}
			}
			else
			{
				if ( transConnID != this._connID )
					return;

				if ( IsPingTimeout( data, offset, size ) )
				{
					Logger.Log( "timeout" );
					this.session.Close();
				}
			}
		}

		private void ProcessKCPData( byte[] data )
		{
			byte flag = 0;
			int offset = ByteUtils.Decode8u( data, 0, ref flag );
			int size = data.Length - offset;
			if ( flag > 0 ) //内部协议
			{
				if ( IsPing( data, offset, size ) )
				{
					this.activeTime = TimeUtils.utcTime;
					this.SendPong();
				}
				if ( IsPong( data, offset, size ) )
				{
					this.activeTime = TimeUtils.utcTime;
					Logger.Log( "pong" );
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
			buffer.Write( true );//内部协议
			buffer.Write( KCPConfig.PING_SIGNATURE );
			this._sendQueue.Push( buffer );
		}

		private void SendPong()
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( true );//内部协议
			buffer.Write( KCPConfig.PONG_SIGNATURE );
			this._sendQueue.Push( buffer );
		}

		public void SendHandShake()
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( KCPConfig.CONN_KEY );//connKey
			buffer.Write( ( uint )0 );//connID
			buffer.Write( ( byte )0 );//不通过kcp传输
			buffer.Write( KCPConfig.HANDSHAKE_SIGNATURE );
			this.SendDirect( buffer.GetBuffer(), 0, ( int )buffer.length );
			buffer.Clear();
			this._bufferPool.Push( buffer );
		}

		public void SendHandShakeAck()
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( KCPConfig.CONN_KEY );//connKey
			buffer.Write( ( uint )0 );//connID
			buffer.Write( ( byte )0 );//不通过kcp传输
			buffer.Write( KCPConfig.ACK_HANDSHAKE_SIGNATURE );
			buffer.Write( this.session.id );
			this.SendDirect( buffer.GetBuffer(), 0, ( int )buffer.length );
			buffer.Clear();
			this._bufferPool.Push( buffer );
		}

		public void SendPingTimeout()
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( KCPConfig.CONN_KEY );//connKey
			buffer.Write( this.session.id );//connID
			buffer.Write( ( byte )0 );//不通过kcp传输
			buffer.Write( KCPConfig.TIMEOUT_SIGNATURE );
			this.SendDirectSync( buffer.GetBuffer(), 0, ( int )buffer.length );
			buffer.Clear();
			this._bufferPool.Push( buffer );
		}

		public static bool VerifyConnKey( byte[] data, ref int offset, ref int size )
		{
			if ( size < KCPConfig.SIZE_OF_CONN_KEY )
				return false;

			uint connKey = 0;
			ByteUtils.Decode32u( data, offset, ref connKey );
			if ( connKey != KCPConfig.CONN_KEY )
				return false;

			offset += KCPConfig.SIZE_OF_CONN_KEY;
			size -= KCPConfig.SIZE_OF_CONN_KEY;
			return true;
		}

		private static void DecodeConnID( byte[] data, ref int offset, ref int size, ref uint connID )
		{
			ByteUtils.Decode32u( data, offset, ref connID );

			offset += KCPConfig.SIZE_OF_SESSION_ID;
			size -= KCPConfig.SIZE_OF_SESSION_ID;
		}

		private static bool VerifyHandshakeAck( byte[] data, ref int offset, ref int size, ref uint connID )
		{
			int mOffset = offset;

			ushort signature = 0;
			mOffset += ByteUtils.Decode16u( data, mOffset, ref signature );
			if ( signature != KCPConfig.ACK_HANDSHAKE_SIGNATURE )
				return false;

			mOffset += ByteUtils.Decode32u( data, mOffset, ref connID );
			if ( connID == KCPConfig.INVALID_SESSION_ID )
				return false;

			offset = mOffset;
			size -= mOffset;

			return true;
		}

		private static bool IsPing( byte[] data, int offset, int size )
		{
			if ( size < KCPConfig.SIZE_OF_SIGNATURE )
				return false;

			ushort signature = 0;
			ByteUtils.Decode16u( data, offset, ref signature );
			if ( signature != KCPConfig.PING_SIGNATURE )
				return false;

			return true;
		}

		private static bool IsPong( byte[] data, int offset, int size )
		{
			if ( size < KCPConfig.SIZE_OF_SIGNATURE )
				return false;

			ushort signature = 0;
			ByteUtils.Decode16u( data, offset, ref signature );
			if ( signature != KCPConfig.PONG_SIGNATURE )
				return false;

			return true;
		}

		private static bool IsPingTimeout( byte[] data, int offset, int size )
		{
			if ( size < KCPConfig.SIZE_OF_SIGNATURE )
				return false;

			ushort signature = 0;
			ByteUtils.Decode16u( data, offset, ref signature );
			if ( signature != KCPConfig.TIMEOUT_SIGNATURE )
				return false;

			return true;
		}

		public static bool IsKCPTransport( byte[] data, ref int offset, ref int size )
		{
			bool result = data[offset] > 0;
			offset += sizeof( byte );
			size -= sizeof( byte );
			return result;
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

			this._recvQueue.Switch();
			while ( !this._recvQueue.isEmpty )
			{
				StreamBuffer buffer = this._recvQueue.Pop();

				byte[] data = buffer.GetBuffer();
				int offset = 0;
				int size = ( int )buffer.length;

				uint transConnID = 0;
				DecodeConnID( data, ref offset, ref size, ref transConnID );

				if ( IsKCPTransport( data, ref offset, ref size ) )
				{
					if ( transConnID == this._connID )
						this._kcpProxy.ProcessData( data, offset, size, this.ProcessKCPData );
				}
				else
					this.ProcessData( data, offset, size, transConnID );

				buffer.Clear();
				this._bufferPool.Push( buffer );
			}
			this._kcpProxy.Update( updateContext.deltaTime );
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