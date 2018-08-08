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
			ErrorCode regError = LS.instance.RegisterAccount( register );

			Protos.LS2GC_AskRegRet regRet = ProtoCreator.R_GC2LS_AskRegister( register.Opts.Pid );
			switch ( regError )
			{
				case ErrorCode.Success:
					regRet.Result = Protos.LS2GC_AskRegRet.Types.EResult.Success;
					break;
				case ErrorCode.UsernameExists:
					regRet.Result = Protos.LS2GC_AskRegRet.Types.EResult.UnameExists;
					break;
				case ErrorCode.InvalidUname:
					regRet.Result = Protos.LS2GC_AskRegRet.Types.EResult.UnameIllegal;
					break;
				case ErrorCode.InvalidPwd:
					regRet.Result = Protos.LS2GC_AskRegRet.Types.EResult.PwdIllegal;
					break;
				default:
					regRet.Result = Protos.LS2GC_AskRegRet.Types.EResult.Failed;
					break;
			}
			this.Send( regRet );
			return ErrorCode.Success;
		}

		private ErrorCode OnGCtoLSAskLogin( Google.Protobuf.IMessage message )
		{
			Protos.GC2LS_AskLogin login = ( Protos.GC2LS_AskLogin )message;

			ulong sessionID = 0;
			uint ukey = 0;
			ErrorCode loginError = LS.instance.RequestLogin( login, ref sessionID, ref ukey );

			switch ( loginError )
			{
				case ErrorCode.Success:
					//通知cs客户端登陆成功
					Protos.LS2CS_GCLogin gcLogin = ProtoCreator.Q_LS2CS_GCLogin();
					gcLogin.SessionID = sessionID;
					gcLogin.Ukey = ukey;
					this.owner.Send( SessionType.ServerL2CS, gcLogin, m =>
					{
						Protos.CS2LS_GCLoginRet gcLoginRet = ( Protos.CS2LS_GCLoginRet )m;

						Protos.LS2GC_AskLoginRet loginRet = ProtoCreator.R_GC2LS_AskLogin( login.Opts.Pid );
						loginRet.Result = ( Protos.LS2GC_AskLoginRet.Types.EResult )gcLoginRet.Result;
						if ( loginRet.Result == Protos.LS2GC_AskLoginRet.Types.EResult.Success )
						{
							loginRet.SessionID = sessionID;
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
								loginRet.GsInfos.Add( gsInfo );
							}
							Logger.Log( $"client:{login.Name}, sid:{sessionID} login success" );
						}
						else
							Logger.Log( $"client:{login.Name} login failed" );
						this.Send( loginRet );
					} );
					break;

				default:
					{
						Protos.LS2GC_AskLoginRet loginRet = ProtoCreator.R_GC2LS_AskLogin( login.Opts.Pid );
						loginRet.Result = ( Protos.LS2GC_AskLoginRet.Types.EResult )loginError;
						this.Send( loginRet );
					}
					break;
			}
			return ErrorCode.Success;
		}
	}
}