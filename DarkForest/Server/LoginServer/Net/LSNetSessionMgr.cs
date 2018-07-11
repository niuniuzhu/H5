using Core.Net;
using Shared.Net;

namespace LoginServer.Net
{
	public class LSNetSessionMgr : NetSessionMgr
	{
		public INetSession CreateBlanceSession( ProtoType type )
		{
			BalanceSession session = NetSessionPool.instance.Pop<BalanceSession>( type );
			session.owner = this;
			session.type = SessionType.ServerLsOnlyBS;
			return session;
		}

		public INetSession CreateClientSession( ProtoType type )
		{
			ClientSession session = NetSessionPool.instance.Pop<ClientSession>( type );
			session.owner = this;
			session.type = SessionType.ServerLsOnlyGc;
			return session;
		}
	}
}