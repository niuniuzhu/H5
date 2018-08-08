using Core.Misc;
using Core.Net;
using Shared;
using Shared.DB;
using StackExchange.Redis;

namespace LoginServer
{
	public partial class LS
	{
		private void AccountDBAsynHandler( StreamBuffer buffer )
		{
		}

		private void DBAsynQueryWhenThreadBegin()
		{
		}

		public ErrorCode RegisterAccount( Protos.GC2LS_AskRegister msg )
		{
			if ( this._userNameToGcNID.ContainsKey( msg.Name ) ) //如果内存里找到相同用户名
				return ErrorCode.UsernameExists;

			if ( string.IsNullOrEmpty( msg.Name ) || msg.Name.Length < Consts.DEFAULT_UNAME_LEN )
				return ErrorCode.InvalidUname;

			if ( string.IsNullOrEmpty( msg.Passwd ) || msg.Passwd.Length < Consts.DEFAULT_PWD_LEN || !Consts.REGEX_PWD.IsMatch( msg.Passwd ) )
				return ErrorCode.InvalidPwd;

			uint ukey = 0;
			ErrorCode errorCode = ErrorCode.Success;
			//若Redis缓存可用，则查询；不可用就直接查询数据库
			RedisWrapper redisWrapper = LS.instance.redisWrapper;
			if ( redisWrapper.IsConnected )
			{
				if ( redisWrapper.HashExists( "unames", msg.Name ) ) //redis存在相同用户名
					return ErrorCode.UsernameExists;
			}
			else
			{
				errorCode = this._accountDBWrapper.SqlExecQuery( $"select id from account_user where uname={msg.Name}",
																 dataReader =>
																 {
																	 if ( !dataReader.HasRows )
																		 return ErrorCode.UsernameExists;
																	 dataReader.Read();
																	 ukey = dataReader.GetUInt32( "id" );
																	 return ErrorCode.Success;
																 } );
			}
			if ( errorCode != ErrorCode.Success )
				return errorCode;
			//开始注册
			string pwd = Core.Crypto.MD5Util.GetMd5HexDigest( msg.Passwd ).Replace( "-", string.Empty ).ToLower();
			errorCode = this._accountDBWrapper.SqlExecNonQuery(
				$"insert account_user( sdk,uname,pwd ) values({msg.Sdk}, \'{msg.Name}\', \'{pwd}\');", out int _ );
			if ( errorCode == ErrorCode.Success )
			{
				if ( redisWrapper.IsConnected )
				{
					redisWrapper.HashSet( "unames", msg.Name, pwd );
					redisWrapper.HashSet( "ukeys", msg.Name, ukey );
				}
			}
			return errorCode;
		}

		public ErrorCode RequestLogin( Protos.GC2LS_AskLogin msg, ref ulong sessionID, ref uint ukey )
		{
			if ( string.IsNullOrEmpty( msg.Name ) || msg.Name.Length < Consts.DEFAULT_UNAME_LEN )
				return ErrorCode.InvalidUname;

			if ( string.IsNullOrEmpty( msg.Passwd ) || msg.Passwd.Length < Consts.DEFAULT_PWD_LEN || !Consts.REGEX_PWD.IsMatch( msg.Passwd ) )
				return ErrorCode.InvalidPwd;

			uint ukey2 = 0;
			ErrorCode errorCode = ErrorCode.Success;
			//若Redis缓存可用，则查询；不可用就直接查询数据库
			RedisWrapper redisWrapper = LS.instance.redisWrapper;
			if ( redisWrapper.IsConnected )
			{
				RedisValue pwd = redisWrapper.HashGet( "unames", msg.Name );
				if ( !pwd.HasValue ) //redis找不到用户名
					return ErrorCode.InvalidUname;
				if ( pwd != Core.Crypto.MD5Util.GetMd5HexDigest( msg.Passwd ).Replace( "-", string.Empty ).ToLower() )
					return ErrorCode.InvalidPwd;
				ukey2 = ( uint )redisWrapper.HashGet( "ukeys", msg.Name );
			}
			else
			{
				string pwd = Core.Crypto.MD5Util.GetMd5HexDigest( msg.Passwd ).Replace( "-", string.Empty ).ToLower();
				errorCode = this._accountDBWrapper.SqlExecQuery(
					$"select id,pwd from account_user where uname={msg.Name}",
					dataReader =>
					{
						if ( !dataReader.HasRows )
							return ErrorCode.InvalidUname;
						dataReader.Read();
						ukey2 = dataReader.GetUInt32( "id" );
						return dataReader.GetString( "pwd" ) != pwd
								   ? ErrorCode.InvalidPwd
								   : ErrorCode.Success;
					} );
			}
			if ( errorCode != ErrorCode.Success )
				return errorCode;

			sessionID = GuidHash.GetUInt64();
			ukey = ukey2;
			return ErrorCode.Success;
		}
	}
}