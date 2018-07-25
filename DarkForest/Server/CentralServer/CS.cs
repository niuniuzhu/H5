using CentralServer.Net;
using Core.Misc;
using Core.Net;
using Newtonsoft.Json;
using Shared;
using System.Collections.Generic;
using System.IO;

namespace CentralServer
{
	public partial class CS
	{
		private static CS _instance;
		public static CS instance => _instance ?? ( _instance = new CS() );

		public CSNetSessionMgr netSessionMgr { get; } = new CSNetSessionMgr();
		public CSConfig config { get; private set; }

		private readonly Dictionary<uint, GSInfo> _gsIDToInfos = new Dictionary<uint, GSInfo>();

		public ErrorCode Initialize( Options opts )
		{
			if ( string.IsNullOrEmpty( opts.cfg ) )
			{
				this.config = new CSConfig
				{
					csID = opts.cdID,
					lsPort = opts.lsPort,
					gsPort = opts.gsPort,
					maxGSNum = opts.maxGSNum,
					redisIP = opts.redisIP,
					redisPort = opts.redisPort,
					redisPwd = opts.redisPwd
				};
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
			return ErrorCode.Success;
		}

		public ErrorCode Start()
		{
			this.netSessionMgr.CreateListener( 0, 65535, ProtoType.TCP, this.netSessionMgr.CreateLSSession ).Start( this.config.lsPort );
			this.netSessionMgr.CreateListener( 1, 65535, ProtoType.TCP, this.netSessionMgr.CreateGSSession ).Start( this.config.gsPort );
			return ErrorCode.Success;
		}

		public void Update( long elapsed, long dt )
		{
			this.netSessionMgr.Update();
			NetworkMgr.instance.Update( elapsed, dt );
		}
	}
}