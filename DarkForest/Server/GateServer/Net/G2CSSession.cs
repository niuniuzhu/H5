using Core.Misc;
using Core.Net;
using Shared.Net;

namespace GateServer.Net
{
	public class G2CSSession : CliSession
	{
		private G2CSSession( uint id, ProtoType type ) : base( id, type )
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