import * as $protobuf from "protobufjs";
/** Namespace Protos. */
export namespace Protos {

    /** Namespace GCToLS. */
    namespace GCToLS {

        /** Properties of an AskLogin. */
        interface IAskLogin {

            /** AskLogin packet */
            packet?: (Protos.IPacket|null);

            /** AskLogin platform */
            platform?: (number|null);

            /** AskLogin uin */
            uin?: (string|null);

            /** AskLogin sessionid */
            sessionid?: (string|null);
        }

        /** Represents an AskLogin. */
        class AskLogin implements IAskLogin {

            /**
             * Constructs a new AskLogin.
             * @param [properties] Properties to set
             */
            constructor(properties?: Protos.GCToLS.IAskLogin);

            /** AskLogin packet. */
            public packet?: (Protos.IPacket|null);

            /** AskLogin platform. */
            public platform: number;

            /** AskLogin uin. */
            public uin: string;

            /** AskLogin sessionid. */
            public sessionid: string;

            /**
             * Creates a new AskLogin instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AskLogin instance
             */
            public static create(properties?: Protos.GCToLS.IAskLogin): Protos.GCToLS.AskLogin;

            /**
             * Encodes the specified AskLogin message. Does not implicitly {@link Protos.GCToLS.AskLogin.verify|verify} messages.
             * @param message AskLogin message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Protos.GCToLS.IAskLogin, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AskLogin message, length delimited. Does not implicitly {@link Protos.GCToLS.AskLogin.verify|verify} messages.
             * @param message AskLogin message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Protos.GCToLS.IAskLogin, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AskLogin message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GCToLS.AskLogin;

            /**
             * Decodes an AskLogin message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GCToLS.AskLogin;

            /**
             * Verifies an AskLogin message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AskLogin message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AskLogin
             */
            public static fromObject(object: { [k: string]: any }): Protos.GCToLS.AskLogin;

            /**
             * Creates a plain object from an AskLogin message. Also converts values to other types if specified.
             * @param message AskLogin
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Protos.GCToLS.AskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AskLogin to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** MsgID enum. */
    enum MsgID {
        Undefine = 0,
        GCToLS_AskLogin = 100,
        LSToGC_LoginResult = 200,
        LSToGC_BSAddr = 201
    }

    /** Properties of a Response. */
    interface IResponse {
    }

    /** Represents a Response. */
    class Response implements IResponse {

        /**
         * Constructs a new Response.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IResponse);

        /**
         * Creates a new Response instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Response instance
         */
        public static create(properties?: Protos.IResponse): Protos.Response;

        /**
         * Encodes the specified Response message. Does not implicitly {@link Protos.Response.verify|verify} messages.
         * @param message Response message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Response message, length delimited. Does not implicitly {@link Protos.Response.verify|verify} messages.
         * @param message Response message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Response message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.Response;

        /**
         * Decodes a Response message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.Response;

        /**
         * Verifies a Response message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Response message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Response
         */
        public static fromObject(object: { [k: string]: any }): Protos.Response;

        /**
         * Creates a plain object from a Response message. Also converts values to other types if specified.
         * @param message Response
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Response to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Response {

        /** RespID enum. */
        enum RespID {
            Undefine = 0,
            GCToLS_AskLogin = 200
        }
    }

    /** Properties of a Packet. */
    interface IPacket {

        /** Packet pid */
        pid?: (number|null);

        /** Packet isRequest */
        isRequest?: (boolean|null);

        /** Packet repsPid */
        repsPid?: (number|null);
    }

    /** Represents a Packet. */
    class Packet implements IPacket {

        /**
         * Constructs a new Packet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IPacket);

        /** Packet pid. */
        public pid: number;

        /** Packet isRequest. */
        public isRequest: boolean;

        /** Packet repsPid. */
        public repsPid: number;

        /**
         * Creates a new Packet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Packet instance
         */
        public static create(properties?: Protos.IPacket): Protos.Packet;

        /**
         * Encodes the specified Packet message. Does not implicitly {@link Protos.Packet.verify|verify} messages.
         * @param message Packet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Packet message, length delimited. Does not implicitly {@link Protos.Packet.verify|verify} messages.
         * @param message Packet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Packet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.Packet;

        /**
         * Decodes a Packet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.Packet;

        /**
         * Verifies a Packet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Packet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Packet
         */
        public static fromObject(object: { [k: string]: any }): Protos.Packet;

        /**
         * Creates a plain object from a Packet message. Also converts values to other types if specified.
         * @param message Packet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.Packet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Packet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Namespace LSToGC. */
    namespace LSToGC {

        /** Properties of a LoginResult. */
        interface ILoginResult {

            /** LoginResult packet */
            packet?: (Protos.IPacket|null);

            /** LoginResult result */
            result?: (number|null);
        }

        /** Represents a LoginResult. */
        class LoginResult implements ILoginResult {

            /**
             * Constructs a new LoginResult.
             * @param [properties] Properties to set
             */
            constructor(properties?: Protos.LSToGC.ILoginResult);

            /** LoginResult packet. */
            public packet?: (Protos.IPacket|null);

            /** LoginResult result. */
            public result: number;

            /**
             * Creates a new LoginResult instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LoginResult instance
             */
            public static create(properties?: Protos.LSToGC.ILoginResult): Protos.LSToGC.LoginResult;

            /**
             * Encodes the specified LoginResult message. Does not implicitly {@link Protos.LSToGC.LoginResult.verify|verify} messages.
             * @param message LoginResult message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Protos.LSToGC.ILoginResult, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LoginResult message, length delimited. Does not implicitly {@link Protos.LSToGC.LoginResult.verify|verify} messages.
             * @param message LoginResult message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Protos.LSToGC.ILoginResult, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LoginResult message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LoginResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LSToGC.LoginResult;

            /**
             * Decodes a LoginResult message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LoginResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LSToGC.LoginResult;

            /**
             * Verifies a LoginResult message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LoginResult message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LoginResult
             */
            public static fromObject(object: { [k: string]: any }): Protos.LSToGC.LoginResult;

            /**
             * Creates a plain object from a LoginResult message. Also converts values to other types if specified.
             * @param message LoginResult
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Protos.LSToGC.LoginResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LoginResult to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ServerInfo. */
        interface IServerInfo {

            /** ServerInfo packet */
            packet?: (Protos.IPacket|null);

            /** ServerInfo serverName */
            serverName?: (string|null);

            /** ServerInfo serverAddr */
            serverAddr?: (string|null);

            /** ServerInfo serverPort */
            serverPort?: (number|null);

            /** ServerInfo serverState */
            serverState?: (number|null);
        }

        /** Represents a ServerInfo. */
        class ServerInfo implements IServerInfo {

            /**
             * Constructs a new ServerInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: Protos.LSToGC.IServerInfo);

            /** ServerInfo packet. */
            public packet?: (Protos.IPacket|null);

            /** ServerInfo serverName. */
            public serverName: string;

            /** ServerInfo serverAddr. */
            public serverAddr: string;

            /** ServerInfo serverPort. */
            public serverPort: number;

            /** ServerInfo serverState. */
            public serverState: number;

            /**
             * Creates a new ServerInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServerInfo instance
             */
            public static create(properties?: Protos.LSToGC.IServerInfo): Protos.LSToGC.ServerInfo;

            /**
             * Encodes the specified ServerInfo message. Does not implicitly {@link Protos.LSToGC.ServerInfo.verify|verify} messages.
             * @param message ServerInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Protos.LSToGC.IServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServerInfo message, length delimited. Does not implicitly {@link Protos.LSToGC.ServerInfo.verify|verify} messages.
             * @param message ServerInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Protos.LSToGC.IServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServerInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LSToGC.ServerInfo;

            /**
             * Decodes a ServerInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LSToGC.ServerInfo;

            /**
             * Verifies a ServerInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServerInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServerInfo
             */
            public static fromObject(object: { [k: string]: any }): Protos.LSToGC.ServerInfo;

            /**
             * Creates a plain object from a ServerInfo message. Also converts values to other types if specified.
             * @param message ServerInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Protos.LSToGC.ServerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServerInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a BSAddr. */
        interface IBSAddr {

            /** BSAddr packet */
            packet?: (Protos.IPacket|null);

            /** BSAddr serverinfo */
            serverinfo?: (Protos.LSToGC.IServerInfo[]|null);
        }

        /** Represents a BSAddr. */
        class BSAddr implements IBSAddr {

            /**
             * Constructs a new BSAddr.
             * @param [properties] Properties to set
             */
            constructor(properties?: Protos.LSToGC.IBSAddr);

            /** BSAddr packet. */
            public packet?: (Protos.IPacket|null);

            /** BSAddr serverinfo. */
            public serverinfo: Protos.LSToGC.IServerInfo[];

            /**
             * Creates a new BSAddr instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BSAddr instance
             */
            public static create(properties?: Protos.LSToGC.IBSAddr): Protos.LSToGC.BSAddr;

            /**
             * Encodes the specified BSAddr message. Does not implicitly {@link Protos.LSToGC.BSAddr.verify|verify} messages.
             * @param message BSAddr message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Protos.LSToGC.IBSAddr, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BSAddr message, length delimited. Does not implicitly {@link Protos.LSToGC.BSAddr.verify|verify} messages.
             * @param message BSAddr message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Protos.LSToGC.IBSAddr, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BSAddr message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BSAddr
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LSToGC.BSAddr;

            /**
             * Decodes a BSAddr message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BSAddr
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LSToGC.BSAddr;

            /**
             * Verifies a BSAddr message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BSAddr message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BSAddr
             */
            public static fromObject(object: { [k: string]: any }): Protos.LSToGC.BSAddr;

            /**
             * Creates a plain object from a BSAddr message. Also converts values to other types if specified.
             * @param message BSAddr
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Protos.LSToGC.BSAddr, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BSAddr to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
