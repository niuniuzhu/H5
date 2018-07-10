using Core.Misc;
using System;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace Core.Net
{
	public class ReceiveData
	{
		public readonly StreamBuffer buffer = new StreamBuffer();
		public Socket conn;
		public readonly EndPoint localEndPoint = new IPEndPoint( IPAddress.Any, 0 );
		public readonly EndPoint remoteEndPoint = new IPEndPoint( IPAddress.Any, 0 );

		public void Clear()
		{
			this.buffer.Clear();
			this.conn = null;
		}
	}

	public class KCPListener : IKCPListener
	{
		public PacketEncodeHandler packetEncodeHandler { get; set; }
		public PacketDecodeHandler packetDecodeHandler { get; set; }
		public SessionCreater sessionCreater { get; set; }
		public SessionGeter sessionGetter { get; set; }

		public int recvBufSize { get; set; } = 10240;

		private Socket _socket;
		private readonly BufferBlock<ReceiveData> _buffer = new BufferBlock<ReceiveData>();
		private readonly ThreadSafeObejctPool<ReceiveData> _receiveDataPool = new ThreadSafeObejctPool<ReceiveData>();
		private bool _running;

		public void Dispose() => this.Stop();

		public void SetOpt( SocketOptionName optionName, object opt ) => this._socket.SetSocketOption( SocketOptionLevel.Socket, optionName, opt );

		public bool Start( int port, bool reuseAddr = true )
		{
			this._running = true;
			Task.Run( action: this.ConsumeAsync );

			Logger.Log( $"Start Listen {port}, reuseAddr {reuseAddr}" );
			try
			{
				this._socket = new Socket( AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp );
			}
			catch ( SocketException e )
			{
				Logger.Error( $"create socket error, code:{e.SocketErrorCode}" );
				return false;
			}
			this._socket.SetSocketOption( SocketOptionLevel.Socket, SocketOptionName.ReuseAddress, reuseAddr );
			try
			{
				this._socket.Bind( new IPEndPoint( IPAddress.Any, port ) );
			}
			catch ( SocketException e )
			{
				Logger.Error( $"socket bind at {port} fail, code:{e.SocketErrorCode}" );
				return false;
			}
			this.StartReceive( null );
			return true;
		}

		public bool Stop()
		{
			this._running = false;
			Socket socket = this._socket;
			this._socket = null;
			return this.Close( socket );
		}

		private bool Close( Socket socket )
		{
			if ( socket == null )
				return false;
			if ( socket.Connected )
				socket.Shutdown( SocketShutdown.Both );
			socket.Close();
			return true;
		}

		private void StartReceive( SocketAsyncEventArgs acceptEventArgs )
		{
			if ( this._socket == null )
				return;

			if ( acceptEventArgs == null )
			{
				acceptEventArgs = new SocketAsyncEventArgs { RemoteEndPoint = new IPEndPoint( IPAddress.Any, 0 ) };
				acceptEventArgs.Completed += this.OnReceiveComplete;
			}
			else
				acceptEventArgs.AcceptSocket = null;

			bool asyncResult;
			try
			{
				asyncResult = this._socket.ReceiveFromAsync( acceptEventArgs );
			}
			catch ( ObjectDisposedException )
			{
				return;
			}
			catch ( SocketException e )
			{
				Logger.Error( $"socket receive fail, code:{e.SocketErrorCode}" );
				this.Close( this._socket );
				return;
			}
			if ( !asyncResult )
				this.ProcessReceive( acceptEventArgs );
		}

		private void OnReceiveComplete( object sender, SocketAsyncEventArgs acceptEventArgs ) => this.ProcessReceive( acceptEventArgs );

		private void ProcessReceive( SocketAsyncEventArgs acceptEventArgs )
		{
			Socket acceptSocket = acceptEventArgs.AcceptSocket;
			do
			{
				if ( acceptEventArgs.SocketError != SocketError.Success )
				{
					//网络错误
					Logger.Error( $"process accept fail,code{acceptEventArgs.SocketError}" );
					break;
				}

				if ( this._socket == null )
					break;

				ReceiveData receiveData = this._receiveDataPool.Pop();
				receiveData.buffer.Write( acceptEventArgs.Buffer, acceptEventArgs.Offset, acceptEventArgs.BytesTransferred );
				receiveData.conn = this._socket;
				receiveData.localEndPoint.Create( new SocketAddress( this._socket.AddressFamily ) );
				receiveData.remoteEndPoint.Create( new SocketAddress( acceptSocket.AddressFamily ) );
				this._buffer.Post( receiveData );
			} while ( false );
			this.StartReceive( acceptEventArgs );
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

		private bool VerifyHandshake( byte[] buffer, ref int offset, ref int size )
		{
			if ( size < KCPConfig.SIZE_OF_SIGNATURE )
				return false;

			ushort signature = ByteUtils.Decode16u( buffer, offset );
			if ( signature != KCPConfig.HANDSHAKE_SIGNATURE )
				return false;

			offset += KCPConfig.SIZE_OF_SIGNATURE;
			size -= KCPConfig.SIZE_OF_SIGNATURE;
			return true;
		}

		private bool VerifyConnID( byte[] data, ref int offset, ref int size, ref uint id )
		{
			if ( size < KCPConfig.SIZE_OF_PEER_ID )
				return false;

			ByteUtils.Decode32u( data, offset, ref id );
			offset += KCPConfig.SIZE_OF_PEER_ID;
			size -= KCPConfig.SIZE_OF_PEER_ID;
			return true;
		}

		private async void ConsumeAsync()
		{
			while ( this._running )
			{
				ReceiveData receiveData = await this._buffer.ReceiveAsync();
				byte[] data = receiveData.buffer.GetBuffer();
				int offset = 0;
				int size = ( int )receiveData.buffer.length;

				//验证Key
				if ( !this.VerifyConnKey( data, ref offset, ref size ) )
					continue;

				//验证握手消息
				if ( this.VerifyHandshake( data, ref offset, ref size ) )
				{
					//调用委托创建session
					INetSession session = this.sessionCreater( ProtoType.KCP );
					if ( session == null )
					{
						Logger.Error( "create session failed" );
						this.Close( receiveData.conn );
						continue;
					}

					IKCPConnection kcpConnection = ( IKCPConnection )session.connection;
					kcpConnection.state = KCPConnectionState.Connected;
					kcpConnection.socket = receiveData.conn;
					kcpConnection.localEndPoint = receiveData.localEndPoint;
					kcpConnection.remoteEndPoint = receiveData.remoteEndPoint;
					kcpConnection.recvBufSize = this.recvBufSize;

					NetEvent netEvent = NetEventMgr.instance.pool.Pop();
					netEvent.type = NetEvent.Type.Establish;
					netEvent.session = session;
					NetEventMgr.instance.Push( netEvent );

					//回应握手消息
					byte[] handshakeAckData = new byte[KCPConfig.SIZE_OF_CONN_KEY + KCPConfig.SIZE_OF_SIGNATURE + KCPConfig.SIZE_OF_PEER_ID];
					int handshakeAckOffset = ByteUtils.Encode32u( handshakeAckData, 0, KCPConfig.CONN_KEY );
					handshakeAckOffset += ByteUtils.Encode16u( handshakeAckData, handshakeAckOffset, KCPConfig.HANDSHAKE_SIGNATURE );
					handshakeAckOffset += ByteUtils.Encode32u( handshakeAckData, handshakeAckOffset, session.id );
					kcpConnection.SendDirect( handshakeAckData, 0, handshakeAckOffset );

					//开始ping
					kcpConnection.StartPing();
					continue;
				}
				{
					uint sessionID = 0;
					if ( !this.VerifyConnID( data, ref offset, ref size, ref sessionID ) )
						continue;

					INetSession session = this.sessionGetter( sessionID );
					if ( session == null )
					{
						Logger.Error( "create session failed" );
						this.Close( receiveData.conn );
						continue;
					}
					IKCPConnection kcpConnection = ( IKCPConnection )session.connection;
					kcpConnection.ProcessData( data, offset, size );
				}
				receiveData.Clear();
				this._receiveDataPool.Push( receiveData );
			}
		}

		public void Update( long dt )
		{
		}
	}
}