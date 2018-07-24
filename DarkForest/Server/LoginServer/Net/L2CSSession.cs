using Core.Misc;
using Core.Net;
using Google.Protobuf;
using Shared;
using Shared.Net;

namespace LoginServer.Net
{
	public class L2CSSession : CliSession
	{
		private L2CSSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( ( int )Protos.MsgID.Cs2LsGsinfos, this.OnCs2LsGsinfos );
			this._msgCenter.Register( ( int )Protos.MsgID.Cs2LsNewGsinfo, this.OnCs2LsNewGsinfo );
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

		private ErrorCode OnCs2LsGsinfos( byte[] data, int offset, int size, int msgid )
		{
			Protos.CS2LS.GSInfos gsInfos = new Protos.CS2LS.GSInfos();
			gsInfos.MergeFrom( data, offset, size );
			foreach ( Protos.GS2CS.GSInfo gsInfo in gsInfos.GsInfo )
				LS.instance.GCStateReportHandler( this.id, gsInfo );
			return ErrorCode.Success;
		}

		private ErrorCode OnCs2LsNewGsinfo( byte[] data, int offset, int size, int msgid )
		{
			Protos.CS2LS.NewGSInfo gsInfo = new Protos.CS2LS.NewGSInfo();
			gsInfo.MergeFrom( data, offset, size );
			return LS.instance.GCStateReportHandler( this.id, gsInfo.GsInfo );
		}
	}
}