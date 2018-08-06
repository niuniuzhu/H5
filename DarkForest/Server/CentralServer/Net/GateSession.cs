﻿using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace CentralServer.Net
{
	public class GateSession : SrvCliSession
	{
		protected GateSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.EGAskPing, this.OnGSAskPing );
			this._msgCenter.Register( Protos.MsgID.EGs2CsReportState, this.OnGs2CsReportState );
			this._msgCenter.Register( Protos.MsgID.EGs2CsGcaskLogin, this.OnGs2CsGcaskLogin );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"GS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			CS.instance.GSDisconnectHandler( this.logicID );

			this.logicID = 0;

			base.OnClose( reason );
			Logger.Info( $"GS({this.id}) disconnected with msg:{reason}" );
		}

		private ErrorCode OnGSAskPing( Google.Protobuf.IMessage message )
		{
			Protos.G_AskPing askPing = ( Protos.G_AskPing )message;
			Protos.G_AskPingRet askPingRet = ProtoCreator.R_G_AskPing( askPing.Opts.Pid );
			askPingRet.Stime = askPing.Time;
			askPingRet.Time = TimeUtils.utcTime;
			this.Send( askPingRet );
			return ErrorCode.Success;
		}

		private ErrorCode OnGs2CsReportState( Google.Protobuf.IMessage message )
		{
			Protos.GS2CS_ReportState reportState = ( Protos.GS2CS_ReportState )message;
			this.logicID = reportState.GsInfo.Id;
			return CS.instance.GCStateReportHandler( reportState.GsInfo );
		}

		private ErrorCode OnGs2CsGcaskLogin( Google.Protobuf.IMessage message )
		{
			Protos.GS2CS_GCAskLogin gcAskLogin = ( Protos.GS2CS_GCAskLogin )message;
			ErrorCode errorCode = CS.instance.HandleGCAskLoginFromGS( gcAskLogin.SessionID, this.id );
			Protos.CS2GS_GCLoginRet gcAskLoginRet = ProtoCreator.R_GS2CS_GCAskLogin( gcAskLogin.Opts.Pid );
			switch ( errorCode )
			{
				case ErrorCode.Success:
					gcAskLoginRet.Result = Protos.CS2GS_GCLoginRet.Types.EResult.Success;
					break;

				default:
					Logger.Warn( $"an invalid gcSid:{gcAskLogin.SessionID} try to login with remote address:{this.connection.remoteEndPoint}." );
					gcAskLoginRet.Result = Protos.CS2GS_GCLoginRet.Types.EResult.Failed;
					break;
			}
			this.Send( gcAskLoginRet );
			return ErrorCode.Success;
		}
	}
}