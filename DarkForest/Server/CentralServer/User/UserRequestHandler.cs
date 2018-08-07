using Core.Misc;
using Core.Net;
using Shared;
using Shared.DB;
using StackExchange.Redis;

namespace CentralServer.User
{
	public partial class UserMgr
	{
		private void AccountDBAsynHandler( StreamBuffer buffer )
		{
		}

		public ErrorCode RegisterAccount( Protos.LS2CS_AskRegister msg )
		{
			if ( this.userNameToGcNID.ContainsKey( msg.Name ) ) //如果内存里找到相同用户名
				return ErrorCode.UsernameExists;

			if ( string.IsNullOrEmpty( msg.Name ) || msg.Name.Length < Consts.DEFAULT_UNAME_LEN )
				return ErrorCode.InvalidUname;

			if ( string.IsNullOrEmpty( msg.Passwd ) || msg.Passwd.Length < Consts.DEFAULT_PWD_LEN || !Consts.REGEX_PWD.IsMatch( msg.Passwd ) )
				return ErrorCode.InvalidPwd;

			ErrorCode errorCode = ErrorCode.Success;
			//若Redis缓存可用，则查询；不可用就直接查询数据库
			RedisWrapper redisWrapper = CS.instance.redisWrapper;
			if ( redisWrapper.IsConnected )
			{
				if ( redisWrapper.HashExists( "unames", msg.Name ) ) //redis存在相同用户名
					return ErrorCode.UsernameExists;
			}
			else
			{
				errorCode = this._accountDBWrapper.SqlExecQuery( $"select id from account_user where uname={msg.Name}",
																 dataReader =>
																	 dataReader.HasRows
																		 ? ErrorCode.UsernameExists
																		 : ErrorCode.Success );
			}
			if ( errorCode != ErrorCode.Success )
				return errorCode;
			//开始注册
			//ulong guid = GuidHash.GetUInt64();
			string pwd = Core.Crypto.MD5Util.GetMd5HexDigest( msg.Passwd ).Replace( "-", string.Empty ).ToLower();
			errorCode = this._accountDBWrapper.SqlExecNonQuery(
				$"insert account_user( sdk,uname,pwd ) values({msg.Sdk}, \'{msg.Name}\', \'{pwd}\');", out int _ );
			if ( errorCode == ErrorCode.Success )
			{
				if ( redisWrapper.IsConnected )
					redisWrapper.HashSet( "unames", msg.Name, pwd );
			}
			return errorCode;
		}

		public ErrorCode RequestLogin( Protos.LS2CS_GCAskLogin msg, ref ulong sessionID )
		{
			if ( string.IsNullOrEmpty( msg.Name ) || msg.Name.Length < Consts.DEFAULT_UNAME_LEN )
				return ErrorCode.InvalidUname;

			if ( string.IsNullOrEmpty( msg.Passwd ) || msg.Passwd.Length < Consts.DEFAULT_PWD_LEN || !Consts.REGEX_PWD.IsMatch( msg.Passwd ) )
				return ErrorCode.InvalidPwd;

			ErrorCode errorCode = ErrorCode.Success;
			//若Redis缓存可用，则查询；不可用就直接查询数据库
			RedisWrapper redisWrapper = CS.instance.redisWrapper;
			if ( redisWrapper.IsConnected )
			{
				RedisValue pwd = redisWrapper.HashGet( "unames", msg.Name );
				if ( !pwd.HasValue ) //redis找不到用户名
					return ErrorCode.InvalidUname;
				if ( pwd != Core.Crypto.MD5Util.GetMd5HexDigest( msg.Passwd ).Replace( "-", string.Empty ).ToLower() )
					return ErrorCode.InvalidPwd;
			}
			else
			{
				string pwd = Core.Crypto.MD5Util.GetMd5HexDigest( msg.Passwd ).Replace( "-", string.Empty ).ToLower();
				errorCode = this._accountDBWrapper.SqlExecQuery(
					$"select pwd from account_user where uname={msg.Name}",
					dataReader =>
					{
						if ( !dataReader.HasRows )
							return ErrorCode.InvalidUname;
						dataReader.Read();
						return ( string )dataReader["pwd"] != pwd
								   ? ErrorCode.InvalidPwd
								   : ErrorCode.Success;
					} );
			}
			if ( errorCode != ErrorCode.Success )
				return errorCode;

			sessionID = GuidHash.GetUInt64();
			bool result = CS.instance.gcNIDMgr.Add( sessionID );
			System.Diagnostics.Debug.Assert( result, $"duplicate GC gcNID:{sessionID}." );

			return ErrorCode.Success;
		}
	}
}