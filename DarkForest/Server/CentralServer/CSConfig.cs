namespace CentralServer
{
	public class BSServerInfo
	{
		public string name;
		public string ip;
		public int port;
		public int status;
	}

	public class CSConfig
	{
		public uint csID;
		public int lsPort;
		public int gsPort;
		public int maxGSNum;
		public string redisIP;
		public int redisPort;
		public string redisPwd;
	}
}