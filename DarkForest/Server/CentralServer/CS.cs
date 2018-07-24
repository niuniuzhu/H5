using CentralServer.Net;
using Core.Misc;
using Core.Net;
using Newtonsoft.Json;
using Shared;
using System.IO;

namespace CentralServer
{
	public class CS
	{
		private static CS _instance;
		public static CS instance => _instance ?? ( _instance = new CS() );

		public CSNetSessionMgr netSessionMgr { get; }
		public CSConfig config { get; private set; }

		private CS()
		{
			this.netSessionMgr = new CSNetSessionMgr();
		}

		public void Dispose()
		{
		}

		public ErrorCode Initialize()
		{
			this.config = JsonConvert.DeserializeObject<CSConfig>( File.ReadAllText( @".\Config\CSCfg.json" ) );
			if ( this.config != null )
				Logger.Info( "CS Initialize success" );
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