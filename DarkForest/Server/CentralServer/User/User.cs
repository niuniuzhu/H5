﻿namespace CentralServer.User
{
	public class User
	{
		public ulong gcNID { get; }

		public uint gsNID { get; }

		public string name;

		public User( ulong gcNID, uint gsNID )
		{
			this.gcNID = gcNID;
			this.gsNID = gsNID;
			//todo 从redis或db中取回数据

			//CS.instance.userMgr.userNameToGcNID[this.name] = this.gcNID;
		}
	}
}