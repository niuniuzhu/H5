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
		public Socket conn;
		public readonly IPEndPoint remoteEndPoint = new IPEndPoint( IPAddress.Any, 0 );
		public readonly StreamBuffer buffer = new StreamBuffer();

		public void Clear()
		{
			this.buffer.Clear();
			this.conn = null;
		}
	}

	public class KCPListener : IKCPListener
	{
		public uint id { get; }
		public PacketEncodeHandler packetEncodeHandler { get; set; }
		public PacketDecodeHandler packetDecodeHandler { get; set; }
		public SessionCreater sessionCreater { get; set; }

		public int recvBufSize { get; set; } = 10240;

		private Socket _socket;
		private readonly BufferBlock<ReceiveData> _receiveDatas = new BufferBlock<ReceiveData>();
		private readonly ThreadSafeObejctPool<ReceiveData> _receiveDataPool = new ThreadSafeObejctPool<ReceiveData>();
		private bool _running;

		public KCPListener( uint id ) => this.id = id;

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
				acceptEventArgs.SetBuffer( new byte[this.recvBufSize], 0, this.recvBufSize );
				acceptEventArgs.Completed += this.OnReceiveComplete;
			}

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

		private void ProcessReceive( SocketAsyncEventArgs recvEventArgs )
		{
			do
			{
				if ( recvEventArgs.SocketError != SocketError.Success )
				{
					//网络错误
					Logger.Error( $"process receive fail,code{recvEventArgs.SocketError}" );
					break;
				}

				if ( this._socket == null )
					break;

				int size = recvEventArgs.BytesTransferred;
				if ( size < KCPConfig.SIZE_OF_HEAD )
					break;

				byte[] data = recvEventArgs.Buffer;
				int offset = recvEventArgs.Offset;
				if ( !KCPConnection.VerifyConnKey( data, ref offset, ref size ) )
					break;

				ReceiveData receiveData = this._receiveDataPool.Pop();
				receiveData.buffer.Write( data, offset, size );
				receiveData.conn = this._socket;
				receiveData.remoteEndPoint.Address = ( ( IPEndPoint )recvEventArgs.RemoteEndPoint ).Address;
				receiveData.remoteEndPoint.Port = ( ( IPEndPoint )recvEventArgs.RemoteEndPoint ).Port;
				this._receiveDatas.Post( receiveData );
			} while ( false );
			this.StartReceive( recvEventArgs );
		}

		private async void ConsumeAsync()
		{
			while ( this._running )
			{
				ReceiveData receiveData = await this._receiveDatas.ReceiveAsync();
				byte[] data = receiveData.buffer.GetBuffer();
				int offset = 0;
				int size = ( int )receiveData.buffer.length;

				//验证握手消息
				if ( VerifyHandshake( data, ref offset, ref size ) )
				{
					//调用委托创建session
					INetSession session = this.sessionCreater( ProtoType.KCP );
					if ( session == null )
					{
						Logger.Error( "create session failed" );
						this.Close( receiveData.conn );
					}
					else
					{
						IKCPConnection kcpConnection = ( IKCPConnection )session.connection;
						kcpConnection.socket = receiveData.conn;
						kcpConnection.remoteEndPoint = receiveData.remoteEndPoint;
						kcpConnection.recvBufSize = this.recvBufSize;
						kcpConnection.activeTime = TimeUtils.utcTime;
						kcpConnection.state = KCPConnectionState.Connected;

						NetEvent netEvent = NetworkMgr.instance.PopEvent();
						netEvent.type = NetEvent.Type.Establish;
						netEvent.session = session;
						NetworkMgr.instance.PushEvent( netEvent );

						kcpConnection.SendHandShakeAck();
						kcpConnection.StartPing();
					}
				}
				else
				{
					uint connID = ByteUtils.Decode32u( data, offset );
					INetSession session = NetworkMgr.instance.GetSession( connID );
					if ( session == null )
					{
						Logger.Error( "create session failed" );
						this.Close( receiveData.conn );
						continue;
					}
					IKCPConnection kcpConnection = ( IKCPConnection )session.connection;
					kcpConnection.SendDataToMainThread( data, offset, size );
				}
				receiveData.Clear();
				this._receiveDataPool.Push( receiveData );
			}
		}

		private static bool VerifyHandshake( byte[] data, ref int offset, ref int size )
		{
			int mOffset = offset;

			uint connID = 0;
			mOffset += ByteUtils.Decode32u( data, mOffset, ref connID );
			if ( connID != KCPConfig.INVALID_SESSION_ID )
				return false;

			byte isKCPTrans = 0;
			mOffset += ByteUtils.Decode8u( data, mOffset, ref isKCPTrans );
			if ( isKCPTrans > 0 )
				return false;

			ushort signature = 0;
			mOffset += ByteUtils.Decode16u( data, mOffset, ref signature );
			if ( signature != KCPConfig.HANDSHAKE_SIGNATURE )
				return false;

			offset = mOffset;
			size -= mOffset;

			return true;
		}

		public void Update( long dt )
		{
		}
	}
}