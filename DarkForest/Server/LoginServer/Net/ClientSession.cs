using Core.Misc;
using Core.Net;
using Google.Protobuf;
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
			this._msgCenter.Register( ( int )Protos.MsgID.GctoLsAskRegister, this.OnGCtoLSAskRegister );
			this._msgCenter.Register( ( int )Protos.MsgID.GctoLsAskLogin, this.OnGCtoLSAskLogin );
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
			Protos.GCToLS.AskRegister login = new Protos.GCToLS.AskRegister();
			login.MergeFrom( data, offset, size );

			Logger.Log( "ask register" );

			return ErrorCode.Success;
		}

		private ErrorCode OnGCtoLSAskLogin( byte[] data, int offset, int size, int msgid )
		{
			Protos.GCToLS.AskLogin login = new Protos.GCToLS.AskLogin();
			login.MergeFrom( data, offset, size );

			Logger.Log( "ask login" );

			return ErrorCode.Success;
		}
	}
}