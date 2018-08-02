using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;
using System.Collections.Generic;

namespace LoginServer.Net
{
	public class ClientSession : SrvCliSession
	{
		protected ClientSession( uint id, ProtoType type ) : base( id, type )
		{
			//完整登陆流程:
			//1,客户端连接LS,请求登陆
			//2,LS下发BS列表
			//3,客户端连接BS,请求登陆
			//4,BS请求LS验证登陆合法性
			//5,LS返回验证结果
			//6,BS处理结果,不合法则断开连接,合法则找出空闲GS,发送登陆信息
			//7,GS回应BS客户端已登陆
			//8,BS通知客户端GS地址
			//9,客户端连接GS
			//10,GS把登陆信息转发到CS
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
			this.owner.Send( this.id, response );
			return ErrorCode.Success;
		}

		private ErrorCode OnGCtoLSAskLogin( Google.Protobuf.IMessage message )
		{
			Protos.GC2LS_AskLogin login = ( Protos.GC2LS_AskLogin )message;

			ulong sessionID = 0;
			ErrorCode loginError = LS.instance.userMgr.RequestLogin( login, ref sessionID );

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
			this.owner.Send( this.id, response );
			this.Close( string.Empty );
			return ErrorCode.Success;
		}
	}
}