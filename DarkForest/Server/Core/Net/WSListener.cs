using Core.Misc;
using System;
using System.Collections.Generic;
using System.Net.Sockets;

namespace Core.Net
{
	public class WSListener : TCPListener
	{
		private Uri _uri = new Uri( "ws://0.0.0.0:0" );
		private readonly HashSet<string> _subProtocols = new HashSet<string>();

		public WSListener( uint id ) : base( id )
		{
		}

		public void AddSubProtocol( string protocol ) => this._subProtocols.Add( protocol );

		public bool Start( Uri uri, bool reuseAddr = true )
		{
			this._uri = uri;
			return this.Start( uri.Port, reuseAddr );
		}

		protected override INetSession CreateSession( Socket acceptSocket )
		{
			//调用委托创建session
			INetSession session = this.sessionCreater( ProtoType.WebSocket );
			if ( session == null )
			{
				Logger.Error( "create session failed" );
				this.Close( acceptSocket );
				return null;
			}
			session.isPassive = true;
			WSConnection wsConnection = ( WSConnection )session.connection;
			wsConnection.activeTime = TimeUtils.utcTime;
			wsConnection.scheme = this._uri.Scheme;
			wsConnection.subProtocols = this._subProtocols;
			wsConnection.socket = new SocketWrapper( acceptSocket );
			wsConnection.remoteEndPoint = acceptSocket.RemoteEndPoint;
			wsConnection.packetEncodeHandler = this.packetEncodeHandler;
			wsConnection.packetDecodeHandler = this.packetDecodeHandler;
			wsConnection.recvBufSize = this.recvBufSize;
			return session;
		}
	}
}