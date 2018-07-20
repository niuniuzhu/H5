using Core.Misc;
using Core.Net;
using Shared.Net;

namespace LoginServer.Net
{
	public class BalanceSession : SrvCliSession
	{
		protected BalanceSession( uint id, ProtoType type ) : base( id, type )
		{
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"BS({this.logicID}) connected." );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"BS({this.logicID}) disconnected with msg:{reason}." );
		}
	}
}