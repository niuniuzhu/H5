using System.Net.Sockets;
using Core.Net;

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

	public enum RelationShip
	{
		None,
		Friends,
		Detestation
	}

	public enum DBOperation
	{
		None,
		Add,
		Del,
		Upd
	}

	public enum UserPlayingStatus
	{
		OffLine,
		Playing
	}

	public enum PayType
	{
		None,
		Gold,
		Diamond
	}

	public enum GoodsType
	{
		None,
		Hero,
		Skin,
		Rune
	}

	public enum HeroKind
	{
		None,
		Dps,
		Magic,
		Ass,
		Tank
	}

	public enum SkinType
	{
		None
	}

	public enum ConsumeType
	{
		Free,
		Gold,
		Diamond
	}

	public enum DBType
	{
		None,
		Game,
		Cdkey,
		Log,
		Mail
	}

	public enum ObjectType
	{
		None,
		Guild,
		User,
		HeroBegin = Consts.OBJ_TYPE_SPACE,
		NPCBegin = Consts.OBJ_TYPE_SPACE * 2,
		GoodsBegin = Consts.OBJ_TYPE_SPACE * 3,
		AiRobotBegin = Consts.OBJ_TYPE_SPACE * 4
	}

	public enum LobbyType
	{
		Null = -1,
		Ele, //初级场
		Mid, //中级场
		Hey, //高级场
		TaW,
		Pve1,
		TowerDef,
		Pvp007,
		Guid1,
		Guid2,
		Guid3,
		Guid4
	}

	public enum RewardType
	{
		None,   //未设
		Nomal,  //普通
		Extend //额外
	}

	public enum LoginRewardItemType
	{
		None,           //未设
		Gold,           //金币
		Diamond,        //钻石
		GoodsIDBegin   //商品
	}

	public class DBCfg
	{
		public int un32DBHostPort;
		public string aszDBHostIP;
		public string aszDBUserName;
		public string aszDBUserPwd;
		public string aszDBName;
		public string aszUpgradeScriptDir;
	}

	public enum MailCurtState
	{
		None,
		New,
		LookedButNotGotGift,
		Look,
		Del
	}

	public enum MailType
	{
		None,
		T1,
		T2,
		T3,
		T4
	}

	public class MailDBData
	{
		public long objIdx;
		public int mailId;
		public int channelId;
		public MailCurtState curtState;
		public MailType mailType; //邮件类型 
		public long n64CreateTime;//邮件发送时间(mCreateTime创建时间)
		public long n64EndTime; //邮件过期时间 

		public string mailTitle;
		public string mailContent;
		public string mailGift;    //邮件礼包type:key:value eg:1:1:1000;2:2:1000;3:goodsid:1;3:goodsid:2;
		public string szSender;
		public string mCreateTime;
		public string mEndTime;

		public bool bIfPerDel;
		public bool bIfNewMail;
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

	public enum NoticeFlag
	{
		eFlag_None = 0,
		eFlag_OnSale = 1,
		eFlag_Notice = 2,
		eFlag_Services = 3
	}

	public enum NoticeState
	{
		eState_None = 0,
		eState_Hot = 1,
		eState_New = 2
	}

	public class Notice
	{
		//字段、属性、方法、事件
		public long noticeID;//数据库主键
		public uint id;
		public UserPlatform platform;
		public string title;
		public NoticeFlag flag;
		public NoticeState state;
		public uint priority;
		public string msg;
		public long star_time;
		public long end_time;
	}

	public static class Consts
	{
		public const ProtoType PROTOCOL_TYPE = ProtoType.TCP;

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
		public const long RECONN_DETECT_INTERVAL = 10000;

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