using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace CentralServer.Net
{
	public class LoginSession : SrvCliSession
	{
		protected LoginSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.EGAskPing, this.OnLSAskPing );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"LS({this.id}) connected" );
			CS.instance.NotifyGSInfosToLS( this.id );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"LS({this.id}) disconnected with msg:{reason}" );
		}

		private ErrorCode OnLSAskPing( Google.Protobuf.IMessage message )
		{
			Protos.G_AskPing askPing = ( Protos.G_AskPing )message;
			Protos.G_AskPingRet askPingRet = ProtoCreator.R_G_AskPing( askPing.Opts.Pid );
			askPingRet.Stime = askPing.Time;
			askPingRet.Time = TimeUtils.utcTime;
			this.Send( askPingRet );
			return ErrorCode.Success;
		}
	}
}