using Core.Net;
using Shared.Net;

namespace CentralServer.Net
{
	public class CSNetSessionMgr : NetSessionMgr
	{
		public INetSession CreateLSSession( ProtoType type )
		{
			LoginSession session = NetSessionPool.instance.Pop<LoginSession>( type );
			session.owner = this;
			session.type = SessionType.ServerLS;
			return session;
		}

		public INetSession CreateGSSession( ProtoType type )
		{
			GateSession session = NetSessionPool.instance.Pop<GateSession>( type );
			session.owner = this;
			session.type = SessionType.ServerGS;
			return session;
		}
	}
}