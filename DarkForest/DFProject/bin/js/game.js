var Game;
(function (Game) {
    class BattleManager {
        static Init(param) {
            this._init = true;
            this._elapsedSinceLastLogicUpdate = 0;
            this._framesPerKeyFrame = param.framesPerKeyFrame;
            this._frameRate = param.frameRate;
            this._nextKeyFrame = this._framesPerKeyFrame;
            this.cBattle = new View.CBattle(param);
            this.lBattle = new Logic.Battle(param);
        }
        static Dispose() {
            if (!this._init)
                return;
            this._init = false;
            this._elapsed = 0;
            this._elapsedSinceLastLogicUpdate = 0;
            this.lBattle.Dispose();
            Shared.Event.EventCenter.Sync();
            this.cBattle.Dispose();
            this.lBattle = null;
            this.cBattle = null;
        }
        static Update(deltaTime) {
            if (!this._init)
                return;
            Shared.Event.EventCenter.Sync();
            this.cBattle.Update(deltaTime);
            this.UpdateLogic(deltaTime);
        }
        static OnResize(e) {
            if (!this._init)
                return;
            this.cBattle.OnResize(e);
        }
        static UpdateLogic(deltaTime) {
            let millisecondsPreFrame = 1000 / this._frameRate;
            this._elapsed += deltaTime;
            while (this._elapsed >= millisecondsPreFrame) {
                this.lBattle.Update(millisecondsPreFrame);
                this._elapsed -= millisecondsPreFrame;
            }
        }
    }
    BattleManager.cBattle = null;
    BattleManager.lBattle = null;
    BattleManager._init = false;
    BattleManager._elapsedSinceLastLogicUpdate = 0;
    BattleManager._elapsed = 0;
    BattleManager._frameRate = 0;
    BattleManager._framesPerKeyFrame = 0;
    BattleManager._nextKeyFrame = 0;
    Game.BattleManager = BattleManager;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class GameMain {
        constructor() {
            Laya.init(720, 1280);
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
            Laya.stage.alignH = Laya.Stage.ALIGN_LEFT;
            Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
            Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
            laya.utils.Stat.show(0, 0);
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
            Game.BattleManager.Update(dt);
        }
        OnResize(e) {
            View.UI.UIManager.OnResize(e);
            Game.BattleManager.OnResize(e);
        }
    }
    Game.GameMain = GameMain;
})(Game || (Game = {}));
var Logic;
(function (Logic) {
    class Battle {
        constructor(param) {
            this._frame = 0;
            this._deltaTime = 0;
            this._time = 0;
            this._data = Shared.Model.ModelFactory.GetMapData(Shared.Utils.GetIDFromRID(param.id));
            this._random = new RC.Utils.ConsistentRandom(param.rndSeed);
            this._context = new Shared.UpdateContext();
            this._entityManager = new Logic.EntityManager(this);
            this._tile = new Logic.Tile(this._data.tileSlope, this._data.tileAspect, this._data.tileRatio);
            Shared.Event.SyncEvent.CreateBattle(param.id);
        }
        get frame() {
            return this._frame;
        }
        get deltaTime() {
            return this._deltaTime;
        }
        get time() {
            return this._time;
        }
        Dispose() {
            this._entityManager.Dispose();
            Shared.Event.SyncEvent.DestroyBattle();
        }
        Update(deltaTime) {
            ++this._frame;
            this._deltaTime = deltaTime;
            this._time += this.deltaTime;
            this._context.deltaTime = this.deltaTime;
            this._context.time = this.time;
            this._context.frame = this.frame;
            this._entityManager.Update(this._context);
        }
        CreateBuildings(param) {
            let buildings = param.buildings;
            for (let i = 0; i < buildings.length; ++i) {
                let building = buildings[i];
                let entityParam = new Shared.Model.EntityParam();
                entityParam.rid = Shared.Utils.MakeRIDFromID(building.id);
                entityParam.uid = param.uid;
                entityParam.position = new RC.Numerics.Vec3();
                entityParam.direction = new RC.Numerics.Vec3(1, 0, 0);
                let entity = this._entityManager.Create(Logic.Building, entityParam);
            }
        }
    }
    Logic.Battle = Battle;
})(Logic || (Logic = {}));
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
var Logic;
(function (Logic) {
    class Entity extends Shared.GPoolObject {
        constructor() {
            super();
            this._battle = null;
            this._markToDestroy = false;
            this._data = null;
            this._position = RC.Numerics.Vec3.zero;
            this._direction = RC.Numerics.Vec3.forward;
        }
        get position() { return this._position.Clone(); }
        set position(value) {
            if (this._position.EqualsTo(value))
                return;
            this._position = value.Clone();
            this.OnPositionChanged();
        }
        get direction() { return this._direction.Clone(); }
        set direction(value) {
            if (this._direction.EqualsTo(value))
                return;
            this._direction = value.Clone();
            this.OnDirectionChanged();
        }
        get battle() { return this._battle; }
        get markToDestroy() { return this._markToDestroy; }
        InternalDispose() {
        }
        OnAddedToBattle(battle, param) {
            this._battle = battle;
            this._rid = param.rid;
            this._data = Shared.Model.ModelFactory.GetEntityData(Shared.Utils.GetIDFromRID(this.rid));
            this.position = param.position.Clone();
            this.direction = param.direction.Clone();
            Shared.Event.SyncEvent.EntityAddedToBattle(this.rid);
            this.InternalOnAddedToBattle(param);
            this.OnSyncState();
        }
        OnRemoveFromBattle() {
            Shared.Event.SyncEvent.EntityRemoveFromBattle(this.rid);
            this.InternalOnRemoveFromBattle();
            this._markToDestroy = false;
            this._battle = null;
            this._data = null;
        }
        InternalOnAddedToBattle(param) {
        }
        InternalOnRemoveFromBattle() {
        }
        OnPositionChanged() {
        }
        OnDirectionChanged() {
        }
        OnGenericUpdate(context) {
        }
        OnSyncState() {
            let e = Shared.Event.SyncEvent.BeginSyncProps(this.rid);
            Shared.Event.SyncEvent.AddSyncProp(e, Shared.Attr.Position, this.position);
            Shared.Event.SyncEvent.AddSyncProp(e, Shared.Attr.Direction, this.direction);
            Shared.Event.SyncEvent.EndSyncProps(e);
        }
        MarkToDestroy() {
            this._markToDestroy = true;
        }
        PointToWorld(point) {
            return RC.Numerics.Vec3.Add(this.position, RC.Numerics.Quat.FromToRotation(RC.Numerics.Vec3.forward, this.direction).Transform(point));
        }
        PointToLocal(point) {
            let q = RC.Numerics.Quat.Invert(RC.Numerics.Quat.FromToRotation(RC.Numerics.Vec3.forward, this.direction));
            return q.Transform(RC.Numerics.Vec3.Sub(point, this.position));
        }
        VectorToWorld(point) {
            return RC.Numerics.Quat.FromToRotation(RC.Numerics.Vec3.forward, this.direction).Transform(point);
        }
        VectorToLocal(point) {
            let q = RC.Numerics.Quat.Invert(RC.Numerics.Quat.FromToRotation(RC.Numerics.Vec3.forward, this.direction));
            return q.Transform(point);
        }
    }
    Logic.Entity = Entity;
})(Logic || (Logic = {}));
var Logic;
(function (Logic) {
    class Building extends Logic.Entity {
        constructor() {
            super();
        }
    }
    Logic.Building = Building;
})(Logic || (Logic = {}));
var Logic;
(function (Logic) {
    class EntityManager {
        constructor(battle) {
            this._battle = battle;
            this._gPool = new Shared.GPool();
            this._entities = [];
            this._idToEntity = new RC.Collections.Dictionary();
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
                this._gPool.Push(entity);
                --i;
                --count;
            }
        }
        Create(c, param) {
            let entity = this._gPool.Pop(c);
            this._idToEntity.setValue(param.rid, entity);
            this._entities.push(entity);
            Shared.Event.SyncEvent.CreateEntity(entity.constructor.name, param);
            entity.OnAddedToBattle(this._battle, param);
            return entity;
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
            this.GenericUpdate(context);
            this.UpdateState(context);
            this.SyncState();
            this.DestroyEnties();
        }
        GenericUpdate(context) {
            this._entities.forEach((entity) => {
                entity.OnGenericUpdate(context);
            });
        }
        UpdateState(context) {
        }
        SyncState() {
            this._entities.forEach((entity) => {
                entity.OnSyncState();
            });
        }
    }
    Logic.EntityManager = EntityManager;
})(Logic || (Logic = {}));
var Shared;
(function (Shared) {
    class TileBase {
        constructor(slope, aspect, ratio) {
            this._occupied = new Set();
            this._localToWorldMat = RC.Numerics.Mat4.FromTRS(RC.Numerics.Vec3.zero, RC.Numerics.Quat.Euler(new RC.Numerics.Vec3(0, slope, 0)), new RC.Numerics.Vec3(1, 1, 1));
            this._localToWorldMat.Mul(RC.Numerics.Mat4.FromScale(new RC.Numerics.Vec3(ratio, 1, aspect * ratio)));
            this._worldToLocalMat = RC.Numerics.Mat4.NonhomogeneousInvert(this._localToWorldMat);
        }
        WorldToTile(point) {
            let v = this._worldToLocalMat.TransformPoint(point);
            v.x = RC.Numerics.MathUtils.Floor(v.x);
            v.y = RC.Numerics.MathUtils.Floor(v.y);
            v.z = RC.Numerics.MathUtils.Floor(v.z);
            return v;
        }
        TileToWorld(point) {
            return this._localToWorldMat.TransformPoint(point);
        }
        CheckOccupies(localCenter, footprint) {
            let topLeftX = RC.Numerics.MathUtils.Floor(localCenter.x - footprint.x);
            let topLeftY = RC.Numerics.MathUtils.Floor(localCenter.z - footprint.y);
            for (let x = 0; x < footprint.x; ++x) {
                for (let y = 0; y < footprint.y; ++y) {
                    if (!this.GetOccupy(new RC.Numerics.Vec3(x + topLeftX, y + topLeftY)))
                        return false;
                }
            }
            return true;
        }
        SetOccupies(localCenter, footprint) {
            let topLeftX = RC.Numerics.MathUtils.Floor(localCenter.x - footprint.x);
            let topLeftY = RC.Numerics.MathUtils.Floor(localCenter.z - footprint.y);
            for (let x = 0; x < footprint.x; ++x) {
                for (let y = 0; y < footprint.y; ++y) {
                    this.SetOccupy(new RC.Numerics.Vec3(x + topLeftX, y + topLeftY));
                }
            }
        }
        SetOccupy(localPoint) {
            this._occupied.add(this.EncodePoint(localPoint.x, localPoint.z));
        }
        GetOccupy(localPoint) {
            this._occupied.has(this.EncodePoint(localPoint.x, localPoint.z));
        }
        EncodePoint(x, z) {
            let value = x << 16;
            let sign = RC.Numerics.MathUtils.Sign(z);
            if (sign < 0)
                value |= 1 << 15;
            value |= z;
            return value;
        }
    }
    Shared.TileBase = TileBase;
})(Shared || (Shared = {}));
var Logic;
(function (Logic) {
    class Tile extends Shared.TileBase {
    }
    Logic.Tile = Tile;
})(Logic || (Logic = {}));
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
                e.BeginInvoke();
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
        }
        UIEvent.WIN = 10010;
        UIEvent.ENTITY_CREATED = 10020;
        UIEvent.ENTITY_DESTROIED = 10021;
        UIEvent.ENTITY_ATTR_CHANGED = 10023;
        UIEvent.USE_SKILL = 10030;
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
                this.footprint = RC.Utils.Hashtable.GetVec2(def, "footprint");
            }
        }
        Model.EntityData = EntityData;
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
            static GetMapData(id) {
                let data = this.MAP_DATA.getValue(id);
                if (data != null && data != undefined)
                    return data;
                data = new Model.MapData(id);
                this.MAP_DATA.setValue(id, data);
                return data;
            }
            static GetEntityData(id) {
                let data = this.ENTITY_DATA.getValue(id);
                if (data != null && data != undefined)
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
        BeginMove(pointerStart) {
            this._lastPointerPos = pointerStart.Clone();
        }
        Move(pointerCurrent) {
            let delta = RC.Numerics.Vec3.Sub(pointerCurrent, this._lastPointerPos);
            this._lastPointerPos.CopyFrom(pointerCurrent);
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
    class CBattle {
        constructor(param) {
            this._frame = 0;
            this._deltaTime = 0;
            this._time = 0;
            this._uid = "";
            this._uid = param.uid;
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
            this._layoutProcessor = new View.LayoutProcessor();
            this._input = new View.Input(this);
            this.camera.UpdateRestriction(RC.Numerics.Vec3.zero, new RC.Numerics.Vec3(this._graphic.sprite.width - fairygui.GRoot.inst.width, this._graphic.sprite.height - fairygui.GRoot.inst.height, 0));
            Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.BATTLE_CREATED, this.HandleCreateBattle.bind(this));
            Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.BATTLE_DESTROIED, this.HandleDestroyBattle.bind(this));
            Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.ENTITY_CREATED, this.HandleEntityCreate.bind(this));
            Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.ENTITY_ADDED_TO_BATTLE, this.HandleEntityAddedToBattle.bind(this));
            Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.ENTITY_REMOVE_FROM_BATTLE, this.HandleEntityRemoveFromBattle.bind(this));
            Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.ENTITY_STATE_CHANGED, this.HandleEntityStateChanged.bind(this));
            Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.ENTITY_SYNC_PROPS, this.HandleEntitySyncProps.bind(this));
            Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.WIN, this.HandleWin.bind(this));
        }
        get frame() { return this._frame; }
        get deltaTime() { return this._deltaTime; }
        get time() { return this._time; }
        get graphicManager() { return this._graphicManager; }
        ;
        get camera() { return this._camera; }
        ;
        get graphic() { return this._graphic; }
        ;
        get tile() { return this._tile; }
        ;
        get layoutProcessor() { return this._layoutProcessor; }
        Dispose() {
            Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.BATTLE_CREATED, this.HandleCreateBattle.bind(this));
            Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.BATTLE_DESTROIED, this.HandleDestroyBattle.bind(this));
            Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.ENTITY_CREATED, this.HandleEntityCreate.bind(this));
            Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.ENTITY_ADDED_TO_BATTLE, this.HandleEntityAddedToBattle.bind(this));
            Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.ENTITY_REMOVE_FROM_BATTLE, this.HandleEntityRemoveFromBattle.bind(this));
            Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.ENTITY_STATE_CHANGED, this.HandleEntityStateChanged.bind(this));
            Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.ENTITY_SYNC_PROPS, this.HandleEntitySyncProps.bind(this));
            Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.WIN, this.HandleWin.bind(this));
            this._graphicManager.Dispose();
            this._entityManager.Dispose();
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
        }
        OnResize(e) {
            this.camera.UpdateRestriction(RC.Numerics.Vec3.zero, new RC.Numerics.Vec3(this._graphic.sprite.width - fairygui.GRoot.inst.width, this._graphic.sprite.height - fairygui.GRoot.inst.height, 0));
        }
        CreateBuildings(id, position = RC.Numerics.Vec3.zero, direction = RC.Numerics.Vec3.forward) {
            let rid = Shared.Utils.MakeRIDFromID(id);
            let param = new Shared.Model.EntityParam();
            param.rid = rid;
            param.position = position;
            param.direction = direction;
            let entity = this._entityManager.Create(View.CBuilding, param);
            return entity;
        }
        HandleCreateBattle(baseEvent) {
            let e = baseEvent;
        }
        HandleDestroyBattle(baseEvent) {
            this._graphicManager.DestroyGraphic(this._graphic);
        }
        HandleEntityCreate(baseEvent) {
            let e = baseEvent;
            let type = e.entityType;
            let param = e.param;
            switch (type) {
                case "Building":
                    this._entityManager.Create(View.CBuilding, param);
                    break;
            }
        }
        HandleEntityAddedToBattle(baseEvent) {
            let e = baseEvent;
            let entity = this._entityManager.GetEntity(e.targetId);
            entity.OnAddedToBattle();
            Shared.Event.UIEvent.EntityCreated(entity);
        }
        HandleEntityRemoveFromBattle(baseEvent) {
            let e = baseEvent;
            let entity = this._entityManager.GetEntity(e.targetId);
            entity.OnRemoveFromBattle();
        }
        HandleEntityStateChanged(baseEvent) {
            let e = baseEvent;
        }
        HandleEntitySyncProps(baseEvent) {
            let e = baseEvent;
            let entity = this._entityManager.GetEntity(e.targetId);
            entity.HandleSyncProps(e.attrs, e.attrValues);
        }
        HandleWin(baseEvent) {
            let e = baseEvent;
        }
    }
    View.CBattle = CBattle;
})(View || (View = {}));
var View;
(function (View) {
    class CEntity extends Shared.GPoolObject {
        constructor() {
            super();
            this._battle = null;
            this._markToDestroy = false;
            this._graphic = null;
            this._data = null;
            this._position = RC.Numerics.Vec3.zero;
            this._direction = RC.Numerics.Vec3.forward;
        }
        get position() { return this._position.Clone(); }
        set position(value) {
            if (this._position.EqualsTo(value))
                return;
            this._position = value.Clone();
            if (this._graphic != null)
                this._graphic.position = this._position;
        }
        get direction() { return this._direction.Clone(); }
        set direction(value) {
            if (this._direction.EqualsTo(value))
                return;
            this._direction = value.Clone();
            if (this._graphic != null)
                this._graphic.rotation = RC.Numerics.Quat.LookRotation(this._direction, RC.Numerics.Vec3.up);
        }
        get battle() { return this._battle; }
        get graphic() { return this._graphic; }
        get markToDestroy() { return this._markToDestroy; }
        InternalDispose() {
        }
        OnCreated(battle, param) {
            this._battle = battle;
            this._rid = param.rid;
            this._data = Shared.Model.ModelFactory.GetEntityData(Shared.Utils.GetIDFromRID(this.rid));
            this._logicPos = this._position = param.position.Clone();
            this._logicDir = this._direction = param.direction.Clone();
            this._graphic = this._battle.graphicManager.CreateGraphic(View.EntityGraphic);
            this._graphic.Load(this._data.model);
            this._graphic.position = this.position;
            this._graphic.rotation = RC.Numerics.Quat.LookRotation(this.direction, RC.Numerics.Vec3.up);
        }
        OnDestroy() {
            this._battle.graphicManager.DestroyGraphic(this._graphic);
            this._graphic = null;
            this._markToDestroy = false;
            this._battle = null;
            this._data = null;
        }
        OnAddedToBattle() {
        }
        OnRemoveFromBattle() {
            this._markToDestroy = true;
        }
        MarkToDestroy() {
            this._markToDestroy = true;
        }
        HandleSyncProps(attrs, values) {
            for (let i = 0; i < attrs.length; i++)
                this.OnAttrChanged(attrs[i], values[i]);
        }
        OnAttrChanged(attr, value) {
            switch (attr) {
                case Shared.Attr.Position:
                    this._logicPos = value;
                    break;
                case Shared.Attr.Direction:
                    this._logicDir = value;
                    break;
            }
            Shared.Event.UIEvent.EntityAttrChanged(this, attr, value);
        }
        OnUpdateState(context) {
            let dt = context.deltaTime;
            this.position = RC.Numerics.Vec3.Lerp(this._position, this._logicPos, dt * 10);
            this.direction = RC.Numerics.Vec3.Slerp(this._direction, this._logicDir, dt * 8);
        }
    }
    View.CEntity = CEntity;
})(View || (View = {}));
var View;
(function (View) {
    class CBuilding extends View.CEntity {
        constructor() {
            super();
        }
    }
    View.CBuilding = CBuilding;
})(View || (View = {}));
var View;
(function (View) {
    class CEntityManager {
        constructor(battle) {
            this._battle = battle;
            this._gPool = new Shared.GPool();
            this._entities = [];
            this._idToEntity = new RC.Collections.Dictionary();
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
                this._gPool.Push(entity);
                --i;
                --count;
            }
        }
        Create(c, param) {
            let entity = this._gPool.Pop(c);
            this._idToEntity.setValue(param.rid, entity);
            this._entities.push(entity);
            Shared.Event.SyncEvent.CreateEntity(entity.constructor.name, param);
            entity.OnCreated(this._battle, param);
            return entity;
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
        Test(point) {
            let localPoint = this.WorldToTile(point);
        }
    }
    View.CTile = CTile;
})(View || (View = {}));
var View;
(function (View) {
    class Graphic {
        constructor(manager) {
            this._manager = manager;
            this._root = new fairygui.GComponent();
            this._manager.root.addChild(this._root);
            this._position = RC.Numerics.Vec3.zero;
            this._rotation = RC.Numerics.Quat.identity;
            this.UpdatePosition();
        }
        get root() { return this._root; }
        get position() { return this._position.Clone(); }
        set position(value) {
            if (value.EqualsTo(this._position))
                return;
            this._position = value.Clone();
            this.UpdatePosition();
        }
        get rotation() { return this._rotation.Clone(); }
        set rotation(value) {
            if (value.EqualsTo(this._rotation))
                return;
            this._rotation = value.Clone();
            this.UpdateDirection();
        }
        Dispose() {
            this._root.dispose();
        }
        UpdatePosition() {
            let localPos = this._manager.battle.camera.WorldToScreen(this._position);
            this._root.setXY(localPos.x, localPos.y);
        }
        UpdateDirection() {
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
        constructor(battle) {
            this._battle = battle;
            this._root = new fairygui.GComponent();
            this._root.name = "graphic_root";
            fairygui.GRoot.inst.addChild(this._root);
            this._graphics = [];
        }
        get battle() { return this._battle; }
        get root() { return this._root; }
        Dispose() {
            let count = this._graphics.length;
            for (let i = 0; i < count; ++i) {
                let graphic = this._graphics[i];
                graphic.Dispose();
            }
            this._graphics.splice(0);
            this._root.dispose();
        }
        OnCameraTRSChanged() {
            let count = this._graphics.length;
            for (let i = 0; i < count; ++i) {
                let graphic = this._graphics[i];
                graphic.UpdatePosition();
                graphic.UpdateDirection();
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
    class InputIdleState {
        constructor(owner) {
            this._owner = owner;
        }
        Enter() {
            this._owner.battle.graphic.sprite.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
        }
        Exit() {
            this._owner.battle.graphic.sprite.displayObject.off(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
        }
        Update(context) {
        }
        OnTouchBegin(evt) {
            fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
            fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
            this._owner.battle.camera.BeginMove(new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY));
        }
        OnTouchMove(evt) {
            let point = new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY);
            this._owner.battle.camera.Move(point);
        }
        OnTouchEnd(evt) {
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
        }
    }
    View.InputIdleState = InputIdleState;
    class InputLayoutState {
        constructor(owner) {
            this._owner = owner;
        }
        Enter() {
            fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
        }
        Exit() {
            fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
        }
        Update(context) {
        }
        OnTouchMove(evt) {
            let point = this._owner.battle.camera.ScreenToWorld(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
            let p1 = this._owner.battle.tile.WorldToTile(point);
            let x = RC.Numerics.MathUtils.Floor(p1.x);
            let y = RC.Numerics.MathUtils.Floor(p1.z);
        }
    }
    View.InputLayoutState = InputLayoutState;
    let InputStateType;
    (function (InputStateType) {
        InputStateType[InputStateType["Idle"] = 0] = "Idle";
        InputStateType[InputStateType["Layout"] = 1] = "Layout";
    })(InputStateType = View.InputStateType || (View.InputStateType = {}));
    class Input {
        constructor(battle) {
            this._battle = battle;
            this._states = [
                new InputIdleState(this),
                new InputLayoutState(this)
            ];
            this.ChangeState(InputStateType.Idle);
        }
        get battle() { return this._battle; }
        ChangeState(type) {
            if (this._currentState != null)
                this._currentState.Exit();
            this._currentState = this._states[type];
            this._currentState.Enter();
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
    class LayoutProcessor {
        constructor(battle) {
            this._battle = battle;
        }
        Enter(entity) {
            this._editingItem = entity;
        }
    }
    View.LayoutProcessor = LayoutProcessor;
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
        class UIBattle {
            constructor() {
                fairygui.UIPackage.addPackage("res/ui/battle");
            }
            Dispose() {
            }
            Update(deltaTime) {
            }
            Enter(param) {
                Game.BattleManager.Init(param);
                this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
                this._root.displayObject.name = "Battle";
                this._root.opaque = false;
                this._root.getChild("c0").asCom.opaque = false;
                fairygui.GRoot.inst.addChild(this._root);
                this._root.width = fairygui.GRoot.inst.width;
                this._root.height = fairygui.GRoot.inst.height;
                this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
                this._controller = this._root.getController("c1");
                let tansuoBtn = this._root.getChild("c0").asCom.getChild("tansuo_btn");
                tansuoBtn.onClick(this, (e) => { this._controller.selectedIndex = 1; });
                let backBtn = this._root.getChild("c1").asCom.getChild("back_btn");
                backBtn.onClick(this, (e) => { this._controller.selectedIndex = 0; });
                let jiansheBtn = this._root.getChild("c0").asCom.getChild("jianshe_btn");
                jiansheBtn.onClick(this, (e) => {
                    if (this._buildPanel == null) {
                        this._buildPanel = fairygui.UIPackage.createObject("battle", "buildPanel").asCom;
                        this._buildPanel.getChild("list").on(fairygui.Events.CLICK_ITEM, this, this.OnBuildItemClick);
                    }
                    fairygui.GRoot.inst.togglePopup(this._buildPanel, fairygui.GRoot.inst);
                    this._buildPanel.center();
                });
                Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.WIN, this.HandleWin);
                Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.ENTITY_CREATED, this.HandleEntityCreated);
                Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.ENTITY_DESTROIED, this.HandleEntityDestroied);
                Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.ENTITY_ATTR_CHANGED, this.HandleEntityAttrChanged);
                Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.USE_SKILL, this.HandleUseSkill);
            }
            Leave() {
                Game.BattleManager.Dispose();
                if (this._buildPanel != null) {
                    this._buildPanel.dispose();
                    this._buildPanel = null;
                }
                this._root.dispose();
                this._root = null;
                this._controller = null;
                Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.WIN, this.HandleWin);
                Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.ENTITY_CREATED, this.HandleEntityCreated);
                Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.ENTITY_DESTROIED, this.HandleEntityDestroied);
                Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.ENTITY_ATTR_CHANGED, this.HandleEntityAttrChanged);
                Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.USE_SKILL, this.HandleUseSkill);
            }
            HandleWin(e) {
            }
            HandleEntityCreated(e) {
                let uiEvent = e;
            }
            HandleEntityDestroied(e) {
                let uiEvent = e;
            }
            HandleEntityAttrChanged(e) {
                let uiEvent = e;
            }
            HandleUseSkill(e) {
            }
            OnBuildItemClick(sender, e) {
                let bid = sender.asCom.name;
                let position = Game.BattleManager.cBattle.camera.ScreenToWorld(new RC.Numerics.Vec3(e.stageX, e.stageY));
                let building = Game.BattleManager.cBattle.CreateBuildings(bid, position);
                fairygui.GRoot.inst.hidePopup();
                Game.BattleManager.cBattle.layoutProcessor.Enter(building);
            }
        }
        UI.UIBattle = UIBattle;
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
                throw new Error("Method not implemented.");
            }
            Enter(param) {
                throw new Error("Method not implemented.");
            }
            Leave() {
                throw new Error("Method not implemented.");
            }
            Update(deltaTime) {
                throw new Error("Method not implemented.");
            }
        }
        UI.UILogin = UILogin;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class UIManager {
            static get login() { return this._login; }
            static get battle() { return this._battle; }
            static Init(resolution) {
                Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
                fairygui.UIPackage.addPackage("res/ui/global");
                fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "qtm011");
                fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "qtm011");
                fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");
                this._login = new UI.UILogin();
                this._battle = new UI.UIBattle();
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
                this.EnterModule(this._battle, param);
            }
        }
        UI.UIManager = UIManager;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
//# sourceMappingURL=game.js.map