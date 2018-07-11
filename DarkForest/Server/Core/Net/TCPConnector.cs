using System.Net;
using System.Net.Sockets;
using Core.Misc;

namespace Core.Net
{
	public class TCPConnector : IConnector
	{
		public Socket socket { get; set; }
		public INetSession session { get; }
		public int recvBufSize { get; set; }
		public PacketEncodeHandler packetEncodeHandler { get; set; }
		public PacketDecodeHandler packetDecodeHandler { get; set; }
		public bool connected => this.socket != null && this.socket.Connected;

		private readonly SocketAsyncEventArgs _connEventArgs;
		private string _ip;
		private int _port;

		public TCPConnector( INetSession session )
		{
			this.session = session;
			this._connEventArgs = new SocketAsyncEventArgs { UserToken = this };
			this._connEventArgs.Completed += this.OnIOComplete;
		}

		public void Dispose()
		{
			this._connEventArgs.Completed -= this.OnIOComplete;
			this._connEventArgs.Dispose();
		}

		public void Close()
		{
			if ( this.connected )
				this.socket.Shutdown( SocketShutdown.Both );
			this.socket.Close();
			this.socket = null;
		}

		public bool Connect( string ip, int port )
		{
			this._ip = ip;
			this._port = port;
			return this.ReConnect();
		}

		public bool ReConnect()
		{
			try
			{
				this.socket = new Socket( AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp );
			}
			catch ( SocketException e )
			{
				Logger.Log( $"create socket error, code:{e.SocketErrorCode}" );
				return false;
			}

			this.socket.SetSocketOption( SocketOptionLevel.Socket, SocketOptionName.NoDelay, true );
			this.socket.NoDelay = true;

			this._connEventArgs.RemoteEndPoint = new IPEndPoint( IPAddress.Parse( this._ip ), this._port );
			bool asyncResult;
			try
			{
				asyncResult = this.socket.ConnectAsync( this._connEventArgs );
			}
			catch ( SocketException e )
			{
				Logger.Log( $"socket connect error, address:{this._ip}:{this._port}, code:{e.SocketErrorCode} " );
				return false;
			}
			if ( !asyncResult )
				this.ProcessConnect( this._connEventArgs );
			return true;
		}

		private void OnIOComplete( object sender, SocketAsyncEventArgs asyncEventArgs )
		{
			switch ( asyncEventArgs.LastOperation )
			{
				case SocketAsyncOperation.Connect:
					this.ProcessConnect( asyncEventArgs );
					break;
			}
		}

		private void ProcessConnect( SocketAsyncEventArgs connectEventArgs )
		{
			if ( connectEventArgs.SocketError != SocketError.Success )
			{
				this.OnError( $"socket connect error, address:{this._ip}:{this._port}, code:{connectEventArgs.SocketError}" );
				this.Close();
				return;
			}

			ITCPConnection tcpConnection = ( ITCPConnection )this.session.connection;
			tcpConnection.socket = this.socket;
			tcpConnection.remoteEndPoint = this.socket.RemoteEndPoint;
			tcpConnection.recvBufSize = this.recvBufSize;
			tcpConnection.packetEncodeHandler = this.packetEncodeHandler;
			tcpConnection.packetDecodeHandler = this.packetDecodeHandler;
			tcpConnection.StartReceive();
			this.socket = null;

			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Establish;
			netEvent.session = this.session;
			NetworkMgr.instance.PushEvent( netEvent );
		}

		private void OnError( string error )
		{
			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.ConnErr;
			netEvent.session = this.session;
			netEvent.error = error;
			NetworkMgr.instance.PushEvent( netEvent );
		}
	}
}