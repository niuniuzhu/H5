using System;
using System.Net;
using System.Net.Sockets;

namespace Core.Net
{
	public class KCPConnector : IConnector
	{
		public Socket socket { get; set; }
		public INetSession session { get; }
		public bool connected => this.socket != null && this.socket.Connected;
		[Obsolete( "Unused" )]
		public int recvBufSize { get; set; }
		[Obsolete( "Unused" )]
		public PacketEncodeHandler packetEncodeHandler { get; set; }
		[Obsolete( "Unused" )]
		public PacketDecodeHandler packetDecodeHandler { get; set; }

		private readonly SocketAsyncEventArgs _connEventArgs;
		private string _ip;
		private int _port;

		public KCPConnector( INetSession session )
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

			IKCPConnection kcpConnection = ( IKCPConnection ) this.session.connection;
			kcpConnection.state = KCPConnectionState.Connecting;
			kcpConnection.socket = this.socket;
			kcpConnection.localEndPoint = this.socket.LocalEndPoint;
			kcpConnection.remoteEndPoint = this.socket.RemoteEndPoint;
			kcpConnection.StartReceive();
			kcpConnection.SendHandShake();
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