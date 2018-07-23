import * as $protobuf from "protobufjs";
export namespace Protos {

    namespace GCToLS {

        interface IAskLogin {
            packet?: (Protos.IPacket|null);
            platform?: (number|null);
            uin?: (string|null);
            sessionid?: (string|null);
        }

        class AskLogin implements IAskLogin {
            constructor(properties?: Protos.GCToLS.IAskLogin);
            public packet?: (Protos.IPacket|null);
            public platform: number;
            public uin: string;
            public sessionid: string;
            public static create(properties?: Protos.GCToLS.IAskLogin): Protos.GCToLS.AskLogin;
            public static encode(message: Protos.GCToLS.IAskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: Protos.GCToLS.IAskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GCToLS.AskLogin;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GCToLS.AskLogin;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): Protos.GCToLS.AskLogin;
            public static toObject(message: Protos.GCToLS.AskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }
    }

    enum MsgID {
        Undefine = 0,
        GCToLS_AskLogin = 100,
        LSToGC_LoginResult = 200,
        LSToGC_BSAddr = 201
    }

    interface IResponse {
    }

    class Response implements IResponse {
        constructor(properties?: Protos.IResponse);
        public static create(properties?: Protos.IResponse): Protos.Response;
        public static encode(message: Protos.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.Response;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.Response;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.Response;
        public static toObject(message: Protos.Response, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace Response {

        enum RespID {
            Undefine = 0,
            GCToLS_AskLogin = 200
        }
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

    namespace LSToGC {

        interface ILoginResult {
            packet?: (Protos.IPacket|null);
            result?: (number|null);
        }

        class LoginResult implements ILoginResult {
            constructor(properties?: Protos.LSToGC.ILoginResult);
            public packet?: (Protos.IPacket|null);
            public result: number;
            public static create(properties?: Protos.LSToGC.ILoginResult): Protos.LSToGC.LoginResult;
            public static encode(message: Protos.LSToGC.ILoginResult, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: Protos.LSToGC.ILoginResult, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LSToGC.LoginResult;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LSToGC.LoginResult;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): Protos.LSToGC.LoginResult;
            public static toObject(message: Protos.LSToGC.LoginResult, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface IBSAddr {
            packet?: (Protos.IPacket|null);
            serverinfo?: (Protos.LSToGC.BSAddr.IServerInfo[]|null);
        }

        class BSAddr implements IBSAddr {
            constructor(properties?: Protos.LSToGC.IBSAddr);
            public packet?: (Protos.IPacket|null);
            public serverinfo: Protos.LSToGC.BSAddr.IServerInfo[];
            public static create(properties?: Protos.LSToGC.IBSAddr): Protos.LSToGC.BSAddr;
            public static encode(message: Protos.LSToGC.IBSAddr, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: Protos.LSToGC.IBSAddr, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LSToGC.BSAddr;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LSToGC.BSAddr;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): Protos.LSToGC.BSAddr;
            public static toObject(message: Protos.LSToGC.BSAddr, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace BSAddr {

            interface IServerInfo {
                packet?: (Protos.IPacket|null);
                serverName?: (string|null);
                serverAddr?: (string|null);
                serverPort?: (number|null);
                serverState?: (number|null);
            }

            class ServerInfo implements IServerInfo {
                constructor(properties?: Protos.LSToGC.BSAddr.IServerInfo);
                public packet?: (Protos.IPacket|null);
                public serverName: string;
                public serverAddr: string;
                public serverPort: number;
                public serverState: number;
                public static create(properties?: Protos.LSToGC.BSAddr.IServerInfo): Protos.LSToGC.BSAddr.ServerInfo;
                public static encode(message: Protos.LSToGC.BSAddr.IServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: Protos.LSToGC.BSAddr.IServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LSToGC.BSAddr.ServerInfo;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LSToGC.BSAddr.ServerInfo;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): Protos.LSToGC.BSAddr.ServerInfo;
                public static toObject(message: Protos.LSToGC.BSAddr.ServerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
