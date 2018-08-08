using Core.Misc;
using Core.Net;
using LoginServer.Net;
using Newtonsoft.Json;
using Shared;
using Shared.DB;
using Shared.Net;
using System.Collections.Generic;
using System.IO;

namespace LoginServer
{
	public partial class LS
	{
		private static LS _instance;
		public static LS instance => _instance ?? ( _instance = new LS() );

		public LSConfig config { get; private set; }
		public DBConfig dbConfig { get; private set; }

		public readonly RedisWrapper redisWrapper = new RedisWrapper();
		public readonly LSNetSessionMgr netSessionMgr = new LSNetSessionMgr();
		public readonly Dictionary<uint, GSInfo> gsInfos = new Dictionary<uint, GSInfo>();

		private readonly Dictionary<string, ulong> _userNameToGcNID = new Dictionary<string, ulong>();
		private readonly DBWrapper _accountDBWrapper = new DBWrapper();
		private readonly Scheduler _heartBeater = new Scheduler();

		public ErrorCode Initialize( Options opts )
		{
			if ( string.IsNullOrEmpty( opts.cfg ) )
			{
				this.config = new LSConfig();
				this.config.CopyFromCLIOptions( opts );
				return ErrorCode.Success;
			}
			try
			{
				this.config = JsonConvert.DeserializeObject<LSConfig>( File.ReadAllText( opts.cfg ) );
			}
			catch ( System.Exception e )
			{
				Logger.Error( e );
				return ErrorCode.CfgLoadFailed;
			}
			try
			{
				this.dbConfig = new DBConfig();
				this.dbConfig.Load( opts.dbCfg );
			}
			catch ( System.Exception e )
			{
				Logger.Error( e );
				return ErrorCode.DBCfgLoadFailed;
			}
			return ErrorCode.Success;
		}

		public ErrorCode Start()
		{
			this._heartBeater.Start( Consts.HEART_BEAT_INTERVAL, this.OnHeartBeat );
			( ( WSListener )this.netSessionMgr.CreateListener( 0, 65535, ProtoType.WebSocket, this.netSessionMgr.CreateClientSession ) ).Start( "ws", this.config.cliPort );
			this.netSessionMgr.CreateConnector<L2CSSession>( SessionType.ServerL2CS, this.config.csIP, this.config.csPort, ProtoType.TCP, 65535, 0 );
			this.redisWrapper.Connect( this.config.redisIP, this.config.redisPort, this.config.redisPwd );
			DBConfig.DBCfg dbCfg = this.dbConfig[DBConfig.DBType.Account];
			this._accountDBWrapper.Start( this.AccountDBAsynHandler, this.DBAsynQueryWhenThreadBegin, dbCfg.ip, dbCfg.port, dbCfg.passwd, dbCfg.username, dbCfg.dbname );

			return ErrorCode.Success;
		}

		public void Update( long elapsed, long dt )
		{
			this.netSessionMgr.Update();
			NetworkMgr.instance.Update( elapsed, dt );
			this._heartBeater.Update( dt );
		}

		private void OnHeartBeat( int count ) => NetworkMgr.instance.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );
	}
}