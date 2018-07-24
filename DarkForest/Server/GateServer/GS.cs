using Core.Misc;
using Core.Net;
using GateServer.Net;
using Newtonsoft.Json;
using Shared;
using Shared.Net;
using System.IO;

namespace GateServer
{
	public class GS
	{
		private static GS _instance;
		public static GS instance => _instance ?? ( _instance = new GS() );

		public GSNetSessionMgr netSessionMgr { get; }
		public GSConfig config { get; private set; }

		private GS()
		{
			this.netSessionMgr = new GSNetSessionMgr();
		}

		public void Dispose()
		{
		}

		public ErrorCode Initialize()
		{
			this.config = JsonConvert.DeserializeObject<GSConfig>( File.ReadAllText( @".\Config\GSCfg.json" ) );
			if ( this.config != null )
				Logger.Info( "GS Initialize success" );
			return ErrorCode.Success;
		}

		public ErrorCode Start()
		{
			WSListener cliListener = ( WSListener )this.netSessionMgr.CreateListener( 0, 65535, ProtoType.WebSocket, this.netSessionMgr.CreateClientSession );
			cliListener.Start( "ws", this.config.clientListenPort );

			this.netSessionMgr.CreateConnector<G2CSSession>( SessionType.ServerL2CS, this.config.csIP, this.config.csPort, ProtoType.TCP, 65535, 0 );
			return ErrorCode.Success;
		}

		public void Update( long elapsed, long dt )
		{
			this.netSessionMgr.Update();
			NetworkMgr.instance.Update( elapsed, dt );
		}
	}
}