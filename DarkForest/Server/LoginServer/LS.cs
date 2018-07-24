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
		public LSConfig config { get; }

		private LS()
		{
			this.config = new LSConfig();
			this.netSessionMgr = new LSNetSessionMgr();
		}

		public void Dispose()
		{
		}

		public ErrorCode Initialize()
		{
			ErrorCode errorCode = this.config.Load();
			if ( ErrorCode.Success == errorCode )
				Logger.Info( "LS Initialize success" );
			return errorCode;
		}

		public ErrorCode Start()
		{
			WSListener bsListener =
				( WSListener )this.netSessionMgr.CreateListener( 0, 65535, ProtoType.WebSocket,
																  this.netSessionMgr.CreateBlanceSession );
			bsListener.Start( "ws", this.config.bsListenPort );

			WSListener cliListener =
				( WSListener )this.netSessionMgr.CreateListener( 1, 65535, ProtoType.WebSocket,
																  this.netSessionMgr.CreateClientSession );
			cliListener.Start( "ws", this.config.clientListenPort );

			this.netSessionMgr.CreateConnector<TestSession>( SessionType.ServerLSOnlyCS, this.config.csIp,
															 this.config.csPort, ProtoType.KCP, 65535, 0 );
			return ErrorCode.Success;
		}

		public void Update( long elapsed, long dt )
		{
			this.netSessionMgr.Update();
			NetworkMgr.instance.Update( elapsed, dt );
		}
	}
}