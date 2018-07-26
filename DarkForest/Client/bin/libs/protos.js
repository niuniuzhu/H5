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
    
        Protos.CS2LS = (function() {
    
            /**
             * Namespace CS2LS.
             * @memberof Protos
             * @namespace
             */
            var CS2LS = {};
    
            CS2LS.GSInfos = (function() {
    
                /**
                 * Properties of a GSInfos.
                 * @memberof Protos.CS2LS
                 * @interface IGSInfos
                 * @property {Protos.IPacket|null} [packet] GSInfos packet
                 * @property {Array.<Protos.GS2CS.IGSInfo>|null} [gsInfo] GSInfos gsInfo
                 */
    
                /**
                 * Constructs a new GSInfos.
                 * @memberof Protos.CS2LS
                 * @classdesc Represents a GSInfos.
                 * @implements IGSInfos
                 * @constructor
                 * @param {Protos.CS2LS.IGSInfos=} [properties] Properties to set
                 */
                function GSInfos(properties) {
                    this.gsInfo = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * GSInfos packet.
                 * @member {Protos.IPacket|null|undefined} packet
                 * @memberof Protos.CS2LS.GSInfos
                 * @instance
                 */
                GSInfos.prototype.packet = null;
    
                /**
                 * GSInfos gsInfo.
                 * @member {Array.<Protos.GS2CS.IGSInfo>} gsInfo
                 * @memberof Protos.CS2LS.GSInfos
                 * @instance
                 */
                GSInfos.prototype.gsInfo = $util.emptyArray;
    
                /**
                 * Creates a new GSInfos instance using the specified properties.
                 * @function create
                 * @memberof Protos.CS2LS.GSInfos
                 * @static
                 * @param {Protos.CS2LS.IGSInfos=} [properties] Properties to set
                 * @returns {Protos.CS2LS.GSInfos} GSInfos instance
                 */
                GSInfos.create = function create(properties) {
                    return new GSInfos(properties);
                };
    
                /**
                 * Encodes the specified GSInfos message. Does not implicitly {@link Protos.CS2LS.GSInfos.verify|verify} messages.
                 * @function encode
                 * @memberof Protos.CS2LS.GSInfos
                 * @static
                 * @param {Protos.CS2LS.IGSInfos} message GSInfos message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GSInfos.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.packet != null && message.hasOwnProperty("packet"))
                        $root.Protos.Packet.encode(message.packet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.gsInfo != null && message.gsInfo.length)
                        for (var i = 0; i < message.gsInfo.length; ++i)
                            $root.Protos.GS2CS.GSInfo.encode(message.gsInfo[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };
    
                /**
                 * Encodes the specified GSInfos message, length delimited. Does not implicitly {@link Protos.CS2LS.GSInfos.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Protos.CS2LS.GSInfos
                 * @static
                 * @param {Protos.CS2LS.IGSInfos} message GSInfos message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GSInfos.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a GSInfos message from the specified reader or buffer.
                 * @function decode
                 * @memberof Protos.CS2LS.GSInfos
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Protos.CS2LS.GSInfos} GSInfos
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GSInfos.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS.GSInfos();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.packet = $root.Protos.Packet.decode(reader, reader.uint32());
                            break;
                        case 2:
                            if (!(message.gsInfo && message.gsInfo.length))
                                message.gsInfo = [];
                            message.gsInfo.push($root.Protos.GS2CS.GSInfo.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a GSInfos message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof Protos.CS2LS.GSInfos
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Protos.CS2LS.GSInfos} GSInfos
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GSInfos.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a GSInfos message.
                 * @function verify
                 * @memberof Protos.CS2LS.GSInfos
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GSInfos.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.packet != null && message.hasOwnProperty("packet")) {
                        var error = $root.Protos.Packet.verify(message.packet);
                        if (error)
                            return "packet." + error;
                    }
                    if (message.gsInfo != null && message.hasOwnProperty("gsInfo")) {
                        if (!Array.isArray(message.gsInfo))
                            return "gsInfo: array expected";
                        for (var i = 0; i < message.gsInfo.length; ++i) {
                            var error = $root.Protos.GS2CS.GSInfo.verify(message.gsInfo[i]);
                            if (error)
                                return "gsInfo." + error;
                        }
                    }
                    return null;
                };
    
                /**
                 * Creates a GSInfos message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Protos.CS2LS.GSInfos
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Protos.CS2LS.GSInfos} GSInfos
                 */
                GSInfos.fromObject = function fromObject(object) {
                    if (object instanceof $root.Protos.CS2LS.GSInfos)
                        return object;
                    var message = new $root.Protos.CS2LS.GSInfos();
                    if (object.packet != null) {
                        if (typeof object.packet !== "object")
                            throw TypeError(".Protos.CS2LS.GSInfos.packet: object expected");
                        message.packet = $root.Protos.Packet.fromObject(object.packet);
                    }
                    if (object.gsInfo) {
                        if (!Array.isArray(object.gsInfo))
                            throw TypeError(".Protos.CS2LS.GSInfos.gsInfo: array expected");
                        message.gsInfo = [];
                        for (var i = 0; i < object.gsInfo.length; ++i) {
                            if (typeof object.gsInfo[i] !== "object")
                                throw TypeError(".Protos.CS2LS.GSInfos.gsInfo: object expected");
                            message.gsInfo[i] = $root.Protos.GS2CS.GSInfo.fromObject(object.gsInfo[i]);
                        }
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from a GSInfos message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Protos.CS2LS.GSInfos
                 * @static
                 * @param {Protos.CS2LS.GSInfos} message GSInfos
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GSInfos.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.gsInfo = [];
                    if (options.defaults)
                        object.packet = null;
                    if (message.packet != null && message.hasOwnProperty("packet"))
                        object.packet = $root.Protos.Packet.toObject(message.packet, options);
                    if (message.gsInfo && message.gsInfo.length) {
                        object.gsInfo = [];
                        for (var j = 0; j < message.gsInfo.length; ++j)
                            object.gsInfo[j] = $root.Protos.GS2CS.GSInfo.toObject(message.gsInfo[j], options);
                    }
                    return object;
                };
    
                /**
                 * Converts this GSInfos to JSON.
                 * @function toJSON
                 * @memberof Protos.CS2LS.GSInfos
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GSInfos.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return GSInfos;
            })();
    
            CS2LS.GSInfo = (function() {
    
                /**
                 * Properties of a GSInfo.
                 * @memberof Protos.CS2LS
                 * @interface IGSInfo
                 * @property {Protos.IPacket|null} [packet] GSInfo packet
                 * @property {Protos.GS2CS.IGSInfo|null} [gsInfo] GSInfo gsInfo
                 */
    
                /**
                 * Constructs a new GSInfo.
                 * @memberof Protos.CS2LS
                 * @classdesc Represents a GSInfo.
                 * @implements IGSInfo
                 * @constructor
                 * @param {Protos.CS2LS.IGSInfo=} [properties] Properties to set
                 */
                function GSInfo(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * GSInfo packet.
                 * @member {Protos.IPacket|null|undefined} packet
                 * @memberof Protos.CS2LS.GSInfo
                 * @instance
                 */
                GSInfo.prototype.packet = null;
    
                /**
                 * GSInfo gsInfo.
                 * @member {Protos.GS2CS.IGSInfo|null|undefined} gsInfo
                 * @memberof Protos.CS2LS.GSInfo
                 * @instance
                 */
                GSInfo.prototype.gsInfo = null;
    
                /**
                 * Creates a new GSInfo instance using the specified properties.
                 * @function create
                 * @memberof Protos.CS2LS.GSInfo
                 * @static
                 * @param {Protos.CS2LS.IGSInfo=} [properties] Properties to set
                 * @returns {Protos.CS2LS.GSInfo} GSInfo instance
                 */
                GSInfo.create = function create(properties) {
                    return new GSInfo(properties);
                };
    
                /**
                 * Encodes the specified GSInfo message. Does not implicitly {@link Protos.CS2LS.GSInfo.verify|verify} messages.
                 * @function encode
                 * @memberof Protos.CS2LS.GSInfo
                 * @static
                 * @param {Protos.CS2LS.IGSInfo} message GSInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GSInfo.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.packet != null && message.hasOwnProperty("packet"))
                        $root.Protos.Packet.encode(message.packet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.gsInfo != null && message.hasOwnProperty("gsInfo"))
                        $root.Protos.GS2CS.GSInfo.encode(message.gsInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };
    
                /**
                 * Encodes the specified GSInfo message, length delimited. Does not implicitly {@link Protos.CS2LS.GSInfo.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Protos.CS2LS.GSInfo
                 * @static
                 * @param {Protos.CS2LS.IGSInfo} message GSInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GSInfo.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a GSInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof Protos.CS2LS.GSInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Protos.CS2LS.GSInfo} GSInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GSInfo.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS.GSInfo();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.packet = $root.Protos.Packet.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.gsInfo = $root.Protos.GS2CS.GSInfo.decode(reader, reader.uint32());
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
                 * @memberof Protos.CS2LS.GSInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Protos.CS2LS.GSInfo} GSInfo
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
                 * @memberof Protos.CS2LS.GSInfo
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GSInfo.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.packet != null && message.hasOwnProperty("packet")) {
                        var error = $root.Protos.Packet.verify(message.packet);
                        if (error)
                            return "packet." + error;
                    }
                    if (message.gsInfo != null && message.hasOwnProperty("gsInfo")) {
                        var error = $root.Protos.GS2CS.GSInfo.verify(message.gsInfo);
                        if (error)
                            return "gsInfo." + error;
                    }
                    return null;
                };
    
                /**
                 * Creates a GSInfo message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Protos.CS2LS.GSInfo
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Protos.CS2LS.GSInfo} GSInfo
                 */
                GSInfo.fromObject = function fromObject(object) {
                    if (object instanceof $root.Protos.CS2LS.GSInfo)
                        return object;
                    var message = new $root.Protos.CS2LS.GSInfo();
                    if (object.packet != null) {
                        if (typeof object.packet !== "object")
                            throw TypeError(".Protos.CS2LS.GSInfo.packet: object expected");
                        message.packet = $root.Protos.Packet.fromObject(object.packet);
                    }
                    if (object.gsInfo != null) {
                        if (typeof object.gsInfo !== "object")
                            throw TypeError(".Protos.CS2LS.GSInfo.gsInfo: object expected");
                        message.gsInfo = $root.Protos.GS2CS.GSInfo.fromObject(object.gsInfo);
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from a GSInfo message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Protos.CS2LS.GSInfo
                 * @static
                 * @param {Protos.CS2LS.GSInfo} message GSInfo
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GSInfo.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.packet = null;
                        object.gsInfo = null;
                    }
                    if (message.packet != null && message.hasOwnProperty("packet"))
                        object.packet = $root.Protos.Packet.toObject(message.packet, options);
                    if (message.gsInfo != null && message.hasOwnProperty("gsInfo"))
                        object.gsInfo = $root.Protos.GS2CS.GSInfo.toObject(message.gsInfo, options);
                    return object;
                };
    
                /**
                 * Converts this GSInfo to JSON.
                 * @function toJSON
                 * @memberof Protos.CS2LS.GSInfo
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GSInfo.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return GSInfo;
            })();
    
            CS2LS.GSLost = (function() {
    
                /**
                 * Properties of a GSLost.
                 * @memberof Protos.CS2LS
                 * @interface IGSLost
                 * @property {Protos.IPacket|null} [packet] GSLost packet
                 * @property {number|null} [gsid] GSLost gsid
                 */
    
                /**
                 * Constructs a new GSLost.
                 * @memberof Protos.CS2LS
                 * @classdesc Represents a GSLost.
                 * @implements IGSLost
                 * @constructor
                 * @param {Protos.CS2LS.IGSLost=} [properties] Properties to set
                 */
                function GSLost(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * GSLost packet.
                 * @member {Protos.IPacket|null|undefined} packet
                 * @memberof Protos.CS2LS.GSLost
                 * @instance
                 */
                GSLost.prototype.packet = null;
    
                /**
                 * GSLost gsid.
                 * @member {number} gsid
                 * @memberof Protos.CS2LS.GSLost
                 * @instance
                 */
                GSLost.prototype.gsid = 0;
    
                /**
                 * Creates a new GSLost instance using the specified properties.
                 * @function create
                 * @memberof Protos.CS2LS.GSLost
                 * @static
                 * @param {Protos.CS2LS.IGSLost=} [properties] Properties to set
                 * @returns {Protos.CS2LS.GSLost} GSLost instance
                 */
                GSLost.create = function create(properties) {
                    return new GSLost(properties);
                };
    
                /**
                 * Encodes the specified GSLost message. Does not implicitly {@link Protos.CS2LS.GSLost.verify|verify} messages.
                 * @function encode
                 * @memberof Protos.CS2LS.GSLost
                 * @static
                 * @param {Protos.CS2LS.IGSLost} message GSLost message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GSLost.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.packet != null && message.hasOwnProperty("packet"))
                        $root.Protos.Packet.encode(message.packet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.gsid != null && message.hasOwnProperty("gsid"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.gsid);
                    return writer;
                };
    
                /**
                 * Encodes the specified GSLost message, length delimited. Does not implicitly {@link Protos.CS2LS.GSLost.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Protos.CS2LS.GSLost
                 * @static
                 * @param {Protos.CS2LS.IGSLost} message GSLost message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GSLost.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a GSLost message from the specified reader or buffer.
                 * @function decode
                 * @memberof Protos.CS2LS.GSLost
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Protos.CS2LS.GSLost} GSLost
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GSLost.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS.GSLost();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.packet = $root.Protos.Packet.decode(reader, reader.uint32());
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
                 * Decodes a GSLost message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof Protos.CS2LS.GSLost
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Protos.CS2LS.GSLost} GSLost
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GSLost.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a GSLost message.
                 * @function verify
                 * @memberof Protos.CS2LS.GSLost
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GSLost.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.packet != null && message.hasOwnProperty("packet")) {
                        var error = $root.Protos.Packet.verify(message.packet);
                        if (error)
                            return "packet." + error;
                    }
                    if (message.gsid != null && message.hasOwnProperty("gsid"))
                        if (!$util.isInteger(message.gsid))
                            return "gsid: integer expected";
                    return null;
                };
    
                /**
                 * Creates a GSLost message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Protos.CS2LS.GSLost
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Protos.CS2LS.GSLost} GSLost
                 */
                GSLost.fromObject = function fromObject(object) {
                    if (object instanceof $root.Protos.CS2LS.GSLost)
                        return object;
                    var message = new $root.Protos.CS2LS.GSLost();
                    if (object.packet != null) {
                        if (typeof object.packet !== "object")
                            throw TypeError(".Protos.CS2LS.GSLost.packet: object expected");
                        message.packet = $root.Protos.Packet.fromObject(object.packet);
                    }
                    if (object.gsid != null)
                        message.gsid = object.gsid >>> 0;
                    return message;
                };
    
                /**
                 * Creates a plain object from a GSLost message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Protos.CS2LS.GSLost
                 * @static
                 * @param {Protos.CS2LS.GSLost} message GSLost
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GSLost.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.packet = null;
                        object.gsid = 0;
                    }
                    if (message.packet != null && message.hasOwnProperty("packet"))
                        object.packet = $root.Protos.Packet.toObject(message.packet, options);
                    if (message.gsid != null && message.hasOwnProperty("gsid"))
                        object.gsid = message.gsid;
                    return object;
                };
    
                /**
                 * Converts this GSLost to JSON.
                 * @function toJSON
                 * @memberof Protos.CS2LS.GSLost
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GSLost.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return GSLost;
            })();
    
            return CS2LS;
        })();
    
        /**
         * MsgID enum.
         * @name Protos.MsgID
         * @enum {string}
         * @property {number} Undefine=0 Undefine value
         * @property {number} GC2LS_AskRegister=100 GC2LS_AskRegister value
         * @property {number} GC2LS_AskLogin=101 GC2LS_AskLogin value
         * @property {number} LS2GC_Result=200 LS2GC_Result value
         * @property {number} LS2GC_GSInfo=201 LS2GC_GSInfo value
         * @property {number} GS2CS_ReportState=300 GS2CS_ReportState value
         * @property {number} CS2LS_GSInfos=400 CS2LS_GSInfos value
         * @property {number} CS2LS_GSInfo=401 CS2LS_GSInfo value
         * @property {number} CS2LS_GSLost=402 CS2LS_GSLost value
         */
        Protos.MsgID = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Undefine"] = 0;
            values[valuesById[100] = "GC2LS_AskRegister"] = 100;
            values[valuesById[101] = "GC2LS_AskLogin"] = 101;
            values[valuesById[200] = "LS2GC_Result"] = 200;
            values[valuesById[201] = "LS2GC_GSInfo"] = 201;
            values[valuesById[300] = "GS2CS_ReportState"] = 300;
            values[valuesById[400] = "CS2LS_GSInfos"] = 400;
            values[valuesById[401] = "CS2LS_GSInfo"] = 401;
            values[valuesById[402] = "CS2LS_GSLost"] = 402;
            return values;
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
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.Packet();
                while (reader.pos < end) {
                    var tag = reader.uint32();
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
                var message = new $root.Protos.Packet();
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
                var object = {};
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
    
        Protos.GS2CS = (function() {
    
            /**
             * Namespace GS2CS.
             * @memberof Protos
             * @namespace
             */
            var GS2CS = {};
    
            GS2CS.GSInfo = (function() {
    
                /**
                 * Properties of a GSInfo.
                 * @memberof Protos.GS2CS
                 * @interface IGSInfo
                 * @property {number|null} [id] GSInfo id
                 * @property {string|null} [name] GSInfo name
                 * @property {string|null} [ip] GSInfo ip
                 * @property {number|null} [port] GSInfo port
                 * @property {string|null} [password] GSInfo password
                 * @property {Protos.GS2CS.GSInfo.State|null} [state] GSInfo state
                 */
    
                /**
                 * Constructs a new GSInfo.
                 * @memberof Protos.GS2CS
                 * @classdesc Represents a GSInfo.
                 * @implements IGSInfo
                 * @constructor
                 * @param {Protos.GS2CS.IGSInfo=} [properties] Properties to set
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
                 * @memberof Protos.GS2CS.GSInfo
                 * @instance
                 */
                GSInfo.prototype.id = 0;
    
                /**
                 * GSInfo name.
                 * @member {string} name
                 * @memberof Protos.GS2CS.GSInfo
                 * @instance
                 */
                GSInfo.prototype.name = "";
    
                /**
                 * GSInfo ip.
                 * @member {string} ip
                 * @memberof Protos.GS2CS.GSInfo
                 * @instance
                 */
                GSInfo.prototype.ip = "";
    
                /**
                 * GSInfo port.
                 * @member {number} port
                 * @memberof Protos.GS2CS.GSInfo
                 * @instance
                 */
                GSInfo.prototype.port = 0;
    
                /**
                 * GSInfo password.
                 * @member {string} password
                 * @memberof Protos.GS2CS.GSInfo
                 * @instance
                 */
                GSInfo.prototype.password = "";
    
                /**
                 * GSInfo state.
                 * @member {Protos.GS2CS.GSInfo.State} state
                 * @memberof Protos.GS2CS.GSInfo
                 * @instance
                 */
                GSInfo.prototype.state = 0;
    
                /**
                 * Creates a new GSInfo instance using the specified properties.
                 * @function create
                 * @memberof Protos.GS2CS.GSInfo
                 * @static
                 * @param {Protos.GS2CS.IGSInfo=} [properties] Properties to set
                 * @returns {Protos.GS2CS.GSInfo} GSInfo instance
                 */
                GSInfo.create = function create(properties) {
                    return new GSInfo(properties);
                };
    
                /**
                 * Encodes the specified GSInfo message. Does not implicitly {@link Protos.GS2CS.GSInfo.verify|verify} messages.
                 * @function encode
                 * @memberof Protos.GS2CS.GSInfo
                 * @static
                 * @param {Protos.GS2CS.IGSInfo} message GSInfo message or plain object to encode
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
                 * Encodes the specified GSInfo message, length delimited. Does not implicitly {@link Protos.GS2CS.GSInfo.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Protos.GS2CS.GSInfo
                 * @static
                 * @param {Protos.GS2CS.IGSInfo} message GSInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GSInfo.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a GSInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof Protos.GS2CS.GSInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Protos.GS2CS.GSInfo} GSInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GSInfo.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2CS.GSInfo();
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
                 * @memberof Protos.GS2CS.GSInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Protos.GS2CS.GSInfo} GSInfo
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
                 * @memberof Protos.GS2CS.GSInfo
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
                 * @memberof Protos.GS2CS.GSInfo
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Protos.GS2CS.GSInfo} GSInfo
                 */
                GSInfo.fromObject = function fromObject(object) {
                    if (object instanceof $root.Protos.GS2CS.GSInfo)
                        return object;
                    var message = new $root.Protos.GS2CS.GSInfo();
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
                 * @memberof Protos.GS2CS.GSInfo
                 * @static
                 * @param {Protos.GS2CS.GSInfo} message GSInfo
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
                        object.state = options.enums === String ? $root.Protos.GS2CS.GSInfo.State[message.state] : message.state;
                    return object;
                };
    
                /**
                 * Converts this GSInfo to JSON.
                 * @function toJSON
                 * @memberof Protos.GS2CS.GSInfo
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GSInfo.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                /**
                 * State enum.
                 * @name Protos.GS2CS.GSInfo.State
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
    
            GS2CS.ReportState = (function() {
    
                /**
                 * Properties of a ReportState.
                 * @memberof Protos.GS2CS
                 * @interface IReportState
                 * @property {Protos.IPacket|null} [packet] ReportState packet
                 * @property {Protos.GS2CS.IGSInfo|null} [gsInfo] ReportState gsInfo
                 */
    
                /**
                 * Constructs a new ReportState.
                 * @memberof Protos.GS2CS
                 * @classdesc Represents a ReportState.
                 * @implements IReportState
                 * @constructor
                 * @param {Protos.GS2CS.IReportState=} [properties] Properties to set
                 */
                function ReportState(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * ReportState packet.
                 * @member {Protos.IPacket|null|undefined} packet
                 * @memberof Protos.GS2CS.ReportState
                 * @instance
                 */
                ReportState.prototype.packet = null;
    
                /**
                 * ReportState gsInfo.
                 * @member {Protos.GS2CS.IGSInfo|null|undefined} gsInfo
                 * @memberof Protos.GS2CS.ReportState
                 * @instance
                 */
                ReportState.prototype.gsInfo = null;
    
                /**
                 * Creates a new ReportState instance using the specified properties.
                 * @function create
                 * @memberof Protos.GS2CS.ReportState
                 * @static
                 * @param {Protos.GS2CS.IReportState=} [properties] Properties to set
                 * @returns {Protos.GS2CS.ReportState} ReportState instance
                 */
                ReportState.create = function create(properties) {
                    return new ReportState(properties);
                };
    
                /**
                 * Encodes the specified ReportState message. Does not implicitly {@link Protos.GS2CS.ReportState.verify|verify} messages.
                 * @function encode
                 * @memberof Protos.GS2CS.ReportState
                 * @static
                 * @param {Protos.GS2CS.IReportState} message ReportState message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ReportState.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.packet != null && message.hasOwnProperty("packet"))
                        $root.Protos.Packet.encode(message.packet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.gsInfo != null && message.hasOwnProperty("gsInfo"))
                        $root.Protos.GS2CS.GSInfo.encode(message.gsInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };
    
                /**
                 * Encodes the specified ReportState message, length delimited. Does not implicitly {@link Protos.GS2CS.ReportState.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Protos.GS2CS.ReportState
                 * @static
                 * @param {Protos.GS2CS.IReportState} message ReportState message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ReportState.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a ReportState message from the specified reader or buffer.
                 * @function decode
                 * @memberof Protos.GS2CS.ReportState
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Protos.GS2CS.ReportState} ReportState
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ReportState.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2CS.ReportState();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.packet = $root.Protos.Packet.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.gsInfo = $root.Protos.GS2CS.GSInfo.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a ReportState message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof Protos.GS2CS.ReportState
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Protos.GS2CS.ReportState} ReportState
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ReportState.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a ReportState message.
                 * @function verify
                 * @memberof Protos.GS2CS.ReportState
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ReportState.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.packet != null && message.hasOwnProperty("packet")) {
                        var error = $root.Protos.Packet.verify(message.packet);
                        if (error)
                            return "packet." + error;
                    }
                    if (message.gsInfo != null && message.hasOwnProperty("gsInfo")) {
                        var error = $root.Protos.GS2CS.GSInfo.verify(message.gsInfo);
                        if (error)
                            return "gsInfo." + error;
                    }
                    return null;
                };
    
                /**
                 * Creates a ReportState message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Protos.GS2CS.ReportState
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Protos.GS2CS.ReportState} ReportState
                 */
                ReportState.fromObject = function fromObject(object) {
                    if (object instanceof $root.Protos.GS2CS.ReportState)
                        return object;
                    var message = new $root.Protos.GS2CS.ReportState();
                    if (object.packet != null) {
                        if (typeof object.packet !== "object")
                            throw TypeError(".Protos.GS2CS.ReportState.packet: object expected");
                        message.packet = $root.Protos.Packet.fromObject(object.packet);
                    }
                    if (object.gsInfo != null) {
                        if (typeof object.gsInfo !== "object")
                            throw TypeError(".Protos.GS2CS.ReportState.gsInfo: object expected");
                        message.gsInfo = $root.Protos.GS2CS.GSInfo.fromObject(object.gsInfo);
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from a ReportState message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Protos.GS2CS.ReportState
                 * @static
                 * @param {Protos.GS2CS.ReportState} message ReportState
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ReportState.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.packet = null;
                        object.gsInfo = null;
                    }
                    if (message.packet != null && message.hasOwnProperty("packet"))
                        object.packet = $root.Protos.Packet.toObject(message.packet, options);
                    if (message.gsInfo != null && message.hasOwnProperty("gsInfo"))
                        object.gsInfo = $root.Protos.GS2CS.GSInfo.toObject(message.gsInfo, options);
                    return object;
                };
    
                /**
                 * Converts this ReportState to JSON.
                 * @function toJSON
                 * @memberof Protos.GS2CS.ReportState
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ReportState.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return ReportState;
            })();
    
            return GS2CS;
        })();
    
        Protos.GC2LS = (function() {
    
            /**
             * Namespace GC2LS.
             * @memberof Protos
             * @namespace
             */
            var GC2LS = {};
    
            GC2LS.AskRegister = (function() {
    
                /**
                 * Properties of an AskRegister.
                 * @memberof Protos.GC2LS
                 * @interface IAskRegister
                 * @property {Protos.IPacket|null} [packet] AskRegister packet
                 * @property {number|null} [sdk] AskRegister sdk
                 * @property {string|null} [name] AskRegister name
                 * @property {string|null} [passwd] AskRegister passwd
                 * @property {number|null} [platform] AskRegister platform
                 * @property {string|null} [ip] AskRegister ip
                 */
    
                /**
                 * Constructs a new AskRegister.
                 * @memberof Protos.GC2LS
                 * @classdesc Represents an AskRegister.
                 * @implements IAskRegister
                 * @constructor
                 * @param {Protos.GC2LS.IAskRegister=} [properties] Properties to set
                 */
                function AskRegister(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * AskRegister packet.
                 * @member {Protos.IPacket|null|undefined} packet
                 * @memberof Protos.GC2LS.AskRegister
                 * @instance
                 */
                AskRegister.prototype.packet = null;
    
                /**
                 * AskRegister sdk.
                 * @member {number} sdk
                 * @memberof Protos.GC2LS.AskRegister
                 * @instance
                 */
                AskRegister.prototype.sdk = 0;
    
                /**
                 * AskRegister name.
                 * @member {string} name
                 * @memberof Protos.GC2LS.AskRegister
                 * @instance
                 */
                AskRegister.prototype.name = "";
    
                /**
                 * AskRegister passwd.
                 * @member {string} passwd
                 * @memberof Protos.GC2LS.AskRegister
                 * @instance
                 */
                AskRegister.prototype.passwd = "";
    
                /**
                 * AskRegister platform.
                 * @member {number} platform
                 * @memberof Protos.GC2LS.AskRegister
                 * @instance
                 */
                AskRegister.prototype.platform = 0;
    
                /**
                 * AskRegister ip.
                 * @member {string} ip
                 * @memberof Protos.GC2LS.AskRegister
                 * @instance
                 */
                AskRegister.prototype.ip = "";
    
                /**
                 * Creates a new AskRegister instance using the specified properties.
                 * @function create
                 * @memberof Protos.GC2LS.AskRegister
                 * @static
                 * @param {Protos.GC2LS.IAskRegister=} [properties] Properties to set
                 * @returns {Protos.GC2LS.AskRegister} AskRegister instance
                 */
                AskRegister.create = function create(properties) {
                    return new AskRegister(properties);
                };
    
                /**
                 * Encodes the specified AskRegister message. Does not implicitly {@link Protos.GC2LS.AskRegister.verify|verify} messages.
                 * @function encode
                 * @memberof Protos.GC2LS.AskRegister
                 * @static
                 * @param {Protos.GC2LS.IAskRegister} message AskRegister message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AskRegister.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.packet != null && message.hasOwnProperty("packet"))
                        $root.Protos.Packet.encode(message.packet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
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
                 * Encodes the specified AskRegister message, length delimited. Does not implicitly {@link Protos.GC2LS.AskRegister.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Protos.GC2LS.AskRegister
                 * @static
                 * @param {Protos.GC2LS.IAskRegister} message AskRegister message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AskRegister.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an AskRegister message from the specified reader or buffer.
                 * @function decode
                 * @memberof Protos.GC2LS.AskRegister
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Protos.GC2LS.AskRegister} AskRegister
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AskRegister.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2LS.AskRegister();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.packet = $root.Protos.Packet.decode(reader, reader.uint32());
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
                 * Decodes an AskRegister message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof Protos.GC2LS.AskRegister
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Protos.GC2LS.AskRegister} AskRegister
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AskRegister.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an AskRegister message.
                 * @function verify
                 * @memberof Protos.GC2LS.AskRegister
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AskRegister.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.packet != null && message.hasOwnProperty("packet")) {
                        var error = $root.Protos.Packet.verify(message.packet);
                        if (error)
                            return "packet." + error;
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
                 * Creates an AskRegister message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Protos.GC2LS.AskRegister
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Protos.GC2LS.AskRegister} AskRegister
                 */
                AskRegister.fromObject = function fromObject(object) {
                    if (object instanceof $root.Protos.GC2LS.AskRegister)
                        return object;
                    var message = new $root.Protos.GC2LS.AskRegister();
                    if (object.packet != null) {
                        if (typeof object.packet !== "object")
                            throw TypeError(".Protos.GC2LS.AskRegister.packet: object expected");
                        message.packet = $root.Protos.Packet.fromObject(object.packet);
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
                 * Creates a plain object from an AskRegister message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Protos.GC2LS.AskRegister
                 * @static
                 * @param {Protos.GC2LS.AskRegister} message AskRegister
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AskRegister.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.packet = null;
                        object.sdk = 0;
                        object.name = "";
                        object.passwd = "";
                        object.platform = 0;
                        object.ip = "";
                    }
                    if (message.packet != null && message.hasOwnProperty("packet"))
                        object.packet = $root.Protos.Packet.toObject(message.packet, options);
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
                 * Converts this AskRegister to JSON.
                 * @function toJSON
                 * @memberof Protos.GC2LS.AskRegister
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AskRegister.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return AskRegister;
            })();
    
            GC2LS.AskLogin = (function() {
    
                /**
                 * Properties of an AskLogin.
                 * @memberof Protos.GC2LS
                 * @interface IAskLogin
                 * @property {Protos.IPacket|null} [packet] AskLogin packet
                 * @property {number|null} [platform] AskLogin platform
                 * @property {string|null} [uin] AskLogin uin
                 * @property {string|null} [sessionid] AskLogin sessionid
                 */
    
                /**
                 * Constructs a new AskLogin.
                 * @memberof Protos.GC2LS
                 * @classdesc Represents an AskLogin.
                 * @implements IAskLogin
                 * @constructor
                 * @param {Protos.GC2LS.IAskLogin=} [properties] Properties to set
                 */
                function AskLogin(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * AskLogin packet.
                 * @member {Protos.IPacket|null|undefined} packet
                 * @memberof Protos.GC2LS.AskLogin
                 * @instance
                 */
                AskLogin.prototype.packet = null;
    
                /**
                 * AskLogin platform.
                 * @member {number} platform
                 * @memberof Protos.GC2LS.AskLogin
                 * @instance
                 */
                AskLogin.prototype.platform = 0;
    
                /**
                 * AskLogin uin.
                 * @member {string} uin
                 * @memberof Protos.GC2LS.AskLogin
                 * @instance
                 */
                AskLogin.prototype.uin = "";
    
                /**
                 * AskLogin sessionid.
                 * @member {string} sessionid
                 * @memberof Protos.GC2LS.AskLogin
                 * @instance
                 */
                AskLogin.prototype.sessionid = "";
    
                /**
                 * Creates a new AskLogin instance using the specified properties.
                 * @function create
                 * @memberof Protos.GC2LS.AskLogin
                 * @static
                 * @param {Protos.GC2LS.IAskLogin=} [properties] Properties to set
                 * @returns {Protos.GC2LS.AskLogin} AskLogin instance
                 */
                AskLogin.create = function create(properties) {
                    return new AskLogin(properties);
                };
    
                /**
                 * Encodes the specified AskLogin message. Does not implicitly {@link Protos.GC2LS.AskLogin.verify|verify} messages.
                 * @function encode
                 * @memberof Protos.GC2LS.AskLogin
                 * @static
                 * @param {Protos.GC2LS.IAskLogin} message AskLogin message or plain object to encode
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
                 * Encodes the specified AskLogin message, length delimited. Does not implicitly {@link Protos.GC2LS.AskLogin.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Protos.GC2LS.AskLogin
                 * @static
                 * @param {Protos.GC2LS.IAskLogin} message AskLogin message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AskLogin.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an AskLogin message from the specified reader or buffer.
                 * @function decode
                 * @memberof Protos.GC2LS.AskLogin
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Protos.GC2LS.AskLogin} AskLogin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AskLogin.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2LS.AskLogin();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
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
                 * @memberof Protos.GC2LS.AskLogin
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Protos.GC2LS.AskLogin} AskLogin
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
                 * @memberof Protos.GC2LS.AskLogin
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AskLogin.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.packet != null && message.hasOwnProperty("packet")) {
                        var error = $root.Protos.Packet.verify(message.packet);
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
                 * @memberof Protos.GC2LS.AskLogin
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Protos.GC2LS.AskLogin} AskLogin
                 */
                AskLogin.fromObject = function fromObject(object) {
                    if (object instanceof $root.Protos.GC2LS.AskLogin)
                        return object;
                    var message = new $root.Protos.GC2LS.AskLogin();
                    if (object.packet != null) {
                        if (typeof object.packet !== "object")
                            throw TypeError(".Protos.GC2LS.AskLogin.packet: object expected");
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
                 * @memberof Protos.GC2LS.AskLogin
                 * @static
                 * @param {Protos.GC2LS.AskLogin} message AskLogin
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AskLogin.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
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
                 * @memberof Protos.GC2LS.AskLogin
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AskLogin.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return AskLogin;
            })();
    
            return GC2LS;
        })();
    
        Protos.LS2DB = (function() {
    
            /**
             * Namespace LS2DB.
             * @memberof Protos
             * @namespace
             */
            var LS2DB = {};
    
            return LS2DB;
        })();
    
        Protos.LS2GC = (function() {
    
            /**
             * Namespace LS2GC.
             * @memberof Protos
             * @namespace
             */
            var LS2GC = {};
    
            /**
             * EResult enum.
             * @name Protos.LS2GC.EResult
             * @enum {string}
             * @property {number} Success=0 Success value
             * @property {number} Failed=1 Failed value
             * @property {number} UsernameExists=2 UsernameExists value
             * @property {number} IllegalName=3 IllegalName value
             * @property {number} IllegalPasswd=4 IllegalPasswd value
             */
            LS2GC.EResult = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Success"] = 0;
                values[valuesById[1] = "Failed"] = 1;
                values[valuesById[2] = "UsernameExists"] = 2;
                values[valuesById[3] = "IllegalName"] = 3;
                values[valuesById[4] = "IllegalPasswd"] = 4;
                return values;
            })();
    
            LS2GC.Result = (function() {
    
                /**
                 * Properties of a Result.
                 * @memberof Protos.LS2GC
                 * @interface IResult
                 * @property {Protos.IPacket|null} [packet] Result packet
                 * @property {Protos.LS2GC.EResult|null} [result] Result result
                 */
    
                /**
                 * Constructs a new Result.
                 * @memberof Protos.LS2GC
                 * @classdesc Represents a Result.
                 * @implements IResult
                 * @constructor
                 * @param {Protos.LS2GC.IResult=} [properties] Properties to set
                 */
                function Result(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Result packet.
                 * @member {Protos.IPacket|null|undefined} packet
                 * @memberof Protos.LS2GC.Result
                 * @instance
                 */
                Result.prototype.packet = null;
    
                /**
                 * Result result.
                 * @member {Protos.LS2GC.EResult} result
                 * @memberof Protos.LS2GC.Result
                 * @instance
                 */
                Result.prototype.result = 0;
    
                /**
                 * Creates a new Result instance using the specified properties.
                 * @function create
                 * @memberof Protos.LS2GC.Result
                 * @static
                 * @param {Protos.LS2GC.IResult=} [properties] Properties to set
                 * @returns {Protos.LS2GC.Result} Result instance
                 */
                Result.create = function create(properties) {
                    return new Result(properties);
                };
    
                /**
                 * Encodes the specified Result message. Does not implicitly {@link Protos.LS2GC.Result.verify|verify} messages.
                 * @function encode
                 * @memberof Protos.LS2GC.Result
                 * @static
                 * @param {Protos.LS2GC.IResult} message Result message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Result.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.packet != null && message.hasOwnProperty("packet"))
                        $root.Protos.Packet.encode(message.packet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.result != null && message.hasOwnProperty("result"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                    return writer;
                };
    
                /**
                 * Encodes the specified Result message, length delimited. Does not implicitly {@link Protos.LS2GC.Result.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Protos.LS2GC.Result
                 * @static
                 * @param {Protos.LS2GC.IResult} message Result message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Result.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Result message from the specified reader or buffer.
                 * @function decode
                 * @memberof Protos.LS2GC.Result
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Protos.LS2GC.Result} Result
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Result.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2GC.Result();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
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
                 * Decodes a Result message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof Protos.LS2GC.Result
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Protos.LS2GC.Result} Result
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Result.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Result message.
                 * @function verify
                 * @memberof Protos.LS2GC.Result
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Result.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.packet != null && message.hasOwnProperty("packet")) {
                        var error = $root.Protos.Packet.verify(message.packet);
                        if (error)
                            return "packet." + error;
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
                 * Creates a Result message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Protos.LS2GC.Result
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Protos.LS2GC.Result} Result
                 */
                Result.fromObject = function fromObject(object) {
                    if (object instanceof $root.Protos.LS2GC.Result)
                        return object;
                    var message = new $root.Protos.LS2GC.Result();
                    if (object.packet != null) {
                        if (typeof object.packet !== "object")
                            throw TypeError(".Protos.LS2GC.Result.packet: object expected");
                        message.packet = $root.Protos.Packet.fromObject(object.packet);
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
                 * Creates a plain object from a Result message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Protos.LS2GC.Result
                 * @static
                 * @param {Protos.LS2GC.Result} message Result
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Result.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.packet = null;
                        object.result = options.enums === String ? "Success" : 0;
                    }
                    if (message.packet != null && message.hasOwnProperty("packet"))
                        object.packet = $root.Protos.Packet.toObject(message.packet, options);
                    if (message.result != null && message.hasOwnProperty("result"))
                        object.result = options.enums === String ? $root.Protos.LS2GC.EResult[message.result] : message.result;
                    return object;
                };
    
                /**
                 * Converts this Result to JSON.
                 * @function toJSON
                 * @memberof Protos.LS2GC.Result
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Result.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Result;
            })();
    
            LS2GC.GSInfo = (function() {
    
                /**
                 * Properties of a GSInfo.
                 * @memberof Protos.LS2GC
                 * @interface IGSInfo
                 * @property {Protos.IPacket|null} [packet] GSInfo packet
                 * @property {Array.<Protos.LS2GC.GSInfo.IServerInfo>|null} [serverinfo] GSInfo serverinfo
                 */
    
                /**
                 * Constructs a new GSInfo.
                 * @memberof Protos.LS2GC
                 * @classdesc Represents a GSInfo.
                 * @implements IGSInfo
                 * @constructor
                 * @param {Protos.LS2GC.IGSInfo=} [properties] Properties to set
                 */
                function GSInfo(properties) {
                    this.serverinfo = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * GSInfo packet.
                 * @member {Protos.IPacket|null|undefined} packet
                 * @memberof Protos.LS2GC.GSInfo
                 * @instance
                 */
                GSInfo.prototype.packet = null;
    
                /**
                 * GSInfo serverinfo.
                 * @member {Array.<Protos.LS2GC.GSInfo.IServerInfo>} serverinfo
                 * @memberof Protos.LS2GC.GSInfo
                 * @instance
                 */
                GSInfo.prototype.serverinfo = $util.emptyArray;
    
                /**
                 * Creates a new GSInfo instance using the specified properties.
                 * @function create
                 * @memberof Protos.LS2GC.GSInfo
                 * @static
                 * @param {Protos.LS2GC.IGSInfo=} [properties] Properties to set
                 * @returns {Protos.LS2GC.GSInfo} GSInfo instance
                 */
                GSInfo.create = function create(properties) {
                    return new GSInfo(properties);
                };
    
                /**
                 * Encodes the specified GSInfo message. Does not implicitly {@link Protos.LS2GC.GSInfo.verify|verify} messages.
                 * @function encode
                 * @memberof Protos.LS2GC.GSInfo
                 * @static
                 * @param {Protos.LS2GC.IGSInfo} message GSInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GSInfo.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.packet != null && message.hasOwnProperty("packet"))
                        $root.Protos.Packet.encode(message.packet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.serverinfo != null && message.serverinfo.length)
                        for (var i = 0; i < message.serverinfo.length; ++i)
                            $root.Protos.LS2GC.GSInfo.ServerInfo.encode(message.serverinfo[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };
    
                /**
                 * Encodes the specified GSInfo message, length delimited. Does not implicitly {@link Protos.LS2GC.GSInfo.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Protos.LS2GC.GSInfo
                 * @static
                 * @param {Protos.LS2GC.IGSInfo} message GSInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GSInfo.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a GSInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof Protos.LS2GC.GSInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Protos.LS2GC.GSInfo} GSInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GSInfo.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2GC.GSInfo();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.packet = $root.Protos.Packet.decode(reader, reader.uint32());
                            break;
                        case 2:
                            if (!(message.serverinfo && message.serverinfo.length))
                                message.serverinfo = [];
                            message.serverinfo.push($root.Protos.LS2GC.GSInfo.ServerInfo.decode(reader, reader.uint32()));
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
                 * @memberof Protos.LS2GC.GSInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Protos.LS2GC.GSInfo} GSInfo
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
                 * @memberof Protos.LS2GC.GSInfo
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GSInfo.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.packet != null && message.hasOwnProperty("packet")) {
                        var error = $root.Protos.Packet.verify(message.packet);
                        if (error)
                            return "packet." + error;
                    }
                    if (message.serverinfo != null && message.hasOwnProperty("serverinfo")) {
                        if (!Array.isArray(message.serverinfo))
                            return "serverinfo: array expected";
                        for (var i = 0; i < message.serverinfo.length; ++i) {
                            var error = $root.Protos.LS2GC.GSInfo.ServerInfo.verify(message.serverinfo[i]);
                            if (error)
                                return "serverinfo." + error;
                        }
                    }
                    return null;
                };
    
                /**
                 * Creates a GSInfo message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Protos.LS2GC.GSInfo
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Protos.LS2GC.GSInfo} GSInfo
                 */
                GSInfo.fromObject = function fromObject(object) {
                    if (object instanceof $root.Protos.LS2GC.GSInfo)
                        return object;
                    var message = new $root.Protos.LS2GC.GSInfo();
                    if (object.packet != null) {
                        if (typeof object.packet !== "object")
                            throw TypeError(".Protos.LS2GC.GSInfo.packet: object expected");
                        message.packet = $root.Protos.Packet.fromObject(object.packet);
                    }
                    if (object.serverinfo) {
                        if (!Array.isArray(object.serverinfo))
                            throw TypeError(".Protos.LS2GC.GSInfo.serverinfo: array expected");
                        message.serverinfo = [];
                        for (var i = 0; i < object.serverinfo.length; ++i) {
                            if (typeof object.serverinfo[i] !== "object")
                                throw TypeError(".Protos.LS2GC.GSInfo.serverinfo: object expected");
                            message.serverinfo[i] = $root.Protos.LS2GC.GSInfo.ServerInfo.fromObject(object.serverinfo[i]);
                        }
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from a GSInfo message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Protos.LS2GC.GSInfo
                 * @static
                 * @param {Protos.LS2GC.GSInfo} message GSInfo
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GSInfo.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.serverinfo = [];
                    if (options.defaults)
                        object.packet = null;
                    if (message.packet != null && message.hasOwnProperty("packet"))
                        object.packet = $root.Protos.Packet.toObject(message.packet, options);
                    if (message.serverinfo && message.serverinfo.length) {
                        object.serverinfo = [];
                        for (var j = 0; j < message.serverinfo.length; ++j)
                            object.serverinfo[j] = $root.Protos.LS2GC.GSInfo.ServerInfo.toObject(message.serverinfo[j], options);
                    }
                    return object;
                };
    
                /**
                 * Converts this GSInfo to JSON.
                 * @function toJSON
                 * @memberof Protos.LS2GC.GSInfo
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GSInfo.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                GSInfo.ServerInfo = (function() {
    
                    /**
                     * Properties of a ServerInfo.
                     * @memberof Protos.LS2GC.GSInfo
                     * @interface IServerInfo
                     * @property {Protos.IPacket|null} [packet] ServerInfo packet
                     * @property {string|null} [name] ServerInfo name
                     * @property {string|null} [ip] ServerInfo ip
                     * @property {number|null} [port] ServerInfo port
                     * @property {number|null} [state] ServerInfo state
                     */
    
                    /**
                     * Constructs a new ServerInfo.
                     * @memberof Protos.LS2GC.GSInfo
                     * @classdesc Represents a ServerInfo.
                     * @implements IServerInfo
                     * @constructor
                     * @param {Protos.LS2GC.GSInfo.IServerInfo=} [properties] Properties to set
                     */
                    function ServerInfo(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * ServerInfo packet.
                     * @member {Protos.IPacket|null|undefined} packet
                     * @memberof Protos.LS2GC.GSInfo.ServerInfo
                     * @instance
                     */
                    ServerInfo.prototype.packet = null;
    
                    /**
                     * ServerInfo name.
                     * @member {string} name
                     * @memberof Protos.LS2GC.GSInfo.ServerInfo
                     * @instance
                     */
                    ServerInfo.prototype.name = "";
    
                    /**
                     * ServerInfo ip.
                     * @member {string} ip
                     * @memberof Protos.LS2GC.GSInfo.ServerInfo
                     * @instance
                     */
                    ServerInfo.prototype.ip = "";
    
                    /**
                     * ServerInfo port.
                     * @member {number} port
                     * @memberof Protos.LS2GC.GSInfo.ServerInfo
                     * @instance
                     */
                    ServerInfo.prototype.port = 0;
    
                    /**
                     * ServerInfo state.
                     * @member {number} state
                     * @memberof Protos.LS2GC.GSInfo.ServerInfo
                     * @instance
                     */
                    ServerInfo.prototype.state = 0;
    
                    /**
                     * Creates a new ServerInfo instance using the specified properties.
                     * @function create
                     * @memberof Protos.LS2GC.GSInfo.ServerInfo
                     * @static
                     * @param {Protos.LS2GC.GSInfo.IServerInfo=} [properties] Properties to set
                     * @returns {Protos.LS2GC.GSInfo.ServerInfo} ServerInfo instance
                     */
                    ServerInfo.create = function create(properties) {
                        return new ServerInfo(properties);
                    };
    
                    /**
                     * Encodes the specified ServerInfo message. Does not implicitly {@link Protos.LS2GC.GSInfo.ServerInfo.verify|verify} messages.
                     * @function encode
                     * @memberof Protos.LS2GC.GSInfo.ServerInfo
                     * @static
                     * @param {Protos.LS2GC.GSInfo.IServerInfo} message ServerInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ServerInfo.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.packet != null && message.hasOwnProperty("packet"))
                            $root.Protos.Packet.encode(message.packet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.name != null && message.hasOwnProperty("name"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                        if (message.ip != null && message.hasOwnProperty("ip"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.ip);
                        if (message.port != null && message.hasOwnProperty("port"))
                            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.port);
                        if (message.state != null && message.hasOwnProperty("state"))
                            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.state);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified ServerInfo message, length delimited. Does not implicitly {@link Protos.LS2GC.GSInfo.ServerInfo.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Protos.LS2GC.GSInfo.ServerInfo
                     * @static
                     * @param {Protos.LS2GC.GSInfo.IServerInfo} message ServerInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ServerInfo.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a ServerInfo message from the specified reader or buffer.
                     * @function decode
                     * @memberof Protos.LS2GC.GSInfo.ServerInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Protos.LS2GC.GSInfo.ServerInfo} ServerInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ServerInfo.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2GC.GSInfo.ServerInfo();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.packet = $root.Protos.Packet.decode(reader, reader.uint32());
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
                     * Decodes a ServerInfo message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Protos.LS2GC.GSInfo.ServerInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Protos.LS2GC.GSInfo.ServerInfo} ServerInfo
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
                     * @memberof Protos.LS2GC.GSInfo.ServerInfo
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ServerInfo.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.packet != null && message.hasOwnProperty("packet")) {
                            var error = $root.Protos.Packet.verify(message.packet);
                            if (error)
                                return "packet." + error;
                        }
                        if (message.name != null && message.hasOwnProperty("name"))
                            if (!$util.isString(message.name))
                                return "name: string expected";
                        if (message.ip != null && message.hasOwnProperty("ip"))
                            if (!$util.isString(message.ip))
                                return "ip: string expected";
                        if (message.port != null && message.hasOwnProperty("port"))
                            if (!$util.isInteger(message.port))
                                return "port: integer expected";
                        if (message.state != null && message.hasOwnProperty("state"))
                            if (!$util.isInteger(message.state))
                                return "state: integer expected";
                        return null;
                    };
    
                    /**
                     * Creates a ServerInfo message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Protos.LS2GC.GSInfo.ServerInfo
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Protos.LS2GC.GSInfo.ServerInfo} ServerInfo
                     */
                    ServerInfo.fromObject = function fromObject(object) {
                        if (object instanceof $root.Protos.LS2GC.GSInfo.ServerInfo)
                            return object;
                        var message = new $root.Protos.LS2GC.GSInfo.ServerInfo();
                        if (object.packet != null) {
                            if (typeof object.packet !== "object")
                                throw TypeError(".Protos.LS2GC.GSInfo.ServerInfo.packet: object expected");
                            message.packet = $root.Protos.Packet.fromObject(object.packet);
                        }
                        if (object.name != null)
                            message.name = String(object.name);
                        if (object.ip != null)
                            message.ip = String(object.ip);
                        if (object.port != null)
                            message.port = object.port | 0;
                        if (object.state != null)
                            message.state = object.state | 0;
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a ServerInfo message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Protos.LS2GC.GSInfo.ServerInfo
                     * @static
                     * @param {Protos.LS2GC.GSInfo.ServerInfo} message ServerInfo
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ServerInfo.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.packet = null;
                            object.name = "";
                            object.ip = "";
                            object.port = 0;
                            object.state = 0;
                        }
                        if (message.packet != null && message.hasOwnProperty("packet"))
                            object.packet = $root.Protos.Packet.toObject(message.packet, options);
                        if (message.name != null && message.hasOwnProperty("name"))
                            object.name = message.name;
                        if (message.ip != null && message.hasOwnProperty("ip"))
                            object.ip = message.ip;
                        if (message.port != null && message.hasOwnProperty("port"))
                            object.port = message.port;
                        if (message.state != null && message.hasOwnProperty("state"))
                            object.state = message.state;
                        return object;
                    };
    
                    /**
                     * Converts this ServerInfo to JSON.
                     * @function toJSON
                     * @memberof Protos.LS2GC.GSInfo.ServerInfo
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ServerInfo.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return ServerInfo;
                })();
    
                return GSInfo;
            })();
    
            return LS2GC;
        })();
    
        return Protos;
    })();

    return $root;
});
