namespace Shared
{
	public enum ServerNetState
	{
		Closed = 0,
		Connecting,
		Free,
		Busy,
		Full
	}

	public enum ErrorCode
	{
		Success = 0,
		CfgFailed,
		InvaildLogicID,
		GSNotFound,
		SSNotFound,
		RedisReplyNil,
		InvalidDatabase,
		SqlExecError,
		EncodeMsgToBufferFailed,
		UserDataNotFound
	}

	public enum UserPlatform
	{
		//ios
		PC = 0,
		IOS_91 = 1,
		IOS_TB = 2,
		IOS_PP = 3,
		IOS_CMGE = 4,
		IOS_UC = 5,
		IOS_iTools = 6,
		OnlineGame = 7,
		IOS_As = 8,
		IOS_XY = 9,
		IOS_CMGE_ZB = 10,
		//android
		AndroidCMGE = 104,
		AndroidUC = 105,
		//其他
		PlatformiOS_CMGEInfo = 304,
		//RC use
		All = int.MaxValue
	}

	public class DBCfg
	{
		public int port;
		public string ip;
		public string username;
		public string passwd;
		public string name;
		public string upgradeScriptDir;
	}

	public struct UserNetInfo
	{
		public int gsID { get; private set; }
		public uint gcNetID { get; private set; }

		public UserNetInfo( int gsID, uint gcNetID )
		{
			this.gsID = gsID;
			this.gcNetID = gcNetID;
		}

		public void Clear()
		{
			this.gcNetID = 0;
			this.gsID = 0;
		}

		public bool IsValid()
		{
			return this.gcNetID > 0 && this.gsID > 0;
		}
	}

	public static class Consts
	{
		public const int HEART_BEAT_CD_TICK = 10;

		/// <summary>
		/// 心跳间隔
		/// </summary>
		public const long HEART_PACK = 100;

		/// <summary>
		/// 最大监听器数
		/// </summary>
		public const int MAX_COUNT_LISTENER = 3;

		/// <summary>
		/// Ping的时间间隔
		/// </summary>
		public const long DEFAULT_PING_CD_TICK = 1000 * 160;

		/// <summary>
		/// 重连检测的时间间隔
		/// </summary>
		public const long RECONN_INTERVAL = 2000;

		public const int MAX_BATTLE_IN_SS = 200;

		public const int DEFAULT_NAME_LEN = 30;
		public const int DEFAULT_NICK_NAME_LEN = 32;
		public const int DEFAULT_DEVICE_KEY_LEN = DEFAULT_NAME_LEN * 5;
		public const int PROJECTILE_MAX_CHILD_PROJECTILE_TYPE = 3;
		public const int DEFAULT_REMOVE_CONSOLE_KEY_LEN = 65;
		public const int OBJ_TYPE_SPACE = 10000;
		public const int PERSIST_TIME_ALWAYS = -1;
	}
}