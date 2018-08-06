namespace LoginServer.User
{
	public class User
	{
		public ulong sessionID { get; }
		public string name { get; }

		public User( ulong sessionID, string name )
		{
			this.sessionID = sessionID;
			this.name = name;
		}
	}
}