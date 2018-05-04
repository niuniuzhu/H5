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
            Laya.init(600, 800, Laya.WebGL);
            laya.utils.Stat.show(0, 0);
            Laya.stage.scaleMode = "showall";
            Laya.stage.alignH = "left";
            Laya.stage.alignV = "top";
            Laya.stage.screenMode = "vertical";
            this.LoadDefs();
        }
        LoadDefs() {
            console.log("loading defs...");
            Laya.loader.load("res/defs/b_defs.txt", Laya.Handler.create(this, this.OnDefsLoadComplete), undefined, Laya.Loader.JSON);
        }
        OnDefsLoadComplete() {
            let json = Laya.loader.getRes("res/defs/b_defs.txt");
            Shared.Defs.Init(json);
            this.LoadUIRes();
        }
        LoadUIRes() {
            console.log("loading res...");
            let res = ["global", "battle", "main", "cutscene"];
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
            Laya.timer.frameLoop(1, this, this.Update);
            let param = new Logic.BattleParams();
            param.framesPerKeyFrame = 4;
            param.frameRate = 20;
            param.uid = "user";
            param.id = "m1";
            param.rndSeed = Shared.Timer.utcTime;
            let player = new Logic.Player();
            player.id = "user";
            player.cid = "c0";
            player.team = 0;
            player.name = "name0";
            param.players = [player];
            View.UI.UIManager.EnterBattle(param);
        }
        Update() {
            let dt = Laya.timer.delta;
            View.UI.UIManager.Update(dt);
            Game.BattleManager.Update(dt);
        }
    }
    Game.GameMain = GameMain;
})(Game || (Game = {}));
var Logic;
(function (Logic) {
    class BattleParams {
        constructor() {
            this.frameRate = 0;
            this.framesPerKeyFrame = 0;
            this.uid = "";
            this.id = "";
            this.rndSeed = 0;
            this.players = null;
        }
    }
    Logic.BattleParams = BattleParams;
    class Player {
        constructor() {
            this.id = "";
            this.name = "";
            this.cid = "";
            this.team = 0;
        }
    }
    Logic.Player = Player;
    class Battle {
        constructor(param) {
            this._frame = 0;
            this._deltaTime = 0;
            this._time = 0;
            this._random = new Shared.ConsistentRandom(param.rndSeed);
            this._context = new Shared.UpdateContext();
            this._entityManager = new Logic.EntityManager(this);
            this.CreatePlayers(param.players);
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
        CreatePlayers(players) {
            for (let i = 0; i < players.length; ++i) {
                let player = players[i];
                let entityParam = new Shared.Model.EntityParam();
                entityParam.rid = player.cid + "@" + player.id;
                entityParam.uid = player.id;
                entityParam.team = player.team;
                entityParam.position = new RC.Numerics.Vec3();
                entityParam.direction = new RC.Numerics.Vec3(1, 0, 0);
                let entity = this._entityManager.Create(entityParam);
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
            this._position = RC.Numerics.Vec3.zero;
            this._direction = RC.Numerics.Vec3.zero;
            this._battle = null;
            this._markToDestroy = false;
            this._data = null;
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
            this.position = param.position;
            this.direction = param.direction;
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
            Shared.Event.SyncEvent.AddSyncProp(e, Shared.Attr.Position, this._position);
            Shared.Event.SyncEvent.AddSyncProp(e, Shared.Attr.Direction, this._direction);
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
            this._entities.splice(0);
            this._idToEntity.clear();
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
        Create(param) {
            let entity = this._gPool.Pop(Logic.Entity);
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
    class ConsistentRandom {
        constructor(seed) {
            this.seed = seed;
        }
        next(min, max) {
            max = max || 0;
            min = min || 0;
            this.seed = (this.seed * 9301 + 49297) % 233280;
            let rnd = this.seed / 233280;
            return min + rnd * (max - min);
        }
        nextInt(min, max) {
            return Math.round(this.next(min, max));
        }
        nextDouble() {
            return this.next(0, 1);
        }
        pick(collection) {
            return collection[this.nextInt(0, collection.length - 1)];
        }
    }
    Shared.ConsistentRandom = ConsistentRandom;
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    class Defs {
        static Init(json) {
            Defs._defs = json;
        }
        static GetEntity(id) {
            let ht = Shared.Hashtable.GetMap(Defs._defs, "entities");
            let defaultHt = Shared.Hashtable.GetMap(ht, "default");
            let result = Shared.Hashtable.GetMap(ht, id);
            if (result == undefined)
                result = {};
            Shared.Hashtable.Concat(result, defaultHt);
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
    class Hashtable {
        static Concat(map, map2) {
            for (let k in map2) {
                if (map[k] == undefined) {
                    map[k] = map2[k];
                }
            }
        }
        static GetArray(map, key) {
            return map[key];
        }
        static GetMap(map, key) {
            return map[key];
        }
        static GetString(map, key) {
            return map[key];
        }
        static GetNumber(map, key) {
            return map[key];
        }
        static GetBool(map, key) {
            return map[key];
        }
        static GetStringArray(map, key) {
            return this.GetArray(map, key);
        }
        static GetNumberArray(map, key) {
            return this.GetArray(map, key);
        }
        static GetBoolArray(map, key) {
            return this.GetArray(map, key);
        }
        static GetVec2(map, key) {
            let arr = this.GetArray(map, key);
            return new RC.Numerics.Vec2(arr[0], arr[1]);
        }
        static GetVec3(map, key) {
            let arr = this.GetArray(map, key);
            return new RC.Numerics.Vec3(arr[0], arr[1], arr[2]);
        }
        static GetVec4(map, key) {
            let arr = this.GetArray(map, key);
            return new RC.Numerics.Vec4(arr[0], arr[1], arr[2], arr[3]);
        }
    }
    Shared.Hashtable = Hashtable;
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    class Timer {
        static get utcTime() {
            let d1 = new Date();
            return new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds(), d1.getUTCMilliseconds()).getTime();
        }
        static ToLocalTimeString(utc) {
            let d1 = new Date(utc);
            let d2 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes(), d1.getSeconds(), d1.getMilliseconds());
            return d2.toLocaleString();
        }
    }
    Shared.Timer = Timer;
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
        SyncEvent.CREATE_BATTLE = 10;
        SyncEvent.DESTROY_BATTLE = 11;
        SyncEvent.WIN = 13;
        SyncEvent.ENTITY_CREATED = 20;
        SyncEvent.ENTITY_ADDED_TO_BATTLE = 21;
        SyncEvent.ENTITY_REMOVE_FROM_BATTLE = 22;
        SyncEvent.ENTITY_STATE_CHANGED = 23;
        SyncEvent.ENTITY_SYNC_PROPS = 24;
        SyncEvent.USE_SKILL = 31;
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
                this.name = def["name"];
                this.model = def["model"];
            }
        }
        Model.EntityData = EntityData;
    })(Model = Shared.Model || (Shared.Model = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var Model;
    (function (Model) {
        class EntityParam {
        }
        Model.EntityParam = EntityParam;
    })(Model = Shared.Model || (Shared.Model = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var Model;
    (function (Model) {
        class ModelFactory {
            static GetEntityData(id) {
                let data = this.ENTITY_DATA.getValue(id);
                if (data != null && data != undefined)
                    return data;
                data = new Model.EntityData(id);
                this.ENTITY_DATA.setValue(id, data);
                return data;
            }
        }
        ModelFactory.ENTITY_DATA = new RC.Collections.Dictionary();
        Model.ModelFactory = ModelFactory;
    })(Model = Shared.Model || (Shared.Model = {}));
})(Shared || (Shared = {}));
var View;
(function (View) {
    class Camera {
        constructor() {
            this._localtoWorld = RC.Numerics.Mat4.FromTRS(RC.Numerics.Vec3.zero, RC.Numerics.Quat.Euler(new RC.Numerics.Vec3(90, 0, 0)), new RC.Numerics.Vec3(1, -1, 1));
            this._worldToLocal = RC.Numerics.Mat4.NonhomogeneousInvert(this._localtoWorld);
            console.log(this._worldToLocal.TransformPoint(new RC.Numerics.Vec3(1, 0, -1)));
        }
        get position() { return this._position.Clone(); }
        set position(value) {
            if (value.EqualsTo(this._position))
                return;
            this._position = value.Clone();
            if (this.cameraTRSChangedHandler != null)
                this.cameraTRSChangedHandler();
        }
        get direction() { return this._direction.Clone(); }
        set direction(value) {
            if (value.EqualsTo(this._direction))
                return;
            this._direction = value.Clone();
            if (this.cameraTRSChangedHandler != null)
                this.cameraTRSChangedHandler();
        }
        get worldToLocal() { return this._worldToLocal.Clone(); }
        get localtoWorld() { return this._localtoWorld.Clone(); }
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
            this._context = new Shared.UpdateContext();
            this._camera = new View.Camera();
            this._graphicManager = new View.GraphicManager(this);
            this._entityManager = new View.CEntityManager(this);
        }
        get camera() { return this._camera; }
        ;
        get graphicManager() { return this._graphicManager; }
        ;
        get frame() { return this._frame; }
        get deltaTime() { return this._deltaTime; }
        get time() { return this._time; }
        Dispose() {
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
            this._logicPos = this._position = param.position;
            this._logicDir = this._direction = param.direction;
            this._graphic = this._battle.graphicManager.CreateGraphic(View.EntityGraphic);
            this._graphic.OnCreate(this, this._data.model);
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
    class CEntityManager {
        constructor(battle) {
            this._battle = battle;
        }
        Dispose() {
        }
        Update(context) {
        }
    }
    View.CEntityManager = CEntityManager;
})(View || (View = {}));
var View;
(function (View) {
    class Graphic {
        constructor(manager) {
            this._manager = manager;
            this._root = new fairygui.GLoader();
        }
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
        OnCreateInternal(id) {
            this._root.url = fairygui.UIPackage.getItemURL("global", id);
        }
        Dispose() {
            this._root.dispose();
        }
        UpdatePosition() {
            let mat = this._manager.battle.camera.worldToLocal;
            let localPos = mat.TransformPoint(this._position);
            this._root.x = localPos.x;
            this._root.y = localPos.y;
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
        OnCreate(owner, id) {
            this.OnCreateInternal(id);
        }
    }
    View.EntityGraphic = EntityGraphic;
})(View || (View = {}));
var View;
(function (View) {
    class GraphicManager {
        constructor(battle) {
            this._battle = battle;
            this._battle.camera.cameraTRSChangedHandler = this.OnCameraTRSChanged;
            this._root = new fairygui.GComponent();
            this._root.name = "graphic_root";
            fairygui.GRoot.inst.addChild(this._root);
            this._graphics = [];
        }
        get battle() { return this._battle; }
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
                fairygui.GRoot.inst.addChild(this._root);
                this._root.width = fairygui.GRoot.inst.width;
                this._root.height = fairygui.GRoot.inst.height;
                this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
                this._winCom = this._root.getChild("win_com").asCom;
                this._winCom.getChild("n4").onClick(this, this.OnQuitBtnClick);
                Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.WIN, this.HandleWin);
                Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.ENTITY_CREATED, this.HandleEntityCreated);
                Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.ENTITY_DESTROIED, this.HandleEntityDestroied);
                Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.ENTITY_ATTR_CHANGED, this.HandleEntityAttrChanged);
                Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.USE_SKILL, this.HandleUseSkill);
            }
            Leave() {
                Game.BattleManager.Dispose();
                Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.WIN, this.HandleWin);
                Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.ENTITY_CREATED, this.HandleEntityCreated);
                Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.ENTITY_DESTROIED, this.HandleEntityDestroied);
                Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.ENTITY_ATTR_CHANGED, this.HandleEntityAttrChanged);
                Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.USE_SKILL, this.HandleUseSkill);
            }
            HandleWin(e) {
                this._winCom.visible = true;
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
            OnQuitBtnClick(e) {
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
                fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "ModalWaiting");
                fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "ModalWaiting");
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