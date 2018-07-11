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

		protected override void OnRealEstablish()
		{
			Logger.Info( $"BS({this.logicID}) Connected." );
		}

		protected override void OnClose()
		{
			Logger.Info( $"BS({this.logicID}) DisConnected." );
		}
	}
}