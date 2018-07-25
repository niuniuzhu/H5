using CommandLine;

namespace LoginServer
{
	public class Options
	{
		[Option( 'l', "log",
			Default = "Config/LSLogCfg.xml",
			HelpText = "Specify configuration file for log." )]
		public string logCfg { get; set; }

		[Option( 'd', "dbcfg",
			Default = "",
			HelpText = "Specify configuration file for database." )]
		public string dbCfg { get; set; }

		[Option( 'c', "cfg",
			Default = "",
			SetName = "bycfg",
			HelpText = "Specify configuration file." )]
		public string cfg { get; set; }

		[Option( 'p', "cli_port",
			Default = 49996,
			SetName = "bysetting",
			HelpText = "Exposed port for login server." )]
		public int cliPort { get; set; }

		[Option( "cs_ip",
			Default = "127.0.0.1",
			SetName = "bysetting",
			HelpText = "IPAddress of central server to connect." )]
		public string csIP { get; set; }

		[Option( "cs_port",
			Default = 10001,
			SetName = "bysetting",
			HelpText = "Port of central server." )]
		public int csPort { get; set; }

		[Option( "redis_ip",
			Default = "juntai.yytou.com",
			SetName = "bysetting",
			HelpText = "IPaddress of redis server." )]
		public string redisIP { get; set; }

		[Option( "redis_port",
			Default = 23680,
			SetName = "bysetting",
			HelpText = "Redis server port." )]
		public int redisPort { get; set; }

		[Option( "redis_pwd",
			Default = "",
			SetName = "bysetting",
			HelpText = "Password for redis server." )]
		public string redisPwd { get; set; }
	}
}