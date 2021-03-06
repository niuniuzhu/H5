﻿using System.Net;
using System.Net.Sockets;

namespace Core.Net
{
	public class SocketWrapper
	{
		private Socket _socket;

		public bool Connected => this._socket?.Connected ?? false;

		public SocketWrapper( Socket socket ) => this._socket = socket;

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

		public void Close() => this._socket?.Close();

		public void Release() => this._socket = null;
	}
}