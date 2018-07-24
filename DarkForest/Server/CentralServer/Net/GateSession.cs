using Core.Misc;
using Core.Net;
using Google.Protobuf;
using Shared;
using Shared.Net;

namespace CentralServer.Net
{
	public class GateSession : SrvCliSession
	{
		protected GateSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( ( int )Protos.MsgID.GctoLsAskRegister, this.OnGCtoLSAskRegister );
			this._msgCenter.Register( ( int )Protos.MsgID.GctoLsAskLogin, this.OnGCtoLSAskLogin );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"GS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"GS({this.id}) disconnected with msg:{reason}" );
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