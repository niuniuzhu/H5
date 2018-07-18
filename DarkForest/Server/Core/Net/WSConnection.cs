using System;
using System.Net;
using System.Net.Sockets;

namespace Core.Net
{
	public class WSConnection : IConnection
	{
		public SocketWrapper socket { get; set; }
		public EndPoint remoteEndPoint { get; set; }
		public INetSession session { get; }
		public int recvBufSize { get; set; }
		public long activeTime { get; set; }

		public WSConnection( INetSession session )
		{
			this.session = session;
		}

		public void Dispose()
		{
			throw new System.NotImplementedException();
		}

		public void Close()
		{
			if ( this.socket == null )
				return;
			this.socket.Close();
			this.socket = null;
		}

		public bool StartReceive()
		{
			throw new System.NotImplementedException();
		}

		public bool Send( byte[] data, int offset, int size )
		{
			throw new System.NotImplementedException();
		}

		public void SendPingTimeout()
		{
			throw new System.NotImplementedException();
		}

		public void Update( UpdateContext updateContext )
		{
			throw new System.NotImplementedException();
		}

		public void OnHeartBeat( long dt )
		{
			throw new System.NotImplementedException();
		}
	}
}