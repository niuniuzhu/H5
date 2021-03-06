﻿using CentralServer.Net;
using Core.Misc;
using Core.Net;
using Newtonsoft.Json;
using Shared;
using Shared.DB;
using System.Collections.Generic;
using System.IO;
using CentralServer.User;

namespace CentralServer
{
	public partial class CS
	{
		private static CS _instance;
		public static CS instance => _instance ?? ( _instance = new CS() );

		public CSNetSessionMgr netSessionMgr { get; } = new CSNetSessionMgr();
		public CSConfig config { get; private set; }
		public DBConfig dbConfig { get; private set; }

		public readonly RedisWrapper redisWrapper = new RedisWrapper();
		public readonly UserMgr userMgr = new UserMgr();
		public readonly GCSIDMgr gcNIDMgr = new GCSIDMgr();
		public readonly Dictionary<uint, GSInfo> gsNIDToGSInfos = new Dictionary<uint, GSInfo>();

		private readonly Scheduler _heartBeater = new Scheduler();

		public ErrorCode Initialize( Options opts )
		{
			if ( string.IsNullOrEmpty( opts.cfg ) )
			{
				this.config = new CSConfig();
				this.config.CopyFromCLIOptions( opts );
				return ErrorCode.Success;
			}
			try
			{
				this.config = JsonConvert.DeserializeObject<CSConfig>( File.ReadAllText( opts.cfg ) );
			}
			catch ( System.Exception e )
			{
				Logger.Error( e );
				return ErrorCode.CfgLoadFailed;
			}
			if ( string.IsNullOrEmpty( opts.dbCfg ) )
				return ErrorCode.DBCfgLoadFailed;
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
			this.netSessionMgr.CreateListener( 0, 65535, ProtoType.TCP, this.netSessionMgr.CreateLSSession ).Start( this.config.lsPort );
			this.netSessionMgr.CreateListener( 1, 65535, ProtoType.TCP, this.netSessionMgr.CreateGSSession ).Start( this.config.gsPort );
			this.redisWrapper.Connect( this.config.redisIP, this.config.redisPort, this.config.redisPwd );

			return ErrorCode.Success;
		}

		public void Update( long elapsed, long dt )
		{
			this.netSessionMgr.Update();
			NetworkMgr.instance.Update( elapsed, dt );
			this._heartBeater.Update( dt );
		}

		private void OnHeartBeat( int count )
		{
			this.gcNIDMgr.Update();
			NetworkMgr.instance.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );
			this.redisWrapper.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );
		}
	}
}