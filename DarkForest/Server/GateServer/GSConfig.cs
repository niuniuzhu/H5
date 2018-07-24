namespace GateServer
{
	public class GSConfig
	{
		public enum State
		{
			Free,
			Busy,
			Full,
			Close
		}
		public uint gsID;
		public string name;
		public string externalIP;
		public int externalPort;
		public string password;
		public int maxConnection;
		public string csIP;
		public int csPort;
	}
}