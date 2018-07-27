using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace LoginServer.Net
{
	public class L2CSSession : CliSession
	{
		private L2CSSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.ECs2LsGsinfos, this.OnCs2LsGsinfos );
			this._msgCenter.Register( Protos.MsgID.ECs2LsGsinfo, this.OnCs2LsGsinfo );
			this._msgCenter.Register( Protos.MsgID.ECs2LsGslost, this.OnCs2LsGslost );
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

		private ErrorCode OnCs2LsGsinfos( Google.Protobuf.IMessage message )
		{
			Protos.CS2LS_GSInfos gsInfos = ( Protos.CS2LS_GSInfos )message;
			foreach ( Protos.GSInfo gsInfo in gsInfos.GsInfo )
				LS.instance.GCStateReportHandler( gsInfo );
			return ErrorCode.Success;
		}

		private ErrorCode OnCs2LsGsinfo( Google.Protobuf.IMessage message )
		{
			Protos.CS2LS_GSInfo gsInfo = ( Protos.CS2LS_GSInfo )message;
			return LS.instance.GCStateReportHandler( gsInfo.GsInfo );
		}

		private ErrorCode OnCs2LsGslost( Google.Protobuf.IMessage message )
		{
			Protos.CS2LS_GSLost gsLost = ( Protos.CS2LS_GSLost )message;
			return LS.instance.GSLostHandler( gsLost.Gsid );
		}
	}
}