import * as $protobuf from "protobufjs";
export namespace Protos {

    namespace GC2LS {

        interface IAskRegister {
            packet?: (Protos.IPacket|null);
            platform?: (number|null);
            sessionid?: (string|null);
            name?: (string|null);
            passwd?: (string|null);
        }

        class AskRegister implements IAskRegister {
            constructor(properties?: Protos.GC2LS.IAskRegister);
            public packet?: (Protos.IPacket|null);
            public platform: number;
            public sessionid: string;
            public name: string;
            public passwd: string;
            public static create(properties?: Protos.GC2LS.IAskRegister): Protos.GC2LS.AskRegister;
            public static encode(message: Protos.GC2LS.IAskRegister, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: Protos.GC2LS.IAskRegister, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2LS.AskRegister;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2LS.AskRegister;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): Protos.GC2LS.AskRegister;
            public static toObject(message: Protos.GC2LS.AskRegister, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface IAskLogin {
            packet?: (Protos.IPacket|null);
            platform?: (number|null);
            uin?: (string|null);
            sessionid?: (string|null);
        }

        class AskLogin implements IAskLogin {
            constructor(properties?: Protos.GC2LS.IAskLogin);
            public packet?: (Protos.IPacket|null);
            public platform: number;
            public uin: string;
            public sessionid: string;
            public static create(properties?: Protos.GC2LS.IAskLogin): Protos.GC2LS.AskLogin;
            public static encode(message: Protos.GC2LS.IAskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: Protos.GC2LS.IAskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2LS.AskLogin;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2LS.AskLogin;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): Protos.GC2LS.AskLogin;
            public static toObject(message: Protos.GC2LS.AskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }
    }

    enum MsgID {
        Undefine = 0,
        GC2LS_AskRegister = 100,
        GC2LS_AskLogin = 101,
        LS2GC_Result = 200,
        LS2GC_GSInfo = 201,
        GS2CS_ReportState = 300
    }

    interface IPacket {
        pid?: (number|null);
        isRequest?: (boolean|null);
        repsPid?: (number|null);
    }

    class Packet implements IPacket {
        constructor(properties?: Protos.IPacket);
        public pid: number;
        public isRequest: boolean;
        public repsPid: number;
        public static create(properties?: Protos.IPacket): Protos.Packet;
        public static encode(message: Protos.IPacket, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IPacket, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.Packet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.Packet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.Packet;
        public static toObject(message: Protos.Packet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace GS2CS {

        interface IReportState {
            packet?: (Protos.IPacket|null);
            name?: (string|null);
            ip?: (string|null);
            port?: (number|null);
            password?: (string|null);
            state?: (Protos.GS2CS.ReportState.State|null);
        }

        class ReportState implements IReportState {
            constructor(properties?: Protos.GS2CS.IReportState);
            public packet?: (Protos.IPacket|null);
            public name: string;
            public ip: string;
            public port: number;
            public password: string;
            public state: Protos.GS2CS.ReportState.State;
            public static create(properties?: Protos.GS2CS.IReportState): Protos.GS2CS.ReportState;
            public static encode(message: Protos.GS2CS.IReportState, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: Protos.GS2CS.IReportState, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2CS.ReportState;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2CS.ReportState;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): Protos.GS2CS.ReportState;
            public static toObject(message: Protos.GS2CS.ReportState, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace ReportState {

            enum State {
                Free = 0,
                Busy = 1,
                Full = 2,
                Close = 3
            }
        }
    }

    namespace LS2GC {

        enum EResult {
            Success = 0,
            Failed = 1,
            UsernameExists = 2,
            IllegalName = 3,
            IllegalPasswd = 4
        }

        interface IResult {
            packet?: (Protos.IPacket|null);
            result?: (Protos.LS2GC.IResult|null);
        }

        class Result implements IResult {
            constructor(properties?: Protos.LS2GC.IResult);
            public packet?: (Protos.IPacket|null);
            public result?: (Protos.LS2GC.IResult|null);
            public static create(properties?: Protos.LS2GC.IResult): Protos.LS2GC.Result;
            public static encode(message: Protos.LS2GC.IResult, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: Protos.LS2GC.IResult, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2GC.Result;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2GC.Result;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): Protos.LS2GC.Result;
            public static toObject(message: Protos.LS2GC.Result, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface IGSInfo {
            packet?: (Protos.IPacket|null);
            serverinfo?: (Protos.LS2GC.GSInfo.IServerInfo[]|null);
        }

        class GSInfo implements IGSInfo {
            constructor(properties?: Protos.LS2GC.IGSInfo);
            public packet?: (Protos.IPacket|null);
            public serverinfo: Protos.LS2GC.GSInfo.IServerInfo[];
            public static create(properties?: Protos.LS2GC.IGSInfo): Protos.LS2GC.GSInfo;
            public static encode(message: Protos.LS2GC.IGSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: Protos.LS2GC.IGSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2GC.GSInfo;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2GC.GSInfo;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): Protos.LS2GC.GSInfo;
            public static toObject(message: Protos.LS2GC.GSInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace GSInfo {

            interface IServerInfo {
                packet?: (Protos.IPacket|null);
                name?: (string|null);
                ip?: (string|null);
                port?: (number|null);
                state?: (number|null);
            }

            class ServerInfo implements IServerInfo {
                constructor(properties?: Protos.LS2GC.GSInfo.IServerInfo);
                public packet?: (Protos.IPacket|null);
                public name: string;
                public ip: string;
                public port: number;
                public state: number;
                public static create(properties?: Protos.LS2GC.GSInfo.IServerInfo): Protos.LS2GC.GSInfo.ServerInfo;
                public static encode(message: Protos.LS2GC.GSInfo.IServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: Protos.LS2GC.GSInfo.IServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2GC.GSInfo.ServerInfo;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2GC.GSInfo.ServerInfo;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): Protos.LS2GC.GSInfo.ServerInfo;
                public static toObject(message: Protos.LS2GC.GSInfo.ServerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
