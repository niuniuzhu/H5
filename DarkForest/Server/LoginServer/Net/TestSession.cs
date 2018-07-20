using Core.Misc;
using Core.Net;
using Shared.Net;

namespace LoginServer.Net
{
	public class TestSession : CliSession
	{
		private TestSession( uint id, ProtoType type ) : base( id, type )
		{
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"Test({this.logicID}) connected." );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"Test({this.logicID}) disconnected with msg:{reason}." );
		}
	}
}