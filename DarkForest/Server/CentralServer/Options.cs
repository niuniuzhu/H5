using CommandLine;

namespace CentralServer
{
	public class Options
	{
		[Option( 'l', "log",
			Default = "Config/CSLogCfg.xml",
			HelpText = "Specify configuration file for log." )]
		public string logCfg { get; set; }

		[Option( 'c', "cfg",
			Default = "",
			SetName = "bycfg",
			HelpText = "Specify configuration file." )]
		public string cfg { get; set; }

		[Option( "id",
			Default = ( uint )1,
			SetName = "bysetting",
			HelpText = "ID for central server." )]
		public uint cdID { get; set; }

		[Option( "ls_port",
			Default = 10001,
			SetName = "bysetting",
			HelpText = "Login server port." )]
		public int lsPort { get; set; }

		[Option( "gs_port",
			Default = 10002,
			SetName = "bysetting",
			HelpText = "Gate server port." )]
		public int gsPort { get; set; }

		[Option( "max_gs_num",
			Default = 10,
			SetName = "bycfg",
			HelpText = "Maximun number of gate server." )]
		public int maxGSNum { get; set; }

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
			Default = "juntai.yytou.com",
			SetName = "bysetting",
			HelpText = "Password for redis server." )]
		public string redisPwd { get; set; }
	}
}