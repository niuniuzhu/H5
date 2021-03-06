﻿using Core.Misc;
using System;
using System.Net;
using System.Net.Sockets;

namespace Core.Net
{
	public class TCPListener : IListener
	{
		public uint id { get; }
		public SessionCreater sessionCreater { get; set; }

		public int recvBufSize { get; set; } = 10240;

		public bool noDelay
		{
			get => this._socket.NoDelay;
			set => this._socket.NoDelay = value;
		}

		private Socket _socket;

		public TCPListener( uint id ) => this.id = id;

		public void Dispose() => this.Stop();

		public void SetOpt( SocketOptionLevel optionLevel, SocketOptionName optionName, object opt ) => this._socket.SetSocketOption( optionLevel, optionName, opt );

		public bool Start( int port )
		{
			Logger.Log( $"Start Listen {port}" );
			try
			{
				this._socket = new Socket( AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp );
			}
			catch ( SocketException e )
			{
				Logger.Error( $"create socket error, code:{e.SocketErrorCode}" );
				return false;
			}
			this.noDelay = true;
			try
			{
				this._socket.Bind( new IPEndPoint( IPAddress.Any, port ) );
			}
			catch ( SocketException e )
			{
				Logger.Error( $"socket bind at {port} fail, code:{e.SocketErrorCode}" );
				return false;
			}
			try
			{
				this._socket.Listen( 128 );
			}
			catch ( SocketException e )
			{
				Logger.Error( $"socket listen at {port} fail, code:{e.SocketErrorCode}" );
				return false;
			}
			this.StartAccept( null );
			return true;
		}

		public bool Stop()
		{
			if ( this._socket == null )
				return false;
			Socket socket = this._socket;
			this._socket = null;
			return this.Close( socket );
		}

		protected bool Close( Socket socket )
		{
			if ( socket == null )
				return false;
			if ( socket.Connected )
				socket.Shutdown( SocketShutdown.Both );
			socket.Close();
			return true;
		}

		private void StartAccept( SocketAsyncEventArgs acceptEventArgs )
		{
			if ( this._socket == null )
				return;

			if ( acceptEventArgs == null )
			{
				acceptEventArgs = new SocketAsyncEventArgs { RemoteEndPoint = new IPEndPoint( IPAddress.Any, 0 ) };
				acceptEventArgs.Completed += this.OnAcceptComplete;
			}
			else
				acceptEventArgs.AcceptSocket = null;

			bool asyncResult;
			try
			{
				asyncResult = this._socket.AcceptAsync( acceptEventArgs );
			}
			catch ( ObjectDisposedException )
			{
				return;
			}
			catch ( SocketException e )
			{
				Logger.Error( $"socket accept fail, code:{e.SocketErrorCode}" );
				this.Close( this._socket );
				return;
			}
			if ( !asyncResult )
				this.ProcessAccept( acceptEventArgs );
		}

		private void OnAcceptComplete( object sender, SocketAsyncEventArgs acceptEventArgs ) => this.ProcessAccept( acceptEventArgs );

		private void ProcessAccept( SocketAsyncEventArgs acceptEventArgs )
		{
			Socket acceptSocket = acceptEventArgs.AcceptSocket;
			do
			{
				if ( acceptEventArgs.SocketError != SocketError.Success )
				{
					//网络错误
					Logger.Error( $"process accept fail,code{acceptEventArgs.SocketError}" );
					this.Close( acceptSocket );
					break;
				}

				if ( this._socket == null )
				{
					this.Close( acceptSocket );
					break;
				}

				INetSession session = this.CreateSession( acceptSocket );
				if ( session == null )
					break;

				//开始接收数据
				session.connection.StartReceive();

			} while ( false );

			this.StartAccept( acceptEventArgs );
		}

		protected virtual INetSession CreateSession( Socket acceptSocket )
		{
			//调用委托创建session
			INetSession session = this.sessionCreater( ProtoType.TCP );
			if ( session == null )
			{
				Logger.Error( "create session failed" );
				this.Close( acceptSocket );
				return null;
			}
			session.isPassive = true;
			TCPConnection tcpConnection = ( TCPConnection )session.connection;
			tcpConnection.activeTime = TimeUtils.utcTime;
			tcpConnection.socket = new SocketWrapper( acceptSocket );
			tcpConnection.remoteEndPoint = acceptSocket.RemoteEndPoint;
			tcpConnection.recvBufSize = this.recvBufSize;

			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Establish;
			netEvent.session = session;
			NetworkMgr.instance.PushEvent( netEvent );

			return session;
		}
	}
}