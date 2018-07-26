﻿//<auto-generated>
//	Generated by proto generator.  DO NOT EDIT!
//</auto-generated>
//ReSharper disable CheckNamespace
using System.Collections.Generic;

namespace Protos {
	public static class ProtoDesc {
		#region mappings
		private static readonly Dictionary<System.Type, Protos.MsgID> _TYPE2ID = new Dictionary<System.Type, Protos.MsgID> {
			{typeof(Protos.GC2LS.AskRegister), (Protos.MsgID)100},
			{typeof(Protos.GC2LS.AskLogin), (Protos.MsgID)101},
			{typeof(Protos.LS2GC.Result), (Protos.MsgID)200},
			{typeof(Protos.LS2GC.GSInfo), (Protos.MsgID)201},
			{typeof(Protos.GS2CS.ReportState), (Protos.MsgID)300},
			{typeof(Protos.CS2LS.GSInfos), (Protos.MsgID)400},
			{typeof(Protos.CS2LS.GSInfo), (Protos.MsgID)401},
			{typeof(Protos.CS2LS.GSLost), (Protos.MsgID)402},
		};

		private static readonly Dictionary<Protos.MsgID, System.Type> _ID2TYPE = new Dictionary<Protos.MsgID, System.Type> {
			{(Protos.MsgID)100, typeof(Protos.GC2LS.AskRegister)},
			{(Protos.MsgID)101, typeof(Protos.GC2LS.AskLogin)},
			{(Protos.MsgID)200, typeof(Protos.LS2GC.Result)},
			{(Protos.MsgID)201, typeof(Protos.LS2GC.GSInfo)},
			{(Protos.MsgID)300, typeof(Protos.GS2CS.ReportState)},
			{(Protos.MsgID)400, typeof(Protos.CS2LS.GSInfos)},
			{(Protos.MsgID)401, typeof(Protos.CS2LS.GSInfo)},
			{(Protos.MsgID)402, typeof(Protos.CS2LS.GSLost)},
		};
		#endregion

		#region create message static functions
		public static Google.Protobuf.IMessage CreateMsgByID(Protos.MsgID msgID) {
			if ((int)msgID == 100)
				return new Protos.GC2LS.AskRegister();
			if ((int)msgID == 101)
				return new Protos.GC2LS.AskLogin();
			if ((int)msgID == 200)
				return new Protos.LS2GC.Result();
			if ((int)msgID == 201)
				return new Protos.LS2GC.GSInfo();
			if ((int)msgID == 300)
				return new Protos.GS2CS.ReportState();
			if ((int)msgID == 400)
				return new Protos.CS2LS.GSInfos();
			if ((int)msgID == 401)
				return new Protos.CS2LS.GSInfo();
			if ((int)msgID == 402)
				return new Protos.CS2LS.GSLost();
			return null;
		}
		#endregion

		#region get message static functions
		public static Protos.MsgID GetMsgID( System.Type type ) => _TYPE2ID[type];

		public static Protos.MsgID GetMsgID<T>() where T : Google.Protobuf.IMessage => _TYPE2ID[typeof( T )];

		public static Protos.MsgID GetMsgID( this Google.Protobuf.IMessage message ) => _TYPE2ID[message.GetType()];

		public static Protos.MsgID GetMsgID<T>( this Google.Protobuf.IMessage<T> message ) where T : Google.Protobuf.IMessage<T> => _TYPE2ID[message.GetType()];
		#endregion

		#region response message static functions
		public static Protos.LS2GC.Result R_GC2LS_AskRegister() => new Protos.LS2GC.Result();

		public static Protos.LS2GC.Result R_GC2LS_AskLogin() => new Protos.LS2GC.Result();

		#endregion
	} //end class
} //end namespace
