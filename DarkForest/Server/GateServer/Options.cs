using CommandLine;

namespace GateServer
{
	public class Options
	{
		[Option( 'l', "log",
			Default = "Config/GSLogCfg.xml",
			HelpText = "Specify configuration file for log." )]
		public string logCfg { get; set; }

		[Option( 'c', "cfg",
			Default = "Config/GSCfg.json",
			SetName = "bycfg",
			HelpText = "Specify configuration file." )]
		public string cfg { get; set; }

		[Option( "id",
			Default = ( uint )30001,
			SetName = "bysetting",
			HelpText = "ID for gate server." )]
		public uint gsID { get; set; }

		[Option( 'n', "name",
			Default = "local",
			SetName = "bysetting",
			HelpText = "Name for gate server." )]
		public string name { get; set; }

		[Option( "external_ip",
			Default = "127.0.0.1",
			SetName = "bysetting",
			HelpText = "Exposed IPAddress for gate server." )]
		public string externalIP { get; set; }

		[Option( "external_port",
			Default = 40001,
			SetName = "bysetting",
			HelpText = "Exposed gate server port." )]
		public int externalPort { get; set; }

		[Option( "password",
			Default = "123456",
			SetName = "bysetting",
			HelpText = "Password for gate server." )]
		public string password { get; set; }

		[Option( "max_connection",
			Default = 10000,
			SetName = "bycfg",
			HelpText = "Maximun connection for gate server." )]
		public int maxConnection { get; set; }

		[Option( "cs_ip",
			Default = "127.0.0.1",
			SetName = "bysetting",
			HelpText = "IPaddress of central server." )]
		public string csIP { get; set; }

		[Option( "cs_port",
			Default = 10002,
			SetName = "bysetting",
			HelpText = "central server port." )]
		public int csPort { get; set; }
	}
}