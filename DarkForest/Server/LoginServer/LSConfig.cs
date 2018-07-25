namespace LoginServer
{
	public class LSConfig
	{
		public int cliPort;
		public string csIP;
		public int csPort;
		public string redisIP;
		public int redisPort;
		public string redisPwd;

		public void CopyFromCLIOptions( Options opts )
		{
			this.cliPort = opts.cliPort;
			this.csIP = opts.csIP;
			this.csPort = opts.csPort;
			this.redisIP = opts.redisIP;
			this.redisPort = opts.redisPort;
			this.redisPwd = opts.redisPwd;
		}
	}
}