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
    
        /**
         * MsgID enum.
         * @name Protos.MsgID
         * @enum {string}
         * @property {number} Undefine=0 Undefine value
         * @property {number} eG_AskPing=10 eG_AskPing value
         * @property {number} eG_AskPingRet=11 eG_AskPingRet value
         * @property {number} eGC2LS_AskRegister=100 eGC2LS_AskRegister value
         * @property {number} eGC2LS_AskLogin=101 eGC2LS_AskLogin value
         * @property {number} eLS2GC_Result=200 eLS2GC_Result value
         * @property {number} eLS2GC_GSInfo=201 eLS2GC_GSInfo value
         * @property {number} eGS2CS_ReportState=300 eGS2CS_ReportState value
         * @property {number} eCS2LS_GSInfos=500 eCS2LS_GSInfos value
         * @property {number} eCS2LS_GSInfo=501 eCS2LS_GSInfo value
         * @property {number} eCS2LS_GSLost=502 eCS2LS_GSLost value
         */
        Protos.MsgID = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Undefine"] = 0;
            values[valuesById[10] = "eG_AskPing"] = 10;
            values[valuesById[11] = "eG_AskPingRet"] = 11;
            values[valuesById[100] = "eGC2LS_AskRegister"] = 100;
            values[valuesById[101] = "eGC2LS_AskLogin"] = 101;
            values[valuesById[200] = "eLS2GC_Result"] = 200;
            values[valuesById[201] = "eLS2GC_GSInfo"] = 201;
            values[valuesById[300] = "eGS2CS_ReportState"] = 300;
            values[valuesById[500] = "eCS2LS_GSInfos"] = 500;
            values[valuesById[501] = "eCS2LS_GSInfo"] = 501;
            values[valuesById[502] = "eCS2LS_GSLost"] = 502;
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
             * @property {number|Long|null} [time] G_AskPing time
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
             * @member {number|Long} time
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
             * @property {number|Long|null} [stime] G_AskPingRet stime
             * @property {number|Long|null} [time] G_AskPingRet time
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
             * @member {number|Long} stime
             * @memberof Protos.G_AskPingRet
             * @instance
             */
            G_AskPingRet.prototype.stime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * G_AskPingRet time.
             * @member {number|Long} time
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
             * @property {string|null} [ip] GC2LS_AskRegister ip
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
             * GC2LS_AskRegister ip.
             * @member {string} ip
             * @memberof Protos.GC2LS_AskRegister
             * @instance
             */
            GC2LS_AskRegister.prototype.ip = "";
    
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
                if (message.ip != null && message.hasOwnProperty("ip"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.ip);
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
                    case 6:
                        message.ip = reader.string();
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
                if (message.ip != null && message.hasOwnProperty("ip"))
                    if (!$util.isString(message.ip))
                        return "ip: string expected";
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
                if (object.ip != null)
                    message.ip = String(object.ip);
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
                    object.ip = "";
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
                if (message.ip != null && message.hasOwnProperty("ip"))
                    object.ip = message.ip;
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
             * @property {number|null} [platform] GC2LS_AskLogin platform
             * @property {string|null} [uin] GC2LS_AskLogin uin
             * @property {string|null} [sessionid] GC2LS_AskLogin sessionid
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
             * GC2LS_AskLogin platform.
             * @member {number} platform
             * @memberof Protos.GC2LS_AskLogin
             * @instance
             */
            GC2LS_AskLogin.prototype.platform = 0;
    
            /**
             * GC2LS_AskLogin uin.
             * @member {string} uin
             * @memberof Protos.GC2LS_AskLogin
             * @instance
             */
            GC2LS_AskLogin.prototype.uin = "";
    
            /**
             * GC2LS_AskLogin sessionid.
             * @member {string} sessionid
             * @memberof Protos.GC2LS_AskLogin
             * @instance
             */
            GC2LS_AskLogin.prototype.sessionid = "";
    
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
                if (message.platform != null && message.hasOwnProperty("platform"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.platform);
                if (message.uin != null && message.hasOwnProperty("uin"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.uin);
                if (message.sessionid != null && message.hasOwnProperty("sessionid"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.sessionid);
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
                if (object.platform != null)
                    message.platform = object.platform >>> 0;
                if (object.uin != null)
                    message.uin = String(object.uin);
                if (object.sessionid != null)
                    message.sessionid = String(object.sessionid);
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
                    object.platform = 0;
                    object.uin = "";
                    object.sessionid = "";
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.platform != null && message.hasOwnProperty("platform"))
                    object.platform = message.platform;
                if (message.uin != null && message.hasOwnProperty("uin"))
                    object.uin = message.uin;
                if (message.sessionid != null && message.hasOwnProperty("sessionid"))
                    object.sessionid = message.sessionid;
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
    
        Protos.LS2GC_Result = (function() {
    
            /**
             * Properties of a LS2GC_Result.
             * @memberof Protos
             * @interface ILS2GC_Result
             * @property {Protos.IMsgOpts|null} [opts] LS2GC_Result opts
             * @property {Protos.LS2GC_Result.EResult|null} [result] LS2GC_Result result
             */
    
            /**
             * Constructs a new LS2GC_Result.
             * @memberof Protos
             * @classdesc Represents a LS2GC_Result.
             * @implements ILS2GC_Result
             * @constructor
             * @param {Protos.ILS2GC_Result=} [properties] Properties to set
             */
            function LS2GC_Result(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LS2GC_Result opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.LS2GC_Result
             * @instance
             */
            LS2GC_Result.prototype.opts = null;
    
            /**
             * LS2GC_Result result.
             * @member {Protos.LS2GC_Result.EResult} result
             * @memberof Protos.LS2GC_Result
             * @instance
             */
            LS2GC_Result.prototype.result = 0;
    
            /**
             * Creates a new LS2GC_Result instance using the specified properties.
             * @function create
             * @memberof Protos.LS2GC_Result
             * @static
             * @param {Protos.ILS2GC_Result=} [properties] Properties to set
             * @returns {Protos.LS2GC_Result} LS2GC_Result instance
             */
            LS2GC_Result.create = function create(properties) {
                return new LS2GC_Result(properties);
            };
    
            /**
             * Encodes the specified LS2GC_Result message. Does not implicitly {@link Protos.LS2GC_Result.verify|verify} messages.
             * @function encode
             * @memberof Protos.LS2GC_Result
             * @static
             * @param {Protos.ILS2GC_Result} message LS2GC_Result message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2GC_Result.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                return writer;
            };
    
            /**
             * Encodes the specified LS2GC_Result message, length delimited. Does not implicitly {@link Protos.LS2GC_Result.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LS2GC_Result
             * @static
             * @param {Protos.ILS2GC_Result} message LS2GC_Result message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2GC_Result.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LS2GC_Result message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LS2GC_Result
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LS2GC_Result} LS2GC_Result
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2GC_Result.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2GC_Result();
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
             * Decodes a LS2GC_Result message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LS2GC_Result
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LS2GC_Result} LS2GC_Result
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2GC_Result.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LS2GC_Result message.
             * @function verify
             * @memberof Protos.LS2GC_Result
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LS2GC_Result.verify = function verify(message) {
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
             * Creates a LS2GC_Result message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LS2GC_Result
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LS2GC_Result} LS2GC_Result
             */
            LS2GC_Result.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.LS2GC_Result)
                    return object;
                var message = new $root.Protos.LS2GC_Result();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.LS2GC_Result.opts: object expected");
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
                case "UsernameExists":
                case 2:
                    message.result = 2;
                    break;
                case "IllegalName":
                case 3:
                    message.result = 3;
                    break;
                case "IllegalPasswd":
                case 4:
                    message.result = 4;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a LS2GC_Result message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LS2GC_Result
             * @static
             * @param {Protos.LS2GC_Result} message LS2GC_Result
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LS2GC_Result.toObject = function toObject(message, options) {
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
                    object.result = options.enums === String ? $root.Protos.LS2GC_Result.EResult[message.result] : message.result;
                return object;
            };
    
            /**
             * Converts this LS2GC_Result to JSON.
             * @function toJSON
             * @memberof Protos.LS2GC_Result
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LS2GC_Result.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * EResult enum.
             * @name Protos.LS2GC_Result.EResult
             * @enum {string}
             * @property {number} Success=0 Success value
             * @property {number} Failed=1 Failed value
             * @property {number} UsernameExists=2 UsernameExists value
             * @property {number} IllegalName=3 IllegalName value
             * @property {number} IllegalPasswd=4 IllegalPasswd value
             */
            LS2GC_Result.EResult = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Success"] = 0;
                values[valuesById[1] = "Failed"] = 1;
                values[valuesById[2] = "UsernameExists"] = 2;
                values[valuesById[3] = "IllegalName"] = 3;
                values[valuesById[4] = "IllegalPasswd"] = 4;
                return values;
            })();
    
            return LS2GC_Result;
        })();
    
        Protos.LS2GC_GSInfo = (function() {
    
            /**
             * Properties of a LS2GC_GSInfo.
             * @memberof Protos
             * @interface ILS2GC_GSInfo
             * @property {Protos.IMsgOpts|null} [opts] LS2GC_GSInfo opts
             * @property {Array.<Protos.IGSInfo>|null} [gsInfo] LS2GC_GSInfo gsInfo
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
                this.gsInfo = [];
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
             * LS2GC_GSInfo gsInfo.
             * @member {Array.<Protos.IGSInfo>} gsInfo
             * @memberof Protos.LS2GC_GSInfo
             * @instance
             */
            LS2GC_GSInfo.prototype.gsInfo = $util.emptyArray;
    
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
                if (message.gsInfo != null && message.gsInfo.length)
                    for (var i = 0; i < message.gsInfo.length; ++i)
                        $root.Protos.GSInfo.encode(message.gsInfo[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
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
                if (object.gsInfo) {
                    if (!Array.isArray(object.gsInfo))
                        throw TypeError(".Protos.LS2GC_GSInfo.gsInfo: array expected");
                    message.gsInfo = [];
                    for (var i = 0; i < object.gsInfo.length; ++i) {
                        if (typeof object.gsInfo[i] !== "object")
                            throw TypeError(".Protos.LS2GC_GSInfo.gsInfo: object expected");
                        message.gsInfo[i] = $root.Protos.GSInfo.fromObject(object.gsInfo[i]);
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
