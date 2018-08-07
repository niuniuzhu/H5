using Shared;
using Shared.DB;
using System.Collections.Generic;
using Core.Misc;

namespace CentralServer.User
{
	public partial class UserMgr
	{
		public readonly Dictionary<ulong, User> gcNIDToUser = new Dictionary<ulong, User>();
		public readonly Dictionary<string, ulong> userNameToGcNID = new Dictionary<string, ulong>();
		public readonly List<User> users = new List<User>();

		private readonly DBWrapper _accountDBWrapper = new DBWrapper();

		public void Start()
		{
			DBConfig.DBCfg dbCfg = CS.instance.dbConfig[DBConfig.DBType.Account];
			this._accountDBWrapper.Start( this.AccountDBAsynHandler, this.DBAsynQueryWhenThreadBegin, dbCfg.ip, dbCfg.port, dbCfg.passwd, dbCfg.username, dbCfg.dbname );
		}

		private void DBAsynQueryWhenThreadBegin()
		{
		}

		/// <summary>
		/// 玩家上线
		/// </summary>
		public User UserOnline( ulong gcNID, uint gsNID )
		{
			User user = new User( gcNID, gsNID );
			this.gcNIDToUser[gcNID] = user;
			this.users.Add( user );
			Logger.Log( $"user:{gcNID} online" );
			return user;
		}

		/// <summary>
		/// 玩家下线
		/// </summary>
		public ErrorCode UserOffline( ulong gcNID )
		{
			if ( !this.gcNIDToUser.TryGetValue( gcNID, out User user ) )
				return ErrorCode.InvalidGcNID;
			this.gcNIDToUser.Remove( gcNID );
			this.users.Remove( user );
			Logger.Log( $"user:{gcNID} offline" );
			return ErrorCode.Success;
		}

		public void KickUser( User user )
		{
			this.UserOffline( user.gcNID );
			//todo send to client and cs
		}

		/// <summary>
		/// 踢走连接到指定gsNID的所有玩家
		/// </summary>
		public void KickUsers( uint gsNID )
		{
			int count = this.users.Count;
			for ( int i = 0; i < count; i++ )
			{
				User user = this.users[i];
				if ( user.gsNID != gsNID )
					continue;
				this.gcNIDToUser.Remove( user.gcNID );
				this.users.RemoveAt( i );
				--i;
				--count;
			}
		}
	}
}