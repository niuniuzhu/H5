using Core.Misc;
using Core.Net;
using Shared.Net;

namespace LoginServer.Net
{
	public class L2CSSession : CliSession
	{
		private L2CSSession( uint id, ProtoType type ) : base( id, type )
		{
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"CS({this.logicID}) connected." );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"CS({this.logicID}) disconnected with msg:{reason}." );
		}
	}
}