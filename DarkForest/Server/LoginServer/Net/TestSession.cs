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

		public override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"Test({this.logicID}) Connected." );
		}

		protected override void OnClose()
		{
			base.OnClose();
			Logger.Info( $"Test({this.logicID}) DisConnected." );
		}
	}
}