using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;
using System.Collections.Generic;
using GSInfo = Shared.GSInfo;

namespace LoginServer.Net
{
	public class ClientSession : SrvCliSession
	{
		protected ClientSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.EGc2LsAskRegister, this.OnGCtoLSAskRegister );
			this._msgCenter.Register( Protos.MsgID.EGc2LsAskLogin, this.OnGCtoLSAskLogin );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"client({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"client({this.id}) disconnected with msg:{reason}" );
		}

		private ErrorCode OnGCtoLSAskRegister( Google.Protobuf.IMessage message )
		{
			Protos.GC2LS_AskRegister register = ( Protos.GC2LS_AskRegister )message;
			ErrorCode regError = LS.instance.userMgr.RegisterAccount( register );

			Protos.LS2GC_RegResult response = ProtoCreator.R_GC2LS_AskRegister( register.Opts.Pid );
			switch ( regError )
			{
				case ErrorCode.Success:
					response.Result = Protos.LS2GC_RegResult.Types.EResult.Success;
					break;
				case ErrorCode.UsernameExists:
					response.Result = Protos.LS2GC_RegResult.Types.EResult.UnameExists;
					break;
				case ErrorCode.InvalidUname:
					response.Result = Protos.LS2GC_RegResult.Types.EResult.UnameIllegal;
					break;
				case ErrorCode.InvalidPwd:
					response.Result = Protos.LS2GC_RegResult.Types.EResult.PwdIllegal;
					break;
				default:
					response.Result = Protos.LS2GC_RegResult.Types.EResult.Failed;
					break;
			}
			this.Send( response );
			return ErrorCode.Success;
		}

		private ErrorCode OnGCtoLSAskLogin( Google.Protobuf.IMessage message )
		{
			Protos.GC2LS_AskLogin login = ( Protos.GC2LS_AskLogin )message;

			ulong sessionID = 0;
			ErrorCode loginError = LS.instance.userMgr.RequestLogin( login, ref sessionID );

			Protos.LS2CS_GCLogin gcLogin = ProtoCreator.Q_LS2CS_GCLogin();
			gcLogin.SessionID = sessionID;
			this.owner.Send( SessionType.ServerL2CS, gcLogin, _ =>
			{
				Protos.LS2GC_LoginResult response = ProtoCreator.R_GC2LS_AskLogin( login.Opts.Pid );
				switch ( loginError )
				{
					case ErrorCode.Success:
						response.Result = Protos.LS2GC_LoginResult.Types.EResult.Success;
						response.SessionID = sessionID;
						foreach ( KeyValuePair<uint, GSInfo> kv in LS.instance.gsInfos )
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
							response.GsInfos.Add( gsInfo );
						}
						break;
					case ErrorCode.InvalidUname:
						response.Result = Protos.LS2GC_LoginResult.Types.EResult.InvalidUname;
						break;
					case ErrorCode.InvalidPwd:
						response.Result = Protos.LS2GC_LoginResult.Types.EResult.InvalidPwd;
						break;
					default:
						response.Result = Protos.LS2GC_LoginResult.Types.EResult.Failed;
						break;
				}
				this.Send( response );
			} );
			this.Close( string.Empty );
			return ErrorCode.Success;
		}
	}
}