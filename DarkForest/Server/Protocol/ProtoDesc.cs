//ReSharper disable CheckNamespace
using System.Collections.Generic;

namespace Protos {
	public static class ProtoDesc {
		private static Dictionary<System.Type, Protos.MsgID> _TYPE2ID = new Dictionary<System.Type, Protos.MsgID> {
			{typeof(Protos.GCToLS.AskLogin), (Protos.MsgID)100},
			{typeof(Protos.LSToGC.LoginResult), (Protos.MsgID)200},
			{typeof(Protos.LSToGC.BSAddr), (Protos.MsgID)201},
		};

		private static Dictionary<Protos.MsgID, System.Type> _ID2TYPE = new Dictionary<Protos.MsgID, System.Type> {
			{(Protos.MsgID)100, typeof(Protos.GCToLS.AskLogin)},
			{(Protos.MsgID)200, typeof(Protos.LSToGC.LoginResult)},
			{(Protos.MsgID)201, typeof(Protos.LSToGC.BSAddr)},
		};

		private static Dictionary<System.Type, Protos.Response.Types.RespID> _TYPE2REPSID = new Dictionary<System.Type, Protos.Response.Types.RespID> {
			{typeof(Protos.GCToLS.AskLogin), (Protos.Response.Types.RespID)200},
		};

		public static Google.Protobuf.IMessage CreateMessageByID(Protos.MsgID msgID) => CreateMessageByID((int)msgID);

		public static Google.Protobuf.IMessage CreateMessageByID(int msgID) {
			if (msgID == 100)
				return new Protos.GCToLS.AskLogin();
			if (msgID == 200)
				return new Protos.LSToGC.LoginResult();
			if (msgID == 201)
				return new Protos.LSToGC.BSAddr();
			return null;
		}

		public static Google.Protobuf.IMessage CreateRespMessageByID(int msgID) => CreateMessageByID((Protos.MsgID)msgID);

		public static Google.Protobuf.IMessage CreateRespMessageByID(Protos.MsgID msgID) {
			if (! _TYPE2REPSID.TryGetValue(_ID2TYPE[msgID], out Protos.Response.Types.RespID respID ))
				return null;
			int iRespID = ( int ) respID;
			if (iRespID == 200)
				return new Protos.LSToGC.LoginResult();
			return null;
		}
	} //end class
} //end namespace
