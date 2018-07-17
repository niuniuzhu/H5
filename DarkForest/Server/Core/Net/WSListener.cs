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
				socket.OnOpen = this.ProcessAccept;
				socket.OnClose = this.ProcessClose;
				socket.OnBinary = this.ProcessReceive;
			} );
			return true;
		}

		private void ProcessClose()
		{
			Logger.Log( "close!" );
		}

		private void ProcessAccept()
		{
			Logger.Log( "open!" );
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