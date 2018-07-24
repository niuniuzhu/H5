using Core.Misc;
using Core.Net;
using Google.Protobuf;
using Shared;
using Shared.Net;

namespace CentralServer.Net
{
	public class GateSession : SrvCliSession
	{
		protected GateSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( ( int )Protos.MsgID.Gs2CsReportState, this.OnGs2CsReportState );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"GS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"GS({this.id}) disconnected with msg:{reason}" );
		}

		private ErrorCode OnGs2CsReportState( byte[] data, int offset, int size, int msgid )
		{
			Protos.GS2CS.ReportState reportState = new Protos.GS2CS.ReportState();
			reportState.MergeFrom( data, offset, size );

			return CS.instance.GCStateReportHandler( this.id, reportState.GsInfo );
		}
	}
}