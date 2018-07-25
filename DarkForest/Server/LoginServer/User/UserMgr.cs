﻿using Shared.DB;
using System.Collections.Generic;

namespace LoginServer.User
{
	public partial class UserMgr
	{
		/// <summary>
		/// 用户名和id的映射
		/// </summary>
		public Dictionary<string, ulong> allUserNameToGuidMap { get; } = new Dictionary<string, ulong>();

		private readonly DBWrapper _accountDBWrapper = new DBWrapper();

		public void Start()
		{
			DBConfig.DBCfg dbCfg = LS.instance.dbConfig[DBConfig.DBType.Account];
			this._accountDBWrapper.Start( this.AccountDBAsynHandler, this.DBAsynQueryWhenThreadBegin, dbCfg.ip, dbCfg.port, dbCfg.passwd, dbCfg.username, dbCfg.dbname );
		}

		private void DBAsynQueryWhenThreadBegin()
		{
		}
	}
}