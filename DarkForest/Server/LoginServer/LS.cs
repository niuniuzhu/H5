using Core.Misc;
using Core.Net;
using LoginServer.Net;
using Shared;
using Shared.Net;

namespace LoginServer
{
	public class LS
	{
		private static LS _instance;
		public static LS instance => _instance ?? ( _instance = new LS() );

		public LSNetSessionMgr netSessionMgr { get; }
		public LSConfig lsConfig { get; }

		private LS()
		{
			this.lsConfig = new LSConfig();
			this.netSessionMgr = new LSNetSessionMgr();
		}

		public void Dispose()
		{
		}

		public ErrorCode Initialize()
		{
			ErrorCode errorCode = this.lsConfig.Load();
			if ( ErrorCode.Success == errorCode )
				Logger.Info( "LS Initialize success" );
			return errorCode;
		}

		public ErrorCode Start()
		{
			WSListener bsListener = ( WSListener )this.netSessionMgr.CreateListener( 0, 65535, ProtoType.WebSocket, this.netSessionMgr.CreateBlanceSession );
			bsListener.Start( "ws", this.lsConfig.bs_listen_port );
			//this.netSessionMgr.CreateListener( 1, this.lsConfig.client_listen_port, 65535, Consts.PROTOCOL_TYPE,
			//								   this.netSessionMgr.CreateClientSession );
			//bool connector = this.netSessionMgr.CreateConnector<TestSession>( SessionType.ClientB2L, "127.0.0.1",
			//													 this.lsConfig.bs_listen_port, ProtoType.KCP, 65535, 0 );
			return ErrorCode.Success;
		}

		public void Update( long elapsed, long dt )
		{
			this.netSessionMgr.Update();
			NetworkMgr.instance.Update( elapsed, dt );
		}
	}
}