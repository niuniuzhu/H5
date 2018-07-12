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

		public override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"BS({this.logicID}) Connected." );
		}

		protected override void OnClose()
		{
			base.OnClose();
			Logger.Info( $"BS({this.logicID}) DisConnected." );
		}
	}
}