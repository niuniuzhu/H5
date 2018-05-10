var Game;
(function (Game) {
    class GameMain {
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
            Shared.Defs.Init(json);
            this.LoadUIRes();
        }
        LoadUIRes() {
            console.log("loading res...");
            let res = ["global", "battle"];
            let urls = [];
            let i = 0;
            for (let u of res) {
                urls[i++] = { url: "res/ui/" + u + "@atlas0.png", type: Laya.Loader.IMAGE };
                urls[i++] = { url: "res/ui/" + u + ".fui", type: Laya.Loader.BUFFER };
            }
            Laya.loader.load(urls, Laya.Handler.create(this, this.OnUIResLoadComplete));
        }
        OnUIResLoadComplete() {
            this.StartGame();
        }
        StartGame() {
            console.log("start game...");
            View.UI.UIManager.Init(new RC.Numerics.Vec2(600, 800));
            fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnResize);
            Laya.timer.frameLoop(1, this, this.Update);
            let param = new Shared.Model.BattleParams();
            param.framesPerKeyFrame = 4;
            param.frameRate = 20;
            param.uid = "user";
            param.id = "m0";
            param.rndSeed = RC.Utils.Timer.utcTime;
            let building = new Shared.Model.Building();
            building.uid = "user";
            building.id = "b0";
            param.buildings = [building];
            View.UI.UIManager.EnterBattle(param);
        }
        Update() {
            let dt = Laya.timer.delta;
            View.UI.UIManager.Update(dt);
        }
        OnResize(e) {
            View.UI.UIManager.OnResize(e);
        }
    }
    Game.GameMain = GameMain;
})(Game || (Game = {}));
var Shared;
(function (Shared) {
    let Attr;
    (function (Attr) {
        Attr[Attr["Undefine"] = 0] = "Undefine";
        Attr[Attr["Id"] = 2] = "Id";
        Attr[Attr["Name"] = 3] = "Name";
        Attr[Attr["Model"] = 4] = "Model";
        Attr[Attr["Bounds"] = 5] = "Bounds";
        Attr[Attr["Position"] = 6] = "Position";
        Attr[Attr["Direction"] = 7] = "Direction";
        Attr[Attr["Uid"] = 50] = "Uid";
        Attr[Attr["Team"] = 51] = "Team";
    })(Attr = Shared.Attr || (Shared.Attr = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    class Defs {
        static Init(json) {
            Defs._defs = json;
        }
        static GetUser() {
            let ht = RC.Utils.Hashtable.GetMap(Defs._defs, "user");
            return ht;
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
    }
    Shared.Defs = Defs;
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
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
    Shared.GPool = GPool;
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    class GPoolObject {
        get rid() { return this._rid; }
        Dispose() {
            this.InternalDispose();
        }
    }
    Shared.GPoolObject = GPoolObject;
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
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
    Shared.TileBase = TileBase;
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    class UpdateContext {
        constructor() {
            this.deltaTime = 0;
            this.time = 0;
            this.frame = 0;
        }
    }
    Shared.UpdateContext = UpdateContext;
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
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
    Shared.Utils = Utils;
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var Event;
    (function (Event) {
        class BaseEvent {
            get type() {
                return this.__type;
            }
            set _type(value) {
                this.__type = value;
            }
            BeginInvoke() {
                Event.EventCenter.BeginInvoke(this);
            }
            Invoke() {
                Event.EventCenter.Invoke(this);
            }
        }
        Event.BaseEvent = BaseEvent;
    })(Event = Shared.Event || (Shared.Event = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var Event;
    (function (Event) {
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
        Event.EventCenter = EventCenter;
    })(Event = Shared.Event || (Shared.Event = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var Event;
    (function (Event) {
        class SyncEvent extends Event.BaseEvent {
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
        Event.SyncEvent = SyncEvent;
    })(Event = Shared.Event || (Shared.Event = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var Event;
    (function (Event) {
        class UIEvent extends Event.BaseEvent {
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
        }
        UIEvent.WIN = 10010;
        UIEvent.ENTITY_CREATED = 10020;
        UIEvent.ENTITY_DESTROIED = 10021;
        UIEvent.ENTITY_ATTR_CHANGED = 10023;
        UIEvent.USE_SKILL = 10030;
        UIEvent.START_LAYOUT = 10050;
        UIEvent.END_LAYOUT = 10051;
        UIEvent.POOL = new RC.Collections.Stack();
        Event.UIEvent = UIEvent;
    })(Event = Shared.Event || (Shared.Event = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var Model;
    (function (Model) {
        class EntityData {
            constructor(id) {
                this.id = id;
                let def = Shared.Defs.GetEntity(this.id);
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
        Model.EntityData = EntityData;
        class Level {
            constructor(lvl) {
                this.mine = lvl["mine"];
                this.energy = lvl["energy"];
                this.power = lvl["power"];
                this.atk = lvl["atk"];
                this.def = lvl["def"];
            }
        }
        Model.Level = Level;
    })(Model = Shared.Model || (Shared.Model = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var Model;
    (function (Model) {
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
        Model.BattleParams = BattleParams;
        class Building {
            constructor() {
                this.id = "";
                this.uid = "";
            }
        }
        Model.Building = Building;
        class EntityParam {
        }
        Model.EntityParam = EntityParam;
    })(Model = Shared.Model || (Shared.Model = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var Model;
    (function (Model) {
        class MapData {
            constructor(id) {
                this.id = id;
                let def = Shared.Defs.GetMap(this.id);
                this.name = RC.Utils.Hashtable.GetString(def, "name");
                this.model = RC.Utils.Hashtable.GetString(def, "model");
                this.tileSlope = RC.Utils.Hashtable.GetNumber(def, "tile_slope");
                this.tileAspect = RC.Utils.Hashtable.GetNumber(def, "tile_aspect");
                this.tileRatio = RC.Utils.Hashtable.GetNumber(def, "tile_ratio");
                this.size = RC.Utils.Hashtable.GetVec2(def, "size");
            }
        }
        Model.MapData = MapData;
    })(Model = Shared.Model || (Shared.Model = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var Model;
    (function (Model) {
        class ModelFactory {
            static GerUserData() {
                if (this.USER_DATA != null)
                    return this.USER_DATA;
                this.USER_DATA = new Model.UserData();
                return this.USER_DATA;
            }
            static GetMapData(id) {
                let data = this.MAP_DATA.getValue(id);
                if (data != null)
                    return data;
                data = new Model.MapData(id);
                this.MAP_DATA.setValue(id, data);
                return data;
            }
            static GetEntityData(id) {
                let data = this.ENTITY_DATA.getValue(id);
                if (data != null)
                    return data;
                data = new Model.EntityData(id);
                this.ENTITY_DATA.setValue(id, data);
                return data;
            }
        }
        ModelFactory.MAP_DATA = new RC.Collections.Dictionary();
        ModelFactory.ENTITY_DATA = new RC.Collections.Dictionary();
        Model.ModelFactory = ModelFactory;
    })(Model = Shared.Model || (Shared.Model = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var Model;
    (function (Model) {
        class UserData {
            constructor() {
                let def = Shared.Defs.GetUser();
                this.mine = RC.Utils.Hashtable.GetNumber(def, "mine");
                this.energy = RC.Utils.Hashtable.GetNumber(def, "energy");
            }
        }
        Model.UserData = UserData;
    })(Model = Shared.Model || (Shared.Model = {}));
})(Shared || (Shared = {}));
var View;
(function (View) {
    class Camera {
        constructor() {
            this._position = RC.Numerics.Vec3.zero;
            this._direction = RC.Numerics.Vec3.forward;
            this._seekerPos = this._position.Clone();
            this._seekerDir = this._direction.Clone();
            this._restriMin = RC.Numerics.Vec3.zero;
            this._restriMax = new RC.Numerics.Vec3(RC.Numerics.MathUtils.MAX_VALUE, RC.Numerics.MathUtils.MAX_VALUE, RC.Numerics.MathUtils.MAX_VALUE);
            this._localToWorldMat = RC.Numerics.Mat4.FromTRS(this._position, RC.Numerics.Quat.Euler(new RC.Numerics.Vec3(90, 0, 0)), new RC.Numerics.Vec3(1, -1, 1));
            this._worldToLocalMat = RC.Numerics.Mat4.NonhomogeneousInvert(this._localToWorldMat);
        }
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
    View.Camera = Camera;
})(View || (View = {}));
var View;
(function (View) {
    class CEntity extends Shared.GPoolObject {
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
            this._data = Shared.Model.ModelFactory.GetEntityData(Shared.Utils.GetIDFromRID(this.rid));
            this.position = param.position;
            this._graphic = this._owner.graphicManager.CreateGraphic(View.EntityGraphic);
            this._graphic.Load(this._data.model);
            this._graphic.position = this.position;
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
    }
    View.CEntity = CEntity;
})(View || (View = {}));
var View;
(function (View) {
    class CBuilding extends View.CEntity {
        constructor() {
            super();
            this._occupies = [];
        }
        get tilePoint() { return this._tilePoint.Clone(); }
        set tilePoint(value) { this._tilePoint = value.Clone(); }
        get occupies() { return this._occupies; }
        set occupies(value) {
            this._occupies.splice(0);
            for (let key of value) {
                this._occupies.push(key);
            }
        }
        get lvl() { return this._lvl; }
        get mine() { return this._data.lvl[this.lvl].mine; }
        get energy() { return this._data.lvl[this.lvl].energy; }
        get power() { return this._data.lvl[this.lvl].power; }
        get atk() { return this._data.lvl[this.lvl].atk; }
        get def() { return this._data.lvl[this.lvl].def; }
        OnCreated(owner, param) {
            super.OnCreated(owner, param);
            this._lvl = 0;
        }
        SnapToTile() {
            this._tilePoint = this._owner.tile.WorldToLocal(this._position);
            this.position = this._owner.tile.LocalToWorld(this._tilePoint);
        }
        ContainsPoint(tileSpaceTouchPoint) {
            let tileSpacePos = this._owner.tile.WorldToLocal(this._position);
            let minX = tileSpacePos.x - this._data.footprint.x + 1;
            let maxX = tileSpacePos.x;
            let minZ = tileSpacePos.z;
            let maxZ = minZ + this._data.footprint.z - 1;
            if (tileSpaceTouchPoint.x < minX ||
                tileSpaceTouchPoint.z < minZ ||
                tileSpaceTouchPoint.x > maxX ||
                tileSpaceTouchPoint.z > maxZ)
                return false;
            return true;
        }
    }
    View.CBuilding = CBuilding;
})(View || (View = {}));
var View;
(function (View) {
    class CEntityManager {
        constructor(owner) {
            this._owner = owner;
            this._gPool = new Shared.GPool();
            this._entities = [];
            this._idToEntity = new RC.Collections.Dictionary();
            this._typeToEntity = new RC.Collections.Dictionary();
            this._typeToEntity.setValue(View.CBuilding, []);
            this._typeToEntity.setValue(View.EditingBuilding, []);
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
            return this._typeToEntity.getValue(View.CBuilding);
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
    View.CEntityManager = CEntityManager;
})(View || (View = {}));
var View;
(function (View) {
    class CTile extends Shared.TileBase {
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
    View.CTile = CTile;
})(View || (View = {}));
var View;
(function (View) {
    class CUser {
        static get mine() {
            return Shared.Model.ModelFactory.GerUserData().mine + CUser.G_MINE + CUser.B_MINE;
        }
        static get energy() {
            return Shared.Model.ModelFactory.GerUserData().energy + CUser.G_ENERGY + CUser.B_ENERGY;
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
        static CalcBuildingContribution(buildings) {
            CUser.B_POWER = 0;
            CUser.B_ATK = 0;
            CUser.B_DEF = 0;
            CUser.B_MINE = 0;
            CUser.B_ENERGY = 0;
            for (let building of buildings) {
                CUser.B_POWER += building.power;
                CUser.B_ATK += building.atk;
                CUser.B_DEF += building.def;
                CUser.B_MINE += building.mine;
                CUser.B_ENERGY += building.energy;
            }
        }
    }
    CUser.B_ATK = 0;
    CUser.B_DEF = 0;
    CUser.B_POWER = 0;
    CUser.B_MINE = 0;
    CUser.B_ENERGY = 0;
    CUser.G_MINE = 0;
    CUser.G_ENERGY = 0;
    View.CUser = CUser;
})(View || (View = {}));
var View;
(function (View) {
    class EditingBuilding extends View.CBuilding {
        constructor() {
            super();
        }
        OnRemoveFromBattle() {
            super.OnRemoveFromBattle();
            this._srcBuilding = null;
        }
        Steup(srcBuilding) {
            this._srcBuilding = srcBuilding;
            this._srcBuilding.graphic.visible = false;
            this.tilePoint = this._srcBuilding.tilePoint;
            this.position = this._srcBuilding.position;
            this._graphic.alpha = 0.6;
            this._owner.tile.RemoveBuilding(this._srcBuilding);
        }
        Apply() {
            if (this._owner.tile.CanPlace(this)) {
                this._srcBuilding.tilePoint = this._tilePoint;
                this._srcBuilding.graphic.visible = true;
                this._srcBuilding.position = this._position;
                this._owner.tile.PlaceBuilding(this._srcBuilding);
                this.MarkToDestroy();
                return true;
            }
            return false;
        }
        Cancel() {
            this._srcBuilding.graphic.visible = true;
            this._owner.tile.PlaceBuilding(this._srcBuilding);
            this.MarkToDestroy();
        }
    }
    View.EditingBuilding = EditingBuilding;
})(View || (View = {}));
var View;
(function (View) {
    class Graphic {
        constructor(manager) {
            this._manager = manager;
            this._root = new fairygui.GComponent();
            this._manager.root.addChild(this._root);
            this._position = RC.Numerics.Vec3.zero;
            this.UpdatePosition();
        }
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
        Dispose() {
            this._root.dispose();
        }
        UpdatePosition() {
            let localPos = this._manager.battle.camera.WorldToScreen(this._position);
            this._root.setXY(localPos.x, localPos.y);
        }
    }
    View.Graphic = Graphic;
})(View || (View = {}));
var View;
(function (View) {
    class EntityGraphic extends View.Graphic {
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
        }
    }
    View.EntityGraphic = EntityGraphic;
})(View || (View = {}));
var View;
(function (View) {
    class GraphicManager {
        constructor(owner) {
            this._owner = owner;
            this._root = new fairygui.GComponent();
            fairygui.GRoot.inst.addChild(this._root);
            this._graphics = [];
        }
        get battle() { return this._owner; }
        get root() { return this._root; }
        set root(value) { this._root = value; }
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
    }
    View.GraphicManager = GraphicManager;
})(View || (View = {}));
var View;
(function (View) {
    class Home {
        constructor(param) {
            this._frame = 0;
            this._deltaTime = 0;
            this._time = 0;
            this._data = Shared.Model.ModelFactory.GetMapData(Shared.Utils.GetIDFromRID(param.id));
            this._entityManager = new View.CEntityManager(this);
            this._graphicManager = new View.GraphicManager(this);
            this._context = new Shared.UpdateContext();
            this._camera = new View.Camera();
            this._camera.seekerPos = new RC.Numerics.Vec3((this._data.size.x - fairygui.GRoot.inst.width) * 0.5, 0, (this._data.size.y - fairygui.GRoot.inst.height) * -0.5);
            this._camera.position = this._camera.seekerPos;
            this._camera.cameraTRSChangedHandler = this._graphicManager.OnCameraTRSChanged.bind(this._graphicManager);
            this._graphic = this._graphicManager.CreateGraphic(View.MapGraphic);
            this._graphic.Load(this._data.model);
            this._tile = new View.CTile(this._data.tileSlope, this._data.tileAspect, this._data.tileRatio);
            this._input = new View.Input(this);
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
            let rid = Shared.Utils.MakeRIDFromID(id);
            let param = new Shared.Model.EntityParam();
            param.rid = rid;
            param.position = position;
            let entity = this._entityManager.Create(View.CBuilding, param);
            return entity;
        }
        CreateEditingBuilding(id, position = RC.Numerics.Vec3.zero) {
            let rid = Shared.Utils.MakeRIDFromID(id);
            let param = new Shared.Model.EntityParam();
            param.rid = rid;
            param.position = position;
            let entity = this._entityManager.Create(View.EditingBuilding, param);
            return entity;
        }
        StartLayout() {
            Shared.Event.UIEvent.StartLayout();
        }
        EndLayout() {
            Shared.Event.UIEvent.EndLayout();
        }
    }
    View.Home = Home;
})(View || (View = {}));
var View;
(function (View) {
    class InputIdleState {
        constructor(owner) {
            this._owner = owner;
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
                    this._owner.ChangeState(InputStateType.Layout, this._touchingBuilding, new RC.Numerics.Vec3(Laya.stage.mouseX, Laya.stage.mouseY, 0));
                    this.OnTouchEnd(null);
                }
            }
        }
        OnTouchBegin(evt) {
            fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
            fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
            this._owner.battle.camera.BeginMove(new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY));
            let worldPoint = this._owner.battle.camera.ScreenToWorld(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
            let building = this._owner.battle.tile.GetBuilding(worldPoint);
            if (building != null) {
                this._touchingBuilding = building;
                this._touchTime = 0;
            }
        }
        OnTouchMove(evt) {
            this._touchingBuilding = null;
            let point = new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY);
            this._owner.battle.camera.Move(point);
        }
        OnTouchEnd(evt) {
            this._touchingBuilding = null;
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
        }
    }
    InputIdleState.TOUCH_TIME_TO_EDIT_MODE = 300;
    View.InputIdleState = InputIdleState;
    class InputLayoutState {
        constructor(owner) {
            this._owner = owner;
            this._startDragPoint = RC.Numerics.Vec3.zero;
            this._startDragPosition = RC.Numerics.Vec3.zero;
        }
        Enter(param) {
            this._owner.battle.StartLayout();
            this._owner.battle.graphic.sprite.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
            this._dragingBuilding = false;
            this._touchMovied = false;
            let srcBuilding = param[0];
            this._editingBuilding = this._owner.battle.CreateEditingBuilding(srcBuilding.id);
            this._editingBuilding.Steup(srcBuilding);
            let touchPoint = param[1];
            if (touchPoint) {
                this.TouchBegin(touchPoint);
            }
        }
        Exit() {
            this._owner.battle.graphic.sprite.displayObject.off(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
            this._owner.battle.EndLayout();
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
    View.InputLayoutState = InputLayoutState;
    let InputStateType;
    (function (InputStateType) {
        InputStateType[InputStateType["Idle"] = 0] = "Idle";
        InputStateType[InputStateType["Layout"] = 1] = "Layout";
    })(InputStateType = View.InputStateType || (View.InputStateType = {}));
    class Input {
        constructor(owner) {
            this._owner = owner;
            this._states = [
                new InputIdleState(this),
                new InputLayoutState(this)
            ];
            this.ChangeState(InputStateType.Idle);
        }
        get battle() { return this._owner; }
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
    View.Input = Input;
})(View || (View = {}));
var View;
(function (View) {
    class MapGraphic extends View.Graphic {
        constructor(manager) {
            super(manager);
        }
        get sprite() { return this._sprite; }
        Dispose() {
            this._sprite.dispose();
            super.Dispose();
        }
        Load(id) {
            this._sprite = fairygui.UIPackage.createObject("global", id).asCom;
            this._root.addChild(this._sprite);
        }
    }
    View.MapGraphic = MapGraphic;
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class FightPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c2").asCom;
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
        }
        UI.FightPanel = FightPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
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
                tansuoBtn.onClick(this, (e) => { this._owner.controller.selectedIndex = 1; });
                let juseBtn = this._root.getChild("juse_btn");
                juseBtn.onClick(this, (e) => { this._owner.controller.selectedIndex = 3; });
                let renwuBtn = this._root.getChild("renwu_btn");
                renwuBtn.onClick(this, (e) => { this._owner.controller.selectedIndex = 4; });
                let xiaoxiBtn = this._root.getChild("xiaoxi_btn");
                xiaoxiBtn.onClick(this, (e) => { this._owner.controller.selectedIndex = 5; });
                let jiansheBtn = this._root.getChild("jianshe_btn");
                jiansheBtn.onClick(this, (e) => {
                    if (this._buildPanel == null) {
                        this._buildPanel = fairygui.UIPackage.createObject("battle", "buildPanel").asCom;
                        this._buildPanel.getChild("list").on(fairygui.Events.CLICK_ITEM, this, this.OnBuildItemClick);
                    }
                    fairygui.GRoot.inst.togglePopup(this._buildPanel, fairygui.GRoot.inst);
                    this._buildPanel.center();
                });
                Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.START_LAYOUT, this.HandleStartLayout.bind(this));
                Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.END_LAYOUT, this.HandleEndLayout.bind(this));
                this._home = new View.Home(param);
                this._home.SetGraphicRoot(this._root.getChild("n37").asCom);
            }
            Dispose() {
                Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.START_LAYOUT, this.HandleStartLayout.bind(this));
                Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.END_LAYOUT, this.HandleEndLayout.bind(this));
                if (this._buildPanel != null) {
                    this._buildPanel.dispose();
                    this._buildPanel = null;
                }
                this._home.Dispose();
            }
            Enter() {
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
                let building = this._home.CreateBuilding(bid, worldPoint);
                building.SnapToTile();
                if (!this._home.tile.CanPlace(building)) {
                    this._home.input.ChangeState(View.InputStateType.Layout, building);
                }
                else {
                    this._home.tile.PlaceBuilding(building);
                    this.UpdateBuildings();
                }
                fairygui.GRoot.inst.hidePopup();
            }
            HandleStartLayout(e) {
                this._root.getController("c1").selectedIndex = 1;
                this._root.getChild("jianshe_btn").asCom.touchable = false;
            }
            HandleEndLayout(e) {
                this._root.getController("c1").selectedIndex = 0;
                this._root.getChild("jianshe_btn").asCom.touchable = true;
                this.UpdateBuildings();
            }
            UpdateBuildings() {
                View.CUser.CalcBuildingContribution(this._home.entityManager.GetBuildings());
                this.UpdateResources();
            }
            UpdateResources() {
                this._mine.text = View.CUser.mine.toString();
                this._energy.text = View.CUser.energy.toString();
                this._power.text = View.CUser.power.toString();
                this._atk.text = View.CUser.atk.toString();
                this._def.text = View.CUser.def.toString();
            }
            SetImage(id) {
                this._root.getChild("juse_btn").asCom.getChild("n1").asLoader.url = fairygui.UIPackage.getItemURL("battle", id);
            }
            SetName(name) {
                this._root.getChild("juse_btn").asCom.getChild("n0").asTextField.text = name;
            }
        }
        UI.HomePanel = HomePanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class MsgPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c5").asCom;
                let backBtn = this._root.getChild("back_btn");
                backBtn.onClick(this, (e) => { this._owner.controller.selectedIndex = 0; });
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
        }
        UI.MsgPanel = MsgPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
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
                backBtn.onClick(this, (e) => { this._owner.controller.selectedIndex = 0; });
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
        UI.RolePanel = RolePanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class SearchPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c1").asCom;
                let searchBtn = this._root.getChild("search_btn");
                searchBtn.onClick(this, (e) => { this._owner.controller.selectedIndex = 2; });
                let backBtn = this._root.getChild("back_btn");
                backBtn.onClick(this, (e) => { this._owner.controller.selectedIndex = 0; });
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
        }
        UI.SearchPanel = SearchPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class TaskPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c4").asCom;
                let backBtn = this._root.getChild("back_btn");
                backBtn.onClick(this, (e) => { this._owner.controller.selectedIndex = 0; });
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
        }
        UI.TaskPanel = TaskPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class UILogin {
            constructor() {
            }
            Dispose() {
            }
            Enter(param) {
            }
            Leave() {
            }
            Update(deltaTime) {
            }
            OnResize(e) {
            }
        }
        UI.UILogin = UILogin;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class UIMain {
            constructor() {
                fairygui.UIPackage.addPackage("res/ui/battle");
                this._panels = [];
            }
            get root() { return this._root; }
            get homePanel() { return this._homePanel; }
            get searchPanel() { return this._searchPanel; }
            get fightPanel() { return this._fightPanel; }
            get rolePanel() { return this._rolePanel; }
            set panelIndex(value) {
                if (this._controller.selectedIndex == value)
                    return;
                this._panels[value].Exit();
                this._panels[value].Enter();
                this._controller.selectedIndex = value;
            }
            Dispose() {
            }
            Enter(param) {
                this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
                this._root.displayObject.name = "Battle";
                this._root.opaque = false;
                this._root.getChild("c0").asCom.opaque = false;
                fairygui.GRoot.inst.addChild(this._root);
                this._root.width = fairygui.GRoot.inst.width;
                this._root.height = fairygui.GRoot.inst.height;
                this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
                this._controller = this._root.getController("c1");
                this._homePanel = new UI.HomePanel(this, param);
                this._searchPanel = new UI.SearchPanel(this);
                this._fightPanel = new UI.FightPanel(this);
                this._rolePanel = new UI.RolePanel(this);
                this._taskPanel = new UI.TaskPanel(this);
                this._msgPanel = new UI.MsgPanel(this);
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
        UI.UIMain = UIMain;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class UIManager {
            static get login() { return this._login; }
            static get battle() { return this._main; }
            static Init(resolution) {
                Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
                fairygui.UIPackage.addPackage("res/ui/global");
                fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "qtm011");
                fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "qtm011");
                fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");
                this._login = new UI.UILogin();
                this._main = new UI.UIMain();
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
        UI.UIManager = UIManager;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
//# sourceMappingURL=game.js.map