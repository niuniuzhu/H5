using Core.Misc;
using Core.Net;
using Google.Protobuf;
using Shared;
using Shared.Net;

namespace GateServer.Net
{
	public class ClientSession : SrvCliSession
	{
		protected ClientSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.EGc2GsAskLogin, this.OnGc2GsAskLogin );
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

		private ErrorCode OnGc2GsAskLogin( IMessage message )
		{
			Protos.GC2GS_AskLogin login = ( Protos.GC2GS_AskLogin )message;
			Protos.GS2CS_GCAskLogin gcAskLogin = ProtoCreator.Q_GS2CS_GCAskLogin();
			gcAskLogin.SessionID = login.SessionID;
			this.owner.Send( SessionType.ServerG2CS, gcAskLogin, msgRet =>
			{
				Protos.GS2GC_LoginResult gsLoginRet = ProtoCreator.Q_GS2GC_LoginResult();
				Protos.CS2GS_GCLoginRet csLoginRet = ( Protos.CS2GS_GCLoginRet )msgRet;
				switch ( csLoginRet.Result )
				{
					case Protos.CS2GS_GCLoginRet.Types.EResult.Success:
						gsLoginRet.Result = Protos.GS2GC_LoginResult.Types.EResult.Success;
						break;
					case Protos.CS2GS_GCLoginRet.Types.EResult.Failed:
						gsLoginRet.Result = Protos.GS2GC_LoginResult.Types.EResult.Failed;
						break;
				}
				this.Send( gsLoginRet );
			} );
			return ErrorCode.Success;
		}
	}
}