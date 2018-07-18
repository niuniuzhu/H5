using Fleck;
using System;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace Core.Net
{
	public class SocketWrapper
	{
		private Socket _socket;
		private IWebSocketConnection _wsServer;

		public bool Connected => this._socket?.Connected ?? this._wsServer.IsAvailable;

		Action<byte[]> OnBinary { get => this._wsServer.OnBinary; set => this._wsServer.OnBinary = value; }

		private Action<Exception> OnError { get => this._wsServer.OnError; set => this._wsServer.OnError = value; }

		public SocketWrapper( Socket socket ) => this._socket = socket;

		public SocketWrapper( IWebSocketConnection wsConnection ) => this._wsServer = wsConnection;

		public void SetSocketOption( SocketOptionLevel optionLevel, SocketOptionName optionName, object optionValue ) =>
			this._socket.SetSocketOption( optionLevel, optionName, optionValue );

		public bool SendAsync( SocketAsyncEventArgs e ) => this._socket.SendAsync( e );

		public int Send( byte[] buffer, int offset, int size, SocketFlags socketFlags ) => this._socket.Send( buffer, offset, size, socketFlags );

		public bool ReceiveAsync( SocketAsyncEventArgs e ) => this._socket.ReceiveAsync( e );

		public bool SendToAsync( SocketAsyncEventArgs e ) => this._socket.SendToAsync( e );

		public int SendTo( byte[] buffer, int offset, int size, SocketFlags socketFlags, EndPoint remoteEP ) =>
			this._socket.SendTo( buffer, offset, size, socketFlags, remoteEP );

		public bool ReceiveFromAsync( SocketAsyncEventArgs e ) => this._socket.ReceiveFromAsync( e );

		public void Shutdown( SocketShutdown how ) => this._socket.Shutdown( how );

		Task Send( string message ) => this._wsServer.Send( message );

		Task Send( byte[] message ) => this._wsServer.Send( message );

		public void Close()
		{
			this._socket?.Close();
			this._wsServer?.Close();
		}

		public void Release()
		{
			this._socket = null;
			this._wsServer = null;
		}
	}
}