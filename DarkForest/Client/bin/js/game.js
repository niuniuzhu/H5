define("View/UI/IUIModule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Net/ByteUtils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ByteUtils {
        static Encode8u(p, offset, c) {
            p[0 + offset] = c;
            return 1;
        }
        static Encode16u(p, offset, w) {
            p[0 + offset] = w >> 0;
            p[1 + offset] = w >> 8;
            return 2;
        }
        static Encode32u(p, offset, value) {
            p[0 + offset] = value >> 0;
            p[1 + offset] = value >> 8;
            p[2 + offset] = value >> 16;
            p[3 + offset] = value >> 24;
            return 4;
        }
        static Encode64u(p, offset, value) {
            let l0 = value & 0xffffffff;
            let l1 = value >> 32;
            let offset2 = ByteUtils.Encode32u(p, offset, l0);
            ByteUtils.Encode32u(p, offset + offset2, l1);
            return 8;
        }
        static Decode8u(p, offset) {
            return p[0 + offset];
        }
        static Decode16u(p, offset) {
            let result = 0;
            result |= p[0 + offset];
            result |= p[1 + offset] << 8;
            return result;
        }
        static Decode32u(p, offset) {
            let result = 0;
            result |= p[0 + offset];
            result |= p[1 + offset] << 8;
            result |= p[2 + offset] << 16;
            result |= p[3 + offset] << 24;
            return result;
        }
        static Decode64u(p, offset) {
            let l0 = ByteUtils.Decode32u(p, offset);
            offset += 4;
            let l1 = ByteUtils.Decode32u(p, offset + offset);
            return l0 | (l1 << 32);
        }
    }
    exports.ByteUtils = ByteUtils;
});
define("Net/MsgCenter", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MsgCenter {
        constructor() {
            this._generalHandlers = new Map();
        }
        Register(msgID, handler) {
            if (this._generalHandlers.has(msgID))
                return;
            this._generalHandlers[msgID] = handler;
        }
        Unregister(msgID, handler) {
            return this._generalHandlers.delete(msgID);
        }
        GetHandler(msgID) {
            return this._generalHandlers.get(msgID);
        }
    }
    exports.MsgCenter = MsgCenter;
});
define("Net/NetworkMgr", ["require", "exports", "Net/ByteUtils", "Net/MsgCenter"], function (require, exports, ByteUtils_1, MsgCenter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NetworkMgr {
        static get instance() {
            if (NetworkMgr._instance == null)
                NetworkMgr._instance = new NetworkMgr();
            return NetworkMgr._instance;
        }
        get connected() { return this._socket.readyState == WebSocket.OPEN; }
        ;
        get OnConnected() { return this._socket.onopen; }
        set OnConnected(handler) { this._socket.onopen = handler; }
        get OnClosed() { return this._socket.onclose; }
        set OnClosed(handler) { this._socket.onclose = handler; }
        get OnError() { return this._socket.onerror; }
        set OnError(handler) { this._socket.onerror = handler; }
        constructor() {
            this._msgCenter = new MsgCenter_1.MsgCenter();
        }
        Connect(ip, port) {
            this._socket = new WebSocket(`ws://${ip}:${port}`);
            this._socket.onmessage = this.OnReceived.bind(this);
        }
        OnReceived(ev) {
            let data = ev.data;
            let offset = 0;
            let size = data.length;
            let msgID = ByteUtils_1.ByteUtils.Decode32u(data, offset);
            offset += 4;
            size -= 4;
            let handler = this._msgCenter.GetHandler(msgID);
            if (handler != null)
                handler(data, offset, size, msgID);
            else
                RC.Logger.Warn(`"invalid msg:${msgID}.`);
        }
        Send(data) {
            this._socket.send(data);
        }
        Close() {
            this._socket.close();
        }
        RegisterMsg(msgID, handler) {
            this._msgCenter.Register(msgID, handler);
        }
        UnregisterMsg(msgID, handler) {
            return this._msgCenter.Unregister(msgID, handler);
        }
    }
    exports.NetworkMgr = NetworkMgr;
});
define("View/UI/UILogin", ["require", "exports", "../../libs/protos", "Net/NetworkMgr"], function (require, exports, protos_1, NetworkMgr_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UILogin {
        constructor() {
            fairygui.UIPackage.addPackage("res/ui/login");
        }
        Dispose() {
            this._root.dispose();
            this._root = null;
        }
        Enter(param) {
            this._root = fairygui.UIPackage.createObject("login", "Main").asCom;
            fairygui.GRoot.inst.addChild(this._root);
            this._root.width = fairygui.GRoot.inst.width;
            this._root.height = fairygui.GRoot.inst.height;
            this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
            this._root.getChild("login_btn").onClick(this, this.OnLoginBtnClick);
            this._root.getChild("reg_btn").onClick(this, this.OnRegBtnClick);
        }
        Leave() {
            this._root.dispose();
            this._root = null;
        }
        Update(deltaTime) {
        }
        OnResize(e) {
        }
        OnLoginBtnClick() {
            NetworkMgr_1.NetworkMgr.instance.Connect("localhost", 49996);
            NetworkMgr_1.NetworkMgr.instance.OnConnected = ((e) => {
                let login = new protos_1.Protos.GCToLS.AskLogin();
                login.uin = "test";
                let data = protos_1.Protos.GCToLS.AskLogin.encode(login).finish();
                NetworkMgr_1.NetworkMgr.instance.Send(data);
            }).bind(this);
            NetworkMgr_1.NetworkMgr.instance.OnError = ((e) => {
                RC.Logger.Debug(e);
            });
            NetworkMgr_1.NetworkMgr.instance.RegisterMsg(protos_1.Protos.MsgID.GCToLS_AskLogin, ((data, offset, size, msgID) => {
                RC.Logger.Log("ok");
            }).bind(this));
        }
        OnRegBtnClick() {
            this._root.getChild("name").asTextField.text = this._root.getChild("reg_name").asTextField.text;
            this._root.getChild("password").asTextField.text = this._root.getChild("reg_password").asTextField.text;
        }
    }
    exports.UILogin = UILogin;
});
define("View/UI/IMainPanel", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Shared/Defs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Defs {
        static Init(json) {
            Defs._defs = json;
        }
        static GetUser() {
            let ht = RC.Utils.Hashtable.GetMap(Defs._defs, "user");
            return ht;
        }
        static GetPreloads() {
            let arr = RC.Utils.Hashtable.GetArray(Defs._defs, "preloads");
            return arr;
        }
        static GetMap(id) {
            let ht = RC.Utils.Hashtable.GetMap(Defs._defs, "maps");
            let defaultHt = RC.Utils.Hashtable.GetMap(ht, "default");
            let result = RC.Utils.Hashtable.GetMap(ht, id);
            if (result == null)
                result = {};
            RC.Utils.Hashtable.Concat(result, defaultHt);
            return result;
        }
        static GetEntity(id) {
            let ht = RC.Utils.Hashtable.GetMap(Defs._defs, "entities");
            let defaultHt = RC.Utils.Hashtable.GetMap(ht, "default");
            let result = RC.Utils.Hashtable.GetMap(ht, id);
            if (result == null)
                result = {};
            RC.Utils.Hashtable.Concat(result, defaultHt);
            return result;
        }
        static GetTask() {
            let arr = RC.Utils.Hashtable.GetArray(Defs._defs, "task");
            return arr;
        }
        static GetMessage() {
            let arr = RC.Utils.Hashtable.GetArray(Defs._defs, "message");
            return arr;
        }
    }
    exports.Defs = Defs;
});
define("Shared/Model/UserData", ["require", "exports", "Shared/Defs"], function (require, exports, Defs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserData {
        constructor() {
            let def = Defs_1.Defs.GetUser();
            this.mine = RC.Utils.Hashtable.GetNumber(def, "mine");
            this.energy = RC.Utils.Hashtable.GetNumber(def, "energy");
        }
    }
    exports.UserData = UserData;
});
define("Shared/Model/MapData", ["require", "exports", "Shared/Defs"], function (require, exports, Defs_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MapData {
        constructor(id) {
            this.id = id;
            let def = Defs_2.Defs.GetMap(this.id);
            this.name = RC.Utils.Hashtable.GetString(def, "name");
            this.model = RC.Utils.Hashtable.GetString(def, "model");
            this.tileSlope = RC.Utils.Hashtable.GetNumber(def, "tile_slope");
            this.tileAspect = RC.Utils.Hashtable.GetNumber(def, "tile_aspect");
            this.tileRatio = RC.Utils.Hashtable.GetNumber(def, "tile_ratio");
            this.size = RC.Utils.Hashtable.GetVec2(def, "size");
        }
    }
    exports.MapData = MapData;
});
define("Shared/Model/EntityData", ["require", "exports", "Shared/Defs"], function (require, exports, Defs_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityData {
        constructor(id) {
            this.id = id;
            let def = Defs_3.Defs.GetEntity(this.id);
            this.name = RC.Utils.Hashtable.GetString(def, "name");
            this.model = RC.Utils.Hashtable.GetString(def, "model");
            this.footprint = RC.Utils.Hashtable.GetVec3(def, "footprint");
            this.lvl = [];
            let lvlDefs = RC.Utils.Hashtable.GetArray(def, "lvl");
            for (let lvlDef of lvlDefs) {
                this.lvl.push(new Level(lvlDef));
            }
        }
    }
    exports.EntityData = EntityData;
    class Level {
        constructor(lvl) {
            this.buildTime = lvl["build_time"];
            this.mine = lvl["mine"];
            this.energy = lvl["energy"];
            this.power = lvl["power"];
            this.atk = lvl["atk"];
            this.def = lvl["def"];
        }
    }
    exports.Level = Level;
});
define("Shared/Model/ModelFactory", ["require", "exports", "Shared/Model/UserData", "Shared/Model/MapData", "Shared/Model/EntityData"], function (require, exports, UserData_1, MapData_1, EntityData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ModelFactory {
        static GerUserData() {
            if (this.USER_DATA != null)
                return this.USER_DATA;
            this.USER_DATA = new UserData_1.UserData();
            return this.USER_DATA;
        }
        static GetMapData(id) {
            let data = this.MAP_DATA.getValue(id);
            if (data != null)
                return data;
            data = new MapData_1.MapData(id);
            this.MAP_DATA.setValue(id, data);
            return data;
        }
        static GetEntityData(id) {
            let data = this.ENTITY_DATA.getValue(id);
            if (data != null)
                return data;
            data = new EntityData_1.EntityData(id);
            this.ENTITY_DATA.setValue(id, data);
            return data;
        }
    }
    ModelFactory.MAP_DATA = new RC.Collections.Dictionary();
    ModelFactory.ENTITY_DATA = new RC.Collections.Dictionary();
    exports.ModelFactory = ModelFactory;
});
define("View/CUser", ["require", "exports", "Shared/Model/ModelFactory"], function (require, exports, ModelFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CUser {
        static get mine() {
            return ModelFactory_1.ModelFactory.GerUserData().mine + CUser.G_MINE + CUser.B_MINE;
        }
        static get energy() {
            return ModelFactory_1.ModelFactory.GerUserData().energy + CUser.G_ENERGY + CUser.B_ENERGY;
        }
        static get power() {
            return CUser.B_DEF;
        }
        static get atk() {
            return CUser.B_ATK;
        }
        static get def() {
            return CUser.B_DEF;
        }
    }
    CUser.B_ATK = 0;
    CUser.B_DEF = 0;
    CUser.B_POWER = 0;
    CUser.B_MINE = 0;
    CUser.B_ENERGY = 0;
    CUser.G_MINE = 0;
    CUser.G_ENERGY = 0;
    exports.CUser = CUser;
});
define("View/Graphic", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Graphic {
        get root() { return this._root; }
        get position() { return this._position.Clone(); }
        set position(value) {
            if (value.EqualsTo(this._position))
                return;
            this._position.CopyFrom(value);
            this.UpdatePosition();
        }
        get alpha() { return this._root.alpha; }
        set alpha(value) { this._root.alpha = value; }
        get visible() { return this._root.visible; }
        set visible(value) { this._root.visible = value; }
        get sortingOrder() { return this._root.sortingOrder; }
        set sortingOrder(value) { this._root.sortingOrder = value; }
        constructor(manager) {
            this._manager = manager;
            this._root = new fairygui.GComponent();
            this._manager.root.addChild(this._root);
            this._position = RC.Numerics.Vec3.zero;
            this.UpdatePosition();
        }
        Dispose() {
            this._root.dispose();
        }
        UpdatePosition() {
            let localPos = this._manager.battle.camera.WorldToScreen(this._position);
            this._root.setXY(localPos.x, localPos.y);
        }
    }
    exports.Graphic = Graphic;
});
define("View/GraphicManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GraphicManager {
        get battle() { return this._owner; }
        get root() { return this._root; }
        set root(value) { this._root = value; }
        constructor(owner) {
            this._owner = owner;
            this._root = new fairygui.GComponent();
            this._graphics = [];
        }
        Dispose() {
            let count = this._graphics.length;
            for (let i = 0; i < count; ++i) {
                let graphic = this._graphics[i];
                graphic.Dispose();
            }
            this._graphics.splice(0);
        }
        OnCameraTRSChanged() {
            let count = this._graphics.length;
            for (let i = 0; i < count; ++i) {
                let graphic = this._graphics[i];
                graphic.UpdatePosition();
            }
        }
        CreateGraphic(c) {
            let graphic = new c(this);
            this._graphics.push(graphic);
            this.SortGraphics(graphic);
            return graphic;
        }
        DestroyGraphic(graphic) {
            let pos = this._graphics.indexOf(graphic);
            if (pos < 0)
                return false;
            graphic.Dispose();
            this._graphics.splice(pos, 1);
            return true;
        }
        SortGraphics(graphic) {
            this._graphics.sort(this.SortFunc.bind(this));
            let count = this._graphics.length;
            for (let i = 1; i < count; ++i) {
                this._graphics[i].sortingOrder = i + 100;
            }
        }
        SortFunc(a, b) {
            if (a == this._graphics[0] || b == this._graphics[0])
                return 0;
            return a.position.z > b.position.z ? -1 : 1;
        }
    }
    exports.GraphicManager = GraphicManager;
});
define("View/EntityGraphic", ["require", "exports", "View/Graphic"], function (require, exports, Graphic_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityGraphic extends Graphic_1.Graphic {
        constructor(manager) {
            super(manager);
        }
        Dispose() {
            this._sprite.dispose();
            super.Dispose();
        }
        Load(id) {
            this._sprite = fairygui.UIPackage.createObject("global", id).asCom;
            this._root.addChild(this._sprite);
            this._sprite.touchable = false;
            this.OnLoadComplete();
        }
        OnLoadComplete() {
        }
    }
    exports.EntityGraphic = EntityGraphic;
});
define("View/BuildingGraphic", ["require", "exports", "View/EntityGraphic"], function (require, exports, EntityGraphic_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BuildingGraphic extends EntityGraphic_1.EntityGraphic {
        constructor(manager) {
            super(manager);
        }
        OnLoadComplete() {
        }
        BeginBuild(buildTime) {
            if (this._hud == null) {
                this._hud = fairygui.UIPackage.createObject("battle", "building_hud").asCom;
                this._hud.touchable = false;
                this._hud.y = -300;
                this._time = this._hud.getChild("n1").asTextField;
                this._progressBar = this._hud.getChild("n0").asProgress;
                this._root.addChild(this._hud);
            }
            this._hud.visible = true;
            this._progressBar.max = buildTime;
            this.UpdateBuildInfo(buildTime);
        }
        FinishBuild() {
            this._hud.visible = false;
        }
        UpdateBuildInfo(buildTime) {
            this._progressBar.value = buildTime;
            let hour = RC.Numerics.MathUtils.Floor(buildTime * 0.001);
            this._time.text = BuildingGraphic.FormatMillisecond(buildTime);
        }
        static FormatMillisecond(msd) {
            let time = msd / 1000;
            if (time > 60 && time < 60 * 60) {
                return RC.Numerics.MathUtils.Floor(time / 60.0) + "分钟" + RC.Numerics.MathUtils.Floor(((time / 60.0) -
                    RC.Numerics.MathUtils.Floor(time / 60.0)) * 60) + "秒";
            }
            return RC.Numerics.MathUtils.Floor(time / 3600.0) + "小时" + RC.Numerics.MathUtils.Floor(((time / 3600.0) -
                RC.Numerics.MathUtils.Floor(time / 3600.0)) * 60) + "分钟" +
                RC.Numerics.MathUtils.Floor(((((time / 3600.0) - RC.Numerics.MathUtils.Floor(time / 3600.0)) * 60) -
                    RC.Numerics.MathUtils.Floor(((time / 3600.0) - RC.Numerics.MathUtils.Floor(time / 3600.0)) * 60)) * 60) + "秒";
        }
    }
    exports.BuildingGraphic = BuildingGraphic;
});
define("Shared/Utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Utils {
        static MakeRIDFromID(id) {
            return `${id}@${btoa(RC.Utils.GUID.Generate().ToString(RC.Utils.GuidFormat.DASHES))}`;
        }
        static GetIDFromRID(rid) {
            let pos = rid.indexOf("@");
            let id = pos != -1 ? rid.substring(0, pos) : rid;
            return id;
        }
    }
    exports.Utils = Utils;
});
define("Shared/Model/EntityParam", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattleParams {
        constructor() {
            this.frameRate = 0;
            this.framesPerKeyFrame = 0;
            this.uid = "";
            this.id = "";
            this.rndSeed = 0;
            this.buildings = null;
        }
    }
    exports.BattleParams = BattleParams;
    class Building {
        constructor() {
            this.id = "";
            this.uid = "";
        }
    }
    exports.Building = Building;
    class EntityParam {
    }
    exports.EntityParam = EntityParam;
});
define("Shared/GPoolObject", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GPoolObject {
        get rid() { return this._rid; }
        Dispose() {
            this.InternalDispose();
        }
    }
    exports.GPoolObject = GPoolObject;
});
define("Shared/UpdateContext", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UpdateContext {
        constructor() {
            this.deltaTime = 0;
            this.time = 0;
            this.frame = 0;
        }
    }
    exports.UpdateContext = UpdateContext;
});
define("View/CEntity", ["require", "exports", "View/EntityGraphic", "Shared/Utils", "Shared/GPoolObject", "Shared/Model/ModelFactory"], function (require, exports, EntityGraphic_2, Utils_1, GPoolObject_1, ModelFactory_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CEntity extends GPoolObject_1.GPoolObject {
        constructor() {
            super();
            this._data = null;
            this._position = RC.Numerics.Vec3.zero;
        }
        get id() { return this._data.id; }
        get position() { return this._position.Clone(); }
        set position(value) {
            if (this._position.EqualsTo(value))
                return;
            this._position.CopyFrom(value);
            if (this._graphic != null)
                this._graphic.position = this._position;
            this.OnPositionChanged();
        }
        get footprint() { return this._data.footprint.Clone(); }
        get battle() { return this._owner; }
        get graphic() { return this._graphic; }
        get markToDestroy() { return this._markToDestroy; }
        InternalDispose() {
        }
        OnCreated(owner, param) {
            this._owner = owner;
            this._rid = param.rid;
            this._data = ModelFactory_2.ModelFactory.GetEntityData(Utils_1.Utils.GetIDFromRID(this.rid));
            this.position = param.position;
            this.CreateGraphic();
        }
        OnAddedToBattle() {
        }
        OnRemoveFromBattle() {
            this._markToDestroy = false;
            this._owner.graphicManager.DestroyGraphic(this._graphic);
            this._graphic = null;
            this._owner = null;
            this._data = null;
        }
        OnPositionChanged() {
        }
        MarkToDestroy() {
            this._markToDestroy = true;
        }
        OnUpdateState(context) {
        }
        CreateGraphic() {
            this._graphic = this._owner.graphicManager.CreateGraphic(EntityGraphic_2.EntityGraphic);
            this._graphic.Load(this._data.model);
            this._graphic.position = this.position;
        }
    }
    exports.CEntity = CEntity;
});
define("View/CBuilding", ["require", "exports", "View/CUser", "View/BuildingGraphic", "View/CEntity"], function (require, exports, CUser_1, BuildingGraphic_1, CEntity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CBuilding extends CEntity_1.CEntity {
        get tilePoint() { return this._tilePoint.Clone(); }
        set tilePoint(value) { this._tilePoint = value.Clone(); }
        get occupies() { return this._occupies; }
        set occupies(value) {
            this._occupies.splice(0);
            for (let key of value) {
                this._occupies.push(key);
            }
        }
        get underConstruction() { return this._underConstruction; }
        get lvl() { return this._lvl; }
        get buildTime() { return this._data.lvl[this.lvl].buildTime; }
        get mine() { return this._data.lvl[this.lvl].mine; }
        get energy() { return this._data.lvl[this.lvl].energy; }
        get power() { return this._data.lvl[this.lvl].power; }
        get atk() { return this._data.lvl[this.lvl].atk; }
        get def() { return this._data.lvl[this.lvl].def; }
        constructor() {
            super();
            this._occupies = [];
        }
        OnCreated(owner, param) {
            super.OnCreated(owner, param);
            this._lvl = 0;
        }
        OnUpdateState(context) {
            if (this._underConstruction) {
                this._finishTime -= context.deltaTime;
                this._bGraphic.UpdateBuildInfo(this._finishTime);
                if (this._finishTime <= 0)
                    this.FinishBuild();
            }
        }
        CreateGraphic() {
            this._graphic = this._owner.graphicManager.CreateGraphic(BuildingGraphic_1.BuildingGraphic);
            this._graphic.Load(this._data.model);
            this._graphic.position = this.position;
            this._bGraphic = this._graphic;
        }
        SnapToTile() {
            this._tilePoint = this._owner.tile.WorldToLocal(this._position);
            this.position = this._owner.tile.LocalToWorld(this._tilePoint);
        }
        ContainsPoint(tileSpaceTouchPoint) {
            let minX = this.tilePoint.x - this._data.footprint.x + 1;
            let maxX = this.tilePoint.x;
            let minZ = this.tilePoint.z;
            let maxZ = minZ + this._data.footprint.z - 1;
            if (tileSpaceTouchPoint.x < minX ||
                tileSpaceTouchPoint.z < minZ ||
                tileSpaceTouchPoint.x > maxX ||
                tileSpaceTouchPoint.z > maxZ)
                return false;
            return true;
        }
        CanPlace() {
            return this._owner.tile.CanPlace(this);
        }
        Place() {
            if (!this._owner.tile.CanPlace(this)) {
                return false;
            }
            this._owner.tile.PlaceBuilding(this);
            this._owner.graphicManager.SortGraphics(this._graphic);
            return true;
        }
        BeginBuild() {
            CUser_1.CUser.B_MINE += this.mine;
            CUser_1.CUser.B_ENERGY += this.energy;
            this._bGraphic.BeginBuild(this.buildTime);
            this._underConstruction = true;
            this._finishTime = this.buildTime;
        }
        FinishBuild() {
            CUser_1.CUser.B_POWER += this.power;
            CUser_1.CUser.B_ATK += this.atk;
            CUser_1.CUser.B_DEF += this.def;
            this._bGraphic.FinishBuild();
            this._underConstruction = false;
            this._owner.NotifyUpdateBuilding();
        }
    }
    exports.CBuilding = CBuilding;
});
define("View/EditingBuilding", ["require", "exports", "View/CBuilding"], function (require, exports, CBuilding_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EditingBuilding extends CBuilding_1.CBuilding {
        constructor() {
            super();
        }
        OnRemoveFromBattle() {
            super.OnRemoveFromBattle();
            this._srcBuilding = null;
        }
        Steup(srcBuilding, isNew) {
            this._isNew = isNew;
            this._srcBuilding = srcBuilding;
            this._srcBuilding.graphic.visible = false;
            this.tilePoint = this._srcBuilding.tilePoint;
            this.position = this._srcBuilding.position;
            this._graphic.alpha = 0.6;
            this._graphic.sortingOrder = 999;
            this._owner.tile.RemoveBuilding(this._srcBuilding);
        }
        Apply() {
            if (this.CanPlace()) {
                this._srcBuilding.tilePoint = this._tilePoint;
                this._srcBuilding.graphic.visible = true;
                this._srcBuilding.position = this._position;
                this._srcBuilding.Place();
                if (this._isNew)
                    this._srcBuilding.BeginBuild();
                this.MarkToDestroy();
                return true;
            }
            return false;
        }
        Cancel() {
            if (this._isNew)
                this._srcBuilding.MarkToDestroy();
            else {
                this._srcBuilding.graphic.visible = true;
                this._srcBuilding.Place();
            }
            this.MarkToDestroy();
        }
    }
    exports.EditingBuilding = EditingBuilding;
});
define("Shared/GPool", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GPool {
        constructor() {
            this._typeToObjects = new RC.Collections.Dictionary();
        }
        Count(c) {
            let n = c.name;
            let objs = this._typeToObjects.getValue(n);
            return objs.size();
        }
        Pop(c) {
            let n = c.name;
            let objs = this._typeToObjects.getValue(n);
            if (objs == null) {
                objs = new RC.Collections.Queue();
                this._typeToObjects.setValue(n, objs);
            }
            let obj = objs.size() == 0 ? new c() : objs.dequeue();
            return obj;
        }
        Push(obj) {
            let n = obj.constructor.name;
            let q = this._typeToObjects.getValue(n);
            q.enqueue(obj);
        }
        Dispose() {
            this._typeToObjects.forEach((k, v) => {
                while (v.size() > 0) {
                    let obj = v.dequeue();
                    obj.Dispose();
                }
            });
            this._typeToObjects.clear();
        }
    }
    exports.GPool = GPool;
});
define("View/CEntityManager", ["require", "exports", "View/CBuilding", "View/EditingBuilding", "Shared/GPool"], function (require, exports, CBuilding_2, EditingBuilding_1, GPool_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CEntityManager {
        constructor(owner) {
            this._owner = owner;
            this._gPool = new GPool_1.GPool();
            this._entities = [];
            this._idToEntity = new RC.Collections.Dictionary();
            this._typeToEntity = new RC.Collections.Dictionary();
            this._typeToEntity.setValue(CBuilding_2.CBuilding, []);
            this._typeToEntity.setValue(EditingBuilding_1.EditingBuilding, []);
        }
        Dispose() {
            this._entities.forEach((entity) => {
                entity.MarkToDestroy();
            });
            this.DestroyEnties();
            this._gPool.Dispose();
        }
        DestroyEnties() {
            let count = this._entities.length;
            for (let i = 0; i < count; i++) {
                let entity = this._entities[i];
                if (!entity.markToDestroy)
                    continue;
                entity.OnRemoveFromBattle();
                this._entities.splice(i, 1);
                this._idToEntity.remove(entity.rid);
                let entities = this._typeToEntity.getValue(entity.constructor);
                entities.splice(entities.indexOf(entity), 1);
                this._gPool.Push(entity);
                --i;
                --count;
            }
        }
        Create(c, param) {
            let entity = this._gPool.Pop(c);
            this._idToEntity.setValue(param.rid, entity);
            this._typeToEntity.getValue(c).push(entity);
            this._entities.push(entity);
            entity.OnCreated(this._owner, param);
            return entity;
        }
        GetBuildings() {
            let result = [];
            let buildings = this._typeToEntity.getValue(CBuilding_2.CBuilding);
            for (let building of buildings) {
                if (building.markToDestroy || building.underConstruction)
                    continue;
                result.push(building);
            }
            return result;
        }
        GetEntity(rid) {
            if (rid == null || rid == undefined)
                return null;
            let entity = this._idToEntity.getValue(rid);
            return entity;
        }
        GetEntityAt(index) {
            if (index < 0 ||
                index > this._entities.length - 1)
                return null;
            return this._entities[index];
        }
        Update(context) {
            this.UpdateState(context);
            this.DestroyEnties();
        }
        UpdateState(context) {
            this._entities.forEach((entity) => {
                entity.OnUpdateState(context);
            });
        }
    }
    exports.CEntityManager = CEntityManager;
});
define("View/Camera", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Camera {
        get seekerPos() { return this._seekerPos.Clone(); }
        set seekerPos(value) {
            if (this._seekerPos.EqualsTo(value))
                return;
            this._seekerPos.CopyFrom(value);
            this._seekerPos.Clamp(this._restriMin, this._restriMax);
        }
        get seekerDir() { return this._seekerDir.Clone(); }
        set seekerDir(value) {
            if (this._seekerDir.EqualsTo(value))
                return;
            this._seekerDir.CopyFrom(value);
        }
        get position() { return this._position.Clone(); }
        set position(value) {
            if (value.EqualsTo(this._position))
                return;
            this._position = value.Clone();
            this.UpdateMatrixT();
            if (this.cameraTRSChangedHandler != null)
                this.cameraTRSChangedHandler();
        }
        get direction() { return this._direction.Clone(); }
        set direction(value) {
            if (value.EqualsTo(this._direction))
                return;
            this._direction = value.Clone();
            this.UpdateMatrixR();
            if (this.cameraTRSChangedHandler != null)
                this.cameraTRSChangedHandler();
        }
        constructor() {
            this._position = RC.Numerics.Vec3.zero;
            this._direction = RC.Numerics.Vec3.forward;
            this._seekerPos = this._position.Clone();
            this._seekerDir = this._direction.Clone();
            this._restriMin = new RC.Numerics.Vec3(-RC.Numerics.MathUtils.MAX_VALUE, -RC.Numerics.MathUtils.MAX_VALUE, -RC.Numerics.MathUtils.MAX_VALUE);
            this._restriMax = new RC.Numerics.Vec3(RC.Numerics.MathUtils.MAX_VALUE, RC.Numerics.MathUtils.MAX_VALUE, RC.Numerics.MathUtils.MAX_VALUE);
            this._localToWorldMat = RC.Numerics.Mat4.FromTRS(this._position, RC.Numerics.Quat.Euler(new RC.Numerics.Vec3(90, 0, 0)), new RC.Numerics.Vec3(1, -1, 1));
            this._worldToLocalMat = RC.Numerics.Mat4.NonhomogeneousInvert(this._localToWorldMat);
        }
        Update(context) {
            if (RC.Numerics.Vec3.DistanceSquared(this._position, this._seekerPos) < 0.01)
                return;
            this.position = RC.Numerics.Vec3.Lerp(this._position, this._seekerPos, context.deltaTime * 0.008);
        }
        BeginMove(screenPoint) {
            this._lastPointerPos = screenPoint.Clone();
        }
        Move(screenPoint) {
            let delta = RC.Numerics.Vec3.Sub(screenPoint, this._lastPointerPos);
            this._lastPointerPos.CopyFrom(screenPoint);
            this._seekerPos.Sub(delta);
            this._seekerPos.Clamp(this._restriMin, this._restriMax);
        }
        UpdateRestriction(restriMin, restriMax) {
            let m = this._localToWorldMat.Clone();
            m.w.x = 0;
            m.w.y = 0;
            m.w.z = 0;
            let min = m.TransformPoint(restriMin);
            let max = m.TransformPoint(restriMax);
            this._restriMin.x = RC.Numerics.MathUtils.Min(min.x, max.x);
            this._restriMin.y = RC.Numerics.MathUtils.Min(min.y, max.y);
            this._restriMin.z = RC.Numerics.MathUtils.Min(min.z, max.z);
            this._restriMax.x = RC.Numerics.MathUtils.Max(min.x, max.x);
            this._restriMax.y = RC.Numerics.MathUtils.Max(min.y, max.y);
            this._restriMax.z = RC.Numerics.MathUtils.Max(min.z, max.z);
            this._seekerPos.Clamp(this._restriMin, this._restriMax);
        }
        UpdateMatrixT() {
            this._localToWorldMat.SetTranslate(this._position);
            this._worldToLocalMat.CopyFrom(this._localToWorldMat);
            this._worldToLocalMat.NonhomogeneousInvert();
        }
        UpdateMatrixR() {
            this._localToWorldMat.SetRotation(RC.Numerics.Quat.FromToRotation(this._direction, RC.Numerics.Vec3.forward));
            this._worldToLocalMat.CopyFrom(this._localToWorldMat);
            this._worldToLocalMat.NonhomogeneousInvert();
        }
        WorldToScreen(point) {
            return this._worldToLocalMat.TransformPoint(point);
        }
        ScreenToWorld(point) {
            return this._localToWorldMat.TransformPoint(point);
        }
    }
    exports.Camera = Camera;
});
define("Shared/TileBase", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TileBase {
        constructor(slope, aspect, ratio) {
            this._occupied = new Set();
            this._localToWorldMat = RC.Numerics.Mat4.FromTRS(RC.Numerics.Vec3.zero, RC.Numerics.Quat.Euler(new RC.Numerics.Vec3(0, slope, 0)), new RC.Numerics.Vec3(1, 1, 1));
            this._localToWorldMat.Mul(RC.Numerics.Mat4.FromScale(new RC.Numerics.Vec3(ratio, 1, aspect * ratio)));
            this._worldToLocalMat = RC.Numerics.Mat4.NonhomogeneousInvert(this._localToWorldMat);
        }
        Dispose() {
            this._occupied.clear();
        }
        WorldToLocal(worldPoint) {
            let v = this._worldToLocalMat.TransformPoint(worldPoint);
            v.x = RC.Numerics.MathUtils.Ceil(v.x);
            v.y = 0;
            v.z = RC.Numerics.MathUtils.Floor(v.z);
            return v;
        }
        LocalToWorld(localPoint) {
            return this._localToWorldMat.TransformPoint(localPoint);
        }
        CheckOccupies(localPoint, length, depth) {
            let topLeftX = localPoint.x - length + 1;
            let topLeftZ = localPoint.z;
            for (let x = 0; x < length; ++x) {
                for (let z = 0; z < depth; ++z) {
                    if (this.IsOccupied(new RC.Numerics.Vec3(x + topLeftX, 0, z + topLeftZ)))
                        return false;
                }
            }
            return true;
        }
        RemoveOccupies(localPoint, length, depth) {
            let keys = [];
            let topLeftX = localPoint.x - length + 1;
            let topLeftZ = localPoint.z;
            for (let x = 0; x < length; ++x) {
                for (let z = 0; z < depth; ++z) {
                    let key = this.RemoveOccupy(new RC.Numerics.Vec3(x + topLeftX, 0, z + topLeftZ));
                    if (key != RC.Numerics.MathUtils.MAX_VALUE)
                        keys.push(key);
                }
            }
            return keys;
        }
        SetOccupies(localPoint, length, depth) {
            let keys = [];
            let topLeftX = localPoint.x - length + 1;
            let topLeftZ = localPoint.z;
            for (let x = 0; x < length; ++x) {
                for (let z = 0; z < depth; ++z) {
                    let key = this.SetOccupy(new RC.Numerics.Vec3(x + topLeftX, 0, z + topLeftZ));
                    keys.push(key);
                }
            }
            return keys;
        }
        RemoveOccupy(localPoint) {
            let key = this.EncodePoint(localPoint.x, localPoint.z);
            if (this._occupied.delete(key))
                return key;
            return RC.Numerics.MathUtils.MAX_VALUE;
        }
        RemoveOccupyByKey(key) {
            return this._occupied.delete(key);
        }
        SetOccupy(localPoint) {
            let key = this.EncodePoint(localPoint.x, localPoint.z);
            this._occupied.add(key);
            return key;
        }
        IsOccupied(localPoint) {
            return this._occupied.has(this.EncodePoint(localPoint.x, localPoint.z));
        }
        EncodePoint(x, z) {
            let value = x << 16;
            let sign = RC.Numerics.MathUtils.Sign(z);
            if (sign < 0) {
                value |= 1 << 15;
                value |= -z;
            }
            else
                value |= z;
            return value;
        }
        DecodePoint(key) {
            let x = key >> 16;
            let sign = (key & 0x8000) >> 15;
            let z = key & 0x7fff;
            if (sign == 1)
                z = -z;
            return [x, z];
        }
    }
    exports.TileBase = TileBase;
});
define("View/CTile", ["require", "exports", "Shared/TileBase"], function (require, exports, TileBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CTile extends TileBase_1.TileBase {
        constructor(slope, aspect, ratio) {
            super(slope, aspect, ratio);
            this._tileToEntity = new RC.Collections.Dictionary();
        }
        Dispose() {
            super.Dispose();
            this._tileToEntity.clear();
        }
        CanPlace(building) {
            let footprint = building.footprint;
            return this.CheckOccupies(building.tilePoint, footprint.x, footprint.z);
        }
        PlaceBuilding(building) {
            let footprint = building.footprint;
            let keys = this.SetOccupies(building.tilePoint, footprint.x, footprint.z);
            building.occupies = keys;
            for (let key of keys) {
                this._tileToEntity.setValue(key, building);
            }
        }
        RemoveBuilding(building) {
            for (let key of building.occupies) {
                this.RemoveOccupyByKey(key);
                this._tileToEntity.remove(key);
            }
            building.occupies.splice(0);
        }
        GetBuilding(worldPosition) {
            let localPoint = this.WorldToLocal(worldPosition);
            let key = this.EncodePoint(localPoint.x, localPoint.z);
            return this._tileToEntity.getValue(key);
        }
    }
    exports.CTile = CTile;
});
define("View/Input", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InputIdleState {
        constructor(owner) {
            this._owner = owner;
            this._lastTouchPoint = RC.Numerics.Vec3.zero;
        }
        Enter(param) {
            this._owner.battle.graphic.sprite.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
            this._touchingBuilding = null;
        }
        Exit() {
            this._owner.battle.graphic.sprite.displayObject.off(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
        }
        Update(context) {
            if (this._touchingBuilding != null) {
                this._touchTime += context.deltaTime;
                if (this._touchTime >= InputIdleState.TOUCH_TIME_TO_EDIT_MODE) {
                    let touchPoing = new RC.Numerics.Vec3(Laya.stage.mouseX, Laya.stage.mouseY, 0);
                    if (RC.Numerics.Vec3.DistanceSquared(touchPoing, this._lastTouchPoint) < InputIdleState.TOUCHING_DISTANCE_THRESHOLD) {
                        this._owner.ChangeState(InputStateType.Layout, this._touchingBuilding, touchPoing, false);
                        this.OnTouchEnd(null);
                    }
                }
            }
        }
        OnTouchBegin(evt) {
            fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
            fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
            this._owner.battle.camera.BeginMove(new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY));
            let touchPoint = new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0);
            this._lastTouchPoint.CopyFrom(touchPoint);
            let worldPoint = this._owner.battle.camera.ScreenToWorld(touchPoint);
            let building = this._owner.battle.tile.GetBuilding(worldPoint);
            if (building != null) {
                this._touchingBuilding = building;
                this._touchTime = 0;
            }
        }
        OnTouchMove(evt) {
            let point = new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY);
            this._owner.battle.camera.Move(point);
        }
        OnTouchEnd(evt) {
            this._touchingBuilding = null;
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
        }
    }
    InputIdleState.TOUCH_TIME_TO_EDIT_MODE = 500;
    InputIdleState.TOUCHING_DISTANCE_THRESHOLD = 40 * 40;
    exports.InputIdleState = InputIdleState;
    class InputLayoutState {
        constructor(owner) {
            this._owner = owner;
            this._startDragPoint = RC.Numerics.Vec3.zero;
            this._startDragPosition = RC.Numerics.Vec3.zero;
        }
        Enter(param) {
            this._owner.battle.NotifyStartLayout();
            this._owner.battle.graphic.sprite.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
            this._dragingBuilding = false;
            this._touchMovied = false;
            let srcBuilding = param[0];
            let touchPoint = param[1];
            let isNew = param[2];
            this._editingBuilding = this._owner.battle.CreateEditingBuilding(srcBuilding.id);
            this._editingBuilding.Steup(srcBuilding, isNew);
            if (touchPoint) {
                this.TouchBegin(touchPoint);
            }
        }
        Exit() {
            this._owner.battle.graphic.sprite.displayObject.off(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
            this._owner.battle.NotifyEndLayout();
            this._owner.battle.NotifyUpdateBuilding();
        }
        Update(context) {
        }
        TouchBegin(touchPoint) {
            fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
            fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
            let worldPoint = this._owner.battle.camera.ScreenToWorld(touchPoint);
            let tilePoint = this._owner.battle.tile.WorldToLocal(worldPoint);
            if (this._editingBuilding.ContainsPoint(tilePoint)) {
                this._dragingBuilding = true;
                this._startDragPoint.CopyFrom(worldPoint);
                this._startDragPosition.CopyFrom(this._editingBuilding.position);
            }
            else
                this._owner.battle.camera.BeginMove(new RC.Numerics.Vec3(touchPoint.x, 0, -touchPoint.y));
        }
        OnTouchBegin(evt) {
            this.TouchBegin(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
        }
        OnTouchMove(evt) {
            this._touchMovied = true;
            if (this._dragingBuilding) {
                let currPoint = this._owner.battle.camera.ScreenToWorld(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
                let delta = RC.Numerics.Vec3.Sub(currPoint, this._startDragPoint);
                this._editingBuilding.position = RC.Numerics.Vec3.Add(this._startDragPosition, delta);
                this._editingBuilding.SnapToTile();
            }
            else {
                let screenPoint = new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY);
                this._owner.battle.camera.Move(screenPoint);
            }
        }
        OnTouchEnd(evt) {
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
            if (this._dragingBuilding) {
                this._dragingBuilding = false;
                this._touchMovied = false;
                let worldPoint = this._owner.battle.camera.ScreenToWorld(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
                if (this._editingBuilding.Apply()) {
                    this._editingBuilding = null;
                    this._owner.ChangeState(InputStateType.Idle);
                }
                else {
                }
            }
            else {
                if (!this._touchMovied) {
                    this._editingBuilding.Cancel();
                    this._owner.ChangeState(InputStateType.Idle);
                }
                this._touchMovied = false;
            }
        }
    }
    exports.InputLayoutState = InputLayoutState;
    var InputStateType;
    (function (InputStateType) {
        InputStateType[InputStateType["Idle"] = 0] = "Idle";
        InputStateType[InputStateType["Layout"] = 1] = "Layout";
    })(InputStateType = exports.InputStateType || (exports.InputStateType = {}));
    class Input {
        get battle() { return this._owner; }
        constructor(owner) {
            this._owner = owner;
            this._states = [
                new InputIdleState(this),
                new InputLayoutState(this)
            ];
            this.ChangeState(InputStateType.Idle);
        }
        ChangeState(type, ...param) {
            if (this._currentState != null)
                this._currentState.Exit();
            this._currentState = this._states[type];
            this._currentState.Enter(param);
        }
        Update(context) {
            if (this._currentState != null)
                this._currentState.Update(context);
        }
    }
    exports.Input = Input;
});
define("View/MapGraphic", ["require", "exports", "View/Graphic"], function (require, exports, Graphic_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MapGraphic extends Graphic_2.Graphic {
        get sprite() { return this._sprite; }
        constructor(manager) {
            super(manager);
        }
        Dispose() {
            this._sprite.dispose();
            super.Dispose();
        }
        Load(id) {
            this._sprite = fairygui.UIPackage.createObject("global", id).asCom;
            this._root.addChild(this._sprite);
        }
    }
    exports.MapGraphic = MapGraphic;
});
define("Shared/Event/EventCenter", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EventCenter {
        static AddListener(type, handler) {
            let list = EventCenter.HANDLERS[type];
            if (list == undefined)
                EventCenter.HANDLERS[type] = list = [];
            list.push(handler);
        }
        static RemoveListener(type, handler) {
            let list = EventCenter.HANDLERS[type];
            if (list == undefined)
                return;
            let result = list.splice(list.indexOf(handler), 1);
            if (!result)
                return;
            if (list.length == 0)
                EventCenter.HANDLERS[type] = undefined;
        }
        static BeginInvoke(e) {
            EventCenter.PENDING_LIST.enqueue(e);
        }
        static Invoke(e) {
            let handlers = EventCenter.HANDLERS[e.type];
            if (handlers != undefined) {
                handlers.forEach((callback) => {
                    callback(e);
                });
            }
            e.Release();
        }
        static Sync() {
            while (!EventCenter.PENDING_LIST.isEmpty()) {
                let e = EventCenter.PENDING_LIST.dequeue();
                EventCenter.Invoke(e);
            }
        }
    }
    EventCenter.HANDLERS = {};
    EventCenter.PENDING_LIST = new RC.Collections.Queue();
    exports.EventCenter = EventCenter;
});
define("Shared/Event/BaseEvent", ["require", "exports", "Shared/Event/EventCenter"], function (require, exports, EventCenter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseEvent {
        get type() {
            return this.__type;
        }
        set _type(value) {
            this.__type = value;
        }
        BeginInvoke() {
            EventCenter_1.EventCenter.BeginInvoke(this);
        }
        Invoke() {
            EventCenter_1.EventCenter.Invoke(this);
        }
    }
    exports.BaseEvent = BaseEvent;
});
define("Shared/Attr", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EAttr;
    (function (EAttr) {
        EAttr[EAttr["Undefine"] = 0] = "Undefine";
        EAttr[EAttr["Id"] = 2] = "Id";
        EAttr[EAttr["Name"] = 3] = "Name";
        EAttr[EAttr["Model"] = 4] = "Model";
        EAttr[EAttr["Bounds"] = 5] = "Bounds";
        EAttr[EAttr["Position"] = 6] = "Position";
        EAttr[EAttr["Direction"] = 7] = "Direction";
        EAttr[EAttr["Uid"] = 50] = "Uid";
        EAttr[EAttr["Team"] = 51] = "Team";
    })(EAttr = exports.EAttr || (exports.EAttr = {}));
});
define("Shared/Event/UIEvent", ["require", "exports", "Shared/Event/BaseEvent"], function (require, exports, BaseEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIEvent extends BaseEvent_1.BaseEvent {
        static Get() {
            if (UIEvent.POOL.size() > 0)
                return UIEvent.POOL.pop();
            return new UIEvent();
        }
        static Release(element) {
            UIEvent.POOL.push(element);
        }
        Release() {
            UIEvent.Release(this);
        }
        static Win(team) {
            let e = this.Get();
            e._type = UIEvent.WIN;
            e.i0 = team;
            e.Invoke();
        }
        static EntityCreated(target) {
            let e = this.Get();
            e._type = UIEvent.ENTITY_CREATED;
            e.target = target;
            e.Invoke();
        }
        static EntityDestroied(target) {
            let e = this.Get();
            e._type = UIEvent.ENTITY_DESTROIED;
            e.target = target;
            e.Invoke();
        }
        static EntityAttrChanged(target, attr, value) {
            let e = this.Get();
            e._type = UIEvent.ENTITY_ATTR_CHANGED;
            e.target = target;
            e.attr = attr;
            e.o0 = value;
            e.Invoke();
        }
        static StartLayout() {
            let e = this.Get();
            e._type = UIEvent.START_LAYOUT;
            e.Invoke();
        }
        static EndLayout() {
            let e = this.Get();
            e._type = UIEvent.END_LAYOUT;
            e.Invoke();
        }
        static UpdateBuilding() {
            let e = this.Get();
            e._type = UIEvent.UPDATE_BUILDING;
            e.Invoke();
        }
    }
    UIEvent.WIN = 10010;
    UIEvent.ENTITY_CREATED = 10020;
    UIEvent.ENTITY_DESTROIED = 10021;
    UIEvent.ENTITY_ATTR_CHANGED = 10023;
    UIEvent.USE_SKILL = 10030;
    UIEvent.START_LAYOUT = 10050;
    UIEvent.END_LAYOUT = 10051;
    UIEvent.UPDATE_BUILDING = 10052;
    UIEvent.POOL = new RC.Collections.Stack();
    exports.UIEvent = UIEvent;
});
define("View/Home", ["require", "exports", "View/EditingBuilding", "View/CBuilding", "View/CEntityManager", "View/GraphicManager", "View/Camera", "View/CTile", "View/Input", "View/MapGraphic", "Shared/Utils", "Shared/UpdateContext", "Shared/Model/EntityParam", "Shared/Model/ModelFactory", "Shared/Event/UIEvent"], function (require, exports, EditingBuilding_2, CBuilding_3, CEntityManager_1, GraphicManager_1, Camera_1, CTile_1, Input_1, MapGraphic_1, Utils_2, UpdateContext_1, EntityParam_1, ModelFactory_3, UIEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Home {
        constructor(param) {
            this._frame = 0;
            this._deltaTime = 0;
            this._time = 0;
            this._data = ModelFactory_3.ModelFactory.GetMapData(Utils_2.Utils.GetIDFromRID(param.id));
            this._entityManager = new CEntityManager_1.CEntityManager(this);
            this._graphicManager = new GraphicManager_1.GraphicManager(this);
            this._context = new UpdateContext_1.UpdateContext();
            this._camera = new Camera_1.Camera();
            this._camera.seekerPos = new RC.Numerics.Vec3((this._data.size.x - fairygui.GRoot.inst.width) * 0.5, 0, (this._data.size.y - fairygui.GRoot.inst.height) * -0.5);
            this._camera.position = this._camera.seekerPos;
            this._camera.cameraTRSChangedHandler = this._graphicManager.OnCameraTRSChanged.bind(this._graphicManager);
            this._graphic = this._graphicManager.CreateGraphic(MapGraphic_1.MapGraphic);
            this._graphic.Load(this._data.model);
            this._tile = new CTile_1.CTile(this._data.tileSlope, this._data.tileAspect, this._data.tileRatio);
            this._input = new Input_1.Input(this);
            this.camera.UpdateRestriction(RC.Numerics.Vec3.zero, new RC.Numerics.Vec3(this._graphic.sprite.width - fairygui.GRoot.inst.width, this._graphic.sprite.height - fairygui.GRoot.inst.height, 0));
        }
        get frame() { return this._frame; }
        get deltaTime() { return this._deltaTime; }
        get time() { return this._time; }
        get graphicManager() { return this._graphicManager; }
        ;
        get entityManager() { return this._entityManager; }
        ;
        get camera() { return this._camera; }
        ;
        get graphic() { return this._graphic; }
        ;
        get tile() { return this._tile; }
        ;
        get input() { return this._input; }
        Dispose() {
            this._graphicManager.Dispose();
            this._entityManager.Dispose();
            this._tile.Dispose();
        }
        Update(deltaTime) {
            ++this._frame;
            this._deltaTime = deltaTime;
            this._time += this.deltaTime;
            this._context.deltaTime = this.deltaTime;
            this._context.time = this.time;
            this._context.frame = this.frame;
            this._entityManager.Update(this._context);
            this._camera.Update(this._context);
            this._input.Update(this._context);
        }
        OnResize(e) {
            this.camera.UpdateRestriction(RC.Numerics.Vec3.zero, new RC.Numerics.Vec3(this._graphic.sprite.width - fairygui.GRoot.inst.width, this._graphic.sprite.height - fairygui.GRoot.inst.height, 0));
        }
        SetGraphicRoot(graphicRoot) {
            graphicRoot.addChild(this.graphicManager.root);
        }
        CreateBuilding(id, position = RC.Numerics.Vec3.zero) {
            let rid = Utils_2.Utils.MakeRIDFromID(id);
            let param = new EntityParam_1.EntityParam();
            param.rid = rid;
            param.position = position;
            let entity = this._entityManager.Create(CBuilding_3.CBuilding, param);
            return entity;
        }
        CreateEditingBuilding(id, position = RC.Numerics.Vec3.zero) {
            let rid = Utils_2.Utils.MakeRIDFromID(id);
            let param = new EntityParam_1.EntityParam();
            param.rid = rid;
            param.position = position;
            let entity = this._entityManager.Create(EditingBuilding_2.EditingBuilding, param);
            return entity;
        }
        NewBuilding(id, position) {
            let building = this.CreateBuilding(id, position);
            building.SnapToTile();
            if (!building.CanPlace()) {
                this.input.ChangeState(Input_1.InputStateType.Layout, building, null, true);
                return false;
            }
            building.Place();
            building.BeginBuild();
            this.NotifyEndLayout();
            this.NotifyUpdateBuilding();
            return true;
        }
        NotifyStartLayout() {
            UIEvent_1.UIEvent.StartLayout();
        }
        NotifyEndLayout() {
            UIEvent_1.UIEvent.EndLayout();
        }
        NotifyUpdateBuilding() {
            UIEvent_1.UIEvent.UpdateBuilding();
        }
    }
    exports.Home = Home;
});
define("View/UI/HomePanel", ["require", "exports", "View/CUser", "View/Home", "Shared/Event/EventCenter", "Shared/Event/UIEvent"], function (require, exports, CUser_2, Home_1, EventCenter_2, UIEvent_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HomePanel {
        constructor(owner, param) {
            this._owner = owner;
            this._root = owner.root.getChild("c0").asCom;
            this._mine = this._root.getChild("mine").asTextField;
            this._energy = this._root.getChild("energy").asTextField;
            this._power = this._root.getChild("power").asTextField;
            this._atk = this._root.getChild("atk").asTextField;
            this._def = this._root.getChild("def").asTextField;
            this.UpdateResources();
            let tansuoBtn = this._root.getChild("tansuo_btn");
            tansuoBtn.onClick(this, (e) => { this._owner.panelIndex = 1; });
            let juseBtn = this._root.getChild("juse_btn");
            juseBtn.onClick(this, (e) => { this._owner.panelIndex = 3; });
            let renwuBtn = this._root.getChild("renwu_btn");
            renwuBtn.onClick(this, (e) => { this._owner.panelIndex = 4; });
            let xiaoxiBtn = this._root.getChild("xiaoxi_btn");
            xiaoxiBtn.onClick(this, (e) => { this._owner.panelIndex = 5; });
            let jiansheBtn = this._root.getChild("jianshe_btn");
            jiansheBtn.onClick(this, (e) => {
                if (this._buildPanel == null) {
                    this._buildPanel = fairygui.UIPackage.createObject("battle", "buildPanel").asCom;
                    this._buildPanel.getChild("list").on(fairygui.Events.CLICK_ITEM, this, this.OnBuildItemClick);
                }
                fairygui.GRoot.inst.togglePopup(this._buildPanel, fairygui.GRoot.inst);
                this._buildPanel.center();
            });
            EventCenter_2.EventCenter.AddListener(UIEvent_2.UIEvent.START_LAYOUT, this.HandleStartLayout.bind(this));
            EventCenter_2.EventCenter.AddListener(UIEvent_2.UIEvent.END_LAYOUT, this.HandleEndLayout.bind(this));
            EventCenter_2.EventCenter.AddListener(UIEvent_2.UIEvent.UPDATE_BUILDING, this.HandleUpdateBuilding.bind(this));
            this._home = new Home_1.Home(param);
            this._home.SetGraphicRoot(this._root.getChild("n37").asCom);
        }
        Dispose() {
            EventCenter_2.EventCenter.RemoveListener(UIEvent_2.UIEvent.START_LAYOUT, this.HandleStartLayout.bind(this));
            EventCenter_2.EventCenter.RemoveListener(UIEvent_2.UIEvent.END_LAYOUT, this.HandleEndLayout.bind(this));
            EventCenter_2.EventCenter.RemoveListener(UIEvent_2.UIEvent.UPDATE_BUILDING, this.HandleUpdateBuilding.bind(this));
            if (this._buildPanel != null) {
                this._buildPanel.dispose();
                this._buildPanel = null;
            }
            this._home.Dispose();
        }
        Enter() {
            this.UpdateResources();
        }
        Exit() {
        }
        Update(deltaTime) {
            this._home.Update(deltaTime);
        }
        OnResize(e) {
            this._home.OnResize(e);
        }
        OnBuildItemClick(sender, e) {
            let bid = sender.asCom.name;
            let worldPoint = this._home.camera.ScreenToWorld(new RC.Numerics.Vec3(e.stageX, e.stageY));
            this._home.NewBuilding(bid, worldPoint);
            fairygui.GRoot.inst.hidePopup();
        }
        HandleStartLayout(e) {
            this._root.getController("c1").selectedIndex = 1;
            this._root.getChild("jianshe_btn").asCom.touchable = false;
        }
        HandleEndLayout(e) {
            this._root.getController("c1").selectedIndex = 0;
            this._root.getChild("jianshe_btn").asCom.touchable = true;
        }
        HandleUpdateBuilding(e) {
            this.UpdateResources();
        }
        UpdateResources() {
            this._mine.text = CUser_2.CUser.mine.toString();
            this._energy.text = CUser_2.CUser.energy.toString();
            this._power.text = CUser_2.CUser.power.toString();
            this._atk.text = CUser_2.CUser.atk.toString();
            this._def.text = CUser_2.CUser.def.toString();
        }
        SetImage(id) {
            this._root.getChild("juse_btn").asCom.getChild("n1").asLoader.url = fairygui.UIPackage.getItemURL("battle", id);
        }
        SetName(name) {
            this._root.getChild("juse_btn").asCom.getChild("n0").asTextField.text = name;
        }
    }
    exports.HomePanel = HomePanel;
});
define("View/UI/SearchPanel", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SearchPanel {
        constructor(owner) {
            this._owner = owner;
            this._root = owner.root.getChild("c1").asCom;
            let backBtn = this._root.getChild("back_btn");
            backBtn.onClick(this, (e) => { this._owner.panelIndex = 0; });
        }
        Dispose() {
        }
        Enter() {
            let backBtn = this._root.getChild("back_btn");
            backBtn.touchable = true;
            backBtn.alpha = 1;
            let m = this._root.getChild("n40").asMovieClip;
            m.alpha = 1;
            m.playing = true;
            this._timer = new laya.utils.Timer();
            this._timer.once(Math.random() * 1000 - 500 + SearchPanel.WAIT_TIME, this, this.Matched);
        }
        Exit() {
            this._timer.clear(this, this.Matched);
        }
        Update(deltaTime) {
        }
        OnResize(e) {
        }
        Matched() {
            let backBtn = this._root.getChild("back_btn");
            backBtn.touchable = false;
            let t = this._root.getTransition("t0");
            t.play(new laya.utils.Handler(this, this.OnTransitionComplete));
        }
        OnTransitionComplete() {
            this._owner.panelIndex = 2;
        }
    }
    SearchPanel.WAIT_TIME = 2000;
    exports.SearchPanel = SearchPanel;
});
define("View/UI/FightPanel", ["require", "exports", "View/CUser"], function (require, exports, CUser_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FightPanel {
        constructor(owner) {
            this._owner = owner;
            this._root = owner.root.getChild("c2").asCom;
            this._p1hpCom = this._root.getChild("p1hp").asProgress;
            this._p2hpCom = this._root.getChild("p2hp").asProgress;
            this._p1FightAni = this._root.getChild("n14").asMovieClip;
            this._p2FightAni = this._root.getChild("n15").asMovieClip;
            this._resultPanel = fairygui.UIPackage.createObject("battle", "fight_result").asCom;
            this._resultPanel.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            this._resultPanel.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
            this._resultPanel.getChild("back_btn").onClick(this, (e) => {
                fairygui.GRoot.inst.removeChild(this._resultPanel);
                this._owner.panelIndex = 0;
            });
            let skipBtn = this._root.getChild("skip_btn").asCom;
            skipBtn.onClick(this, this.Skip);
            this._p1Records = new RC.Collections.Queue();
            this._p2Records = new RC.Collections.Queue();
        }
        Dispose() {
            this._resultPanel.dispose();
        }
        Enter() {
            this._p1hpCom.max = FightPanel.MAX_HP;
            this._p1hpCom.value = FightPanel.MAX_HP;
            this._p2hpCom.max = FightPanel.MAX_HP;
            this._p2hpCom.value = FightPanel.MAX_HP;
            this._p1hp = FightPanel.MAX_HP;
            this._p2hp = FightPanel.MAX_HP;
            this.CreateOpponent();
            this.PerformFight();
            this._root.getChild("atk0").text = CUser_3.CUser.atk.toString();
            this._root.getChild("def0").text = CUser_3.CUser.def.toString();
            this._root.getChild("atk1").text = this._opAtk.toString();
            this._root.getChild("def1").text = this._opDef.toString();
            this.PlayRecord();
        }
        Exit() {
            if (this._timer != null) {
                this._timer.clear(this, this.PlayAni);
                this._timer = null;
            }
            this._p1Records.clear();
            this._p2Records.clear();
        }
        Update(deltaTime) {
        }
        OnResize(e) {
        }
        CreateOpponent() {
            this._opAtk = RC.Numerics.MathUtils.Round(RC.Numerics.MathUtils.Max(Math.random() * 20 + 10, CUser_3.CUser.atk + (Math.random() * 40 - 20)));
            this._opDef = RC.Numerics.MathUtils.Round(RC.Numerics.MathUtils.Max(Math.random() * 20 + 10, CUser_3.CUser.def + (Math.random() * 40 - 20)));
        }
        PerformFight() {
            let userHp = FightPanel.MAX_HP;
            let opHp = FightPanel.MAX_HP;
            let result = 0;
            for (let i = 0; i < FightPanel.MAX_ROUND; ++i) {
                let hurt0 = RC.Numerics.MathUtils.Max(0, CUser_3.CUser.atk - this._opDef);
                hurt0 += Math.random() * hurt0 * 0.4 - hurt0 * 0.2;
                let hurt1 = RC.Numerics.MathUtils.Max(0, this._opAtk - CUser_3.CUser.def);
                hurt1 += Math.random() * hurt1 * 0.4 - hurt1 * 0.2;
                hurt0 = RC.Numerics.MathUtils.Round(hurt0);
                hurt1 = RC.Numerics.MathUtils.Round(hurt1);
                this._p1Records.enqueue(hurt1);
                this._p2Records.enqueue(hurt0);
                userHp -= hurt1;
                opHp -= hurt0;
                if (opHp <= 0 || userHp <= 0) {
                    break;
                }
            }
        }
        Skip() {
            while (this._p1Records.size() > 0) {
                this.PreformP1();
            }
            while (this._p2Records.size() > 0) {
                this.PreformP2();
            }
            this.Settlement();
        }
        PlayRecord() {
            if (this._p1Records.size() == 0 && this._p2Records.size() == 0) {
                this.Settlement();
            }
            else {
                this._timer = new laya.utils.Timer();
                this._timer.once(FightPanel.REPLAY_INTERVAL, this, this.PlayAni);
            }
        }
        PlayAni() {
            if (this._p1Records.size() > 0) {
                this._p1FightAni.setPlaySettings(0, -1, 1, 0, new laya.utils.Handler(this, this.OnP1AniComplete));
                this._p1FightAni.playing = true;
            }
            if (this._p2Records.size() > 0) {
                this._p2FightAni.setPlaySettings(0, -1, 1, 0, new laya.utils.Handler(this, this.OnP2AniComplete));
                this._p2FightAni.playing = true;
            }
        }
        OnP1AniComplete() {
            if (this._p1Records.size() == 0)
                return;
            this.PreformP1();
            this._p1FightAni.playing = false;
            if (!this._p2FightAni.playing)
                this.PlayRecord();
        }
        OnP2AniComplete() {
            if (this._p2Records.size() == 0)
                return;
            this.PreformP2();
            this._p2FightAni.playing = false;
            if (!this._p1FightAni.playing)
                this.PlayRecord();
        }
        PreformP1() {
            let hurt = this._p1Records.dequeue();
            this._p1hp -= hurt;
            this._p1hpCom.value = this._p1hp;
        }
        PreformP2() {
            let hurt = this._p2Records.dequeue();
            this._p2hp -= hurt;
            this._p2hpCom.value = this._p2hp;
        }
        Settlement() {
            fairygui.GRoot.inst.addChild(this._resultPanel);
            this._resultPanel.center();
            let mine;
            let energy;
            if (this._p1hp >= this._p2hp) {
                mine = (Math.random() * 80 + 80);
                energy = (Math.random() * 50 + 50);
                this._resultPanel.getController("c1").selectedIndex = 0;
            }
            else {
                mine = (Math.random() * 30 + 30);
                energy = (Math.random() * 10 + 10);
                this._resultPanel.getController("c1").selectedIndex = 1;
            }
            mine = RC.Numerics.MathUtils.Round(mine);
            energy = RC.Numerics.MathUtils.Round(energy);
            CUser_3.CUser.G_MINE += mine;
            CUser_3.CUser.G_ENERGY += energy;
            this._resultPanel.getChild("mine").asTextField.text = mine.toString();
            this._resultPanel.getChild("energy").asTextField.text = energy.toString();
        }
    }
    FightPanel.MAX_HP = 300;
    FightPanel.MAX_ROUND = 20;
    FightPanel.REPLAY_INTERVAL = 300;
    exports.FightPanel = FightPanel;
    class FightRecord {
    }
    exports.FightRecord = FightRecord;
});
define("View/UI/RolePanel", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RolePanel {
        constructor(owner) {
            this._owner = owner;
            this._root = owner.root.getChild("c3").asCom;
            let imageCom = this._root.getChild("n9").asCom;
            imageCom.onClick(this, (e) => {
                if (this._imagePanel == null) {
                    this._imagePanel = fairygui.UIPackage.createObject("battle", "juese_popup").asCom;
                    this._imagePanel.getChild("list").on(fairygui.Events.CLICK_ITEM, this, this.OnImageItemClick);
                }
                fairygui.GRoot.inst.togglePopup(this._imagePanel);
            });
            let changeNameBtn = this._root.getChild("n13").asCom;
            changeNameBtn.onClick(this, (e) => {
                this._owner.homePanel.SetName(this._root.getChild("n12").asTextInput.text);
            });
            let backBtn = this._root.getChild("back_btn");
            backBtn.onClick(this, (e) => { this._owner.panelIndex = 0; });
        }
        Dispose() {
        }
        Enter() {
        }
        Exit() {
        }
        Update(deltaTime) {
        }
        OnResize(e) {
        }
        OnImageItemClick(sender, e) {
            let id = sender.asCom.name;
            let loader = this._root.getChild("n23").asLoader;
            loader.url = fairygui.UIPackage.getItemURL("battle", id);
            this._owner.homePanel.SetImage(id);
            fairygui.GRoot.inst.hidePopup();
        }
    }
    exports.RolePanel = RolePanel;
});
define("View/UI/TaskPanel", ["require", "exports", "View/CUser", "Shared/Event/UIEvent", "Shared/Event/EventCenter", "Shared/Defs"], function (require, exports, CUser_4, UIEvent_3, EventCenter_3, Defs_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TaskPanel {
        constructor(owner) {
            this._owner = owner;
            this._root = owner.root.getChild("c4").asCom;
            this._atk = this._root.getChild("atk").asTextField;
            this._def = this._root.getChild("def").asTextField;
            let backBtn = this._root.getChild("back_btn");
            backBtn.onClick(this, (e) => { this._owner.panelIndex = 0; });
            EventCenter_3.EventCenter.AddListener(UIEvent_3.UIEvent.UPDATE_BUILDING, this.HandleUpdateBuilding.bind(this));
        }
        Dispose() {
            EventCenter_3.EventCenter.RemoveListener(UIEvent_3.UIEvent.UPDATE_BUILDING, this.HandleUpdateBuilding.bind(this));
        }
        Enter() {
            let tasksDef = Defs_4.Defs.GetTask();
            let list = this._root.getChild("list").asList;
            for (let taskDef of tasksDef) {
                let com = list.addItemFromPool().asCom;
                com.getChild("n6").asTextField.text = taskDef;
            }
        }
        Exit() {
            let list = this._root.getChild("list").asList;
            list.removeChildrenToPool();
        }
        Update(deltaTime) {
        }
        OnResize(e) {
        }
        HandleUpdateBuilding(e) {
            this.UpdateResources();
        }
        UpdateResources() {
            this._atk.text = CUser_4.CUser.atk.toString();
            this._def.text = CUser_4.CUser.def.toString();
        }
    }
    exports.TaskPanel = TaskPanel;
});
define("View/UI/MsgPanel", ["require", "exports", "View/CUser", "Shared/Event/UIEvent", "Shared/Event/EventCenter", "Shared/Defs"], function (require, exports, CUser_5, UIEvent_4, EventCenter_4, Defs_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MsgPanel {
        constructor(owner) {
            this._owner = owner;
            this._root = owner.root.getChild("c5").asCom;
            this._atk = this._root.getChild("atk").asTextField;
            this._def = this._root.getChild("def").asTextField;
            let backBtn = this._root.getChild("back_btn");
            backBtn.onClick(this, (e) => { this._owner.panelIndex = 0; });
            EventCenter_4.EventCenter.AddListener(UIEvent_4.UIEvent.UPDATE_BUILDING, this.HandleUpdateBuilding.bind(this));
        }
        Dispose() {
            EventCenter_4.EventCenter.RemoveListener(UIEvent_4.UIEvent.UPDATE_BUILDING, this.HandleUpdateBuilding.bind(this));
        }
        Enter() {
            let tasksDef = Defs_5.Defs.GetMessage();
            let list = this._root.getChild("list").asList;
            for (let taskDef of tasksDef) {
                let com = list.addItemFromPool().asCom;
                com.getChild("n6").asTextField.text = taskDef;
            }
        }
        Exit() {
            let list = this._root.getChild("list").asList;
            list.removeChildrenToPool();
        }
        Update(deltaTime) {
        }
        OnResize(e) {
        }
        HandleUpdateBuilding(e) {
            this.UpdateResources();
        }
        UpdateResources() {
            this._atk.text = CUser_5.CUser.atk.toString();
            this._def.text = CUser_5.CUser.def.toString();
        }
    }
    exports.MsgPanel = MsgPanel;
});
define("View/UI/UIMain", ["require", "exports", "View/UI/HomePanel", "View/UI/SearchPanel", "View/UI/FightPanel", "View/UI/RolePanel", "View/UI/TaskPanel", "View/UI/MsgPanel"], function (require, exports, HomePanel_1, SearchPanel_1, FightPanel_1, RolePanel_1, TaskPanel_1, MsgPanel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIMain {
        get root() { return this._root; }
        get homePanel() { return this._homePanel; }
        get searchPanel() { return this._searchPanel; }
        get fightPanel() { return this._fightPanel; }
        get rolePanel() { return this._rolePanel; }
        set panelIndex(value) {
            if (this._controller.selectedIndex == value)
                return;
            this._panels[this._controller.selectedIndex].Exit();
            this._panels[value].Enter();
            this._controller.selectedIndex = value;
        }
        constructor() {
            fairygui.UIPackage.addPackage("res/ui/battle");
            this._panels = [];
        }
        Dispose() {
        }
        Enter(param) {
            this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
            this._root.opaque = false;
            this._root.getChild("c0").asCom.opaque = false;
            fairygui.GRoot.inst.addChild(this._root);
            this._root.width = fairygui.GRoot.inst.width;
            this._root.height = fairygui.GRoot.inst.height;
            this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
            this._controller = this._root.getController("c1");
            this._homePanel = new HomePanel_1.HomePanel(this, param);
            this._searchPanel = new SearchPanel_1.SearchPanel(this);
            this._fightPanel = new FightPanel_1.FightPanel(this);
            this._rolePanel = new RolePanel_1.RolePanel(this);
            this._taskPanel = new TaskPanel_1.TaskPanel(this);
            this._msgPanel = new MsgPanel_1.MsgPanel(this);
            this._panels.push(this._homePanel);
            this._panels.push(this._searchPanel);
            this._panels.push(this._fightPanel);
            this._panels.push(this._rolePanel);
            this._panels.push(this._taskPanel);
            this._panels.push(this._msgPanel);
            this._controller.selectedIndex = 0;
            this._homePanel.Enter();
        }
        Leave() {
            for (let p of this._panels)
                p.Dispose();
            this._panels.splice(0);
            this._root.dispose();
            this._root = null;
            this._controller = null;
        }
        Update(deltaTime) {
            for (let p of this._panels)
                p.Update(deltaTime);
        }
        OnResize(e) {
            for (let p of this._panels)
                p.OnResize(e);
        }
    }
    exports.UIMain = UIMain;
});
define("View/UI/UIManager", ["require", "exports", "View/UI/UILogin", "View/UI/UIMain"], function (require, exports, UILogin_1, UIMain_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIManager {
        static get login() { return this._login; }
        static get battle() { return this._main; }
        static Init(resolution) {
            Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
            fairygui.UIPackage.addPackage("res/ui/global");
            fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "qtm011");
            fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "qtm011");
            fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");
            this._login = new UILogin_1.UILogin();
            this._main = new UIMain_1.UIMain();
        }
        static Dispose() {
            if (this._currModule != null) {
                this._currModule.Leave();
                this._currModule = null;
            }
        }
        static Update(deltaTime) {
            if (this._currModule != null)
                this._currModule.Update(deltaTime);
        }
        static OnResize(e) {
            if (this._currModule != null)
                this._currModule.OnResize(e);
        }
        static EnterModule(module, param) {
            if (this._currModule != null)
                this._currModule.Leave();
            module.Enter(param);
            this._currModule = module;
        }
        static LeaveModule() {
            if (this._currModule != null)
                this._currModule.Leave();
            this._currModule = null;
        }
        static EnterLogin() {
            this.EnterModule(this._login);
        }
        static EnterBattle(param) {
            this.EnterModule(this._main, param);
        }
    }
    exports.UIManager = UIManager;
});
define("Game", ["require", "exports", "View/UI/UIManager", "Shared/Defs"], function (require, exports, UIManager_1, Defs_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Main {
        constructor() {
            Laya.init(720, 1280);
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
            Laya.stage.alignH = Laya.Stage.ALIGN_LEFT;
            Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
            Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
            this.LoadDefs();
        }
        LoadDefs() {
            console.log("loading defs...");
            Laya.loader.load("res/defs/b_defs.json", Laya.Handler.create(this, this.OnDefsLoadComplete), undefined, Laya.Loader.JSON);
        }
        OnDefsLoadComplete() {
            let json = Laya.loader.getRes("res/defs/b_defs.json");
            Defs_6.Defs.Init(json);
            this.LoadUIRes();
        }
        LoadUIRes() {
            console.log("loading res...");
            let preloads = Defs_6.Defs.GetPreloads();
            let urls = [];
            for (let u of preloads) {
                let ss = u.split(",");
                urls.push({ url: "res/ui/" + ss[0], type: ss[1] == "0" ? Laya.Loader.BUFFER : Laya.Loader.IMAGE });
            }
            Laya.loader.load(urls, Laya.Handler.create(this, this.OnUIResLoadComplete));
        }
        OnUIResLoadComplete() {
            this.StartGame();
        }
        StartGame() {
            console.log("start game...");
            UIManager_1.UIManager.Init(new RC.Numerics.Vec2(600, 800));
            fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnResize);
            Laya.timer.frameLoop(1, this, this.Update);
            UIManager_1.UIManager.EnterLogin();
        }
        Update() {
            let dt = Laya.timer.delta;
            UIManager_1.UIManager.Update(dt);
        }
        OnResize(e) {
            UIManager_1.UIManager.OnResize(e);
        }
    }
    exports.Main = Main;
});
define("Test", ["require", "exports", "./libs/protos"], function (require, exports, protos_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Main {
        constructor() {
            console.log("start");
            let login = protos_2.Protos.GCToLS.AskLogin.create();
            login.uin = "test";
            let data = protos_2.Protos.GCToLS.AskLogin.encode(login).finish();
            let login2 = protos_2.Protos.GCToLS.AskLogin.decode(data);
            console.log(login2);
        }
    }
    exports.Main = Main;
});
define("Shared/Event/SyncEvent", ["require", "exports", "Shared/Event/BaseEvent"], function (require, exports, BaseEvent_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SyncEvent extends BaseEvent_2.BaseEvent {
        constructor() {
            super(...arguments);
            this.attrs = [];
            this.attrValues = [];
        }
        static Get() {
            if (SyncEvent.POOL.size() > 0)
                return SyncEvent.POOL.pop();
            return new SyncEvent();
        }
        static Release(element) {
            SyncEvent.POOL.push(element);
        }
        Release() {
            SyncEvent.Release(this);
        }
        static CreateBattle(id) {
            let e = this.Get();
            e._type = SyncEvent.BATTLE_CREATED;
            e.genericId = id;
            e.BeginInvoke();
        }
        static DestroyBattle() {
            let e = this.Get();
            e._type = SyncEvent.BATTLE_DESTROIED;
            e.BeginInvoke();
        }
        static CreateEntity(type, param) {
            let e = this.Get();
            e._type = SyncEvent.ENTITY_CREATED;
            e.entityType = type;
            e.param = param;
            e.BeginInvoke();
        }
        static EntityRemoveFromBattle(entityId) {
            let e = this.Get();
            e._type = SyncEvent.ENTITY_REMOVE_FROM_BATTLE;
            e.targetId = entityId;
            e.BeginInvoke();
        }
        static EntityAddedToBattle(entityId) {
            let e = this.Get();
            e._type = SyncEvent.ENTITY_ADDED_TO_BATTLE;
            e.targetId = entityId;
            e.BeginInvoke();
        }
        static BeginSyncProps(targetId) {
            let e = this.Get();
            e._type = SyncEvent.ENTITY_SYNC_PROPS;
            e.attrs.splice(0);
            e.targetId = targetId;
            return e;
        }
        static EndSyncProps(e) {
            e.BeginInvoke();
        }
        static AddSyncProp(e, attr, value) {
            e.attrs.push(attr);
            e.attrValues.push(value);
        }
        static HandleFrameAction() {
            let e = SyncEvent.Get();
            e._type = SyncEvent.SET_FRAME_ACTION;
            e.BeginInvoke();
        }
    }
    SyncEvent.BATTLE_CREATED = 10;
    SyncEvent.BATTLE_DESTROIED = 11;
    SyncEvent.WIN = 13;
    SyncEvent.ENTITY_CREATED = 20;
    SyncEvent.ENTITY_ADDED_TO_BATTLE = 21;
    SyncEvent.ENTITY_REMOVE_FROM_BATTLE = 22;
    SyncEvent.ENTITY_STATE_CHANGED = 23;
    SyncEvent.ENTITY_SYNC_PROPS = 24;
    SyncEvent.SET_FRAME_ACTION = 99;
    SyncEvent.POOL = new RC.Collections.Stack();
    exports.SyncEvent = SyncEvent;
});
//# sourceMappingURL=game.js.map