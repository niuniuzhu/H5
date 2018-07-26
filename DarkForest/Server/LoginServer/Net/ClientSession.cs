using Core.Misc;
using Core.Net;
using Google.Protobuf;
using Protos;
using Shared;
using Shared.Net;

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
			this._msgCenter.Register( ( int )Protos.MsgID.Gc2LsAskRegister, this.OnGCtoLSAskRegister );
			this._msgCenter.Register( ( int )Protos.MsgID.Gc2LsAskLogin, this.OnGCtoLSAskLogin );
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

		private ErrorCode OnGCtoLSAskRegister( byte[] data, int offset, int size, int msgid )
		{
			Protos.GC2LS.AskRegister register = new Protos.GC2LS.AskRegister();
			register.MergeFrom( data, offset, size );

			ErrorCode regError = LS.instance.userMgr.RegisterAccount( register );
			Protos.LS2GC.Result response = ProtoDesc.R_GC2LS_AskRegister();
			switch ( regError )
			{
				case ErrorCode.UsernameExists:
					response.Result_ = Protos.LS2GC.EResult.UsernameExists;
					break;
				case ErrorCode.IllegalName:
					response.Result_ = Protos.LS2GC.EResult.IllegalName;
					break;
				case ErrorCode.IllegalPasswd:
					response.Result_ = Protos.LS2GC.EResult.IllegalPasswd;
					break;
				default:
					response.Result_ = Protos.LS2GC.EResult.Failed;
					break;
			}
			this.owner.SendMsgToSession( this.id, response, ( int )response.GetMsgID() );

			return ErrorCode.Success;
		}

		private ErrorCode OnGCtoLSAskLogin( byte[] data, int offset, int size, int msgid )
		{
			Protos.GC2LS.AskLogin login = new Protos.GC2LS.AskLogin();
			login.MergeFrom( data, offset, size );

			Logger.Log( "ask login" );

			return ErrorCode.Success;
		}
	}
}