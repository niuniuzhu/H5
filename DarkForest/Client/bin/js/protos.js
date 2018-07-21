/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Protos = $root.Protos = (() => {

    /**
     * Namespace Protos.
     * @exports Protos
     * @namespace
     */
    const Protos = {};

    Protos.GCToLS = (function() {

        /**
         * Namespace GCToLS.
         * @memberof Protos
         * @namespace
         */
        const GCToLS = {};

        GCToLS.AskLogin = (function() {

            /**
             * Properties of an AskLogin.
             * @memberof Protos.GCToLS
             * @interface IAskLogin
             * @property {Protos.IPacket|null} [packet] AskLogin packet
             * @property {number|null} [platform] AskLogin platform
             * @property {string|null} [uin] AskLogin uin
             * @property {string|null} [sessionid] AskLogin sessionid
             */

            /**
             * Constructs a new AskLogin.
             * @memberof Protos.GCToLS
             * @classdesc Represents an AskLogin.
             * @implements IAskLogin
             * @constructor
             * @param {Protos.GCToLS.IAskLogin=} [properties] Properties to set
             */
            function AskLogin(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AskLogin packet.
             * @member {Protos.IPacket|null|undefined} packet
             * @memberof Protos.GCToLS.AskLogin
             * @instance
             */
            AskLogin.prototype.packet = null;

            /**
             * AskLogin platform.
             * @member {number} platform
             * @memberof Protos.GCToLS.AskLogin
             * @instance
             */
            AskLogin.prototype.platform = 0;

            /**
             * AskLogin uin.
             * @member {string} uin
             * @memberof Protos.GCToLS.AskLogin
             * @instance
             */
            AskLogin.prototype.uin = "";

            /**
             * AskLogin sessionid.
             * @member {string} sessionid
             * @memberof Protos.GCToLS.AskLogin
             * @instance
             */
            AskLogin.prototype.sessionid = "";

            /**
             * Creates a new AskLogin instance using the specified properties.
             * @function create
             * @memberof Protos.GCToLS.AskLogin
             * @static
             * @param {Protos.GCToLS.IAskLogin=} [properties] Properties to set
             * @returns {Protos.GCToLS.AskLogin} AskLogin instance
             */
            AskLogin.create = function create(properties) {
                return new AskLogin(properties);
            };

            /**
             * Encodes the specified AskLogin message. Does not implicitly {@link Protos.GCToLS.AskLogin.verify|verify} messages.
             * @function encode
             * @memberof Protos.GCToLS.AskLogin
             * @static
             * @param {Protos.GCToLS.IAskLogin} message AskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AskLogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.packet != null && message.hasOwnProperty("packet"))
                    $root.Protos.Packet.encode(message.packet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.platform != null && message.hasOwnProperty("platform"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.platform);
                if (message.uin != null && message.hasOwnProperty("uin"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.uin);
                if (message.sessionid != null && message.hasOwnProperty("sessionid"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.sessionid);
                return writer;
            };

            /**
             * Encodes the specified AskLogin message, length delimited. Does not implicitly {@link Protos.GCToLS.AskLogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GCToLS.AskLogin
             * @static
             * @param {Protos.GCToLS.IAskLogin} message AskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AskLogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AskLogin message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GCToLS.AskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GCToLS.AskLogin} AskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AskLogin.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GCToLS.AskLogin();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.packet = $root.Protos.Packet.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.platform = reader.uint32();
                        break;
                    case 3:
                        message.uin = reader.string();
                        break;
                    case 4:
                        message.sessionid = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AskLogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GCToLS.AskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GCToLS.AskLogin} AskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AskLogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AskLogin message.
             * @function verify
             * @memberof Protos.GCToLS.AskLogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AskLogin.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.packet != null && message.hasOwnProperty("packet")) {
                    let error = $root.Protos.Packet.verify(message.packet);
                    if (error)
                        return "packet." + error;
                }
                if (message.platform != null && message.hasOwnProperty("platform"))
                    if (!$util.isInteger(message.platform))
                        return "platform: integer expected";
                if (message.uin != null && message.hasOwnProperty("uin"))
                    if (!$util.isString(message.uin))
                        return "uin: string expected";
                if (message.sessionid != null && message.hasOwnProperty("sessionid"))
                    if (!$util.isString(message.sessionid))
                        return "sessionid: string expected";
                return null;
            };

            /**
             * Creates an AskLogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GCToLS.AskLogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GCToLS.AskLogin} AskLogin
             */
            AskLogin.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.GCToLS.AskLogin)
                    return object;
                let message = new $root.Protos.GCToLS.AskLogin();
                if (object.packet != null) {
                    if (typeof object.packet !== "object")
                        throw TypeError(".Protos.GCToLS.AskLogin.packet: object expected");
                    message.packet = $root.Protos.Packet.fromObject(object.packet);
                }
                if (object.platform != null)
                    message.platform = object.platform >>> 0;
                if (object.uin != null)
                    message.uin = String(object.uin);
                if (object.sessionid != null)
                    message.sessionid = String(object.sessionid);
                return message;
            };

            /**
             * Creates a plain object from an AskLogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GCToLS.AskLogin
             * @static
             * @param {Protos.GCToLS.AskLogin} message AskLogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AskLogin.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.packet = null;
                    object.platform = 0;
                    object.uin = "";
                    object.sessionid = "";
                }
                if (message.packet != null && message.hasOwnProperty("packet"))
                    object.packet = $root.Protos.Packet.toObject(message.packet, options);
                if (message.platform != null && message.hasOwnProperty("platform"))
                    object.platform = message.platform;
                if (message.uin != null && message.hasOwnProperty("uin"))
                    object.uin = message.uin;
                if (message.sessionid != null && message.hasOwnProperty("sessionid"))
                    object.sessionid = message.sessionid;
                return object;
            };

            /**
             * Converts this AskLogin to JSON.
             * @function toJSON
             * @memberof Protos.GCToLS.AskLogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AskLogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AskLogin;
        })();

        return GCToLS;
    })();

    /**
     * MsgID enum.
     * @name Protos.MsgID
     * @enum {string}
     * @property {number} Undefine=0 Undefine value
     * @property {number} GCToLS_AskLogin=100 GCToLS_AskLogin value
     * @property {number} LSToGC_LoginResult=200 LSToGC_LoginResult value
     * @property {number} LSToGC_BSAddr=201 LSToGC_BSAddr value
     */
    Protos.MsgID = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Undefine"] = 0;
        values[valuesById[100] = "GCToLS_AskLogin"] = 100;
        values[valuesById[200] = "LSToGC_LoginResult"] = 200;
        values[valuesById[201] = "LSToGC_BSAddr"] = 201;
        return values;
    })();

    Protos.Response = (function() {

        /**
         * Properties of a Response.
         * @memberof Protos
         * @interface IResponse
         */

        /**
         * Constructs a new Response.
         * @memberof Protos
         * @classdesc Represents a Response.
         * @implements IResponse
         * @constructor
         * @param {Protos.IResponse=} [properties] Properties to set
         */
        function Response(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Response instance using the specified properties.
         * @function create
         * @memberof Protos.Response
         * @static
         * @param {Protos.IResponse=} [properties] Properties to set
         * @returns {Protos.Response} Response instance
         */
        Response.create = function create(properties) {
            return new Response(properties);
        };

        /**
         * Encodes the specified Response message. Does not implicitly {@link Protos.Response.verify|verify} messages.
         * @function encode
         * @memberof Protos.Response
         * @static
         * @param {Protos.IResponse} message Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Response.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Response message, length delimited. Does not implicitly {@link Protos.Response.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Protos.Response
         * @static
         * @param {Protos.IResponse} message Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Response.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Response message from the specified reader or buffer.
         * @function decode
         * @memberof Protos.Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Protos.Response} Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Response.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.Response();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Response message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Protos.Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Protos.Response} Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Response.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Response message.
         * @function verify
         * @memberof Protos.Response
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Response.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Response message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Protos.Response
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Protos.Response} Response
         */
        Response.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.Response)
                return object;
            return new $root.Protos.Response();
        };

        /**
         * Creates a plain object from a Response message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Protos.Response
         * @static
         * @param {Protos.Response} message Response
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Response.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Response to JSON.
         * @function toJSON
         * @memberof Protos.Response
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Response.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * RespID enum.
         * @name Protos.Response.RespID
         * @enum {string}
         * @property {number} Undefine=0 Undefine value
         * @property {number} GCToLS_AskLogin=200 GCToLS_AskLogin value
         */
        Response.RespID = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Undefine"] = 0;
            values[valuesById[200] = "GCToLS_AskLogin"] = 200;
            return values;
        })();

        return Response;
    })();

    Protos.Packet = (function() {

        /**
         * Properties of a Packet.
         * @memberof Protos
         * @interface IPacket
         * @property {number|null} [pid] Packet pid
         * @property {boolean|null} [isRequest] Packet isRequest
         * @property {number|null} [repsPid] Packet repsPid
         */

        /**
         * Constructs a new Packet.
         * @memberof Protos
         * @classdesc Represents a Packet.
         * @implements IPacket
         * @constructor
         * @param {Protos.IPacket=} [properties] Properties to set
         */
        function Packet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Packet pid.
         * @member {number} pid
         * @memberof Protos.Packet
         * @instance
         */
        Packet.prototype.pid = 0;

        /**
         * Packet isRequest.
         * @member {boolean} isRequest
         * @memberof Protos.Packet
         * @instance
         */
        Packet.prototype.isRequest = false;

        /**
         * Packet repsPid.
         * @member {number} repsPid
         * @memberof Protos.Packet
         * @instance
         */
        Packet.prototype.repsPid = 0;

        /**
         * Creates a new Packet instance using the specified properties.
         * @function create
         * @memberof Protos.Packet
         * @static
         * @param {Protos.IPacket=} [properties] Properties to set
         * @returns {Protos.Packet} Packet instance
         */
        Packet.create = function create(properties) {
            return new Packet(properties);
        };

        /**
         * Encodes the specified Packet message. Does not implicitly {@link Protos.Packet.verify|verify} messages.
         * @function encode
         * @memberof Protos.Packet
         * @static
         * @param {Protos.IPacket} message Packet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Packet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pid != null && message.hasOwnProperty("pid"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.pid);
            if (message.isRequest != null && message.hasOwnProperty("isRequest"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isRequest);
            if (message.repsPid != null && message.hasOwnProperty("repsPid"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.repsPid);
            return writer;
        };

        /**
         * Encodes the specified Packet message, length delimited. Does not implicitly {@link Protos.Packet.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Protos.Packet
         * @static
         * @param {Protos.IPacket} message Packet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Packet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Packet message from the specified reader or buffer.
         * @function decode
         * @memberof Protos.Packet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Protos.Packet} Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Packet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.Packet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.pid = reader.uint32();
                    break;
                case 2:
                    message.isRequest = reader.bool();
                    break;
                case 3:
                    message.repsPid = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Packet message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Protos.Packet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Protos.Packet} Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Packet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Packet message.
         * @function verify
         * @memberof Protos.Packet
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Packet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pid != null && message.hasOwnProperty("pid"))
                if (!$util.isInteger(message.pid))
                    return "pid: integer expected";
            if (message.isRequest != null && message.hasOwnProperty("isRequest"))
                if (typeof message.isRequest !== "boolean")
                    return "isRequest: boolean expected";
            if (message.repsPid != null && message.hasOwnProperty("repsPid"))
                if (!$util.isInteger(message.repsPid))
                    return "repsPid: integer expected";
            return null;
        };

        /**
         * Creates a Packet message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Protos.Packet
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Protos.Packet} Packet
         */
        Packet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.Packet)
                return object;
            let message = new $root.Protos.Packet();
            if (object.pid != null)
                message.pid = object.pid >>> 0;
            if (object.isRequest != null)
                message.isRequest = Boolean(object.isRequest);
            if (object.repsPid != null)
                message.repsPid = object.repsPid >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a Packet message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Protos.Packet
         * @static
         * @param {Protos.Packet} message Packet
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Packet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.pid = 0;
                object.isRequest = false;
                object.repsPid = 0;
            }
            if (message.pid != null && message.hasOwnProperty("pid"))
                object.pid = message.pid;
            if (message.isRequest != null && message.hasOwnProperty("isRequest"))
                object.isRequest = message.isRequest;
            if (message.repsPid != null && message.hasOwnProperty("repsPid"))
                object.repsPid = message.repsPid;
            return object;
        };

        /**
         * Converts this Packet to JSON.
         * @function toJSON
         * @memberof Protos.Packet
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Packet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Packet;
    })();

    Protos.LSToGC = (function() {

        /**
         * Namespace LSToGC.
         * @memberof Protos
         * @namespace
         */
        const LSToGC = {};

        LSToGC.LoginResult = (function() {

            /**
             * Properties of a LoginResult.
             * @memberof Protos.LSToGC
             * @interface ILoginResult
             * @property {Protos.IPacket|null} [packet] LoginResult packet
             * @property {number|null} [result] LoginResult result
             */

            /**
             * Constructs a new LoginResult.
             * @memberof Protos.LSToGC
             * @classdesc Represents a LoginResult.
             * @implements ILoginResult
             * @constructor
             * @param {Protos.LSToGC.ILoginResult=} [properties] Properties to set
             */
            function LoginResult(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LoginResult packet.
             * @member {Protos.IPacket|null|undefined} packet
             * @memberof Protos.LSToGC.LoginResult
             * @instance
             */
            LoginResult.prototype.packet = null;

            /**
             * LoginResult result.
             * @member {number} result
             * @memberof Protos.LSToGC.LoginResult
             * @instance
             */
            LoginResult.prototype.result = 0;

            /**
             * Creates a new LoginResult instance using the specified properties.
             * @function create
             * @memberof Protos.LSToGC.LoginResult
             * @static
             * @param {Protos.LSToGC.ILoginResult=} [properties] Properties to set
             * @returns {Protos.LSToGC.LoginResult} LoginResult instance
             */
            LoginResult.create = function create(properties) {
                return new LoginResult(properties);
            };

            /**
             * Encodes the specified LoginResult message. Does not implicitly {@link Protos.LSToGC.LoginResult.verify|verify} messages.
             * @function encode
             * @memberof Protos.LSToGC.LoginResult
             * @static
             * @param {Protos.LSToGC.ILoginResult} message LoginResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginResult.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.packet != null && message.hasOwnProperty("packet"))
                    $root.Protos.Packet.encode(message.packet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                return writer;
            };

            /**
             * Encodes the specified LoginResult message, length delimited. Does not implicitly {@link Protos.LSToGC.LoginResult.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LSToGC.LoginResult
             * @static
             * @param {Protos.LSToGC.ILoginResult} message LoginResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginResult.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LoginResult message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LSToGC.LoginResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LSToGC.LoginResult} LoginResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginResult.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LSToGC.LoginResult();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.packet = $root.Protos.Packet.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.result = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LoginResult message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LSToGC.LoginResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LSToGC.LoginResult} LoginResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginResult.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LoginResult message.
             * @function verify
             * @memberof Protos.LSToGC.LoginResult
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LoginResult.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.packet != null && message.hasOwnProperty("packet")) {
                    let error = $root.Protos.Packet.verify(message.packet);
                    if (error)
                        return "packet." + error;
                }
                if (message.result != null && message.hasOwnProperty("result"))
                    if (!$util.isInteger(message.result))
                        return "result: integer expected";
                return null;
            };

            /**
             * Creates a LoginResult message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LSToGC.LoginResult
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LSToGC.LoginResult} LoginResult
             */
            LoginResult.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.LSToGC.LoginResult)
                    return object;
                let message = new $root.Protos.LSToGC.LoginResult();
                if (object.packet != null) {
                    if (typeof object.packet !== "object")
                        throw TypeError(".Protos.LSToGC.LoginResult.packet: object expected");
                    message.packet = $root.Protos.Packet.fromObject(object.packet);
                }
                if (object.result != null)
                    message.result = object.result | 0;
                return message;
            };

            /**
             * Creates a plain object from a LoginResult message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LSToGC.LoginResult
             * @static
             * @param {Protos.LSToGC.LoginResult} message LoginResult
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LoginResult.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.packet = null;
                    object.result = 0;
                }
                if (message.packet != null && message.hasOwnProperty("packet"))
                    object.packet = $root.Protos.Packet.toObject(message.packet, options);
                if (message.result != null && message.hasOwnProperty("result"))
                    object.result = message.result;
                return object;
            };

            /**
             * Converts this LoginResult to JSON.
             * @function toJSON
             * @memberof Protos.LSToGC.LoginResult
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoginResult.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LoginResult;
        })();

        LSToGC.ServerInfo = (function() {

            /**
             * Properties of a ServerInfo.
             * @memberof Protos.LSToGC
             * @interface IServerInfo
             * @property {Protos.IPacket|null} [packet] ServerInfo packet
             * @property {string|null} [serverName] ServerInfo serverName
             * @property {string|null} [serverAddr] ServerInfo serverAddr
             * @property {number|null} [serverPort] ServerInfo serverPort
             * @property {number|null} [serverState] ServerInfo serverState
             */

            /**
             * Constructs a new ServerInfo.
             * @memberof Protos.LSToGC
             * @classdesc Represents a ServerInfo.
             * @implements IServerInfo
             * @constructor
             * @param {Protos.LSToGC.IServerInfo=} [properties] Properties to set
             */
            function ServerInfo(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServerInfo packet.
             * @member {Protos.IPacket|null|undefined} packet
             * @memberof Protos.LSToGC.ServerInfo
             * @instance
             */
            ServerInfo.prototype.packet = null;

            /**
             * ServerInfo serverName.
             * @member {string} serverName
             * @memberof Protos.LSToGC.ServerInfo
             * @instance
             */
            ServerInfo.prototype.serverName = "";

            /**
             * ServerInfo serverAddr.
             * @member {string} serverAddr
             * @memberof Protos.LSToGC.ServerInfo
             * @instance
             */
            ServerInfo.prototype.serverAddr = "";

            /**
             * ServerInfo serverPort.
             * @member {number} serverPort
             * @memberof Protos.LSToGC.ServerInfo
             * @instance
             */
            ServerInfo.prototype.serverPort = 0;

            /**
             * ServerInfo serverState.
             * @member {number} serverState
             * @memberof Protos.LSToGC.ServerInfo
             * @instance
             */
            ServerInfo.prototype.serverState = 0;

            /**
             * Creates a new ServerInfo instance using the specified properties.
             * @function create
             * @memberof Protos.LSToGC.ServerInfo
             * @static
             * @param {Protos.LSToGC.IServerInfo=} [properties] Properties to set
             * @returns {Protos.LSToGC.ServerInfo} ServerInfo instance
             */
            ServerInfo.create = function create(properties) {
                return new ServerInfo(properties);
            };

            /**
             * Encodes the specified ServerInfo message. Does not implicitly {@link Protos.LSToGC.ServerInfo.verify|verify} messages.
             * @function encode
             * @memberof Protos.LSToGC.ServerInfo
             * @static
             * @param {Protos.LSToGC.IServerInfo} message ServerInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.packet != null && message.hasOwnProperty("packet"))
                    $root.Protos.Packet.encode(message.packet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.serverName != null && message.hasOwnProperty("serverName"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.serverName);
                if (message.serverAddr != null && message.hasOwnProperty("serverAddr"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.serverAddr);
                if (message.serverPort != null && message.hasOwnProperty("serverPort"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.serverPort);
                if (message.serverState != null && message.hasOwnProperty("serverState"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.serverState);
                return writer;
            };

            /**
             * Encodes the specified ServerInfo message, length delimited. Does not implicitly {@link Protos.LSToGC.ServerInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LSToGC.ServerInfo
             * @static
             * @param {Protos.LSToGC.IServerInfo} message ServerInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ServerInfo message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LSToGC.ServerInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LSToGC.ServerInfo} ServerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServerInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LSToGC.ServerInfo();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.packet = $root.Protos.Packet.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.serverName = reader.string();
                        break;
                    case 3:
                        message.serverAddr = reader.string();
                        break;
                    case 4:
                        message.serverPort = reader.int32();
                        break;
                    case 5:
                        message.serverState = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ServerInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LSToGC.ServerInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LSToGC.ServerInfo} ServerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServerInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ServerInfo message.
             * @function verify
             * @memberof Protos.LSToGC.ServerInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ServerInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.packet != null && message.hasOwnProperty("packet")) {
                    let error = $root.Protos.Packet.verify(message.packet);
                    if (error)
                        return "packet." + error;
                }
                if (message.serverName != null && message.hasOwnProperty("serverName"))
                    if (!$util.isString(message.serverName))
                        return "serverName: string expected";
                if (message.serverAddr != null && message.hasOwnProperty("serverAddr"))
                    if (!$util.isString(message.serverAddr))
                        return "serverAddr: string expected";
                if (message.serverPort != null && message.hasOwnProperty("serverPort"))
                    if (!$util.isInteger(message.serverPort))
                        return "serverPort: integer expected";
                if (message.serverState != null && message.hasOwnProperty("serverState"))
                    if (!$util.isInteger(message.serverState))
                        return "serverState: integer expected";
                return null;
            };

            /**
             * Creates a ServerInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LSToGC.ServerInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LSToGC.ServerInfo} ServerInfo
             */
            ServerInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.LSToGC.ServerInfo)
                    return object;
                let message = new $root.Protos.LSToGC.ServerInfo();
                if (object.packet != null) {
                    if (typeof object.packet !== "object")
                        throw TypeError(".Protos.LSToGC.ServerInfo.packet: object expected");
                    message.packet = $root.Protos.Packet.fromObject(object.packet);
                }
                if (object.serverName != null)
                    message.serverName = String(object.serverName);
                if (object.serverAddr != null)
                    message.serverAddr = String(object.serverAddr);
                if (object.serverPort != null)
                    message.serverPort = object.serverPort | 0;
                if (object.serverState != null)
                    message.serverState = object.serverState | 0;
                return message;
            };

            /**
             * Creates a plain object from a ServerInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LSToGC.ServerInfo
             * @static
             * @param {Protos.LSToGC.ServerInfo} message ServerInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServerInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.packet = null;
                    object.serverName = "";
                    object.serverAddr = "";
                    object.serverPort = 0;
                    object.serverState = 0;
                }
                if (message.packet != null && message.hasOwnProperty("packet"))
                    object.packet = $root.Protos.Packet.toObject(message.packet, options);
                if (message.serverName != null && message.hasOwnProperty("serverName"))
                    object.serverName = message.serverName;
                if (message.serverAddr != null && message.hasOwnProperty("serverAddr"))
                    object.serverAddr = message.serverAddr;
                if (message.serverPort != null && message.hasOwnProperty("serverPort"))
                    object.serverPort = message.serverPort;
                if (message.serverState != null && message.hasOwnProperty("serverState"))
                    object.serverState = message.serverState;
                return object;
            };

            /**
             * Converts this ServerInfo to JSON.
             * @function toJSON
             * @memberof Protos.LSToGC.ServerInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServerInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ServerInfo;
        })();

        LSToGC.BSAddr = (function() {

            /**
             * Properties of a BSAddr.
             * @memberof Protos.LSToGC
             * @interface IBSAddr
             * @property {Protos.IPacket|null} [packet] BSAddr packet
             * @property {Array.<Protos.LSToGC.IServerInfo>|null} [serverinfo] BSAddr serverinfo
             */

            /**
             * Constructs a new BSAddr.
             * @memberof Protos.LSToGC
             * @classdesc Represents a BSAddr.
             * @implements IBSAddr
             * @constructor
             * @param {Protos.LSToGC.IBSAddr=} [properties] Properties to set
             */
            function BSAddr(properties) {
                this.serverinfo = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BSAddr packet.
             * @member {Protos.IPacket|null|undefined} packet
             * @memberof Protos.LSToGC.BSAddr
             * @instance
             */
            BSAddr.prototype.packet = null;

            /**
             * BSAddr serverinfo.
             * @member {Array.<Protos.LSToGC.IServerInfo>} serverinfo
             * @memberof Protos.LSToGC.BSAddr
             * @instance
             */
            BSAddr.prototype.serverinfo = $util.emptyArray;

            /**
             * Creates a new BSAddr instance using the specified properties.
             * @function create
             * @memberof Protos.LSToGC.BSAddr
             * @static
             * @param {Protos.LSToGC.IBSAddr=} [properties] Properties to set
             * @returns {Protos.LSToGC.BSAddr} BSAddr instance
             */
            BSAddr.create = function create(properties) {
                return new BSAddr(properties);
            };

            /**
             * Encodes the specified BSAddr message. Does not implicitly {@link Protos.LSToGC.BSAddr.verify|verify} messages.
             * @function encode
             * @memberof Protos.LSToGC.BSAddr
             * @static
             * @param {Protos.LSToGC.IBSAddr} message BSAddr message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BSAddr.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.packet != null && message.hasOwnProperty("packet"))
                    $root.Protos.Packet.encode(message.packet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.serverinfo != null && message.serverinfo.length)
                    for (let i = 0; i < message.serverinfo.length; ++i)
                        $root.Protos.LSToGC.ServerInfo.encode(message.serverinfo[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified BSAddr message, length delimited. Does not implicitly {@link Protos.LSToGC.BSAddr.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LSToGC.BSAddr
             * @static
             * @param {Protos.LSToGC.IBSAddr} message BSAddr message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BSAddr.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BSAddr message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LSToGC.BSAddr
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LSToGC.BSAddr} BSAddr
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BSAddr.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LSToGC.BSAddr();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.packet = $root.Protos.Packet.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.serverinfo && message.serverinfo.length))
                            message.serverinfo = [];
                        message.serverinfo.push($root.Protos.LSToGC.ServerInfo.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a BSAddr message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LSToGC.BSAddr
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LSToGC.BSAddr} BSAddr
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BSAddr.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BSAddr message.
             * @function verify
             * @memberof Protos.LSToGC.BSAddr
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BSAddr.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.packet != null && message.hasOwnProperty("packet")) {
                    let error = $root.Protos.Packet.verify(message.packet);
                    if (error)
                        return "packet." + error;
                }
                if (message.serverinfo != null && message.hasOwnProperty("serverinfo")) {
                    if (!Array.isArray(message.serverinfo))
                        return "serverinfo: array expected";
                    for (let i = 0; i < message.serverinfo.length; ++i) {
                        let error = $root.Protos.LSToGC.ServerInfo.verify(message.serverinfo[i]);
                        if (error)
                            return "serverinfo." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a BSAddr message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LSToGC.BSAddr
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LSToGC.BSAddr} BSAddr
             */
            BSAddr.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.LSToGC.BSAddr)
                    return object;
                let message = new $root.Protos.LSToGC.BSAddr();
                if (object.packet != null) {
                    if (typeof object.packet !== "object")
                        throw TypeError(".Protos.LSToGC.BSAddr.packet: object expected");
                    message.packet = $root.Protos.Packet.fromObject(object.packet);
                }
                if (object.serverinfo) {
                    if (!Array.isArray(object.serverinfo))
                        throw TypeError(".Protos.LSToGC.BSAddr.serverinfo: array expected");
                    message.serverinfo = [];
                    for (let i = 0; i < object.serverinfo.length; ++i) {
                        if (typeof object.serverinfo[i] !== "object")
                            throw TypeError(".Protos.LSToGC.BSAddr.serverinfo: object expected");
                        message.serverinfo[i] = $root.Protos.LSToGC.ServerInfo.fromObject(object.serverinfo[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a BSAddr message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LSToGC.BSAddr
             * @static
             * @param {Protos.LSToGC.BSAddr} message BSAddr
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BSAddr.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.serverinfo = [];
                if (options.defaults)
                    object.packet = null;
                if (message.packet != null && message.hasOwnProperty("packet"))
                    object.packet = $root.Protos.Packet.toObject(message.packet, options);
                if (message.serverinfo && message.serverinfo.length) {
                    object.serverinfo = [];
                    for (let j = 0; j < message.serverinfo.length; ++j)
                        object.serverinfo[j] = $root.Protos.LSToGC.ServerInfo.toObject(message.serverinfo[j], options);
                }
                return object;
            };

            /**
             * Converts this BSAddr to JSON.
             * @function toJSON
             * @memberof Protos.LSToGC.BSAddr
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BSAddr.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return BSAddr;
        })();

        return LSToGC;
    })();

    return Protos;
})();

export { $root as default };
