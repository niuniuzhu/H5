using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;
using System.Collections.Generic;
using GSInfo = Shared.GSInfo;

namespace CentralServer.Net
{
	public class LoginSession : SrvCliSession
	{
		protected LoginSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.EGAskPing, this.OnLSAskPing );
			this._msgCenter.Register( Protos.MsgID.ELs2CsAskRegister, this.OnLs2CsAskRegister );
			this._msgCenter.Register( Protos.MsgID.ELs2CsGcaskLogin, this.OnLs2CsGcaskLogin );
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

		private ErrorCode OnLs2CsAskRegister( Google.Protobuf.IMessage message )
		{
			Protos.LS2CS_AskRegister register = ( Protos.LS2CS_AskRegister )message;
			ErrorCode regError = CS.instance.userMgr.RegisterAccount( register );

			Protos.CS2LS_GCAskRegRet regRet = ProtoCreator.R_LS2CS_AskRegister( register.Opts.Pid );
			switch ( regError )
			{
				case ErrorCode.Success:
					regRet.Result = Protos.CS2LS_GCAskRegRet.Types.EResult.Success;
					break;
				case ErrorCode.UsernameExists:
					regRet.Result = Protos.CS2LS_GCAskRegRet.Types.EResult.UnameExists;
					break;
				case ErrorCode.InvalidUname:
					regRet.Result = Protos.CS2LS_GCAskRegRet.Types.EResult.UnameIllegal;
					break;
				case ErrorCode.InvalidPwd:
					regRet.Result = Protos.CS2LS_GCAskRegRet.Types.EResult.PwdIllegal;
					break;
				default:
					regRet.Result = Protos.CS2LS_GCAskRegRet.Types.EResult.Failed;
					break;
			}
			this.Send( regRet );
			return ErrorCode.Success;
		}

		private ErrorCode OnLs2CsGcaskLogin( Google.Protobuf.IMessage message )
		{
			Protos.LS2CS_GCAskLogin login = ( Protos.LS2CS_GCAskLogin )message;

			ulong sessionID = 0;
			ErrorCode loginError = CS.instance.userMgr.RequestLogin( login, ref sessionID );

			Protos.CS2LS_GCAskLoginRet loginRet = ProtoCreator.R_LS2CS_GCAskLogin( login.Opts.Pid );
			switch ( loginError )
			{
				case ErrorCode.Success:
					loginRet.Result = Protos.CS2LS_GCAskLoginRet.Types.EResult.Success;
					loginRet.SessionID = sessionID;
					foreach ( KeyValuePair<uint, GSInfo> kv in CS.instance.gsNIDToGSInfos )
					{
						GSInfo info = kv.Value;
						Protos.GSInfo gsInfo = new Protos.GSInfo
						{
							Name = info.name,
							Ip = info.ip,
							Port = info.port,
							Password = info.password,
							State = ( Protos.GSInfo.Types.State )info.state
						};
						loginRet.GsInfos.Add( gsInfo );
					}
					Logger.Log( $"client:{login.Name}, sid:{sessionID} login success" );
					break;
				case ErrorCode.InvalidUname:
					loginRet.Result = Protos.CS2LS_GCAskLoginRet.Types.EResult.InvalidUname;
					break;
				case ErrorCode.InvalidPwd:
					loginRet.Result = Protos.CS2LS_GCAskLoginRet.Types.EResult.InvalidPwd;
					break;
				default:
					loginRet.Result = Protos.CS2LS_GCAskLoginRet.Types.EResult.Failed;
					break;
			}
			this.Send( loginRet );
			return ErrorCode.Success;
		}
	}
}