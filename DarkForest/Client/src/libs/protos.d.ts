import * as $protobuf from "../../node_modules/@types/protobufjs/index";
export namespace Protos {

    interface ICS2GS_GCLoginRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.CS2GS_GCLoginRet.EResult|null);
    }

    class CS2GS_GCLoginRet implements ICS2GS_GCLoginRet {
        constructor(properties?: Protos.ICS2GS_GCLoginRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.CS2GS_GCLoginRet.EResult;
        public static create(properties?: Protos.ICS2GS_GCLoginRet): Protos.CS2GS_GCLoginRet;
        public static encode(message: Protos.ICS2GS_GCLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GS_GCLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GS_GCLoginRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GS_GCLoginRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GS_GCLoginRet;
        public static toObject(message: Protos.CS2GS_GCLoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace CS2GS_GCLoginRet {

        enum EResult {
            Success = 0,
            Failed = 1
        }
    }

    interface ICS2GS_KeepAlive {
        opts?: (Protos.IMsgOpts|null);
    }

    class CS2GS_KeepAlive implements ICS2GS_KeepAlive {
        constructor(properties?: Protos.ICS2GS_KeepAlive);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.ICS2GS_KeepAlive): Protos.CS2GS_KeepAlive;
        public static encode(message: Protos.ICS2GS_KeepAlive, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GS_KeepAlive, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GS_KeepAlive;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GS_KeepAlive;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GS_KeepAlive;
        public static toObject(message: Protos.CS2GS_KeepAlive, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum MsgID {
        Undefine = 0,
        eG_AskPing = 10,
        eG_AskPingRet = 11,
        eGC2LS_AskRegister = 100,
        eGC2LS_AskLogin = 101,
        eGC2GS_AskLogin = 200,
        eLS2GC_RegResult = 300,
        eLS2GC_LoginResult = 301,
        eLS2GC_GSInfo = 302,
        eLS2CS_GCLogin = 400,
        eGS2CS_ReportState = 500,
        eGS2CS_GCAskLogin = 501,
        eGS2GC_LoginResult = 600,
        eCS2LS_GSInfos = 700,
        eCS2LS_GSInfo = 701,
        eCS2LS_GSLost = 702,
        eCS2LS_GCLoginRet = 703,
        eCS2GS_GCLoginRet = 800,
        eCS2GS_KeepAlive = 801
    }

    interface IMsgOpts {
        flag?: (number|null);
        pid?: (number|null);
        rpid?: (number|null);
        nsid?: (number|null);
    }

    class MsgOpts implements IMsgOpts {
        constructor(properties?: Protos.IMsgOpts);
        public flag: number;
        public pid: number;
        public rpid: number;
        public nsid: number;
        public static create(properties?: Protos.IMsgOpts): Protos.MsgOpts;
        public static encode(message: Protos.IMsgOpts, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IMsgOpts, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.MsgOpts;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.MsgOpts;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.MsgOpts;
        public static toObject(message: Protos.MsgOpts, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace MsgOpts {

        enum Flag {
            Unused = 0,
            RPC = 1,
            RESP = 2,
            TRANS = 4
        }
    }

    interface IG_AskPing {
        opts?: (Protos.IMsgOpts|null);
        time?: (Long|null);
    }

    class G_AskPing implements IG_AskPing {
        constructor(properties?: Protos.IG_AskPing);
        public opts?: (Protos.IMsgOpts|null);
        public time: Long;
        public static create(properties?: Protos.IG_AskPing): Protos.G_AskPing;
        public static encode(message: Protos.IG_AskPing, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IG_AskPing, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.G_AskPing;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.G_AskPing;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.G_AskPing;
        public static toObject(message: Protos.G_AskPing, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IG_AskPingRet {
        opts?: (Protos.IMsgOpts|null);
        stime?: (Long|null);
        time?: (Long|null);
    }

    class G_AskPingRet implements IG_AskPingRet {
        constructor(properties?: Protos.IG_AskPingRet);
        public opts?: (Protos.IMsgOpts|null);
        public stime: Long;
        public time: Long;
        public static create(properties?: Protos.IG_AskPingRet): Protos.G_AskPingRet;
        public static encode(message: Protos.IG_AskPingRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IG_AskPingRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.G_AskPingRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.G_AskPingRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.G_AskPingRet;
        public static toObject(message: Protos.G_AskPingRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2LS_GSInfos {
        opts?: (Protos.IMsgOpts|null);
        gsInfo?: (Protos.IGSInfo[]|null);
    }

    class CS2LS_GSInfos implements ICS2LS_GSInfos {
        constructor(properties?: Protos.ICS2LS_GSInfos);
        public opts?: (Protos.IMsgOpts|null);
        public gsInfo: Protos.IGSInfo[];
        public static create(properties?: Protos.ICS2LS_GSInfos): Protos.CS2LS_GSInfos;
        public static encode(message: Protos.ICS2LS_GSInfos, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2LS_GSInfos, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2LS_GSInfos;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2LS_GSInfos;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2LS_GSInfos;
        public static toObject(message: Protos.CS2LS_GSInfos, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2LS_GSInfo {
        opts?: (Protos.IMsgOpts|null);
        gsInfo?: (Protos.IGSInfo|null);
    }

    class CS2LS_GSInfo implements ICS2LS_GSInfo {
        constructor(properties?: Protos.ICS2LS_GSInfo);
        public opts?: (Protos.IMsgOpts|null);
        public gsInfo?: (Protos.IGSInfo|null);
        public static create(properties?: Protos.ICS2LS_GSInfo): Protos.CS2LS_GSInfo;
        public static encode(message: Protos.ICS2LS_GSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2LS_GSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2LS_GSInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2LS_GSInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2LS_GSInfo;
        public static toObject(message: Protos.CS2LS_GSInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2LS_GSLost {
        opts?: (Protos.IMsgOpts|null);
        gsid?: (number|null);
    }

    class CS2LS_GSLost implements ICS2LS_GSLost {
        constructor(properties?: Protos.ICS2LS_GSLost);
        public opts?: (Protos.IMsgOpts|null);
        public gsid: number;
        public static create(properties?: Protos.ICS2LS_GSLost): Protos.CS2LS_GSLost;
        public static encode(message: Protos.ICS2LS_GSLost, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2LS_GSLost, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2LS_GSLost;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2LS_GSLost;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2LS_GSLost;
        public static toObject(message: Protos.CS2LS_GSLost, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2LS_GCLoginRet {
        opts?: (Protos.IMsgOpts|null);
    }

    class CS2LS_GCLoginRet implements ICS2LS_GCLoginRet {
        constructor(properties?: Protos.ICS2LS_GCLoginRet);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.ICS2LS_GCLoginRet): Protos.CS2LS_GCLoginRet;
        public static encode(message: Protos.ICS2LS_GCLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2LS_GCLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2LS_GCLoginRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2LS_GCLoginRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2LS_GCLoginRet;
        public static toObject(message: Protos.CS2LS_GCLoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGSInfo {
        id?: (number|null);
        name?: (string|null);
        ip?: (string|null);
        port?: (number|null);
        password?: (string|null);
        state?: (Protos.GSInfo.State|null);
    }

    class GSInfo implements IGSInfo {
        constructor(properties?: Protos.IGSInfo);
        public id: number;
        public name: string;
        public ip: string;
        public port: number;
        public password: string;
        public state: Protos.GSInfo.State;
        public static create(properties?: Protos.IGSInfo): Protos.GSInfo;
        public static encode(message: Protos.IGSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GSInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GSInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GSInfo;
        public static toObject(message: Protos.GSInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace GSInfo {

        enum State {
            Free = 0,
            Busy = 1,
            Full = 2,
            Close = 3
        }
    }

    interface IGS2CS_ReportState {
        opts?: (Protos.IMsgOpts|null);
        gsInfo?: (Protos.IGSInfo|null);
    }

    class GS2CS_ReportState implements IGS2CS_ReportState {
        constructor(properties?: Protos.IGS2CS_ReportState);
        public opts?: (Protos.IMsgOpts|null);
        public gsInfo?: (Protos.IGSInfo|null);
        public static create(properties?: Protos.IGS2CS_ReportState): Protos.GS2CS_ReportState;
        public static encode(message: Protos.IGS2CS_ReportState, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGS2CS_ReportState, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2CS_ReportState;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2CS_ReportState;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GS2CS_ReportState;
        public static toObject(message: Protos.GS2CS_ReportState, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGS2CS_GCAskLogin {
        opts?: (Protos.IMsgOpts|null);
        sessionID?: (Long|null);
    }

    class GS2CS_GCAskLogin implements IGS2CS_GCAskLogin {
        constructor(properties?: Protos.IGS2CS_GCAskLogin);
        public opts?: (Protos.IMsgOpts|null);
        public sessionID: Long;
        public static create(properties?: Protos.IGS2CS_GCAskLogin): Protos.GS2CS_GCAskLogin;
        public static encode(message: Protos.IGS2CS_GCAskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGS2CS_GCAskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2CS_GCAskLogin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2CS_GCAskLogin;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GS2CS_GCAskLogin;
        public static toObject(message: Protos.GS2CS_GCAskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2GS_AskLogin {
        opts?: (Protos.IMsgOpts|null);
        pwd?: (string|null);
        sessionID?: (Long|null);
    }

    class GC2GS_AskLogin implements IGC2GS_AskLogin {
        constructor(properties?: Protos.IGC2GS_AskLogin);
        public opts?: (Protos.IMsgOpts|null);
        public pwd: string;
        public sessionID: Long;
        public static create(properties?: Protos.IGC2GS_AskLogin): Protos.GC2GS_AskLogin;
        public static encode(message: Protos.IGC2GS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2GS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2GS_AskLogin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2GS_AskLogin;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2GS_AskLogin;
        public static toObject(message: Protos.GC2GS_AskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2LS_AskRegister {
        opts?: (Protos.IMsgOpts|null);
        sdk?: (number|null);
        name?: (string|null);
        passwd?: (string|null);
        platform?: (number|null);
    }

    class GC2LS_AskRegister implements IGC2LS_AskRegister {
        constructor(properties?: Protos.IGC2LS_AskRegister);
        public opts?: (Protos.IMsgOpts|null);
        public sdk: number;
        public name: string;
        public passwd: string;
        public platform: number;
        public static create(properties?: Protos.IGC2LS_AskRegister): Protos.GC2LS_AskRegister;
        public static encode(message: Protos.IGC2LS_AskRegister, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2LS_AskRegister, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2LS_AskRegister;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2LS_AskRegister;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2LS_AskRegister;
        public static toObject(message: Protos.GC2LS_AskRegister, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2LS_AskLogin {
        opts?: (Protos.IMsgOpts|null);
        name?: (string|null);
        passwd?: (string|null);
    }

    class GC2LS_AskLogin implements IGC2LS_AskLogin {
        constructor(properties?: Protos.IGC2LS_AskLogin);
        public opts?: (Protos.IMsgOpts|null);
        public name: string;
        public passwd: string;
        public static create(properties?: Protos.IGC2LS_AskLogin): Protos.GC2LS_AskLogin;
        public static encode(message: Protos.IGC2LS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2LS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2LS_AskLogin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2LS_AskLogin;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2LS_AskLogin;
        public static toObject(message: Protos.GC2LS_AskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGS2GC_LoginResult {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.GS2GC_LoginResult.EResult|null);
    }

    class GS2GC_LoginResult implements IGS2GC_LoginResult {
        constructor(properties?: Protos.IGS2GC_LoginResult);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.GS2GC_LoginResult.EResult;
        public static create(properties?: Protos.IGS2GC_LoginResult): Protos.GS2GC_LoginResult;
        public static encode(message: Protos.IGS2GC_LoginResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGS2GC_LoginResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2GC_LoginResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2GC_LoginResult;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GS2GC_LoginResult;
        public static toObject(message: Protos.GS2GC_LoginResult, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace GS2GC_LoginResult {

        enum EResult {
            Success = 0,
            Failed = 1
        }
    }

    interface ILS2CS_GCLogin {
        opts?: (Protos.IMsgOpts|null);
        sessionID?: (Long|null);
    }

    class LS2CS_GCLogin implements ILS2CS_GCLogin {
        constructor(properties?: Protos.ILS2CS_GCLogin);
        public opts?: (Protos.IMsgOpts|null);
        public sessionID: Long;
        public static create(properties?: Protos.ILS2CS_GCLogin): Protos.LS2CS_GCLogin;
        public static encode(message: Protos.ILS2CS_GCLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ILS2CS_GCLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2CS_GCLogin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2CS_GCLogin;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.LS2CS_GCLogin;
        public static toObject(message: Protos.LS2CS_GCLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILS2GC_RegResult {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.LS2GC_RegResult.EResult|null);
    }

    class LS2GC_RegResult implements ILS2GC_RegResult {
        constructor(properties?: Protos.ILS2GC_RegResult);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.LS2GC_RegResult.EResult;
        public static create(properties?: Protos.ILS2GC_RegResult): Protos.LS2GC_RegResult;
        public static encode(message: Protos.ILS2GC_RegResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ILS2GC_RegResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2GC_RegResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2GC_RegResult;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.LS2GC_RegResult;
        public static toObject(message: Protos.LS2GC_RegResult, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace LS2GC_RegResult {

        enum EResult {
            Success = 0,
            Failed = 1,
            UnameExists = 2,
            UnameIllegal = 3,
            PwdIllegal = 4
        }
    }

    interface ILS2GC_LoginResult {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.LS2GC_LoginResult.EResult|null);
        sessionID?: (Long|null);
        gsInfos?: (Protos.IGSInfo[]|null);
    }

    class LS2GC_LoginResult implements ILS2GC_LoginResult {
        constructor(properties?: Protos.ILS2GC_LoginResult);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.LS2GC_LoginResult.EResult;
        public sessionID: Long;
        public gsInfos: Protos.IGSInfo[];
        public static create(properties?: Protos.ILS2GC_LoginResult): Protos.LS2GC_LoginResult;
        public static encode(message: Protos.ILS2GC_LoginResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ILS2GC_LoginResult, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2GC_LoginResult;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2GC_LoginResult;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.LS2GC_LoginResult;
        public static toObject(message: Protos.LS2GC_LoginResult, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace LS2GC_LoginResult {

        enum EResult {
            Success = 0,
            Failed = 1,
            InvalidUname = 2,
            InvalidPwd = 3
        }
    }

    interface ILS2GC_GSInfo {
        opts?: (Protos.IMsgOpts|null);
        gsInfos?: (Protos.IGSInfo[]|null);
    }

    class LS2GC_GSInfo implements ILS2GC_GSInfo {
        constructor(properties?: Protos.ILS2GC_GSInfo);
        public opts?: (Protos.IMsgOpts|null);
        public gsInfos: Protos.IGSInfo[];
        public static create(properties?: Protos.ILS2GC_GSInfo): Protos.LS2GC_GSInfo;
        public static encode(message: Protos.ILS2GC_GSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ILS2GC_GSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2GC_GSInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2GC_GSInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.LS2GC_GSInfo;
        public static toObject(message: Protos.LS2GC_GSInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }
}
