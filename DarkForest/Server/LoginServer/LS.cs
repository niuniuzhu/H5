using System.Collections.Generic;
using System.IO;
using Core.Misc;
using Core.Net;
using LoginServer.Net;
using Newtonsoft.Json;
using Shared;
using Shared.Net;

namespace LoginServer
{
	public partial class LS
	{
		private static LS _instance;
		public static LS instance => _instance ?? ( _instance = new LS() );

		public LSNetSessionMgr netSessionMgr { get; } = new LSNetSessionMgr();
		public LSConfig config { get; private set; }

		private readonly Dictionary<uint, GSInfo> _gsInfos = new Dictionary<uint, GSInfo>();

		public ErrorCode Initialize( Options opts )
		{
			if ( string.IsNullOrEmpty( opts.cfg ) )
			{
				this.config = new LSConfig
				{
					cliPort = opts.cliPort,
					csIP = opts.csIP,
					csPort = opts.csPort
				};
			}
			else
				this.config = JsonConvert.DeserializeObject<LSConfig>( File.ReadAllText( opts.cfg ) );
			if ( this.config != null )
				Logger.Info( "LS Initialize success" );
			return ErrorCode.Success;
		}

		public ErrorCode Start()
		{
			WSListener cliListener = ( WSListener )this.netSessionMgr.CreateListener( 0, 65535, ProtoType.WebSocket, this.netSessionMgr.CreateClientSession );
			cliListener.Start( "ws", this.config.cliPort );

			this.netSessionMgr.CreateConnector<L2CSSession>( SessionType.ServerL2CS, this.config.csIP, this.config.csPort, ProtoType.TCP, 65535, 0 );
			return ErrorCode.Success;
		}

		public void Update( long elapsed, long dt )
		{
			this.netSessionMgr.Update();
			NetworkMgr.instance.Update( elapsed, dt );
		}
	}
}