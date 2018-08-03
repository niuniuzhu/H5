﻿//<auto-generated>
//	Generated by proto generator.  DO NOT EDIT!
//</auto-generated>
//ReSharper disable CheckNamespace
import { Protos } from "../libs/protos";
import protobuf = require( "../libs/protobufjs" );

export class ProtoCreator {
	private static readonly _TYPE2ID = new Map<new () => any, Protos.MsgID>([
		[Protos.G_AskPing, <Protos.MsgID>10],
		[Protos.G_AskPingRet, <Protos.MsgID>11],
		[Protos.GC2LS_AskRegister, <Protos.MsgID>100],
		[Protos.GC2LS_AskLogin, <Protos.MsgID>101],
		[Protos.GC2GS_AskLogin, <Protos.MsgID>200],
		[Protos.LS2GC_RegResult, <Protos.MsgID>300],
		[Protos.LS2GC_LoginResult, <Protos.MsgID>301],
		[Protos.LS2GC_GSInfo, <Protos.MsgID>302],
		[Protos.LS2CS_GCLogin, <Protos.MsgID>400],
		[Protos.GS2CS_ReportState, <Protos.MsgID>500],
		[Protos.GS2CS_GCAskLogin, <Protos.MsgID>501],
		[Protos.GS2GC_LoginResult, <Protos.MsgID>600],
		[Protos.CS2LS_GSInfos, <Protos.MsgID>700],
		[Protos.CS2LS_GSInfo, <Protos.MsgID>701],
		[Protos.CS2LS_GSLost, <Protos.MsgID>702],
		[Protos.CS2LS_GCLoginRet, <Protos.MsgID>703],
		[Protos.CS2GS_GCLoginRet, <Protos.MsgID>800],
	]);

	private static readonly _ID2TYPE = new Map<Protos.MsgID, new () => any>([
		[<Protos.MsgID>10, Protos.G_AskPing],
		[<Protos.MsgID>11, Protos.G_AskPingRet],
		[<Protos.MsgID>100, Protos.GC2LS_AskRegister],
		[<Protos.MsgID>101, Protos.GC2LS_AskLogin],
		[<Protos.MsgID>200, Protos.GC2GS_AskLogin],
		[<Protos.MsgID>300, Protos.LS2GC_RegResult],
		[<Protos.MsgID>301, Protos.LS2GC_LoginResult],
		[<Protos.MsgID>302, Protos.LS2GC_GSInfo],
		[<Protos.MsgID>400, Protos.LS2CS_GCLogin],
		[<Protos.MsgID>500, Protos.GS2CS_ReportState],
		[<Protos.MsgID>501, Protos.GS2CS_GCAskLogin],
		[<Protos.MsgID>600, Protos.GS2GC_LoginResult],
		[<Protos.MsgID>700, Protos.CS2LS_GSInfos],
		[<Protos.MsgID>701, Protos.CS2LS_GSInfo],
		[<Protos.MsgID>702, Protos.CS2LS_GSLost],
		[<Protos.MsgID>703, Protos.CS2LS_GCLoginRet],
		[<Protos.MsgID>800, Protos.CS2GS_GCLoginRet],
	]);

	public static Q_G_AskPing(): Protos.G_AskPing {
		let msg = new Protos.G_AskPing();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_G_AskPingRet(): Protos.G_AskPingRet {
		let msg = new Protos.G_AskPingRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_GC2LS_AskRegister(): Protos.GC2LS_AskRegister {
		let msg = new Protos.GC2LS_AskRegister();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_GC2LS_AskLogin(): Protos.GC2LS_AskLogin {
		let msg = new Protos.GC2LS_AskLogin();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_GC2GS_AskLogin(): Protos.GC2GS_AskLogin {
		let msg = new Protos.GC2GS_AskLogin();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_LS2GC_RegResult(): Protos.LS2GC_RegResult {
		let msg = new Protos.LS2GC_RegResult();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_LS2GC_LoginResult(): Protos.LS2GC_LoginResult {
		let msg = new Protos.LS2GC_LoginResult();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_LS2GC_GSInfo(): Protos.LS2GC_GSInfo {
		let msg = new Protos.LS2GC_GSInfo();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_LS2CS_GCLogin(): Protos.LS2CS_GCLogin {
		let msg = new Protos.LS2CS_GCLogin();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_GS2CS_ReportState(): Protos.GS2CS_ReportState {
		let msg = new Protos.GS2CS_ReportState();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_GS2CS_GCAskLogin(): Protos.GS2CS_GCAskLogin {
		let msg = new Protos.GS2CS_GCAskLogin();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_GS2GC_LoginResult(): Protos.GS2GC_LoginResult {
		let msg = new Protos.GS2GC_LoginResult();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_CS2LS_GSInfos(): Protos.CS2LS_GSInfos {
		let msg = new Protos.CS2LS_GSInfos();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_CS2LS_GSInfo(): Protos.CS2LS_GSInfo {
		let msg = new Protos.CS2LS_GSInfo();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_CS2LS_GSLost(): Protos.CS2LS_GSLost {
		let msg = new Protos.CS2LS_GSLost();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_CS2LS_GCLoginRet(): Protos.CS2LS_GCLoginRet {
		let msg = new Protos.CS2LS_GCLoginRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_CS2GS_GCLoginRet(): Protos.CS2GS_GCLoginRet {
		let msg = new Protos.CS2GS_GCLoginRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}


	public static R_GC2LS_AskRegister(pid: number): Protos.LS2GC_RegResult {
		let msg = new Protos.LS2GC_RegResult();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_GC2LS_AskLogin(pid: number): Protos.LS2GC_LoginResult {
		let msg = new Protos.LS2GC_LoginResult();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_G_AskPing(pid: number): Protos.G_AskPingRet {
		let msg = new Protos.G_AskPingRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_GC2GS_AskLogin(pid: number): Protos.GS2GC_LoginResult {
		let msg = new Protos.GS2GC_LoginResult();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_LS2CS_GCLogin(pid: number): Protos.CS2LS_GCLoginRet {
		let msg = new Protos.CS2LS_GCLoginRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_GS2CS_GCAskLogin(pid: number): Protos.CS2GS_GCLoginRet {
		let msg = new Protos.CS2GS_GCLoginRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}


	public static DecodeMsg(msgID: Protos.MsgID, data: Uint8Array, size: number): any {
		switch ( msgID ) {
			case 10: {
				let msg = Protos.G_AskPing.decode(data, size);
				return msg;
			}
			case 11: {
				let msg = Protos.G_AskPingRet.decode(data, size);
				return msg;
			}
			case 100: {
				let msg = Protos.GC2LS_AskRegister.decode(data, size);
				return msg;
			}
			case 101: {
				let msg = Protos.GC2LS_AskLogin.decode(data, size);
				return msg;
			}
			case 200: {
				let msg = Protos.GC2GS_AskLogin.decode(data, size);
				return msg;
			}
			case 300: {
				let msg = Protos.LS2GC_RegResult.decode(data, size);
				return msg;
			}
			case 301: {
				let msg = Protos.LS2GC_LoginResult.decode(data, size);
				return msg;
			}
			case 302: {
				let msg = Protos.LS2GC_GSInfo.decode(data, size);
				return msg;
			}
			case 400: {
				let msg = Protos.LS2CS_GCLogin.decode(data, size);
				return msg;
			}
			case 500: {
				let msg = Protos.GS2CS_ReportState.decode(data, size);
				return msg;
			}
			case 501: {
				let msg = Protos.GS2CS_GCAskLogin.decode(data, size);
				return msg;
			}
			case 600: {
				let msg = Protos.GS2GC_LoginResult.decode(data, size);
				return msg;
			}
			case 700: {
				let msg = Protos.CS2LS_GSInfos.decode(data, size);
				return msg;
			}
			case 701: {
				let msg = Protos.CS2LS_GSInfo.decode(data, size);
				return msg;
			}
			case 702: {
				let msg = Protos.CS2LS_GSLost.decode(data, size);
				return msg;
			}
			case 703: {
				let msg = Protos.CS2LS_GCLoginRet.decode(data, size);
				return msg;
			}
			case 800: {
				let msg = Protos.CS2GS_GCLoginRet.decode(data, size);
				return msg;
			}
		}
		return null;
	}

	public static D_G_AskPing(data: Uint8Array, size: number): Protos.G_AskPing {
		let msg = Protos.G_AskPing.decode(data, size);
		return msg;
	}

	public static D_G_AskPingRet(data: Uint8Array, size: number): Protos.G_AskPingRet {
		let msg = Protos.G_AskPingRet.decode(data, size);
		return msg;
	}

	public static D_GC2LS_AskRegister(data: Uint8Array, size: number): Protos.GC2LS_AskRegister {
		let msg = Protos.GC2LS_AskRegister.decode(data, size);
		return msg;
	}

	public static D_GC2LS_AskLogin(data: Uint8Array, size: number): Protos.GC2LS_AskLogin {
		let msg = Protos.GC2LS_AskLogin.decode(data, size);
		return msg;
	}

	public static D_GC2GS_AskLogin(data: Uint8Array, size: number): Protos.GC2GS_AskLogin {
		let msg = Protos.GC2GS_AskLogin.decode(data, size);
		return msg;
	}

	public static D_LS2GC_RegResult(data: Uint8Array, size: number): Protos.LS2GC_RegResult {
		let msg = Protos.LS2GC_RegResult.decode(data, size);
		return msg;
	}

	public static D_LS2GC_LoginResult(data: Uint8Array, size: number): Protos.LS2GC_LoginResult {
		let msg = Protos.LS2GC_LoginResult.decode(data, size);
		return msg;
	}

	public static D_LS2GC_GSInfo(data: Uint8Array, size: number): Protos.LS2GC_GSInfo {
		let msg = Protos.LS2GC_GSInfo.decode(data, size);
		return msg;
	}

	public static D_LS2CS_GCLogin(data: Uint8Array, size: number): Protos.LS2CS_GCLogin {
		let msg = Protos.LS2CS_GCLogin.decode(data, size);
		return msg;
	}

	public static D_GS2CS_ReportState(data: Uint8Array, size: number): Protos.GS2CS_ReportState {
		let msg = Protos.GS2CS_ReportState.decode(data, size);
		return msg;
	}

	public static D_GS2CS_GCAskLogin(data: Uint8Array, size: number): Protos.GS2CS_GCAskLogin {
		let msg = Protos.GS2CS_GCAskLogin.decode(data, size);
		return msg;
	}

	public static D_GS2GC_LoginResult(data: Uint8Array, size: number): Protos.GS2GC_LoginResult {
		let msg = Protos.GS2GC_LoginResult.decode(data, size);
		return msg;
	}

	public static D_CS2LS_GSInfos(data: Uint8Array, size: number): Protos.CS2LS_GSInfos {
		let msg = Protos.CS2LS_GSInfos.decode(data, size);
		return msg;
	}

	public static D_CS2LS_GSInfo(data: Uint8Array, size: number): Protos.CS2LS_GSInfo {
		let msg = Protos.CS2LS_GSInfo.decode(data, size);
		return msg;
	}

	public static D_CS2LS_GSLost(data: Uint8Array, size: number): Protos.CS2LS_GSLost {
		let msg = Protos.CS2LS_GSLost.decode(data, size);
		return msg;
	}

	public static D_CS2LS_GCLoginRet(data: Uint8Array, size: number): Protos.CS2LS_GCLoginRet {
		let msg = Protos.CS2LS_GCLoginRet.decode(data, size);
		return msg;
	}

	public static D_CS2GS_GCLoginRet(data: Uint8Array, size: number): Protos.CS2GS_GCLoginRet {
		let msg = Protos.CS2GS_GCLoginRet.decode(data, size);
		return msg;
	}


	public static CreateMsgByID(msgID:Protos.MsgID): any {
		switch ( msgID ) {
			case 10: {
				return new Protos.G_AskPing();
			}
			case 11: {
				return new Protos.G_AskPingRet();
			}
			case 100: {
				return new Protos.GC2LS_AskRegister();
			}
			case 101: {
				return new Protos.GC2LS_AskLogin();
			}
			case 200: {
				return new Protos.GC2GS_AskLogin();
			}
			case 300: {
				return new Protos.LS2GC_RegResult();
			}
			case 301: {
				return new Protos.LS2GC_LoginResult();
			}
			case 302: {
				return new Protos.LS2GC_GSInfo();
			}
			case 400: {
				return new Protos.LS2CS_GCLogin();
			}
			case 500: {
				return new Protos.GS2CS_ReportState();
			}
			case 501: {
				return new Protos.GS2CS_GCAskLogin();
			}
			case 600: {
				return new Protos.GS2GC_LoginResult();
			}
			case 700: {
				return new Protos.CS2LS_GSInfos();
			}
			case 701: {
				return new Protos.CS2LS_GSInfo();
			}
			case 702: {
				return new Protos.CS2LS_GSLost();
			}
			case 703: {
				return new Protos.CS2LS_GCLoginRet();
			}
			case 800: {
				return new Protos.CS2GS_GCLoginRet();
			}
		}
		return null;
	}

	public static GetMsgOpts(message: any): Protos.IMsgOpts {
		let msgID = ProtoCreator.GetMsgID(message);
		switch ( msgID ) {
			case 10: {
				return (<Protos.G_AskPing>message).opts;
			}
			case 11: {
				return (<Protos.G_AskPingRet>message).opts;
			}
			case 100: {
				return (<Protos.GC2LS_AskRegister>message).opts;
			}
			case 101: {
				return (<Protos.GC2LS_AskLogin>message).opts;
			}
			case 200: {
				return (<Protos.GC2GS_AskLogin>message).opts;
			}
			case 300: {
				return (<Protos.LS2GC_RegResult>message).opts;
			}
			case 301: {
				return (<Protos.LS2GC_LoginResult>message).opts;
			}
			case 302: {
				return (<Protos.LS2GC_GSInfo>message).opts;
			}
			case 400: {
				return (<Protos.LS2CS_GCLogin>message).opts;
			}
			case 500: {
				return (<Protos.GS2CS_ReportState>message).opts;
			}
			case 501: {
				return (<Protos.GS2CS_GCAskLogin>message).opts;
			}
			case 600: {
				return (<Protos.GS2GC_LoginResult>message).opts;
			}
			case 700: {
				return (<Protos.CS2LS_GSInfos>message).opts;
			}
			case 701: {
				return (<Protos.CS2LS_GSInfo>message).opts;
			}
			case 702: {
				return (<Protos.CS2LS_GSLost>message).opts;
			}
			case 703: {
				return (<Protos.CS2LS_GCLoginRet>message).opts;
			}
			case 800: {
				return (<Protos.CS2GS_GCLoginRet>message).opts;
			}
		}
		return null;
	}

	public static GetMsgIDByType(type: new () => any): Protos.MsgID { return ProtoCreator._TYPE2ID.get(type); }

	public static GetMsgID(message: any): Protos.MsgID { return ProtoCreator._TYPE2ID.get(message.constructor); }

} //end class
