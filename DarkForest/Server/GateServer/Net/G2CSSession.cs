using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace GateServer.Net
{
	public class G2CSSession : CliSession
	{
		private long _lastReportTime;

		private G2CSSession( uint id, ProtoType type ) : base( id, type )
		{
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"CS({this.logicID}) connected." );

			this._lastReportTime = 0;
			GS.instance.ReportStateToCS();
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"CS({this.logicID}) disconnected with msg:{reason}." );
		}

		protected override void OnHeartBeat( long dt )
		{
			base.OnHeartBeat( dt );
			this._lastReportTime += dt;
			if ( this._state == State.Connected && this._lastReportTime >= Consts.GS_REPORT_INTERVAL )
			{
				this._lastReportTime = 0;
				GS.instance.ReportStateToCS();
			}
		}
	}
}