using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

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
			Logger.Log( $"client:{register.Name} ask for register" );

			Protos.LS2CS_AskRegister gcAskReg = ProtoCreator.Q_LS2CS_AskRegister();
			gcAskReg.Name = register.Name;
			gcAskReg.Passwd = register.Passwd;
			gcAskReg.Platform = register.Platform;
			gcAskReg.Sdk = register.Sdk;
			this.owner.Send( SessionType.ServerL2CS, gcAskReg, m =>
			{
				Protos.CS2LS_GCAskRegRet csRegRet = ( Protos.CS2LS_GCAskRegRet )m;
				Protos.LS2GC_AskRegRet gcRegRet = ProtoCreator.R_GC2LS_AskRegister( register.Opts.Pid );
				gcRegRet.Result = ( Protos.LS2GC_AskRegRet.Types.EResult )csRegRet.Result;
				Logger.Log( $"client:{register.Name} register result:{gcRegRet.Result}" );
				this.Send( gcRegRet );
				this.DelayClose( 500, $"client:{register.Name} ask register complete" );
			} );
			return ErrorCode.Success;
		}

		private ErrorCode OnGCtoLSAskLogin( Google.Protobuf.IMessage message )
		{
			Protos.GC2LS_AskLogin login = ( Protos.GC2LS_AskLogin )message;
			Logger.Log( $"client:{login.Name} ask for login" );

			Protos.LS2CS_GCAskLogin gcLogin = ProtoCreator.Q_LS2CS_GCAskLogin();
			gcLogin.Name = login.Name;
			gcLogin.Passwd = login.Passwd;
			this.owner.Send( SessionType.ServerL2CS, gcLogin, m =>
			{
				Protos.CS2LS_GCAskLoginRet csLoginRet = ( Protos.CS2LS_GCAskLoginRet )m;
				Protos.LS2GC_AskLoginRet gcLoginRet = ProtoCreator.R_GC2LS_AskLogin( login.Opts.Pid );
				gcLoginRet.GsInfos.AddRange( csLoginRet.GsInfos );
				gcLoginRet.Result = ( Protos.LS2GC_AskLoginRet.Types.EResult )csLoginRet.Result;
				gcLoginRet.SessionID = csLoginRet.SessionID;
				Logger.Log( $"client:{gcLogin.Name} login result:{gcLoginRet.Result}, sid:{gcLoginRet.SessionID}" );
				this.Send( gcLoginRet );
				this.DelayClose( 500, $"client:{login.Name} ask login complete" );
			} );
			return ErrorCode.Success;
		}
	}
}