using Core.Misc;
using Core.Net;
using Shared;
using Shared.DB;

namespace LoginServer.User
{
	public partial class UserMgr
	{
		private void AccountDBAsynHandler( StreamBuffer buffer )
		{
		}

		public ErrorCode RegisterAccount( uint gcNID, Protos.GC2LS.AskRegister msg )
		{
			if ( this.allUserNameToGuidMap.ContainsKey( msg.Name ) ) //如果内存里找到相同名字
				return ErrorCode.UsernameExists;

			ErrorCode errorCode = ErrorCode.Success;
			//若Redis缓存可用，则查询；不可用就直接查询数据库
			RedisWrapper redisWrapper = LS.instance.redisWrapper;
			if ( redisWrapper.IsConnected )
			{
				if ( redisWrapper.HashExists( "usernames", msg.Name ) ) //redis存在相同名字
					return ErrorCode.UsernameExists;
			}
			else
			{
				errorCode = this._accountDBWrapper.SqlExecQuery( $"select user_name from account_user where user_name={msg.Name}",
																 dataReader =>
																	 dataReader.HasRows
																		 ? ErrorCode.UsernameExists
																		 : ErrorCode.Success );
			}
			if ( errorCode != ErrorCode.Success )
				return errorCode;
			//开始注册
			ulong guid = GuidHash.GetUInt64();
			string pwd = Core.Crypto.MD5Util.GetMd5HexDigest( msg.Passwd );
			if ( redisWrapper.IsConnected )
				redisWrapper.HashSet( "usernames", msg.Name, true );
			this._accountDBWrapper.SqlExecNonQuery(
				$"insert account_user( id, sdk, username, password, ip ) values({guid},{msg.Sdk},\'{msg.Name}\',\'{pwd}\',\'{msg.Ip}\');", out int _ );
			return ErrorCode.Success;
		}
	}
}