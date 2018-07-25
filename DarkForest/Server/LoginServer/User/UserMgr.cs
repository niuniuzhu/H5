using Shared.DB;

namespace LoginServer.User
{
	public partial class UserMgr
	{
		private readonly DBWrapper _accountDBWrapper = new DBWrapper();

		public void Start()
		{
			DBConfig.DBCfg dbCfg = LS.instance.dbConfig[DBConfig.DBType.Account];
			this._accountDBWrapper.Start( this.AccountDBAsynHandler, this.DBAsynQueryWhenThreadBegin, dbCfg.ip, dbCfg.port, dbCfg.passwd, dbCfg.username, dbCfg.dbname );
		}
	}
}