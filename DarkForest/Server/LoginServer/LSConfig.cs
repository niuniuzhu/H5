using Core.Misc;
using Shared;
using System;
using System.Collections;
using System.IO;

namespace LoginServer
{
	public class BSServerInfo
	{
		public string name;
		public string ip;
		public int port;
		public int status;
	}

	public class LSConfig
	{
		public int bsListenPort;
		public int clientListenPort;
		public string csIp;
		public int csPort;

		public ErrorCode Load()
		{
			Hashtable json;
			try
			{
				string content = File.ReadAllText( @".\Config\LSCfg.json" );
				json = ( Hashtable )MiniJSON.JsonDecode( content );
			}
			catch ( Exception e )
			{
				Logger.Error( $"load LSCfg failed for {e}" );
				return ErrorCode.CfgFailed;
			}
			this.clientListenPort = json.GetInt( "ListernPortForClient" );
			this.bsListenPort = json.GetInt( "ListernPortForBS" );
			this.csIp = json.GetString( "CSIp" );
			this.csPort = json.GetInt( "CSPort" );
			return ErrorCode.Success;
		}
	}
}