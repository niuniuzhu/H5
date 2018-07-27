import * as $protobuf from "protobufjs";
export namespace Protos {

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

    enum MsgID {
        Undefine = 0,
        eG_AskPing = 10,
        eG_AskPingRet = 11,
        eGC2LS_AskRegister = 100,
        eGC2LS_AskLogin = 101,
        eLS2GC_Result = 200,
        eLS2GC_GSInfo = 201,
        eGS2CS_ReportState = 300,
        eCS2LS_GSInfos = 500,
        eCS2LS_GSInfo = 501,
        eCS2LS_GSLost = 502
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
        time?: (number|Long|null);
    }

    class G_AskPing implements IG_AskPing {
        constructor(properties?: Protos.IG_AskPing);
        public opts?: (Protos.IMsgOpts|null);
        public time: (number|Long);
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
        stime?: (number|Long|null);
        time?: (number|Long|null);
    }

    class G_AskPingRet implements IG_AskPingRet {
        constructor(properties?: Protos.IG_AskPingRet);
        public opts?: (Protos.IMsgOpts|null);
        public stime: (number|Long);
        public time: (number|Long);
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

    interface IGC2LS_AskRegister {
        opts?: (Protos.IMsgOpts|null);
        sdk?: (number|null);
        name?: (string|null);
        passwd?: (string|null);
        platform?: (number|null);
        ip?: (string|null);
    }

    class GC2LS_AskRegister implements IGC2LS_AskRegister {
        constructor(properties?: Protos.IGC2LS_AskRegister);
        public opts?: (Protos.IMsgOpts|null);
        public sdk: number;
        public name: string;
        public passwd: string;
        public platform: number;
        public ip: string;
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
        platform?: (number|null);
        uin?: (string|null);
        sessionid?: (string|null);
    }

    class GC2LS_AskLogin implements IGC2LS_AskLogin {
        constructor(properties?: Protos.IGC2LS_AskLogin);
        public opts?: (Protos.IMsgOpts|null);
        public platform: number;
        public uin: string;
        public sessionid: string;
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

    interface ILS2GC_Result {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.LS2GC_Result.EResult|null);
    }

    class LS2GC_Result implements ILS2GC_Result {
        constructor(properties?: Protos.ILS2GC_Result);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.LS2GC_Result.EResult;
        public static create(properties?: Protos.ILS2GC_Result): Protos.LS2GC_Result;
        public static encode(message: Protos.ILS2GC_Result, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ILS2GC_Result, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2GC_Result;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2GC_Result;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.LS2GC_Result;
        public static toObject(message: Protos.LS2GC_Result, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace LS2GC_Result {

        enum EResult {
            Success = 0,
            Failed = 1,
            UsernameExists = 2,
            IllegalName = 3,
            IllegalPasswd = 4
        }
    }

    interface ILS2GC_GSInfo {
        opts?: (Protos.IMsgOpts|null);
        gsInfo?: (Protos.IGSInfo[]|null);
    }

    class LS2GC_GSInfo implements ILS2GC_GSInfo {
        constructor(properties?: Protos.ILS2GC_GSInfo);
        public opts?: (Protos.IMsgOpts|null);
        public gsInfo: Protos.IGSInfo[];
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
