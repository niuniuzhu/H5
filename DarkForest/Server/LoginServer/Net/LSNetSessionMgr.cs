﻿using Core.Net;
using Shared.Net;

namespace LoginServer.Net
{
	public class LSNetSessionMgr : NetSessionMgr
	{
		public INetSession CreateClientSession( ProtoType type )
		{
			ClientSession session = NetSessionPool.instance.Pop<ClientSession>( type );
			session.owner = this;
			session.type = SessionType.ServerGC;
			return session;
		}
	}
}