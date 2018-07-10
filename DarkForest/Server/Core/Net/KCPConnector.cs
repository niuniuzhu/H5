using System.Net;
using System.Net.Sockets;

namespace Core.Net
{
	public class KCPConnector : IConnector
	{
		public Socket socket { get; set; }
		public INetSession session => this._session;
		public bool connected => this.socket != null && this.socket.Connected;

		private readonly IKCPSession _session;
		private readonly SocketAsyncEventArgs _connEventArgs;
		private string _ip;
		private int _port;

		public KCPConnector( IKCPSession session )
		{
			this._session = session;
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
				this.socket = new Socket( AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp );
			}
			catch ( SocketException e )
			{
				this.OnError( $"create socket error, code:{e.SocketErrorCode}" );
				return false;
			}

			this._connEventArgs.RemoteEndPoint = new IPEndPoint( IPAddress.Parse( this._ip ), this._port );
			bool asyncResult;
			try
			{
				asyncResult = this.socket.ConnectAsync( this._connEventArgs );
			}
			catch ( SocketException e )
			{
				this.OnError( $"socket connect error, address:{this._ip}:{this._port}, code:{e.SocketErrorCode} " );
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
			this._session.connection.state = KCPConnectionState.Connecting;
			this._session.connection.socket = this.socket;
			this._session.connection.localEndPoint = this.socket.LocalEndPoint;
			this._session.connection.remoteEndPoint = this.socket.RemoteEndPoint;
			this._session.connection.StartReceive();
			this._session.connection.SendHandShake();
			this.socket = null;
		}

		private void OnError( string error )
		{
			NetEvent netEvent = NetEventMgr.instance.pool.Pop();
			netEvent.type = NetEvent.Type.ConnErr;
			netEvent.session = this.session;
			netEvent.error = error;
			NetEventMgr.instance.Push( netEvent );
		}
	}
}