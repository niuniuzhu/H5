﻿//<auto-generated>
//	Generated by proto generator.  DO NOT EDIT!
//</auto-generated>
using Google.Protobuf;

public static class ProtoCreator {
	#region mappings
	internal static readonly System.Collections.Generic.Dictionary<System.Type, Protos.MsgID> _TYPE2ID = new System.Collections.Generic.Dictionary<System.Type, Protos.MsgID> {
		{typeof(Protos.G_AskPing), (Protos.MsgID)10},
		{typeof(Protos.G_AskPingRet), (Protos.MsgID)11},
		{typeof(Protos.GC2LS_AskRegister), (Protos.MsgID)100},
		{typeof(Protos.GC2LS_AskLogin), (Protos.MsgID)101},
		{typeof(Protos.GC2GS_AskLogin), (Protos.MsgID)200},
		{typeof(Protos.GC2GS_KeepAlive), (Protos.MsgID)201},
		{typeof(Protos.LS2GC_GSInfo), (Protos.MsgID)300},
		{typeof(Protos.LS2GC_AskRegRet), (Protos.MsgID)301},
		{typeof(Protos.LS2GC_AskLoginRet), (Protos.MsgID)302},
		{typeof(Protos.LS2CS_GCLogin), (Protos.MsgID)400},
		{typeof(Protos.GS2CS_ReportState), (Protos.MsgID)500},
		{typeof(Protos.GS2CS_GCAskLogin), (Protos.MsgID)501},
		{typeof(Protos.GS2CS_GCLost), (Protos.MsgID)502},
		{typeof(Protos.GS2GC_LoginRet), (Protos.MsgID)600},
		{typeof(Protos.CS2LS_GSInfos), (Protos.MsgID)700},
		{typeof(Protos.CS2LS_GSInfo), (Protos.MsgID)701},
		{typeof(Protos.CS2LS_GSLost), (Protos.MsgID)702},
		{typeof(Protos.CS2LS_GCLoginRet), (Protos.MsgID)703},
		{typeof(Protos.CS2GS_GCLoginRet), (Protos.MsgID)800},
	};

	internal static readonly System.Collections.Generic.Dictionary<Protos.MsgID, System.Type> _ID2TYPE = new System.Collections.Generic.Dictionary<Protos.MsgID, System.Type> {
		{(Protos.MsgID)10, typeof(Protos.G_AskPing)},
		{(Protos.MsgID)11, typeof(Protos.G_AskPingRet)},
		{(Protos.MsgID)100, typeof(Protos.GC2LS_AskRegister)},
		{(Protos.MsgID)101, typeof(Protos.GC2LS_AskLogin)},
		{(Protos.MsgID)200, typeof(Protos.GC2GS_AskLogin)},
		{(Protos.MsgID)201, typeof(Protos.GC2GS_KeepAlive)},
		{(Protos.MsgID)300, typeof(Protos.LS2GC_GSInfo)},
		{(Protos.MsgID)301, typeof(Protos.LS2GC_AskRegRet)},
		{(Protos.MsgID)302, typeof(Protos.LS2GC_AskLoginRet)},
		{(Protos.MsgID)400, typeof(Protos.LS2CS_GCLogin)},
		{(Protos.MsgID)500, typeof(Protos.GS2CS_ReportState)},
		{(Protos.MsgID)501, typeof(Protos.GS2CS_GCAskLogin)},
		{(Protos.MsgID)502, typeof(Protos.GS2CS_GCLost)},
		{(Protos.MsgID)600, typeof(Protos.GS2GC_LoginRet)},
		{(Protos.MsgID)700, typeof(Protos.CS2LS_GSInfos)},
		{(Protos.MsgID)701, typeof(Protos.CS2LS_GSInfo)},
		{(Protos.MsgID)702, typeof(Protos.CS2LS_GSLost)},
		{(Protos.MsgID)703, typeof(Protos.CS2LS_GCLoginRet)},
		{(Protos.MsgID)800, typeof(Protos.CS2GS_GCLoginRet)},
	};
	#endregion

	#region proto generator class
	public static Protos.G_AskPing Q_G_AskPing() {
		var msg = new Protos.G_AskPing();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= (uint)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.G_AskPingRet Q_G_AskPingRet() {
		var msg = new Protos.G_AskPingRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.GC2LS_AskRegister Q_GC2LS_AskRegister() {
		var msg = new Protos.GC2LS_AskRegister();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= (uint)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.GC2LS_AskLogin Q_GC2LS_AskLogin() {
		var msg = new Protos.GC2LS_AskLogin();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= (uint)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.GC2GS_AskLogin Q_GC2GS_AskLogin() {
		var msg = new Protos.GC2GS_AskLogin();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= (uint)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.GC2GS_KeepAlive Q_GC2GS_KeepAlive() {
		var msg = new Protos.GC2GS_KeepAlive();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.LS2GC_GSInfo Q_LS2GC_GSInfo() {
		var msg = new Protos.LS2GC_GSInfo();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.LS2GC_AskRegRet Q_LS2GC_AskRegRet() {
		var msg = new Protos.LS2GC_AskRegRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.LS2GC_AskLoginRet Q_LS2GC_AskLoginRet() {
		var msg = new Protos.LS2GC_AskLoginRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.LS2CS_GCLogin Q_LS2CS_GCLogin() {
		var msg = new Protos.LS2CS_GCLogin();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= (uint)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.GS2CS_ReportState Q_GS2CS_ReportState() {
		var msg = new Protos.GS2CS_ReportState();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.GS2CS_GCAskLogin Q_GS2CS_GCAskLogin() {
		var msg = new Protos.GS2CS_GCAskLogin();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= (uint)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.GS2CS_GCLost Q_GS2CS_GCLost() {
		var msg = new Protos.GS2CS_GCLost();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.GS2GC_LoginRet Q_GS2GC_LoginRet() {
		var msg = new Protos.GS2GC_LoginRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.CS2LS_GSInfos Q_CS2LS_GSInfos() {
		var msg = new Protos.CS2LS_GSInfos();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.CS2LS_GSInfo Q_CS2LS_GSInfo() {
		var msg = new Protos.CS2LS_GSInfo();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.CS2LS_GSLost Q_CS2LS_GSLost() {
		var msg = new Protos.CS2LS_GSLost();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.CS2LS_GCLoginRet Q_CS2LS_GCLoginRet() {
		var msg = new Protos.CS2LS_GCLoginRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.CS2GS_GCLoginRet Q_CS2GS_GCLoginRet() {
		var msg = new Protos.CS2GS_GCLoginRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	#endregion

	#region response message static functions
	public static Protos.G_AskPingRet R_G_AskPing( uint pid ) {
		var msg = new Protos.G_AskPingRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= (uint)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.CS2LS_GCLoginRet R_LS2CS_GCLogin( uint pid ) {
		var msg = new Protos.CS2LS_GCLoginRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= (uint)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.LS2GC_AskRegRet R_GC2LS_AskRegister( uint pid ) {
		var msg = new Protos.LS2GC_AskRegRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= (uint)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.LS2GC_AskLoginRet R_GC2LS_AskLogin( uint pid ) {
		var msg = new Protos.LS2GC_AskLoginRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= (uint)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.GS2GC_LoginRet R_GC2GS_AskLogin( uint pid ) {
		var msg = new Protos.GS2GC_LoginRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= (uint)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.CS2GS_GCLoginRet R_GS2CS_GCAskLogin( uint pid ) {
		var msg = new Protos.CS2GS_GCLoginRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= (uint)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	#endregion

	#region decode message static functions
	public static Google.Protobuf.IMessage DecodeMsg( Protos.MsgID msgID, byte[] data, int offset, int size ) {
		switch ( msgID ) {
			case (Protos.MsgID)10: {
				var msg = new Protos.G_AskPing();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)11: {
				var msg = new Protos.G_AskPingRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)100: {
				var msg = new Protos.GC2LS_AskRegister();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)101: {
				var msg = new Protos.GC2LS_AskLogin();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)200: {
				var msg = new Protos.GC2GS_AskLogin();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)201: {
				var msg = new Protos.GC2GS_KeepAlive();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)300: {
				var msg = new Protos.LS2GC_GSInfo();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)301: {
				var msg = new Protos.LS2GC_AskRegRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)302: {
				var msg = new Protos.LS2GC_AskLoginRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)400: {
				var msg = new Protos.LS2CS_GCLogin();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)500: {
				var msg = new Protos.GS2CS_ReportState();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)501: {
				var msg = new Protos.GS2CS_GCAskLogin();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)502: {
				var msg = new Protos.GS2CS_GCLost();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)600: {
				var msg = new Protos.GS2GC_LoginRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)700: {
				var msg = new Protos.CS2LS_GSInfos();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)701: {
				var msg = new Protos.CS2LS_GSInfo();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)702: {
				var msg = new Protos.CS2LS_GSLost();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)703: {
				var msg = new Protos.CS2LS_GCLoginRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)800: {
				var msg = new Protos.CS2GS_GCLoginRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
		}
		return null;
	}

	public static Protos.G_AskPing D_G_AskPing( byte[] data, int offset, int size ) {
		var msg = new Protos.G_AskPing();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.G_AskPingRet D_G_AskPingRet( byte[] data, int offset, int size ) {
		var msg = new Protos.G_AskPingRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GC2LS_AskRegister D_GC2LS_AskRegister( byte[] data, int offset, int size ) {
		var msg = new Protos.GC2LS_AskRegister();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GC2LS_AskLogin D_GC2LS_AskLogin( byte[] data, int offset, int size ) {
		var msg = new Protos.GC2LS_AskLogin();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GC2GS_AskLogin D_GC2GS_AskLogin( byte[] data, int offset, int size ) {
		var msg = new Protos.GC2GS_AskLogin();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GC2GS_KeepAlive D_GC2GS_KeepAlive( byte[] data, int offset, int size ) {
		var msg = new Protos.GC2GS_KeepAlive();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.LS2GC_GSInfo D_LS2GC_GSInfo( byte[] data, int offset, int size ) {
		var msg = new Protos.LS2GC_GSInfo();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.LS2GC_AskRegRet D_LS2GC_AskRegRet( byte[] data, int offset, int size ) {
		var msg = new Protos.LS2GC_AskRegRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.LS2GC_AskLoginRet D_LS2GC_AskLoginRet( byte[] data, int offset, int size ) {
		var msg = new Protos.LS2GC_AskLoginRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.LS2CS_GCLogin D_LS2CS_GCLogin( byte[] data, int offset, int size ) {
		var msg = new Protos.LS2CS_GCLogin();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GS2CS_ReportState D_GS2CS_ReportState( byte[] data, int offset, int size ) {
		var msg = new Protos.GS2CS_ReportState();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GS2CS_GCAskLogin D_GS2CS_GCAskLogin( byte[] data, int offset, int size ) {
		var msg = new Protos.GS2CS_GCAskLogin();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GS2CS_GCLost D_GS2CS_GCLost( byte[] data, int offset, int size ) {
		var msg = new Protos.GS2CS_GCLost();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GS2GC_LoginRet D_GS2GC_LoginRet( byte[] data, int offset, int size ) {
		var msg = new Protos.GS2GC_LoginRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.CS2LS_GSInfos D_CS2LS_GSInfos( byte[] data, int offset, int size ) {
		var msg = new Protos.CS2LS_GSInfos();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.CS2LS_GSInfo D_CS2LS_GSInfo( byte[] data, int offset, int size ) {
		var msg = new Protos.CS2LS_GSInfo();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.CS2LS_GSLost D_CS2LS_GSLost( byte[] data, int offset, int size ) {
		var msg = new Protos.CS2LS_GSLost();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.CS2LS_GCLoginRet D_CS2LS_GCLoginRet( byte[] data, int offset, int size ) {
		var msg = new Protos.CS2LS_GCLoginRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.CS2GS_GCLoginRet D_CS2GS_GCLoginRet( byte[] data, int offset, int size ) {
		var msg = new Protos.CS2GS_GCLoginRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	#endregion

	#region create message static functions
	public static Google.Protobuf.IMessage CreateMsgByID( Protos.MsgID msgID ) {
		switch ( msgID ) {
			case (Protos.MsgID)10: {
				return new Protos.G_AskPing();
			}
			case (Protos.MsgID)11: {
				return new Protos.G_AskPingRet();
			}
			case (Protos.MsgID)100: {
				return new Protos.GC2LS_AskRegister();
			}
			case (Protos.MsgID)101: {
				return new Protos.GC2LS_AskLogin();
			}
			case (Protos.MsgID)200: {
				return new Protos.GC2GS_AskLogin();
			}
			case (Protos.MsgID)201: {
				return new Protos.GC2GS_KeepAlive();
			}
			case (Protos.MsgID)300: {
				return new Protos.LS2GC_GSInfo();
			}
			case (Protos.MsgID)301: {
				return new Protos.LS2GC_AskRegRet();
			}
			case (Protos.MsgID)302: {
				return new Protos.LS2GC_AskLoginRet();
			}
			case (Protos.MsgID)400: {
				return new Protos.LS2CS_GCLogin();
			}
			case (Protos.MsgID)500: {
				return new Protos.GS2CS_ReportState();
			}
			case (Protos.MsgID)501: {
				return new Protos.GS2CS_GCAskLogin();
			}
			case (Protos.MsgID)502: {
				return new Protos.GS2CS_GCLost();
			}
			case (Protos.MsgID)600: {
				return new Protos.GS2GC_LoginRet();
			}
			case (Protos.MsgID)700: {
				return new Protos.CS2LS_GSInfos();
			}
			case (Protos.MsgID)701: {
				return new Protos.CS2LS_GSInfo();
			}
			case (Protos.MsgID)702: {
				return new Protos.CS2LS_GSLost();
			}
			case (Protos.MsgID)703: {
				return new Protos.CS2LS_GCLoginRet();
			}
			case (Protos.MsgID)800: {
				return new Protos.CS2GS_GCLoginRet();
			}
		}
		return null;
	}
	#endregion

	#region get message options static functions
	public static Protos.MsgOpts GetMsgOpts( this Google.Protobuf.IMessage message ) {
		var msgID = message.GetMsgID();
		switch ( msgID ) {
			case (Protos.MsgID)10: {
				return ((Protos.G_AskPing)message).Opts;
			}
			case (Protos.MsgID)11: {
				return ((Protos.G_AskPingRet)message).Opts;
			}
			case (Protos.MsgID)100: {
				return ((Protos.GC2LS_AskRegister)message).Opts;
			}
			case (Protos.MsgID)101: {
				return ((Protos.GC2LS_AskLogin)message).Opts;
			}
			case (Protos.MsgID)200: {
				return ((Protos.GC2GS_AskLogin)message).Opts;
			}
			case (Protos.MsgID)201: {
				return ((Protos.GC2GS_KeepAlive)message).Opts;
			}
			case (Protos.MsgID)300: {
				return ((Protos.LS2GC_GSInfo)message).Opts;
			}
			case (Protos.MsgID)301: {
				return ((Protos.LS2GC_AskRegRet)message).Opts;
			}
			case (Protos.MsgID)302: {
				return ((Protos.LS2GC_AskLoginRet)message).Opts;
			}
			case (Protos.MsgID)400: {
				return ((Protos.LS2CS_GCLogin)message).Opts;
			}
			case (Protos.MsgID)500: {
				return ((Protos.GS2CS_ReportState)message).Opts;
			}
			case (Protos.MsgID)501: {
				return ((Protos.GS2CS_GCAskLogin)message).Opts;
			}
			case (Protos.MsgID)502: {
				return ((Protos.GS2CS_GCLost)message).Opts;
			}
			case (Protos.MsgID)600: {
				return ((Protos.GS2GC_LoginRet)message).Opts;
			}
			case (Protos.MsgID)700: {
				return ((Protos.CS2LS_GSInfos)message).Opts;
			}
			case (Protos.MsgID)701: {
				return ((Protos.CS2LS_GSInfo)message).Opts;
			}
			case (Protos.MsgID)702: {
				return ((Protos.CS2LS_GSLost)message).Opts;
			}
			case (Protos.MsgID)703: {
				return ((Protos.CS2LS_GCLoginRet)message).Opts;
			}
			case (Protos.MsgID)800: {
				return ((Protos.CS2GS_GCLoginRet)message).Opts;
			}
		}
		return null;
	}
	#endregion

	#region get message static functions
	public static Protos.MsgID GetMsgID( System.Type type ) => _TYPE2ID[type];

	public static Protos.MsgID GetMsgID<T>() where T : Google.Protobuf.IMessage => _TYPE2ID[typeof( T )];

	public static Protos.MsgID GetMsgID( this Google.Protobuf.IMessage message ) => _TYPE2ID[message.GetType()];

	public static Protos.MsgID GetMsgID<T>( this Google.Protobuf.IMessage<T> message ) where T : Google.Protobuf.IMessage<T> => _TYPE2ID[message.GetType()];
	#endregion
} //end class
