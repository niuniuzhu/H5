using Core.Misc;
using Fleck;

namespace Core.Net
{
	public class WSListener : IListener
	{
		public uint id { get; }
		public SessionCreater sessionCreater { get; set; }
		public int recvBufSize { get; set; }

		public bool noDelay
		{
			get => this._socket.ListenerSocket.NoDelay;
			set => this._socket.ListenerSocket.NoDelay = value;
		}

		private WebSocketServer _socket;

		public WSListener( uint id ) => this.id = id;

		public void Dispose() => this.Stop();

		public bool Start( int port, bool reuseAddr = true )
		{
			this._socket = new WebSocketServer( "ws://0.0.0.0:" + port );
			this._socket.Start( socket =>
			{
				socket.OnOpen = () => this.ProcessAccept( socket );
				socket.OnClose = () => this.ProcessClose( socket );
				socket.OnBinary = this.ProcessReceive;
			} );
			return true;
		}

		private void ProcessClose( IWebSocketConnection socket )
		{
			Logger.Log( "close!" );
		}

		private void ProcessAccept( IWebSocketConnection acceptSocket )
		{
			Logger.Log( "open!" );
			//调用委托创建session
			INetSession session = this.sessionCreater( ProtoType.TCP );
			if ( session == null )
			{
				Logger.Error( "create session failed" );
				acceptSocket.Close();
				return;
			}

			session.isPassive = true;
			TCPConnection tcpConnection = ( TCPConnection )session.connection;
			tcpConnection.socket = new SocketWrapper( acceptSocket );
			tcpConnection.remoteEndPoint = acceptSocket.RemoteEndPoint;
			tcpConnection.packetEncodeHandler = this.packetEncodeHandler;
			tcpConnection.packetDecodeHandler = this.packetDecodeHandler;
			tcpConnection.recvBufSize = this.recvBufSize;

			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Establish;
			netEvent.session = session;
			NetworkMgr.instance.PushEvent( netEvent );

			//开始接收数据
			session.connection.StartReceive();
		}

		private void ProcessReceive( byte[] bytes )
		{
			Logger.Log( "receive" );
		}

		public bool Stop()
		{
			if ( this._socket == null )
				return false;
			this._socket.Dispose();
			this._socket = null;
			return true;
		}
	}
}