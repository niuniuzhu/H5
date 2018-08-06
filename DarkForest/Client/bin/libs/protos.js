/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
define(["libs/protobufjs"], function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.Protos = (function() {
    
        /**
         * Namespace Protos.
         * @exports Protos
         * @namespace
         */
        var Protos = {};
    
        Protos.CS2GS_GCLoginRet = (function() {
    
            /**
             * Properties of a CS2GS_GCLoginRet.
             * @memberof Protos
             * @interface ICS2GS_GCLoginRet
             * @property {Protos.IMsgOpts|null} [opts] CS2GS_GCLoginRet opts
             * @property {Protos.CS2GS_GCLoginRet.EResult|null} [result] CS2GS_GCLoginRet result
             */
    
            /**
             * Constructs a new CS2GS_GCLoginRet.
             * @memberof Protos
             * @classdesc Represents a CS2GS_GCLoginRet.
             * @implements ICS2GS_GCLoginRet
             * @constructor
             * @param {Protos.ICS2GS_GCLoginRet=} [properties] Properties to set
             */
            function CS2GS_GCLoginRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2GS_GCLoginRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2GS_GCLoginRet
             * @instance
             */
            CS2GS_GCLoginRet.prototype.opts = null;
    
            /**
             * CS2GS_GCLoginRet result.
             * @member {Protos.CS2GS_GCLoginRet.EResult} result
             * @memberof Protos.CS2GS_GCLoginRet
             * @instance
             */
            CS2GS_GCLoginRet.prototype.result = 0;
    
            /**
             * Creates a new CS2GS_GCLoginRet instance using the specified properties.
             * @function create
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {Protos.ICS2GS_GCLoginRet=} [properties] Properties to set
             * @returns {Protos.CS2GS_GCLoginRet} CS2GS_GCLoginRet instance
             */
            CS2GS_GCLoginRet.create = function create(properties) {
                return new CS2GS_GCLoginRet(properties);
            };
    
            /**
             * Encodes the specified CS2GS_GCLoginRet message. Does not implicitly {@link Protos.CS2GS_GCLoginRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {Protos.ICS2GS_GCLoginRet} message CS2GS_GCLoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2GS_GCLoginRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                return writer;
            };
    
            /**
             * Encodes the specified CS2GS_GCLoginRet message, length delimited. Does not implicitly {@link Protos.CS2GS_GCLoginRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {Protos.ICS2GS_GCLoginRet} message CS2GS_GCLoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2GS_GCLoginRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2GS_GCLoginRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2GS_GCLoginRet} CS2GS_GCLoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2GS_GCLoginRet.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GS_GCLoginRet();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
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
             * Decodes a CS2GS_GCLoginRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2GS_GCLoginRet} CS2GS_GCLoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2GS_GCLoginRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2GS_GCLoginRet message.
             * @function verify
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CS2GS_GCLoginRet.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.result != null && message.hasOwnProperty("result"))
                    switch (message.result) {
                    default:
                        return "result: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a CS2GS_GCLoginRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2GS_GCLoginRet} CS2GS_GCLoginRet
             */
            CS2GS_GCLoginRet.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.CS2GS_GCLoginRet)
                    return object;
                var message = new $root.Protos.CS2GS_GCLoginRet();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.CS2GS_GCLoginRet.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                switch (object.result) {
                case "Success":
                case 0:
                    message.result = 0;
                    break;
                case "Failed":
                case 1:
                    message.result = 1;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a CS2GS_GCLoginRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {Protos.CS2GS_GCLoginRet} message CS2GS_GCLoginRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CS2GS_GCLoginRet.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    object.result = options.enums === String ? "Success" : 0;
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.result != null && message.hasOwnProperty("result"))
                    object.result = options.enums === String ? $root.Protos.CS2GS_GCLoginRet.EResult[message.result] : message.result;
                return object;
            };
    
            /**
             * Converts this CS2GS_GCLoginRet to JSON.
             * @function toJSON
             * @memberof Protos.CS2GS_GCLoginRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2GS_GCLoginRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * EResult enum.
             * @name Protos.CS2GS_GCLoginRet.EResult
             * @enum {string}
             * @property {number} Success=0 Success value
             * @property {number} Failed=1 Failed value
             */
            CS2GS_GCLoginRet.EResult = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Success"] = 0;
                values[valuesById[1] = "Failed"] = 1;
                return values;
            })();
    
            return CS2GS_GCLoginRet;
        })();
    
        /**
         * MsgID enum.
         * @name Protos.MsgID
         * @enum {string}
         * @property {number} Undefine=0 Undefine value
         * @property {number} eG_AskPing=10 eG_AskPing value
         * @property {number} eG_AskPingRet=11 eG_AskPingRet value
         * @property {number} eGC2LS_AskRegister=100 eGC2LS_AskRegister value
         * @property {number} eGC2LS_AskLogin=101 eGC2LS_AskLogin value
         * @property {number} eGC2GS_AskLogin=200 eGC2GS_AskLogin value
         * @property {number} eGC2GS_KeepAlive=201 eGC2GS_KeepAlive value
         * @property {number} eLS2GC_RegResult=300 eLS2GC_RegResult value
         * @property {number} eLS2GC_LoginResult=301 eLS2GC_LoginResult value
         * @property {number} eLS2GC_GSInfo=302 eLS2GC_GSInfo value
         * @property {number} eLS2CS_GCLogin=400 eLS2CS_GCLogin value
         * @property {number} eGS2CS_ReportState=500 eGS2CS_ReportState value
         * @property {number} eGS2CS_GCAskLogin=501 eGS2CS_GCAskLogin value
         * @property {number} eGS2GC_LoginResult=600 eGS2GC_LoginResult value
         * @property {number} eCS2LS_GSInfos=700 eCS2LS_GSInfos value
         * @property {number} eCS2LS_GSInfo=701 eCS2LS_GSInfo value
         * @property {number} eCS2LS_GSLost=702 eCS2LS_GSLost value
         * @property {number} eCS2LS_GCLoginRet=703 eCS2LS_GCLoginRet value
         * @property {number} eCS2GS_GCLoginRet=800 eCS2GS_GCLoginRet value
         */
        Protos.MsgID = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Undefine"] = 0;
            values[valuesById[10] = "eG_AskPing"] = 10;
            values[valuesById[11] = "eG_AskPingRet"] = 11;
            values[valuesById[100] = "eGC2LS_AskRegister"] = 100;
            values[valuesById[101] = "eGC2LS_AskLogin"] = 101;
            values[valuesById[200] = "eGC2GS_AskLogin"] = 200;
            values[valuesById[201] = "eGC2GS_KeepAlive"] = 201;
            values[valuesById[300] = "eLS2GC_RegResult"] = 300;
            values[valuesById[301] = "eLS2GC_LoginResult"] = 301;
            values[valuesById[302] = "eLS2GC_GSInfo"] = 302;
            values[valuesById[400] = "eLS2CS_GCLogin"] = 400;
            values[valuesById[500] = "eGS2CS_ReportState"] = 500;
            values[valuesById[501] = "eGS2CS_GCAskLogin"] = 501;
            values[valuesById[600] = "eGS2GC_LoginResult"] = 600;
            values[valuesById[700] = "eCS2LS_GSInfos"] = 700;
            values[valuesById[701] = "eCS2LS_GSInfo"] = 701;
            values[valuesById[702] = "eCS2LS_GSLost"] = 702;
            values[valuesById[703] = "eCS2LS_GCLoginRet"] = 703;
            values[valuesById[800] = "eCS2GS_GCLoginRet"] = 800;
            return values;
        })();
    
        Protos.MsgOpts = (function() {
    
            /**
             * Properties of a MsgOpts.
             * @memberof Protos
             * @interface IMsgOpts
             * @property {number|null} [flag] MsgOpts flag
             * @property {number|null} [pid] MsgOpts pid
             * @property {number|null} [rpid] MsgOpts rpid
             * @property {number|null} [nsid] MsgOpts nsid
             */
    
            /**
             * Constructs a new MsgOpts.
             * @memberof Protos
             * @classdesc Represents a MsgOpts.
             * @implements IMsgOpts
             * @constructor
             * @param {Protos.IMsgOpts=} [properties] Properties to set
             */
            function MsgOpts(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * MsgOpts flag.
             * @member {number} flag
             * @memberof Protos.MsgOpts
             * @instance
             */
            MsgOpts.prototype.flag = 0;
    
            /**
             * MsgOpts pid.
             * @member {number} pid
             * @memberof Protos.MsgOpts
             * @instance
             */
            MsgOpts.prototype.pid = 0;
    
            /**
             * MsgOpts rpid.
             * @member {number} rpid
             * @memberof Protos.MsgOpts
             * @instance
             */
            MsgOpts.prototype.rpid = 0;
    
            /**
             * MsgOpts nsid.
             * @member {number} nsid
             * @memberof Protos.MsgOpts
             * @instance
             */
            MsgOpts.prototype.nsid = 0;
    
            /**
             * Creates a new MsgOpts instance using the specified properties.
             * @function create
             * @memberof Protos.MsgOpts
             * @static
             * @param {Protos.IMsgOpts=} [properties] Properties to set
             * @returns {Protos.MsgOpts} MsgOpts instance
             */
            MsgOpts.create = function create(properties) {
                return new MsgOpts(properties);
            };
    
            /**
             * Encodes the specified MsgOpts message. Does not implicitly {@link Protos.MsgOpts.verify|verify} messages.
             * @function encode
             * @memberof Protos.MsgOpts
             * @static
             * @param {Protos.IMsgOpts} message MsgOpts message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgOpts.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.flag != null && message.hasOwnProperty("flag"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.flag);
                if (message.pid != null && message.hasOwnProperty("pid"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pid);
                if (message.rpid != null && message.hasOwnProperty("rpid"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.rpid);
                if (message.nsid != null && message.hasOwnProperty("nsid"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.nsid);
                return writer;
            };
    
            /**
             * Encodes the specified MsgOpts message, length delimited. Does not implicitly {@link Protos.MsgOpts.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.MsgOpts
             * @static
             * @param {Protos.IMsgOpts} message MsgOpts message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgOpts.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a MsgOpts message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.MsgOpts
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.MsgOpts} MsgOpts
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgOpts.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.MsgOpts();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.flag = reader.uint32();
                        break;
                    case 2:
                        message.pid = reader.uint32();
                        break;
                    case 3:
                        message.rpid = reader.uint32();
                        break;
                    case 4:
                        message.nsid = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a MsgOpts message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.MsgOpts
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.MsgOpts} MsgOpts
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgOpts.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a MsgOpts message.
             * @function verify
             * @memberof Protos.MsgOpts
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgOpts.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.flag != null && message.hasOwnProperty("flag"))
                    if (!$util.isInteger(message.flag))
                        return "flag: integer expected";
                if (message.pid != null && message.hasOwnProperty("pid"))
                    if (!$util.isInteger(message.pid))
                        return "pid: integer expected";
                if (message.rpid != null && message.hasOwnProperty("rpid"))
                    if (!$util.isInteger(message.rpid))
                        return "rpid: integer expected";
                if (message.nsid != null && message.hasOwnProperty("nsid"))
                    if (!$util.isInteger(message.nsid))
                        return "nsid: integer expected";
                return null;
            };
    
            /**
             * Creates a MsgOpts message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.MsgOpts
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.MsgOpts} MsgOpts
             */
            MsgOpts.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.MsgOpts)
                    return object;
                var message = new $root.Protos.MsgOpts();
                if (object.flag != null)
                    message.flag = object.flag >>> 0;
                if (object.pid != null)
                    message.pid = object.pid >>> 0;
                if (object.rpid != null)
                    message.rpid = object.rpid >>> 0;
                if (object.nsid != null)
                    message.nsid = object.nsid >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a MsgOpts message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.MsgOpts
             * @static
             * @param {Protos.MsgOpts} message MsgOpts
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgOpts.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.flag = 0;
                    object.pid = 0;
                    object.rpid = 0;
                    object.nsid = 0;
                }
                if (message.flag != null && message.hasOwnProperty("flag"))
                    object.flag = message.flag;
                if (message.pid != null && message.hasOwnProperty("pid"))
                    object.pid = message.pid;
                if (message.rpid != null && message.hasOwnProperty("rpid"))
                    object.rpid = message.rpid;
                if (message.nsid != null && message.hasOwnProperty("nsid"))
                    object.nsid = message.nsid;
                return object;
            };
    
            /**
             * Converts this MsgOpts to JSON.
             * @function toJSON
             * @memberof Protos.MsgOpts
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgOpts.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Flag enum.
             * @name Protos.MsgOpts.Flag
             * @enum {string}
             * @property {number} Unused=0 Unused value
             * @property {number} RPC=1 RPC value
             * @property {number} RESP=2 RESP value
             * @property {number} TRANS=4 TRANS value
             */
            MsgOpts.Flag = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Unused"] = 0;
                values[valuesById[1] = "RPC"] = 1;
                values[valuesById[2] = "RESP"] = 2;
                values[valuesById[4] = "TRANS"] = 4;
                return values;
            })();
    
            return MsgOpts;
        })();
    
        Protos.G_AskPing = (function() {
    
            /**
             * Properties of a G_AskPing.
             * @memberof Protos
             * @interface IG_AskPing
             * @property {Protos.IMsgOpts|null} [opts] G_AskPing opts
             * @property {Long|null} [time] G_AskPing time
             */
    
            /**
             * Constructs a new G_AskPing.
             * @memberof Protos
             * @classdesc Represents a G_AskPing.
             * @implements IG_AskPing
             * @constructor
             * @param {Protos.IG_AskPing=} [properties] Properties to set
             */
            function G_AskPing(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * G_AskPing opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.G_AskPing
             * @instance
             */
            G_AskPing.prototype.opts = null;
    
            /**
             * G_AskPing time.
             * @member {Long} time
             * @memberof Protos.G_AskPing
             * @instance
             */
            G_AskPing.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Creates a new G_AskPing instance using the specified properties.
             * @function create
             * @memberof Protos.G_AskPing
             * @static
             * @param {Protos.IG_AskPing=} [properties] Properties to set
             * @returns {Protos.G_AskPing} G_AskPing instance
             */
            G_AskPing.create = function create(properties) {
                return new G_AskPing(properties);
            };
    
            /**
             * Encodes the specified G_AskPing message. Does not implicitly {@link Protos.G_AskPing.verify|verify} messages.
             * @function encode
             * @memberof Protos.G_AskPing
             * @static
             * @param {Protos.IG_AskPing} message G_AskPing message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            G_AskPing.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.time != null && message.hasOwnProperty("time"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.time);
                return writer;
            };
    
            /**
             * Encodes the specified G_AskPing message, length delimited. Does not implicitly {@link Protos.G_AskPing.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.G_AskPing
             * @static
             * @param {Protos.IG_AskPing} message G_AskPing message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            G_AskPing.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a G_AskPing message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.G_AskPing
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.G_AskPing} G_AskPing
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            G_AskPing.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.G_AskPing();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.time = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a G_AskPing message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.G_AskPing
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.G_AskPing} G_AskPing
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            G_AskPing.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a G_AskPing message.
             * @function verify
             * @memberof Protos.G_AskPing
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            G_AskPing.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.time != null && message.hasOwnProperty("time"))
                    if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                        return "time: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a G_AskPing message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.G_AskPing
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.G_AskPing} G_AskPing
             */
            G_AskPing.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.G_AskPing)
                    return object;
                var message = new $root.Protos.G_AskPing();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.G_AskPing.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                if (object.time != null)
                    if ($util.Long)
                        (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                    else if (typeof object.time === "string")
                        message.time = parseInt(object.time, 10);
                    else if (typeof object.time === "number")
                        message.time = object.time;
                    else if (typeof object.time === "object")
                        message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
                return message;
            };
    
            /**
             * Creates a plain object from a G_AskPing message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.G_AskPing
             * @static
             * @param {Protos.G_AskPing} message G_AskPing
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            G_AskPing.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.time = options.longs === String ? "0" : 0;
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.time != null && message.hasOwnProperty("time"))
                    if (typeof message.time === "number")
                        object.time = options.longs === String ? String(message.time) : message.time;
                    else
                        object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
                return object;
            };
    
            /**
             * Converts this G_AskPing to JSON.
             * @function toJSON
             * @memberof Protos.G_AskPing
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            G_AskPing.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return G_AskPing;
        })();
    
        Protos.G_AskPingRet = (function() {
    
            /**
             * Properties of a G_AskPingRet.
             * @memberof Protos
             * @interface IG_AskPingRet
             * @property {Protos.IMsgOpts|null} [opts] G_AskPingRet opts
             * @property {Long|null} [stime] G_AskPingRet stime
             * @property {Long|null} [time] G_AskPingRet time
             */
    
            /**
             * Constructs a new G_AskPingRet.
             * @memberof Protos
             * @classdesc Represents a G_AskPingRet.
             * @implements IG_AskPingRet
             * @constructor
             * @param {Protos.IG_AskPingRet=} [properties] Properties to set
             */
            function G_AskPingRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * G_AskPingRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.G_AskPingRet
             * @instance
             */
            G_AskPingRet.prototype.opts = null;
    
            /**
             * G_AskPingRet stime.
             * @member {Long} stime
             * @memberof Protos.G_AskPingRet
             * @instance
             */
            G_AskPingRet.prototype.stime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * G_AskPingRet time.
             * @member {Long} time
             * @memberof Protos.G_AskPingRet
             * @instance
             */
            G_AskPingRet.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Creates a new G_AskPingRet instance using the specified properties.
             * @function create
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {Protos.IG_AskPingRet=} [properties] Properties to set
             * @returns {Protos.G_AskPingRet} G_AskPingRet instance
             */
            G_AskPingRet.create = function create(properties) {
                return new G_AskPingRet(properties);
            };
    
            /**
             * Encodes the specified G_AskPingRet message. Does not implicitly {@link Protos.G_AskPingRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {Protos.IG_AskPingRet} message G_AskPingRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            G_AskPingRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.stime != null && message.hasOwnProperty("stime"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.stime);
                if (message.time != null && message.hasOwnProperty("time"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.time);
                return writer;
            };
    
            /**
             * Encodes the specified G_AskPingRet message, length delimited. Does not implicitly {@link Protos.G_AskPingRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {Protos.IG_AskPingRet} message G_AskPingRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            G_AskPingRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a G_AskPingRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.G_AskPingRet} G_AskPingRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            G_AskPingRet.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.G_AskPingRet();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.stime = reader.int64();
                        break;
                    case 3:
                        message.time = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a G_AskPingRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.G_AskPingRet} G_AskPingRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            G_AskPingRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a G_AskPingRet message.
             * @function verify
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            G_AskPingRet.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.stime != null && message.hasOwnProperty("stime"))
                    if (!$util.isInteger(message.stime) && !(message.stime && $util.isInteger(message.stime.low) && $util.isInteger(message.stime.high)))
                        return "stime: integer|Long expected";
                if (message.time != null && message.hasOwnProperty("time"))
                    if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                        return "time: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a G_AskPingRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.G_AskPingRet} G_AskPingRet
             */
            G_AskPingRet.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.G_AskPingRet)
                    return object;
                var message = new $root.Protos.G_AskPingRet();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.G_AskPingRet.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                if (object.stime != null)
                    if ($util.Long)
                        (message.stime = $util.Long.fromValue(object.stime)).unsigned = false;
                    else if (typeof object.stime === "string")
                        message.stime = parseInt(object.stime, 10);
                    else if (typeof object.stime === "number")
                        message.stime = object.stime;
                    else if (typeof object.stime === "object")
                        message.stime = new $util.LongBits(object.stime.low >>> 0, object.stime.high >>> 0).toNumber();
                if (object.time != null)
                    if ($util.Long)
                        (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                    else if (typeof object.time === "string")
                        message.time = parseInt(object.time, 10);
                    else if (typeof object.time === "number")
                        message.time = object.time;
                    else if (typeof object.time === "object")
                        message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
                return message;
            };
    
            /**
             * Creates a plain object from a G_AskPingRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {Protos.G_AskPingRet} message G_AskPingRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            G_AskPingRet.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.stime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.stime = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.time = options.longs === String ? "0" : 0;
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.stime != null && message.hasOwnProperty("stime"))
                    if (typeof message.stime === "number")
                        object.stime = options.longs === String ? String(message.stime) : message.stime;
                    else
                        object.stime = options.longs === String ? $util.Long.prototype.toString.call(message.stime) : options.longs === Number ? new $util.LongBits(message.stime.low >>> 0, message.stime.high >>> 0).toNumber() : message.stime;
                if (message.time != null && message.hasOwnProperty("time"))
                    if (typeof message.time === "number")
                        object.time = options.longs === String ? String(message.time) : message.time;
                    else
                        object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
                return object;
            };
    
            /**
             * Converts this G_AskPingRet to JSON.
             * @function toJSON
             * @memberof Protos.G_AskPingRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            G_AskPingRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return G_AskPingRet;
        })();
    
        Protos.CS2LS_GSInfos = (function() {
    
            /**
             * Properties of a CS2LS_GSInfos.
             * @memberof Protos
             * @interface ICS2LS_GSInfos
             * @property {Protos.IMsgOpts|null} [opts] CS2LS_GSInfos opts
             * @property {Array.<Protos.IGSInfo>|null} [gsInfo] CS2LS_GSInfos gsInfo
             */
    
            /**
             * Constructs a new CS2LS_GSInfos.
             * @memberof Protos
             * @classdesc Represents a CS2LS_GSInfos.
             * @implements ICS2LS_GSInfos
             * @constructor
             * @param {Protos.ICS2LS_GSInfos=} [properties] Properties to set
             */
            function CS2LS_GSInfos(properties) {
                this.gsInfo = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2LS_GSInfos opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2LS_GSInfos
             * @instance
             */
            CS2LS_GSInfos.prototype.opts = null;
    
            /**
             * CS2LS_GSInfos gsInfo.
             * @member {Array.<Protos.IGSInfo>} gsInfo
             * @memberof Protos.CS2LS_GSInfos
             * @instance
             */
            CS2LS_GSInfos.prototype.gsInfo = $util.emptyArray;
    
            /**
             * Creates a new CS2LS_GSInfos instance using the specified properties.
             * @function create
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {Protos.ICS2LS_GSInfos=} [properties] Properties to set
             * @returns {Protos.CS2LS_GSInfos} CS2LS_GSInfos instance
             */
            CS2LS_GSInfos.create = function create(properties) {
                return new CS2LS_GSInfos(properties);
            };
    
            /**
             * Encodes the specified CS2LS_GSInfos message. Does not implicitly {@link Protos.CS2LS_GSInfos.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {Protos.ICS2LS_GSInfos} message CS2LS_GSInfos message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GSInfos.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.gsInfo != null && message.gsInfo.length)
                    for (var i = 0; i < message.gsInfo.length; ++i)
                        $root.Protos.GSInfo.encode(message.gsInfo[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified CS2LS_GSInfos message, length delimited. Does not implicitly {@link Protos.CS2LS_GSInfos.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {Protos.ICS2LS_GSInfos} message CS2LS_GSInfos message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GSInfos.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2LS_GSInfos message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2LS_GSInfos} CS2LS_GSInfos
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2LS_GSInfos.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS_GSInfos();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.gsInfo && message.gsInfo.length))
                            message.gsInfo = [];
                        message.gsInfo.push($root.Protos.GSInfo.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CS2LS_GSInfos message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2LS_GSInfos} CS2LS_GSInfos
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2LS_GSInfos.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2LS_GSInfos message.
             * @function verify
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CS2LS_GSInfos.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.gsInfo != null && message.hasOwnProperty("gsInfo")) {
                    if (!Array.isArray(message.gsInfo))
                        return "gsInfo: array expected";
                    for (var i = 0; i < message.gsInfo.length; ++i) {
                        var error = $root.Protos.GSInfo.verify(message.gsInfo[i]);
                        if (error)
                            return "gsInfo." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a CS2LS_GSInfos message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2LS_GSInfos} CS2LS_GSInfos
             */
            CS2LS_GSInfos.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.CS2LS_GSInfos)
                    return object;
                var message = new $root.Protos.CS2LS_GSInfos();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.CS2LS_GSInfos.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                if (object.gsInfo) {
                    if (!Array.isArray(object.gsInfo))
                        throw TypeError(".Protos.CS2LS_GSInfos.gsInfo: array expected");
                    message.gsInfo = [];
                    for (var i = 0; i < object.gsInfo.length; ++i) {
                        if (typeof object.gsInfo[i] !== "object")
                            throw TypeError(".Protos.CS2LS_GSInfos.gsInfo: object expected");
                        message.gsInfo[i] = $root.Protos.GSInfo.fromObject(object.gsInfo[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a CS2LS_GSInfos message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {Protos.CS2LS_GSInfos} message CS2LS_GSInfos
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CS2LS_GSInfos.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.gsInfo = [];
                if (options.defaults)
                    object.opts = null;
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.gsInfo && message.gsInfo.length) {
                    object.gsInfo = [];
                    for (var j = 0; j < message.gsInfo.length; ++j)
                        object.gsInfo[j] = $root.Protos.GSInfo.toObject(message.gsInfo[j], options);
                }
                return object;
            };
    
            /**
             * Converts this CS2LS_GSInfos to JSON.
             * @function toJSON
             * @memberof Protos.CS2LS_GSInfos
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2LS_GSInfos.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CS2LS_GSInfos;
        })();
    
        Protos.CS2LS_GSInfo = (function() {
    
            /**
             * Properties of a CS2LS_GSInfo.
             * @memberof Protos
             * @interface ICS2LS_GSInfo
             * @property {Protos.IMsgOpts|null} [opts] CS2LS_GSInfo opts
             * @property {Protos.IGSInfo|null} [gsInfo] CS2LS_GSInfo gsInfo
             */
    
            /**
             * Constructs a new CS2LS_GSInfo.
             * @memberof Protos
             * @classdesc Represents a CS2LS_GSInfo.
             * @implements ICS2LS_GSInfo
             * @constructor
             * @param {Protos.ICS2LS_GSInfo=} [properties] Properties to set
             */
            function CS2LS_GSInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2LS_GSInfo opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2LS_GSInfo
             * @instance
             */
            CS2LS_GSInfo.prototype.opts = null;
    
            /**
             * CS2LS_GSInfo gsInfo.
             * @member {Protos.IGSInfo|null|undefined} gsInfo
             * @memberof Protos.CS2LS_GSInfo
             * @instance
             */
            CS2LS_GSInfo.prototype.gsInfo = null;
    
            /**
             * Creates a new CS2LS_GSInfo instance using the specified properties.
             * @function create
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {Protos.ICS2LS_GSInfo=} [properties] Properties to set
             * @returns {Protos.CS2LS_GSInfo} CS2LS_GSInfo instance
             */
            CS2LS_GSInfo.create = function create(properties) {
                return new CS2LS_GSInfo(properties);
            };
    
            /**
             * Encodes the specified CS2LS_GSInfo message. Does not implicitly {@link Protos.CS2LS_GSInfo.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {Protos.ICS2LS_GSInfo} message CS2LS_GSInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GSInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.gsInfo != null && message.hasOwnProperty("gsInfo"))
                    $root.Protos.GSInfo.encode(message.gsInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified CS2LS_GSInfo message, length delimited. Does not implicitly {@link Protos.CS2LS_GSInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {Protos.ICS2LS_GSInfo} message CS2LS_GSInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GSInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2LS_GSInfo message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2LS_GSInfo} CS2LS_GSInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2LS_GSInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS_GSInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.gsInfo = $root.Protos.GSInfo.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CS2LS_GSInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2LS_GSInfo} CS2LS_GSInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2LS_GSInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2LS_GSInfo message.
             * @function verify
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CS2LS_GSInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.gsInfo != null && message.hasOwnProperty("gsInfo")) {
                    var error = $root.Protos.GSInfo.verify(message.gsInfo);
                    if (error)
                        return "gsInfo." + error;
                }
                return null;
            };
    
            /**
             * Creates a CS2LS_GSInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2LS_GSInfo} CS2LS_GSInfo
             */
            CS2LS_GSInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.CS2LS_GSInfo)
                    return object;
                var message = new $root.Protos.CS2LS_GSInfo();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.CS2LS_GSInfo.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                if (object.gsInfo != null) {
                    if (typeof object.gsInfo !== "object")
                        throw TypeError(".Protos.CS2LS_GSInfo.gsInfo: object expected");
                    message.gsInfo = $root.Protos.GSInfo.fromObject(object.gsInfo);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a CS2LS_GSInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {Protos.CS2LS_GSInfo} message CS2LS_GSInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CS2LS_GSInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    object.gsInfo = null;
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.gsInfo != null && message.hasOwnProperty("gsInfo"))
                    object.gsInfo = $root.Protos.GSInfo.toObject(message.gsInfo, options);
                return object;
            };
    
            /**
             * Converts this CS2LS_GSInfo to JSON.
             * @function toJSON
             * @memberof Protos.CS2LS_GSInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2LS_GSInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CS2LS_GSInfo;
        })();
    
        Protos.CS2LS_GSLost = (function() {
    
            /**
             * Properties of a CS2LS_GSLost.
             * @memberof Protos
             * @interface ICS2LS_GSLost
             * @property {Protos.IMsgOpts|null} [opts] CS2LS_GSLost opts
             * @property {number|null} [gsid] CS2LS_GSLost gsid
             */
    
            /**
             * Constructs a new CS2LS_GSLost.
             * @memberof Protos
             * @classdesc Represents a CS2LS_GSLost.
             * @implements ICS2LS_GSLost
             * @constructor
             * @param {Protos.ICS2LS_GSLost=} [properties] Properties to set
             */
            function CS2LS_GSLost(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2LS_GSLost opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2LS_GSLost
             * @instance
             */
            CS2LS_GSLost.prototype.opts = null;
    
            /**
             * CS2LS_GSLost gsid.
             * @member {number} gsid
             * @memberof Protos.CS2LS_GSLost
             * @instance
             */
            CS2LS_GSLost.prototype.gsid = 0;
    
            /**
             * Creates a new CS2LS_GSLost instance using the specified properties.
             * @function create
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {Protos.ICS2LS_GSLost=} [properties] Properties to set
             * @returns {Protos.CS2LS_GSLost} CS2LS_GSLost instance
             */
            CS2LS_GSLost.create = function create(properties) {
                return new CS2LS_GSLost(properties);
            };
    
            /**
             * Encodes the specified CS2LS_GSLost message. Does not implicitly {@link Protos.CS2LS_GSLost.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {Protos.ICS2LS_GSLost} message CS2LS_GSLost message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GSLost.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.gsid != null && message.hasOwnProperty("gsid"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.gsid);
                return writer;
            };
    
            /**
             * Encodes the specified CS2LS_GSLost message, length delimited. Does not implicitly {@link Protos.CS2LS_GSLost.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {Protos.ICS2LS_GSLost} message CS2LS_GSLost message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GSLost.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2LS_GSLost message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2LS_GSLost} CS2LS_GSLost
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2LS_GSLost.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS_GSLost();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.gsid = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CS2LS_GSLost message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2LS_GSLost} CS2LS_GSLost
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2LS_GSLost.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2LS_GSLost message.
             * @function verify
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CS2LS_GSLost.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.gsid != null && message.hasOwnProperty("gsid"))
                    if (!$util.isInteger(message.gsid))
                        return "gsid: integer expected";
                return null;
            };
    
            /**
             * Creates a CS2LS_GSLost message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2LS_GSLost} CS2LS_GSLost
             */
            CS2LS_GSLost.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.CS2LS_GSLost)
                    return object;
                var message = new $root.Protos.CS2LS_GSLost();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.CS2LS_GSLost.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                if (object.gsid != null)
                    message.gsid = object.gsid >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a CS2LS_GSLost message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {Protos.CS2LS_GSLost} message CS2LS_GSLost
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CS2LS_GSLost.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    object.gsid = 0;
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.gsid != null && message.hasOwnProperty("gsid"))
                    object.gsid = message.gsid;
                return object;
            };
    
            /**
             * Converts this CS2LS_GSLost to JSON.
             * @function toJSON
             * @memberof Protos.CS2LS_GSLost
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2LS_GSLost.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CS2LS_GSLost;
        })();
    
        Protos.CS2LS_GCLoginRet = (function() {
    
            /**
             * Properties of a CS2LS_GCLoginRet.
             * @memberof Protos
             * @interface ICS2LS_GCLoginRet
             * @property {Protos.IMsgOpts|null} [opts] CS2LS_GCLoginRet opts
             */
    
            /**
             * Constructs a new CS2LS_GCLoginRet.
             * @memberof Protos
             * @classdesc Represents a CS2LS_GCLoginRet.
             * @implements ICS2LS_GCLoginRet
             * @constructor
             * @param {Protos.ICS2LS_GCLoginRet=} [properties] Properties to set
             */
            function CS2LS_GCLoginRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2LS_GCLoginRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2LS_GCLoginRet
             * @instance
             */
            CS2LS_GCLoginRet.prototype.opts = null;
    
            /**
             * Creates a new CS2LS_GCLoginRet instance using the specified properties.
             * @function create
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {Protos.ICS2LS_GCLoginRet=} [properties] Properties to set
             * @returns {Protos.CS2LS_GCLoginRet} CS2LS_GCLoginRet instance
             */
            CS2LS_GCLoginRet.create = function create(properties) {
                return new CS2LS_GCLoginRet(properties);
            };
    
            /**
             * Encodes the specified CS2LS_GCLoginRet message. Does not implicitly {@link Protos.CS2LS_GCLoginRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {Protos.ICS2LS_GCLoginRet} message CS2LS_GCLoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GCLoginRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified CS2LS_GCLoginRet message, length delimited. Does not implicitly {@link Protos.CS2LS_GCLoginRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {Protos.ICS2LS_GCLoginRet} message CS2LS_GCLoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GCLoginRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2LS_GCLoginRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2LS_GCLoginRet} CS2LS_GCLoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2LS_GCLoginRet.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS_GCLoginRet();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CS2LS_GCLoginRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2LS_GCLoginRet} CS2LS_GCLoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2LS_GCLoginRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2LS_GCLoginRet message.
             * @function verify
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CS2LS_GCLoginRet.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                return null;
            };
    
            /**
             * Creates a CS2LS_GCLoginRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2LS_GCLoginRet} CS2LS_GCLoginRet
             */
            CS2LS_GCLoginRet.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.CS2LS_GCLoginRet)
                    return object;
                var message = new $root.Protos.CS2LS_GCLoginRet();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.CS2LS_GCLoginRet.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a CS2LS_GCLoginRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {Protos.CS2LS_GCLoginRet} message CS2LS_GCLoginRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CS2LS_GCLoginRet.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.opts = null;
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                return object;
            };
    
            /**
             * Converts this CS2LS_GCLoginRet to JSON.
             * @function toJSON
             * @memberof Protos.CS2LS_GCLoginRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2LS_GCLoginRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CS2LS_GCLoginRet;
        })();
    
        Protos.GSInfo = (function() {
    
            /**
             * Properties of a GSInfo.
             * @memberof Protos
             * @interface IGSInfo
             * @property {number|null} [id] GSInfo id
             * @property {string|null} [name] GSInfo name
             * @property {string|null} [ip] GSInfo ip
             * @property {number|null} [port] GSInfo port
             * @property {string|null} [password] GSInfo password
             * @property {Protos.GSInfo.State|null} [state] GSInfo state
             */
    
            /**
             * Constructs a new GSInfo.
             * @memberof Protos
             * @classdesc Represents a GSInfo.
             * @implements IGSInfo
             * @constructor
             * @param {Protos.IGSInfo=} [properties] Properties to set
             */
            function GSInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GSInfo id.
             * @member {number} id
             * @memberof Protos.GSInfo
             * @instance
             */
            GSInfo.prototype.id = 0;
    
            /**
             * GSInfo name.
             * @member {string} name
             * @memberof Protos.GSInfo
             * @instance
             */
            GSInfo.prototype.name = "";
    
            /**
             * GSInfo ip.
             * @member {string} ip
             * @memberof Protos.GSInfo
             * @instance
             */
            GSInfo.prototype.ip = "";
    
            /**
             * GSInfo port.
             * @member {number} port
             * @memberof Protos.GSInfo
             * @instance
             */
            GSInfo.prototype.port = 0;
    
            /**
             * GSInfo password.
             * @member {string} password
             * @memberof Protos.GSInfo
             * @instance
             */
            GSInfo.prototype.password = "";
    
            /**
             * GSInfo state.
             * @member {Protos.GSInfo.State} state
             * @memberof Protos.GSInfo
             * @instance
             */
            GSInfo.prototype.state = 0;
    
            /**
             * Creates a new GSInfo instance using the specified properties.
             * @function create
             * @memberof Protos.GSInfo
             * @static
             * @param {Protos.IGSInfo=} [properties] Properties to set
             * @returns {Protos.GSInfo} GSInfo instance
             */
            GSInfo.create = function create(properties) {
                return new GSInfo(properties);
            };
    
            /**
             * Encodes the specified GSInfo message. Does not implicitly {@link Protos.GSInfo.verify|verify} messages.
             * @function encode
             * @memberof Protos.GSInfo
             * @static
             * @param {Protos.IGSInfo} message GSInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GSInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.ip != null && message.hasOwnProperty("ip"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.ip);
                if (message.port != null && message.hasOwnProperty("port"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.port);
                if (message.password != null && message.hasOwnProperty("password"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.password);
                if (message.state != null && message.hasOwnProperty("state"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.state);
                return writer;
            };
    
            /**
             * Encodes the specified GSInfo message, length delimited. Does not implicitly {@link Protos.GSInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GSInfo
             * @static
             * @param {Protos.IGSInfo} message GSInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GSInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GSInfo message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GSInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GSInfo} GSInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GSInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GSInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.uint32();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.ip = reader.string();
                        break;
                    case 4:
                        message.port = reader.int32();
                        break;
                    case 5:
                        message.password = reader.string();
                        break;
                    case 6:
                        message.state = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a GSInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GSInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GSInfo} GSInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GSInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GSInfo message.
             * @function verify
             * @memberof Protos.GSInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GSInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.ip != null && message.hasOwnProperty("ip"))
                    if (!$util.isString(message.ip))
                        return "ip: string expected";
                if (message.port != null && message.hasOwnProperty("port"))
                    if (!$util.isInteger(message.port))
                        return "port: integer expected";
                if (message.password != null && message.hasOwnProperty("password"))
                    if (!$util.isString(message.password))
                        return "password: string expected";
                if (message.state != null && message.hasOwnProperty("state"))
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a GSInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GSInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GSInfo} GSInfo
             */
            GSInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.GSInfo)
                    return object;
                var message = new $root.Protos.GSInfo();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.name != null)
                    message.name = String(object.name);
                if (object.ip != null)
                    message.ip = String(object.ip);
                if (object.port != null)
                    message.port = object.port | 0;
                if (object.password != null)
                    message.password = String(object.password);
                switch (object.state) {
                case "Free":
                case 0:
                    message.state = 0;
                    break;
                case "Busy":
                case 1:
                    message.state = 1;
                    break;
                case "Full":
                case 2:
                    message.state = 2;
                    break;
                case "Close":
                case 3:
                    message.state = 3;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a GSInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GSInfo
             * @static
             * @param {Protos.GSInfo} message GSInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GSInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.name = "";
                    object.ip = "";
                    object.port = 0;
                    object.password = "";
                    object.state = options.enums === String ? "Free" : 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.ip != null && message.hasOwnProperty("ip"))
                    object.ip = message.ip;
                if (message.port != null && message.hasOwnProperty("port"))
                    object.port = message.port;
                if (message.password != null && message.hasOwnProperty("password"))
                    object.password = message.password;
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = options.enums === String ? $root.Protos.GSInfo.State[message.state] : message.state;
                return object;
            };
    
            /**
             * Converts this GSInfo to JSON.
             * @function toJSON
             * @memberof Protos.GSInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GSInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * State enum.
             * @name Protos.GSInfo.State
             * @enum {string}
             * @property {number} Free=0 Free value
             * @property {number} Busy=1 Busy value
             * @property {number} Full=2 Full value
             * @property {number} Close=3 Close value
             */
            GSInfo.State = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Free"] = 0;
                values[valuesById[1] = "Busy"] = 1;
                values[valuesById[2] = "Full"] = 2;
                values[valuesById[3] = "Close"] = 3;
                return values;
            })();
    
            return GSInfo;
        })();
    
        Protos.GS2CS_ReportState = (function() {
    
            /**
             * Properties of a GS2CS_ReportState.
             * @memberof Protos
             * @interface IGS2CS_ReportState
             * @property {Protos.IMsgOpts|null} [opts] GS2CS_ReportState opts
             * @property {Protos.IGSInfo|null} [gsInfo] GS2CS_ReportState gsInfo
             */
    
            /**
             * Constructs a new GS2CS_ReportState.
             * @memberof Protos
             * @classdesc Represents a GS2CS_ReportState.
             * @implements IGS2CS_ReportState
             * @constructor
             * @param {Protos.IGS2CS_ReportState=} [properties] Properties to set
             */
            function GS2CS_ReportState(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GS2CS_ReportState opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GS2CS_ReportState
             * @instance
             */
            GS2CS_ReportState.prototype.opts = null;
    
            /**
             * GS2CS_ReportState gsInfo.
             * @member {Protos.IGSInfo|null|undefined} gsInfo
             * @memberof Protos.GS2CS_ReportState
             * @instance
             */
            GS2CS_ReportState.prototype.gsInfo = null;
    
            /**
             * Creates a new GS2CS_ReportState instance using the specified properties.
             * @function create
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {Protos.IGS2CS_ReportState=} [properties] Properties to set
             * @returns {Protos.GS2CS_ReportState} GS2CS_ReportState instance
             */
            GS2CS_ReportState.create = function create(properties) {
                return new GS2CS_ReportState(properties);
            };
    
            /**
             * Encodes the specified GS2CS_ReportState message. Does not implicitly {@link Protos.GS2CS_ReportState.verify|verify} messages.
             * @function encode
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {Protos.IGS2CS_ReportState} message GS2CS_ReportState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2CS_ReportState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.gsInfo != null && message.hasOwnProperty("gsInfo"))
                    $root.Protos.GSInfo.encode(message.gsInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified GS2CS_ReportState message, length delimited. Does not implicitly {@link Protos.GS2CS_ReportState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {Protos.IGS2CS_ReportState} message GS2CS_ReportState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2CS_ReportState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GS2CS_ReportState message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GS2CS_ReportState} GS2CS_ReportState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GS2CS_ReportState.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2CS_ReportState();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.gsInfo = $root.Protos.GSInfo.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a GS2CS_ReportState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GS2CS_ReportState} GS2CS_ReportState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GS2CS_ReportState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GS2CS_ReportState message.
             * @function verify
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GS2CS_ReportState.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.gsInfo != null && message.hasOwnProperty("gsInfo")) {
                    var error = $root.Protos.GSInfo.verify(message.gsInfo);
                    if (error)
                        return "gsInfo." + error;
                }
                return null;
            };
    
            /**
             * Creates a GS2CS_ReportState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GS2CS_ReportState} GS2CS_ReportState
             */
            GS2CS_ReportState.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.GS2CS_ReportState)
                    return object;
                var message = new $root.Protos.GS2CS_ReportState();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.GS2CS_ReportState.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                if (object.gsInfo != null) {
                    if (typeof object.gsInfo !== "object")
                        throw TypeError(".Protos.GS2CS_ReportState.gsInfo: object expected");
                    message.gsInfo = $root.Protos.GSInfo.fromObject(object.gsInfo);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a GS2CS_ReportState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {Protos.GS2CS_ReportState} message GS2CS_ReportState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GS2CS_ReportState.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    object.gsInfo = null;
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.gsInfo != null && message.hasOwnProperty("gsInfo"))
                    object.gsInfo = $root.Protos.GSInfo.toObject(message.gsInfo, options);
                return object;
            };
    
            /**
             * Converts this GS2CS_ReportState to JSON.
             * @function toJSON
             * @memberof Protos.GS2CS_ReportState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GS2CS_ReportState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GS2CS_ReportState;
        })();
    
        Protos.GS2CS_GCAskLogin = (function() {
    
            /**
             * Properties of a GS2CS_GCAskLogin.
             * @memberof Protos
             * @interface IGS2CS_GCAskLogin
             * @property {Protos.IMsgOpts|null} [opts] GS2CS_GCAskLogin opts
             * @property {Long|null} [sessionID] GS2CS_GCAskLogin sessionID
             */
    
            /**
             * Constructs a new GS2CS_GCAskLogin.
             * @memberof Protos
             * @classdesc Represents a GS2CS_GCAskLogin.
             * @implements IGS2CS_GCAskLogin
             * @constructor
             * @param {Protos.IGS2CS_GCAskLogin=} [properties] Properties to set
             */
            function GS2CS_GCAskLogin(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GS2CS_GCAskLogin opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GS2CS_GCAskLogin
             * @instance
             */
            GS2CS_GCAskLogin.prototype.opts = null;
    
            /**
             * GS2CS_GCAskLogin sessionID.
             * @member {Long} sessionID
             * @memberof Protos.GS2CS_GCAskLogin
             * @instance
             */
            GS2CS_GCAskLogin.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new GS2CS_GCAskLogin instance using the specified properties.
             * @function create
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {Protos.IGS2CS_GCAskLogin=} [properties] Properties to set
             * @returns {Protos.GS2CS_GCAskLogin} GS2CS_GCAskLogin instance
             */
            GS2CS_GCAskLogin.create = function create(properties) {
                return new GS2CS_GCAskLogin(properties);
            };
    
            /**
             * Encodes the specified GS2CS_GCAskLogin message. Does not implicitly {@link Protos.GS2CS_GCAskLogin.verify|verify} messages.
             * @function encode
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {Protos.IGS2CS_GCAskLogin} message GS2CS_GCAskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2CS_GCAskLogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.sessionID);
                return writer;
            };
    
            /**
             * Encodes the specified GS2CS_GCAskLogin message, length delimited. Does not implicitly {@link Protos.GS2CS_GCAskLogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {Protos.IGS2CS_GCAskLogin} message GS2CS_GCAskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2CS_GCAskLogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GS2CS_GCAskLogin message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GS2CS_GCAskLogin} GS2CS_GCAskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GS2CS_GCAskLogin.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2CS_GCAskLogin();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.sessionID = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a GS2CS_GCAskLogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GS2CS_GCAskLogin} GS2CS_GCAskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GS2CS_GCAskLogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GS2CS_GCAskLogin message.
             * @function verify
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GS2CS_GCAskLogin.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    if (!$util.isInteger(message.sessionID) && !(message.sessionID && $util.isInteger(message.sessionID.low) && $util.isInteger(message.sessionID.high)))
                        return "sessionID: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a GS2CS_GCAskLogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GS2CS_GCAskLogin} GS2CS_GCAskLogin
             */
            GS2CS_GCAskLogin.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.GS2CS_GCAskLogin)
                    return object;
                var message = new $root.Protos.GS2CS_GCAskLogin();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.GS2CS_GCAskLogin.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                if (object.sessionID != null)
                    if ($util.Long)
                        (message.sessionID = $util.Long.fromValue(object.sessionID)).unsigned = true;
                    else if (typeof object.sessionID === "string")
                        message.sessionID = parseInt(object.sessionID, 10);
                    else if (typeof object.sessionID === "number")
                        message.sessionID = object.sessionID;
                    else if (typeof object.sessionID === "object")
                        message.sessionID = new $util.LongBits(object.sessionID.low >>> 0, object.sessionID.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a GS2CS_GCAskLogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {Protos.GS2CS_GCAskLogin} message GS2CS_GCAskLogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GS2CS_GCAskLogin.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.sessionID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.sessionID = options.longs === String ? "0" : 0;
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    if (typeof message.sessionID === "number")
                        object.sessionID = options.longs === String ? String(message.sessionID) : message.sessionID;
                    else
                        object.sessionID = options.longs === String ? $util.Long.prototype.toString.call(message.sessionID) : options.longs === Number ? new $util.LongBits(message.sessionID.low >>> 0, message.sessionID.high >>> 0).toNumber(true) : message.sessionID;
                return object;
            };
    
            /**
             * Converts this GS2CS_GCAskLogin to JSON.
             * @function toJSON
             * @memberof Protos.GS2CS_GCAskLogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GS2CS_GCAskLogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GS2CS_GCAskLogin;
        })();
    
        Protos.GC2GS_AskLogin = (function() {
    
            /**
             * Properties of a GC2GS_AskLogin.
             * @memberof Protos
             * @interface IGC2GS_AskLogin
             * @property {Protos.IMsgOpts|null} [opts] GC2GS_AskLogin opts
             * @property {string|null} [pwd] GC2GS_AskLogin pwd
             * @property {Long|null} [sessionID] GC2GS_AskLogin sessionID
             */
    
            /**
             * Constructs a new GC2GS_AskLogin.
             * @memberof Protos
             * @classdesc Represents a GC2GS_AskLogin.
             * @implements IGC2GS_AskLogin
             * @constructor
             * @param {Protos.IGC2GS_AskLogin=} [properties] Properties to set
             */
            function GC2GS_AskLogin(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GC2GS_AskLogin opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GC2GS_AskLogin
             * @instance
             */
            GC2GS_AskLogin.prototype.opts = null;
    
            /**
             * GC2GS_AskLogin pwd.
             * @member {string} pwd
             * @memberof Protos.GC2GS_AskLogin
             * @instance
             */
            GC2GS_AskLogin.prototype.pwd = "";
    
            /**
             * GC2GS_AskLogin sessionID.
             * @member {Long} sessionID
             * @memberof Protos.GC2GS_AskLogin
             * @instance
             */
            GC2GS_AskLogin.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new GC2GS_AskLogin instance using the specified properties.
             * @function create
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {Protos.IGC2GS_AskLogin=} [properties] Properties to set
             * @returns {Protos.GC2GS_AskLogin} GC2GS_AskLogin instance
             */
            GC2GS_AskLogin.create = function create(properties) {
                return new GC2GS_AskLogin(properties);
            };
    
            /**
             * Encodes the specified GC2GS_AskLogin message. Does not implicitly {@link Protos.GC2GS_AskLogin.verify|verify} messages.
             * @function encode
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {Protos.IGC2GS_AskLogin} message GC2GS_AskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2GS_AskLogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.pwd != null && message.hasOwnProperty("pwd"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.pwd);
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.sessionID);
                return writer;
            };
    
            /**
             * Encodes the specified GC2GS_AskLogin message, length delimited. Does not implicitly {@link Protos.GC2GS_AskLogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {Protos.IGC2GS_AskLogin} message GC2GS_AskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2GS_AskLogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GC2GS_AskLogin message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GC2GS_AskLogin} GC2GS_AskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2GS_AskLogin.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2GS_AskLogin();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.pwd = reader.string();
                        break;
                    case 3:
                        message.sessionID = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a GC2GS_AskLogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GC2GS_AskLogin} GC2GS_AskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2GS_AskLogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GC2GS_AskLogin message.
             * @function verify
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GC2GS_AskLogin.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.pwd != null && message.hasOwnProperty("pwd"))
                    if (!$util.isString(message.pwd))
                        return "pwd: string expected";
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    if (!$util.isInteger(message.sessionID) && !(message.sessionID && $util.isInteger(message.sessionID.low) && $util.isInteger(message.sessionID.high)))
                        return "sessionID: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a GC2GS_AskLogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GC2GS_AskLogin} GC2GS_AskLogin
             */
            GC2GS_AskLogin.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.GC2GS_AskLogin)
                    return object;
                var message = new $root.Protos.GC2GS_AskLogin();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.GC2GS_AskLogin.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                if (object.pwd != null)
                    message.pwd = String(object.pwd);
                if (object.sessionID != null)
                    if ($util.Long)
                        (message.sessionID = $util.Long.fromValue(object.sessionID)).unsigned = true;
                    else if (typeof object.sessionID === "string")
                        message.sessionID = parseInt(object.sessionID, 10);
                    else if (typeof object.sessionID === "number")
                        message.sessionID = object.sessionID;
                    else if (typeof object.sessionID === "object")
                        message.sessionID = new $util.LongBits(object.sessionID.low >>> 0, object.sessionID.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a GC2GS_AskLogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {Protos.GC2GS_AskLogin} message GC2GS_AskLogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GC2GS_AskLogin.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    object.pwd = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.sessionID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.sessionID = options.longs === String ? "0" : 0;
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.pwd != null && message.hasOwnProperty("pwd"))
                    object.pwd = message.pwd;
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    if (typeof message.sessionID === "number")
                        object.sessionID = options.longs === String ? String(message.sessionID) : message.sessionID;
                    else
                        object.sessionID = options.longs === String ? $util.Long.prototype.toString.call(message.sessionID) : options.longs === Number ? new $util.LongBits(message.sessionID.low >>> 0, message.sessionID.high >>> 0).toNumber(true) : message.sessionID;
                return object;
            };
    
            /**
             * Converts this GC2GS_AskLogin to JSON.
             * @function toJSON
             * @memberof Protos.GC2GS_AskLogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GC2GS_AskLogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GC2GS_AskLogin;
        })();
    
        Protos.GC2GS_KeepAlive = (function() {
    
            /**
             * Properties of a GC2GS_KeepAlive.
             * @memberof Protos
             * @interface IGC2GS_KeepAlive
             * @property {Protos.IMsgOpts|null} [opts] GC2GS_KeepAlive opts
             */
    
            /**
             * Constructs a new GC2GS_KeepAlive.
             * @memberof Protos
             * @classdesc Represents a GC2GS_KeepAlive.
             * @implements IGC2GS_KeepAlive
             * @constructor
             * @param {Protos.IGC2GS_KeepAlive=} [properties] Properties to set
             */
            function GC2GS_KeepAlive(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GC2GS_KeepAlive opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GC2GS_KeepAlive
             * @instance
             */
            GC2GS_KeepAlive.prototype.opts = null;
    
            /**
             * Creates a new GC2GS_KeepAlive instance using the specified properties.
             * @function create
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {Protos.IGC2GS_KeepAlive=} [properties] Properties to set
             * @returns {Protos.GC2GS_KeepAlive} GC2GS_KeepAlive instance
             */
            GC2GS_KeepAlive.create = function create(properties) {
                return new GC2GS_KeepAlive(properties);
            };
    
            /**
             * Encodes the specified GC2GS_KeepAlive message. Does not implicitly {@link Protos.GC2GS_KeepAlive.verify|verify} messages.
             * @function encode
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {Protos.IGC2GS_KeepAlive} message GC2GS_KeepAlive message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2GS_KeepAlive.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified GC2GS_KeepAlive message, length delimited. Does not implicitly {@link Protos.GC2GS_KeepAlive.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {Protos.IGC2GS_KeepAlive} message GC2GS_KeepAlive message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2GS_KeepAlive.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GC2GS_KeepAlive message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GC2GS_KeepAlive} GC2GS_KeepAlive
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2GS_KeepAlive.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2GS_KeepAlive();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a GC2GS_KeepAlive message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GC2GS_KeepAlive} GC2GS_KeepAlive
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2GS_KeepAlive.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GC2GS_KeepAlive message.
             * @function verify
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GC2GS_KeepAlive.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                return null;
            };
    
            /**
             * Creates a GC2GS_KeepAlive message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GC2GS_KeepAlive} GC2GS_KeepAlive
             */
            GC2GS_KeepAlive.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.GC2GS_KeepAlive)
                    return object;
                var message = new $root.Protos.GC2GS_KeepAlive();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.GC2GS_KeepAlive.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a GC2GS_KeepAlive message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {Protos.GC2GS_KeepAlive} message GC2GS_KeepAlive
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GC2GS_KeepAlive.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.opts = null;
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                return object;
            };
    
            /**
             * Converts this GC2GS_KeepAlive to JSON.
             * @function toJSON
             * @memberof Protos.GC2GS_KeepAlive
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GC2GS_KeepAlive.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GC2GS_KeepAlive;
        })();
    
        Protos.GC2LS_AskRegister = (function() {
    
            /**
             * Properties of a GC2LS_AskRegister.
             * @memberof Protos
             * @interface IGC2LS_AskRegister
             * @property {Protos.IMsgOpts|null} [opts] GC2LS_AskRegister opts
             * @property {number|null} [sdk] GC2LS_AskRegister sdk
             * @property {string|null} [name] GC2LS_AskRegister name
             * @property {string|null} [passwd] GC2LS_AskRegister passwd
             * @property {number|null} [platform] GC2LS_AskRegister platform
             */
    
            /**
             * Constructs a new GC2LS_AskRegister.
             * @memberof Protos
             * @classdesc Represents a GC2LS_AskRegister.
             * @implements IGC2LS_AskRegister
             * @constructor
             * @param {Protos.IGC2LS_AskRegister=} [properties] Properties to set
             */
            function GC2LS_AskRegister(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GC2LS_AskRegister opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GC2LS_AskRegister
             * @instance
             */
            GC2LS_AskRegister.prototype.opts = null;
    
            /**
             * GC2LS_AskRegister sdk.
             * @member {number} sdk
             * @memberof Protos.GC2LS_AskRegister
             * @instance
             */
            GC2LS_AskRegister.prototype.sdk = 0;
    
            /**
             * GC2LS_AskRegister name.
             * @member {string} name
             * @memberof Protos.GC2LS_AskRegister
             * @instance
             */
            GC2LS_AskRegister.prototype.name = "";
    
            /**
             * GC2LS_AskRegister passwd.
             * @member {string} passwd
             * @memberof Protos.GC2LS_AskRegister
             * @instance
             */
            GC2LS_AskRegister.prototype.passwd = "";
    
            /**
             * GC2LS_AskRegister platform.
             * @member {number} platform
             * @memberof Protos.GC2LS_AskRegister
             * @instance
             */
            GC2LS_AskRegister.prototype.platform = 0;
    
            /**
             * Creates a new GC2LS_AskRegister instance using the specified properties.
             * @function create
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {Protos.IGC2LS_AskRegister=} [properties] Properties to set
             * @returns {Protos.GC2LS_AskRegister} GC2LS_AskRegister instance
             */
            GC2LS_AskRegister.create = function create(properties) {
                return new GC2LS_AskRegister(properties);
            };
    
            /**
             * Encodes the specified GC2LS_AskRegister message. Does not implicitly {@link Protos.GC2LS_AskRegister.verify|verify} messages.
             * @function encode
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {Protos.IGC2LS_AskRegister} message GC2LS_AskRegister message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2LS_AskRegister.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.sdk != null && message.hasOwnProperty("sdk"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.sdk);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                if (message.passwd != null && message.hasOwnProperty("passwd"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.passwd);
                if (message.platform != null && message.hasOwnProperty("platform"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.platform);
                return writer;
            };
    
            /**
             * Encodes the specified GC2LS_AskRegister message, length delimited. Does not implicitly {@link Protos.GC2LS_AskRegister.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {Protos.IGC2LS_AskRegister} message GC2LS_AskRegister message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2LS_AskRegister.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GC2LS_AskRegister message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GC2LS_AskRegister} GC2LS_AskRegister
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2LS_AskRegister.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2LS_AskRegister();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.sdk = reader.int32();
                        break;
                    case 3:
                        message.name = reader.string();
                        break;
                    case 4:
                        message.passwd = reader.string();
                        break;
                    case 5:
                        message.platform = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a GC2LS_AskRegister message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GC2LS_AskRegister} GC2LS_AskRegister
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2LS_AskRegister.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GC2LS_AskRegister message.
             * @function verify
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GC2LS_AskRegister.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.sdk != null && message.hasOwnProperty("sdk"))
                    if (!$util.isInteger(message.sdk))
                        return "sdk: integer expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.passwd != null && message.hasOwnProperty("passwd"))
                    if (!$util.isString(message.passwd))
                        return "passwd: string expected";
                if (message.platform != null && message.hasOwnProperty("platform"))
                    if (!$util.isInteger(message.platform))
                        return "platform: integer expected";
                return null;
            };
    
            /**
             * Creates a GC2LS_AskRegister message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GC2LS_AskRegister} GC2LS_AskRegister
             */
            GC2LS_AskRegister.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.GC2LS_AskRegister)
                    return object;
                var message = new $root.Protos.GC2LS_AskRegister();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.GC2LS_AskRegister.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                if (object.sdk != null)
                    message.sdk = object.sdk | 0;
                if (object.name != null)
                    message.name = String(object.name);
                if (object.passwd != null)
                    message.passwd = String(object.passwd);
                if (object.platform != null)
                    message.platform = object.platform >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a GC2LS_AskRegister message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {Protos.GC2LS_AskRegister} message GC2LS_AskRegister
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GC2LS_AskRegister.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    object.sdk = 0;
                    object.name = "";
                    object.passwd = "";
                    object.platform = 0;
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.sdk != null && message.hasOwnProperty("sdk"))
                    object.sdk = message.sdk;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.passwd != null && message.hasOwnProperty("passwd"))
                    object.passwd = message.passwd;
                if (message.platform != null && message.hasOwnProperty("platform"))
                    object.platform = message.platform;
                return object;
            };
    
            /**
             * Converts this GC2LS_AskRegister to JSON.
             * @function toJSON
             * @memberof Protos.GC2LS_AskRegister
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GC2LS_AskRegister.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GC2LS_AskRegister;
        })();
    
        Protos.GC2LS_AskLogin = (function() {
    
            /**
             * Properties of a GC2LS_AskLogin.
             * @memberof Protos
             * @interface IGC2LS_AskLogin
             * @property {Protos.IMsgOpts|null} [opts] GC2LS_AskLogin opts
             * @property {string|null} [name] GC2LS_AskLogin name
             * @property {string|null} [passwd] GC2LS_AskLogin passwd
             */
    
            /**
             * Constructs a new GC2LS_AskLogin.
             * @memberof Protos
             * @classdesc Represents a GC2LS_AskLogin.
             * @implements IGC2LS_AskLogin
             * @constructor
             * @param {Protos.IGC2LS_AskLogin=} [properties] Properties to set
             */
            function GC2LS_AskLogin(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GC2LS_AskLogin opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GC2LS_AskLogin
             * @instance
             */
            GC2LS_AskLogin.prototype.opts = null;
    
            /**
             * GC2LS_AskLogin name.
             * @member {string} name
             * @memberof Protos.GC2LS_AskLogin
             * @instance
             */
            GC2LS_AskLogin.prototype.name = "";
    
            /**
             * GC2LS_AskLogin passwd.
             * @member {string} passwd
             * @memberof Protos.GC2LS_AskLogin
             * @instance
             */
            GC2LS_AskLogin.prototype.passwd = "";
    
            /**
             * Creates a new GC2LS_AskLogin instance using the specified properties.
             * @function create
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {Protos.IGC2LS_AskLogin=} [properties] Properties to set
             * @returns {Protos.GC2LS_AskLogin} GC2LS_AskLogin instance
             */
            GC2LS_AskLogin.create = function create(properties) {
                return new GC2LS_AskLogin(properties);
            };
    
            /**
             * Encodes the specified GC2LS_AskLogin message. Does not implicitly {@link Protos.GC2LS_AskLogin.verify|verify} messages.
             * @function encode
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {Protos.IGC2LS_AskLogin} message GC2LS_AskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2LS_AskLogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.passwd != null && message.hasOwnProperty("passwd"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.passwd);
                return writer;
            };
    
            /**
             * Encodes the specified GC2LS_AskLogin message, length delimited. Does not implicitly {@link Protos.GC2LS_AskLogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {Protos.IGC2LS_AskLogin} message GC2LS_AskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2LS_AskLogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GC2LS_AskLogin message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GC2LS_AskLogin} GC2LS_AskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2LS_AskLogin.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2LS_AskLogin();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.passwd = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a GC2LS_AskLogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GC2LS_AskLogin} GC2LS_AskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2LS_AskLogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GC2LS_AskLogin message.
             * @function verify
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GC2LS_AskLogin.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.passwd != null && message.hasOwnProperty("passwd"))
                    if (!$util.isString(message.passwd))
                        return "passwd: string expected";
                return null;
            };
    
            /**
             * Creates a GC2LS_AskLogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GC2LS_AskLogin} GC2LS_AskLogin
             */
            GC2LS_AskLogin.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.GC2LS_AskLogin)
                    return object;
                var message = new $root.Protos.GC2LS_AskLogin();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.GC2LS_AskLogin.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                if (object.name != null)
                    message.name = String(object.name);
                if (object.passwd != null)
                    message.passwd = String(object.passwd);
                return message;
            };
    
            /**
             * Creates a plain object from a GC2LS_AskLogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {Protos.GC2LS_AskLogin} message GC2LS_AskLogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GC2LS_AskLogin.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    object.name = "";
                    object.passwd = "";
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.passwd != null && message.hasOwnProperty("passwd"))
                    object.passwd = message.passwd;
                return object;
            };
    
            /**
             * Converts this GC2LS_AskLogin to JSON.
             * @function toJSON
             * @memberof Protos.GC2LS_AskLogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GC2LS_AskLogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GC2LS_AskLogin;
        })();
    
        Protos.GS2GC_LoginResult = (function() {
    
            /**
             * Properties of a GS2GC_LoginResult.
             * @memberof Protos
             * @interface IGS2GC_LoginResult
             * @property {Protos.IMsgOpts|null} [opts] GS2GC_LoginResult opts
             * @property {Protos.GS2GC_LoginResult.EResult|null} [result] GS2GC_LoginResult result
             */
    
            /**
             * Constructs a new GS2GC_LoginResult.
             * @memberof Protos
             * @classdesc Represents a GS2GC_LoginResult.
             * @implements IGS2GC_LoginResult
             * @constructor
             * @param {Protos.IGS2GC_LoginResult=} [properties] Properties to set
             */
            function GS2GC_LoginResult(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GS2GC_LoginResult opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GS2GC_LoginResult
             * @instance
             */
            GS2GC_LoginResult.prototype.opts = null;
    
            /**
             * GS2GC_LoginResult result.
             * @member {Protos.GS2GC_LoginResult.EResult} result
             * @memberof Protos.GS2GC_LoginResult
             * @instance
             */
            GS2GC_LoginResult.prototype.result = 0;
    
            /**
             * Creates a new GS2GC_LoginResult instance using the specified properties.
             * @function create
             * @memberof Protos.GS2GC_LoginResult
             * @static
             * @param {Protos.IGS2GC_LoginResult=} [properties] Properties to set
             * @returns {Protos.GS2GC_LoginResult} GS2GC_LoginResult instance
             */
            GS2GC_LoginResult.create = function create(properties) {
                return new GS2GC_LoginResult(properties);
            };
    
            /**
             * Encodes the specified GS2GC_LoginResult message. Does not implicitly {@link Protos.GS2GC_LoginResult.verify|verify} messages.
             * @function encode
             * @memberof Protos.GS2GC_LoginResult
             * @static
             * @param {Protos.IGS2GC_LoginResult} message GS2GC_LoginResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2GC_LoginResult.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                return writer;
            };
    
            /**
             * Encodes the specified GS2GC_LoginResult message, length delimited. Does not implicitly {@link Protos.GS2GC_LoginResult.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GS2GC_LoginResult
             * @static
             * @param {Protos.IGS2GC_LoginResult} message GS2GC_LoginResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2GC_LoginResult.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GS2GC_LoginResult message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GS2GC_LoginResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GS2GC_LoginResult} GS2GC_LoginResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GS2GC_LoginResult.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2GC_LoginResult();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
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
             * Decodes a GS2GC_LoginResult message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GS2GC_LoginResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GS2GC_LoginResult} GS2GC_LoginResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GS2GC_LoginResult.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GS2GC_LoginResult message.
             * @function verify
             * @memberof Protos.GS2GC_LoginResult
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GS2GC_LoginResult.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.result != null && message.hasOwnProperty("result"))
                    switch (message.result) {
                    default:
                        return "result: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a GS2GC_LoginResult message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GS2GC_LoginResult
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GS2GC_LoginResult} GS2GC_LoginResult
             */
            GS2GC_LoginResult.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.GS2GC_LoginResult)
                    return object;
                var message = new $root.Protos.GS2GC_LoginResult();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.GS2GC_LoginResult.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                switch (object.result) {
                case "Success":
                case 0:
                    message.result = 0;
                    break;
                case "Failed":
                case 1:
                    message.result = 1;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a GS2GC_LoginResult message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GS2GC_LoginResult
             * @static
             * @param {Protos.GS2GC_LoginResult} message GS2GC_LoginResult
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GS2GC_LoginResult.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    object.result = options.enums === String ? "Success" : 0;
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.result != null && message.hasOwnProperty("result"))
                    object.result = options.enums === String ? $root.Protos.GS2GC_LoginResult.EResult[message.result] : message.result;
                return object;
            };
    
            /**
             * Converts this GS2GC_LoginResult to JSON.
             * @function toJSON
             * @memberof Protos.GS2GC_LoginResult
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GS2GC_LoginResult.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * EResult enum.
             * @name Protos.GS2GC_LoginResult.EResult
             * @enum {string}
             * @property {number} Success=0 Success value
             * @property {number} Failed=1 Failed value
             */
            GS2GC_LoginResult.EResult = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Success"] = 0;
                values[valuesById[1] = "Failed"] = 1;
                return values;
            })();
    
            return GS2GC_LoginResult;
        })();
    
        Protos.LS2CS_GCLogin = (function() {
    
            /**
             * Properties of a LS2CS_GCLogin.
             * @memberof Protos
             * @interface ILS2CS_GCLogin
             * @property {Protos.IMsgOpts|null} [opts] LS2CS_GCLogin opts
             * @property {Long|null} [sessionID] LS2CS_GCLogin sessionID
             */
    
            /**
             * Constructs a new LS2CS_GCLogin.
             * @memberof Protos
             * @classdesc Represents a LS2CS_GCLogin.
             * @implements ILS2CS_GCLogin
             * @constructor
             * @param {Protos.ILS2CS_GCLogin=} [properties] Properties to set
             */
            function LS2CS_GCLogin(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LS2CS_GCLogin opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.LS2CS_GCLogin
             * @instance
             */
            LS2CS_GCLogin.prototype.opts = null;
    
            /**
             * LS2CS_GCLogin sessionID.
             * @member {Long} sessionID
             * @memberof Protos.LS2CS_GCLogin
             * @instance
             */
            LS2CS_GCLogin.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new LS2CS_GCLogin instance using the specified properties.
             * @function create
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {Protos.ILS2CS_GCLogin=} [properties] Properties to set
             * @returns {Protos.LS2CS_GCLogin} LS2CS_GCLogin instance
             */
            LS2CS_GCLogin.create = function create(properties) {
                return new LS2CS_GCLogin(properties);
            };
    
            /**
             * Encodes the specified LS2CS_GCLogin message. Does not implicitly {@link Protos.LS2CS_GCLogin.verify|verify} messages.
             * @function encode
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {Protos.ILS2CS_GCLogin} message LS2CS_GCLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2CS_GCLogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.sessionID);
                return writer;
            };
    
            /**
             * Encodes the specified LS2CS_GCLogin message, length delimited. Does not implicitly {@link Protos.LS2CS_GCLogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {Protos.ILS2CS_GCLogin} message LS2CS_GCLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2CS_GCLogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LS2CS_GCLogin message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LS2CS_GCLogin} LS2CS_GCLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2CS_GCLogin.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2CS_GCLogin();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.sessionID = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a LS2CS_GCLogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LS2CS_GCLogin} LS2CS_GCLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2CS_GCLogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LS2CS_GCLogin message.
             * @function verify
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LS2CS_GCLogin.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    if (!$util.isInteger(message.sessionID) && !(message.sessionID && $util.isInteger(message.sessionID.low) && $util.isInteger(message.sessionID.high)))
                        return "sessionID: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a LS2CS_GCLogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LS2CS_GCLogin} LS2CS_GCLogin
             */
            LS2CS_GCLogin.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.LS2CS_GCLogin)
                    return object;
                var message = new $root.Protos.LS2CS_GCLogin();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.LS2CS_GCLogin.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                if (object.sessionID != null)
                    if ($util.Long)
                        (message.sessionID = $util.Long.fromValue(object.sessionID)).unsigned = true;
                    else if (typeof object.sessionID === "string")
                        message.sessionID = parseInt(object.sessionID, 10);
                    else if (typeof object.sessionID === "number")
                        message.sessionID = object.sessionID;
                    else if (typeof object.sessionID === "object")
                        message.sessionID = new $util.LongBits(object.sessionID.low >>> 0, object.sessionID.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a LS2CS_GCLogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {Protos.LS2CS_GCLogin} message LS2CS_GCLogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LS2CS_GCLogin.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.sessionID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.sessionID = options.longs === String ? "0" : 0;
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    if (typeof message.sessionID === "number")
                        object.sessionID = options.longs === String ? String(message.sessionID) : message.sessionID;
                    else
                        object.sessionID = options.longs === String ? $util.Long.prototype.toString.call(message.sessionID) : options.longs === Number ? new $util.LongBits(message.sessionID.low >>> 0, message.sessionID.high >>> 0).toNumber(true) : message.sessionID;
                return object;
            };
    
            /**
             * Converts this LS2CS_GCLogin to JSON.
             * @function toJSON
             * @memberof Protos.LS2CS_GCLogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LS2CS_GCLogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return LS2CS_GCLogin;
        })();
    
        Protos.LS2GC_RegResult = (function() {
    
            /**
             * Properties of a LS2GC_RegResult.
             * @memberof Protos
             * @interface ILS2GC_RegResult
             * @property {Protos.IMsgOpts|null} [opts] LS2GC_RegResult opts
             * @property {Protos.LS2GC_RegResult.EResult|null} [result] LS2GC_RegResult result
             */
    
            /**
             * Constructs a new LS2GC_RegResult.
             * @memberof Protos
             * @classdesc Represents a LS2GC_RegResult.
             * @implements ILS2GC_RegResult
             * @constructor
             * @param {Protos.ILS2GC_RegResult=} [properties] Properties to set
             */
            function LS2GC_RegResult(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LS2GC_RegResult opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.LS2GC_RegResult
             * @instance
             */
            LS2GC_RegResult.prototype.opts = null;
    
            /**
             * LS2GC_RegResult result.
             * @member {Protos.LS2GC_RegResult.EResult} result
             * @memberof Protos.LS2GC_RegResult
             * @instance
             */
            LS2GC_RegResult.prototype.result = 0;
    
            /**
             * Creates a new LS2GC_RegResult instance using the specified properties.
             * @function create
             * @memberof Protos.LS2GC_RegResult
             * @static
             * @param {Protos.ILS2GC_RegResult=} [properties] Properties to set
             * @returns {Protos.LS2GC_RegResult} LS2GC_RegResult instance
             */
            LS2GC_RegResult.create = function create(properties) {
                return new LS2GC_RegResult(properties);
            };
    
            /**
             * Encodes the specified LS2GC_RegResult message. Does not implicitly {@link Protos.LS2GC_RegResult.verify|verify} messages.
             * @function encode
             * @memberof Protos.LS2GC_RegResult
             * @static
             * @param {Protos.ILS2GC_RegResult} message LS2GC_RegResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2GC_RegResult.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                return writer;
            };
    
            /**
             * Encodes the specified LS2GC_RegResult message, length delimited. Does not implicitly {@link Protos.LS2GC_RegResult.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LS2GC_RegResult
             * @static
             * @param {Protos.ILS2GC_RegResult} message LS2GC_RegResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2GC_RegResult.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LS2GC_RegResult message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LS2GC_RegResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LS2GC_RegResult} LS2GC_RegResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2GC_RegResult.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2GC_RegResult();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
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
             * Decodes a LS2GC_RegResult message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LS2GC_RegResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LS2GC_RegResult} LS2GC_RegResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2GC_RegResult.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LS2GC_RegResult message.
             * @function verify
             * @memberof Protos.LS2GC_RegResult
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LS2GC_RegResult.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.result != null && message.hasOwnProperty("result"))
                    switch (message.result) {
                    default:
                        return "result: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a LS2GC_RegResult message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LS2GC_RegResult
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LS2GC_RegResult} LS2GC_RegResult
             */
            LS2GC_RegResult.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.LS2GC_RegResult)
                    return object;
                var message = new $root.Protos.LS2GC_RegResult();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.LS2GC_RegResult.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                switch (object.result) {
                case "Success":
                case 0:
                    message.result = 0;
                    break;
                case "Failed":
                case 1:
                    message.result = 1;
                    break;
                case "UnameExists":
                case 2:
                    message.result = 2;
                    break;
                case "UnameIllegal":
                case 3:
                    message.result = 3;
                    break;
                case "PwdIllegal":
                case 4:
                    message.result = 4;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a LS2GC_RegResult message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LS2GC_RegResult
             * @static
             * @param {Protos.LS2GC_RegResult} message LS2GC_RegResult
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LS2GC_RegResult.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    object.result = options.enums === String ? "Success" : 0;
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.result != null && message.hasOwnProperty("result"))
                    object.result = options.enums === String ? $root.Protos.LS2GC_RegResult.EResult[message.result] : message.result;
                return object;
            };
    
            /**
             * Converts this LS2GC_RegResult to JSON.
             * @function toJSON
             * @memberof Protos.LS2GC_RegResult
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LS2GC_RegResult.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * EResult enum.
             * @name Protos.LS2GC_RegResult.EResult
             * @enum {string}
             * @property {number} Success=0 Success value
             * @property {number} Failed=1 Failed value
             * @property {number} UnameExists=2 UnameExists value
             * @property {number} UnameIllegal=3 UnameIllegal value
             * @property {number} PwdIllegal=4 PwdIllegal value
             */
            LS2GC_RegResult.EResult = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Success"] = 0;
                values[valuesById[1] = "Failed"] = 1;
                values[valuesById[2] = "UnameExists"] = 2;
                values[valuesById[3] = "UnameIllegal"] = 3;
                values[valuesById[4] = "PwdIllegal"] = 4;
                return values;
            })();
    
            return LS2GC_RegResult;
        })();
    
        Protos.LS2GC_LoginResult = (function() {
    
            /**
             * Properties of a LS2GC_LoginResult.
             * @memberof Protos
             * @interface ILS2GC_LoginResult
             * @property {Protos.IMsgOpts|null} [opts] LS2GC_LoginResult opts
             * @property {Protos.LS2GC_LoginResult.EResult|null} [result] LS2GC_LoginResult result
             * @property {Long|null} [sessionID] LS2GC_LoginResult sessionID
             * @property {Array.<Protos.IGSInfo>|null} [gsInfos] LS2GC_LoginResult gsInfos
             */
    
            /**
             * Constructs a new LS2GC_LoginResult.
             * @memberof Protos
             * @classdesc Represents a LS2GC_LoginResult.
             * @implements ILS2GC_LoginResult
             * @constructor
             * @param {Protos.ILS2GC_LoginResult=} [properties] Properties to set
             */
            function LS2GC_LoginResult(properties) {
                this.gsInfos = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LS2GC_LoginResult opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.LS2GC_LoginResult
             * @instance
             */
            LS2GC_LoginResult.prototype.opts = null;
    
            /**
             * LS2GC_LoginResult result.
             * @member {Protos.LS2GC_LoginResult.EResult} result
             * @memberof Protos.LS2GC_LoginResult
             * @instance
             */
            LS2GC_LoginResult.prototype.result = 0;
    
            /**
             * LS2GC_LoginResult sessionID.
             * @member {Long} sessionID
             * @memberof Protos.LS2GC_LoginResult
             * @instance
             */
            LS2GC_LoginResult.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * LS2GC_LoginResult gsInfos.
             * @member {Array.<Protos.IGSInfo>} gsInfos
             * @memberof Protos.LS2GC_LoginResult
             * @instance
             */
            LS2GC_LoginResult.prototype.gsInfos = $util.emptyArray;
    
            /**
             * Creates a new LS2GC_LoginResult instance using the specified properties.
             * @function create
             * @memberof Protos.LS2GC_LoginResult
             * @static
             * @param {Protos.ILS2GC_LoginResult=} [properties] Properties to set
             * @returns {Protos.LS2GC_LoginResult} LS2GC_LoginResult instance
             */
            LS2GC_LoginResult.create = function create(properties) {
                return new LS2GC_LoginResult(properties);
            };
    
            /**
             * Encodes the specified LS2GC_LoginResult message. Does not implicitly {@link Protos.LS2GC_LoginResult.verify|verify} messages.
             * @function encode
             * @memberof Protos.LS2GC_LoginResult
             * @static
             * @param {Protos.ILS2GC_LoginResult} message LS2GC_LoginResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2GC_LoginResult.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.sessionID);
                if (message.gsInfos != null && message.gsInfos.length)
                    for (var i = 0; i < message.gsInfos.length; ++i)
                        $root.Protos.GSInfo.encode(message.gsInfos[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified LS2GC_LoginResult message, length delimited. Does not implicitly {@link Protos.LS2GC_LoginResult.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LS2GC_LoginResult
             * @static
             * @param {Protos.ILS2GC_LoginResult} message LS2GC_LoginResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2GC_LoginResult.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LS2GC_LoginResult message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LS2GC_LoginResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LS2GC_LoginResult} LS2GC_LoginResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2GC_LoginResult.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2GC_LoginResult();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.result = reader.int32();
                        break;
                    case 3:
                        message.sessionID = reader.uint64();
                        break;
                    case 4:
                        if (!(message.gsInfos && message.gsInfos.length))
                            message.gsInfos = [];
                        message.gsInfos.push($root.Protos.GSInfo.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a LS2GC_LoginResult message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LS2GC_LoginResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LS2GC_LoginResult} LS2GC_LoginResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2GC_LoginResult.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LS2GC_LoginResult message.
             * @function verify
             * @memberof Protos.LS2GC_LoginResult
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LS2GC_LoginResult.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.result != null && message.hasOwnProperty("result"))
                    switch (message.result) {
                    default:
                        return "result: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    if (!$util.isInteger(message.sessionID) && !(message.sessionID && $util.isInteger(message.sessionID.low) && $util.isInteger(message.sessionID.high)))
                        return "sessionID: integer|Long expected";
                if (message.gsInfos != null && message.hasOwnProperty("gsInfos")) {
                    if (!Array.isArray(message.gsInfos))
                        return "gsInfos: array expected";
                    for (var i = 0; i < message.gsInfos.length; ++i) {
                        var error = $root.Protos.GSInfo.verify(message.gsInfos[i]);
                        if (error)
                            return "gsInfos." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a LS2GC_LoginResult message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LS2GC_LoginResult
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LS2GC_LoginResult} LS2GC_LoginResult
             */
            LS2GC_LoginResult.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.LS2GC_LoginResult)
                    return object;
                var message = new $root.Protos.LS2GC_LoginResult();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.LS2GC_LoginResult.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                switch (object.result) {
                case "Success":
                case 0:
                    message.result = 0;
                    break;
                case "Failed":
                case 1:
                    message.result = 1;
                    break;
                case "InvalidUname":
                case 2:
                    message.result = 2;
                    break;
                case "InvalidPwd":
                case 3:
                    message.result = 3;
                    break;
                }
                if (object.sessionID != null)
                    if ($util.Long)
                        (message.sessionID = $util.Long.fromValue(object.sessionID)).unsigned = true;
                    else if (typeof object.sessionID === "string")
                        message.sessionID = parseInt(object.sessionID, 10);
                    else if (typeof object.sessionID === "number")
                        message.sessionID = object.sessionID;
                    else if (typeof object.sessionID === "object")
                        message.sessionID = new $util.LongBits(object.sessionID.low >>> 0, object.sessionID.high >>> 0).toNumber(true);
                if (object.gsInfos) {
                    if (!Array.isArray(object.gsInfos))
                        throw TypeError(".Protos.LS2GC_LoginResult.gsInfos: array expected");
                    message.gsInfos = [];
                    for (var i = 0; i < object.gsInfos.length; ++i) {
                        if (typeof object.gsInfos[i] !== "object")
                            throw TypeError(".Protos.LS2GC_LoginResult.gsInfos: object expected");
                        message.gsInfos[i] = $root.Protos.GSInfo.fromObject(object.gsInfos[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a LS2GC_LoginResult message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LS2GC_LoginResult
             * @static
             * @param {Protos.LS2GC_LoginResult} message LS2GC_LoginResult
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LS2GC_LoginResult.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.gsInfos = [];
                if (options.defaults) {
                    object.opts = null;
                    object.result = options.enums === String ? "Success" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.sessionID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.sessionID = options.longs === String ? "0" : 0;
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.result != null && message.hasOwnProperty("result"))
                    object.result = options.enums === String ? $root.Protos.LS2GC_LoginResult.EResult[message.result] : message.result;
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    if (typeof message.sessionID === "number")
                        object.sessionID = options.longs === String ? String(message.sessionID) : message.sessionID;
                    else
                        object.sessionID = options.longs === String ? $util.Long.prototype.toString.call(message.sessionID) : options.longs === Number ? new $util.LongBits(message.sessionID.low >>> 0, message.sessionID.high >>> 0).toNumber(true) : message.sessionID;
                if (message.gsInfos && message.gsInfos.length) {
                    object.gsInfos = [];
                    for (var j = 0; j < message.gsInfos.length; ++j)
                        object.gsInfos[j] = $root.Protos.GSInfo.toObject(message.gsInfos[j], options);
                }
                return object;
            };
    
            /**
             * Converts this LS2GC_LoginResult to JSON.
             * @function toJSON
             * @memberof Protos.LS2GC_LoginResult
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LS2GC_LoginResult.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * EResult enum.
             * @name Protos.LS2GC_LoginResult.EResult
             * @enum {string}
             * @property {number} Success=0 Success value
             * @property {number} Failed=1 Failed value
             * @property {number} InvalidUname=2 InvalidUname value
             * @property {number} InvalidPwd=3 InvalidPwd value
             */
            LS2GC_LoginResult.EResult = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Success"] = 0;
                values[valuesById[1] = "Failed"] = 1;
                values[valuesById[2] = "InvalidUname"] = 2;
                values[valuesById[3] = "InvalidPwd"] = 3;
                return values;
            })();
    
            return LS2GC_LoginResult;
        })();
    
        Protos.LS2GC_GSInfo = (function() {
    
            /**
             * Properties of a LS2GC_GSInfo.
             * @memberof Protos
             * @interface ILS2GC_GSInfo
             * @property {Protos.IMsgOpts|null} [opts] LS2GC_GSInfo opts
             * @property {Array.<Protos.IGSInfo>|null} [gsInfos] LS2GC_GSInfo gsInfos
             */
    
            /**
             * Constructs a new LS2GC_GSInfo.
             * @memberof Protos
             * @classdesc Represents a LS2GC_GSInfo.
             * @implements ILS2GC_GSInfo
             * @constructor
             * @param {Protos.ILS2GC_GSInfo=} [properties] Properties to set
             */
            function LS2GC_GSInfo(properties) {
                this.gsInfos = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LS2GC_GSInfo opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.LS2GC_GSInfo
             * @instance
             */
            LS2GC_GSInfo.prototype.opts = null;
    
            /**
             * LS2GC_GSInfo gsInfos.
             * @member {Array.<Protos.IGSInfo>} gsInfos
             * @memberof Protos.LS2GC_GSInfo
             * @instance
             */
            LS2GC_GSInfo.prototype.gsInfos = $util.emptyArray;
    
            /**
             * Creates a new LS2GC_GSInfo instance using the specified properties.
             * @function create
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {Protos.ILS2GC_GSInfo=} [properties] Properties to set
             * @returns {Protos.LS2GC_GSInfo} LS2GC_GSInfo instance
             */
            LS2GC_GSInfo.create = function create(properties) {
                return new LS2GC_GSInfo(properties);
            };
    
            /**
             * Encodes the specified LS2GC_GSInfo message. Does not implicitly {@link Protos.LS2GC_GSInfo.verify|verify} messages.
             * @function encode
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {Protos.ILS2GC_GSInfo} message LS2GC_GSInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2GC_GSInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.gsInfos != null && message.gsInfos.length)
                    for (var i = 0; i < message.gsInfos.length; ++i)
                        $root.Protos.GSInfo.encode(message.gsInfos[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified LS2GC_GSInfo message, length delimited. Does not implicitly {@link Protos.LS2GC_GSInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {Protos.ILS2GC_GSInfo} message LS2GC_GSInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2GC_GSInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LS2GC_GSInfo message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LS2GC_GSInfo} LS2GC_GSInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2GC_GSInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2GC_GSInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.gsInfos && message.gsInfos.length))
                            message.gsInfos = [];
                        message.gsInfos.push($root.Protos.GSInfo.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a LS2GC_GSInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LS2GC_GSInfo} LS2GC_GSInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2GC_GSInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LS2GC_GSInfo message.
             * @function verify
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LS2GC_GSInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.gsInfos != null && message.hasOwnProperty("gsInfos")) {
                    if (!Array.isArray(message.gsInfos))
                        return "gsInfos: array expected";
                    for (var i = 0; i < message.gsInfos.length; ++i) {
                        var error = $root.Protos.GSInfo.verify(message.gsInfos[i]);
                        if (error)
                            return "gsInfos." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a LS2GC_GSInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LS2GC_GSInfo} LS2GC_GSInfo
             */
            LS2GC_GSInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.LS2GC_GSInfo)
                    return object;
                var message = new $root.Protos.LS2GC_GSInfo();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.LS2GC_GSInfo.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                if (object.gsInfos) {
                    if (!Array.isArray(object.gsInfos))
                        throw TypeError(".Protos.LS2GC_GSInfo.gsInfos: array expected");
                    message.gsInfos = [];
                    for (var i = 0; i < object.gsInfos.length; ++i) {
                        if (typeof object.gsInfos[i] !== "object")
                            throw TypeError(".Protos.LS2GC_GSInfo.gsInfos: object expected");
                        message.gsInfos[i] = $root.Protos.GSInfo.fromObject(object.gsInfos[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a LS2GC_GSInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {Protos.LS2GC_GSInfo} message LS2GC_GSInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LS2GC_GSInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.gsInfos = [];
                if (options.defaults)
                    object.opts = null;
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.gsInfos && message.gsInfos.length) {
                    object.gsInfos = [];
                    for (var j = 0; j < message.gsInfos.length; ++j)
                        object.gsInfos[j] = $root.Protos.GSInfo.toObject(message.gsInfos[j], options);
                }
                return object;
            };
    
            /**
             * Converts this LS2GC_GSInfo to JSON.
             * @function toJSON
             * @memberof Protos.LS2GC_GSInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LS2GC_GSInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return LS2GC_GSInfo;
        })();
    
        return Protos;
    })();

    return $root;
});
