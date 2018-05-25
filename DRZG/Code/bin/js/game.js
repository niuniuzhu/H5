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
            let preloads = Shared.Defs.GetPreloads();
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
            View.UI.UIManager.Init(new RC.Numerics.Vec2(600, 800));
            fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnResize);
            Laya.timer.frameLoop(1, this, this.Update);
            View.UI.UIManager.EnterLogin();
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
        static GetPreloads() {
            let arr = RC.Utils.Hashtable.GetArray(Defs._defs, "preloads");
            return arr;
        }
        static GetSkill(id) {
            let ht = RC.Utils.Hashtable.GetMap(Defs._defs, "skills");
            let defaultHt = RC.Utils.Hashtable.GetMap(ht, "default");
            let result = RC.Utils.Hashtable.GetMap(ht, id);
            if (result == null)
                result = {};
            RC.Utils.Hashtable.Concat(result, defaultHt);
            return result;
        }
        static GetEffect(id) {
            let ht = RC.Utils.Hashtable.GetMap(Defs._defs, "effects");
            let defaultHt = RC.Utils.Hashtable.GetMap(ht, "default");
            let result = RC.Utils.Hashtable.GetMap(ht, id);
            if (result == null)
                result = {};
            RC.Utils.Hashtable.Concat(result, defaultHt);
            return result;
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
        static GetMissile(id) {
            let ht = RC.Utils.Hashtable.GetMap(Defs._defs, "missiles");
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
        get disposed() { return this._disposed; }
        Dispose() {
            this.InternalDispose();
            this._disposed = true;
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
        Event.UIEvent = UIEvent;
    })(Event = Shared.Event || (Shared.Event = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var Model;
    (function (Model) {
        class BattleParams {
        }
        Model.BattleParams = BattleParams;
        class EntityParam {
            constructor() {
                this.team = -1;
            }
        }
        Model.EntityParam = EntityParam;
    })(Model = Shared.Model || (Shared.Model = {}));
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
                this.mhp = RC.Utils.Hashtable.GetNumber(def, "mhp");
                this.mmp = RC.Utils.Hashtable.GetNumber(def, "mmp");
                this.mp = RC.Utils.Hashtable.GetNumber(def, "mp");
                this.gmp = RC.Utils.Hashtable.GetNumber(def, "gmp");
                this.skills = RC.Utils.Hashtable.GetStringArray(def, "skills");
                this.ai = RC.Utils.Hashtable.GetString(def, "ai");
                this.speed = RC.Utils.Hashtable.GetNumber(def, "speed");
                this.dfx = RC.Utils.Hashtable.GetString(def, "dfx");
                this.duration = RC.Utils.Hashtable.GetNumber(def, "duration");
                this.followMode = RC.Utils.Hashtable.GetNumber(def, "follow_mode");
            }
        }
        Model.EntityData = EntityData;
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
                this.size = RC.Utils.Hashtable.GetVec2(def, "size");
                this.tileSize = RC.Utils.Hashtable.GetNumber(def, "tile_size");
                this.towerPos = RC.Utils.Hashtable.GetArray(def, "tower_pos");
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
            static GetSkillData(id) {
                let data = this.SKILL_DATA.getValue(id);
                if (data != null)
                    return data;
                data = new Model.SkillData(id);
                this.SKILL_DATA.setValue(id, data);
                return data;
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
        ModelFactory.SKILL_DATA = new RC.Collections.Dictionary();
        ModelFactory.ENTITY_DATA = new RC.Collections.Dictionary();
        Model.ModelFactory = ModelFactory;
    })(Model = Shared.Model || (Shared.Model = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var Model;
    (function (Model) {
        class SkillData {
            constructor(id) {
                let def = Shared.Defs.GetSkill(id);
                this.id = id;
                this.cmp = RC.Utils.Hashtable.GetNumber(def, "cmp");
                this.damage = RC.Utils.Hashtable.GetNumber(def, "damage");
                this.fx = RC.Utils.Hashtable.GetString(def, "fx");
                this.missile = RC.Utils.Hashtable.GetString(def, "missile");
            }
        }
        Model.SkillData = SkillData;
    })(Model = Shared.Model || (Shared.Model = {}));
})(Shared || (Shared = {}));
var View;
(function (View) {
    class CBattle {
        constructor(param) {
            this._frame = 0;
            this._deltaTime = 0;
            this._time = 0;
            this._data = Shared.Model.ModelFactory.GetMapData(Shared.Utils.GetIDFromRID(param.id));
            this._context = new Shared.UpdateContext();
            this._entityManager = new View.CEntityManager(this);
            this._graphicManager = new View.GraphicManager(this);
            this._fihgtHandler = new View.FightHandler(this);
            this._graphic = new View.MapGraphic(this._data.model);
            this.CreateTowers(param);
        }
        get frame() { return this._frame; }
        get deltaTime() { return this._deltaTime; }
        get time() { return this._time; }
        get tileSize() { return this._data.tileSize; }
        get graphicManager() { return this._graphicManager; }
        ;
        get entityManager() { return this._entityManager; }
        ;
        get fightHandler() { return this._fihgtHandler; }
        get graphic() { return this._graphic; }
        ;
        Dispose() {
            View.CTower.player = null;
            this._graphic.Dispose();
            this._graphicManager.Dispose();
            this._entityManager.Dispose();
            this.fightHandler.Dispose();
        }
        Update(deltaTime) {
            if (this._finish)
                return;
            ++this._frame;
            this._deltaTime = deltaTime;
            this._time += this.deltaTime;
            this._context.deltaTime = this.deltaTime;
            this._context.time = this.time;
            this._context.frame = this.frame;
            this._entityManager.Update(this._context);
            this._fihgtHandler.ProcessFight(this._context);
            this._entityManager.UpdateAgterFight(this._context);
            let winTeam = this.CheckWin();
            if (winTeam != -1) {
                this._finish = true;
                this.winHandler(winTeam);
            }
        }
        OnResize(e) {
        }
        SetGraphicRoot(graphicRoot) {
            graphicRoot.addChild(this._graphic.root);
            graphicRoot.addChild(this.graphicManager.root);
        }
        CheckWin() {
            let team0Win = true;
            let team1Win = true;
            this._entityManager.Foreach((entity) => {
                let tower = entity;
                if (tower == null)
                    return;
                if (tower.team == 0)
                    team1Win = false;
                else if (tower.team == 1)
                    team0Win = false;
            });
            if (team0Win)
                return 0;
            if (team1Win)
                return 1;
            return -1;
        }
        CreateTowers(param) {
            for (let i = 0; i < param.team0.length; ++i) {
                let tower = this.CreateTower(param.team0[i]);
                let arr = this._data.towerPos[0][i];
                tower.position = new RC.Numerics.Vec2(arr[0], arr[1]);
                if (i == 0)
                    View.CTower.player = tower;
                else
                    tower.CreateAI();
            }
            for (let i = 0; i < param.team1.length; ++i) {
                let tower = this.CreateTower(param.team1[i]);
                let arr = this._data.towerPos[1][i];
                tower.position = new RC.Numerics.Vec2(arr[0], arr[1]);
                tower.CreateAI();
            }
        }
        CreateTower(param) {
            param.rid = Shared.Utils.MakeRIDFromID(param.id);
            let entity = this._entityManager.Create(View.CTower, param);
            return entity;
        }
        CreateChampion(param) {
            param.rid = Shared.Utils.MakeRIDFromID(param.id);
            let entity = this._entityManager.Create(View.CChampion, param);
            return entity;
        }
        CreateMissile(param) {
            param.rid = Shared.Utils.MakeRIDFromID(param.id);
            let entity = this._entityManager.Create(View.Missile, param);
            return entity;
        }
        CreateEffect(param) {
            param.rid = Shared.Utils.MakeRIDFromID(param.id);
            let entity = this._entityManager.Create(View.CEffect, param);
            return entity;
        }
    }
    View.CBattle = CBattle;
})(View || (View = {}));
var View;
(function (View) {
    class CEntity extends Shared.GPoolObject {
        constructor() {
            super();
            this._position = RC.Numerics.Vec2.zero;
            this._direction = RC.Numerics.Vec2.down;
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
        get direction() { return this._direction.Clone(); }
        set direction(value) {
            if (this._direction.EqualsTo(value))
                return;
            this._direction.CopyFrom(value);
            if (this._graphic != null)
                this._graphic.direction = this._direction;
            this.OnDirectionChanged();
        }
        get owner() { return this._owner; }
        get graphic() { return this._graphic; }
        get markToDestroy() { return this._markToDestroy; }
        InternalDispose() {
        }
        OnCreated(owner, param) {
            this._owner = owner;
            this._rid = param.rid;
            this._data = Shared.Model.ModelFactory.GetEntityData(Shared.Utils.GetIDFromRID(this._rid));
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
        OnDirectionChanged() {
        }
        MarkToDestroy() {
            this._markToDestroy = true;
        }
        OnUpdateState(context) {
        }
        CreateGraphic() {
            this._graphic = this._owner.graphicManager.CreateGraphic(View.EntityGraphic);
            this._graphic.Load(this._data.model);
            this._graphic.position = this._position;
            this._graphic.direction = this._direction;
        }
    }
    View.CEntity = CEntity;
})(View || (View = {}));
var View;
(function (View) {
    class CTower extends View.CEntity {
        get mmp() { return this._data.mmp; }
        get mp() { return this._mp; }
        get hp() { return this._hp; }
        ;
        set hp(value) {
            if (value == this._hp)
                return;
            this._hp = value;
            this.graphic.SetHP(this._data.mhp, this.hp);
        }
        get team() { return this._team; }
        get numSkills() { return this._skills.size; }
        OnCreated(owner, param) {
            super.OnCreated(owner, param);
            this._team = param.team;
            this._mp = this._data.mp;
            this._skills = new Map();
            for (let skillId of this._data.skills) {
                let skill = new View.CSkill(skillId);
                this._skills.set(skillId, skill);
            }
            for (let skillId of param.skills) {
                if (this._skills.has(skillId))
                    continue;
                let skill = new View.CSkill(skillId);
                this._skills.set(skillId, skill);
            }
            this.direction = this._team == 0 ? RC.Numerics.Vec2.down : RC.Numerics.Vec2.up;
            this.graphic.ShowHUD();
            this.hp = this._data.mhp;
        }
        OnUpdateState(context) {
            super.OnUpdateState(context);
            this._mp += this._data.gmp * context.deltaTime * 0.001;
            this._mp = RC.Numerics.MathUtils.Min(this._mp, this._data.mmp);
            if (this._ai != null)
                this._ai.Update(context);
        }
        CreateAI() {
            switch (this._data.ai) {
                case "tower":
                    this._ai = new View.CTowerAI(this);
                    break;
                case "champion":
                    this._ai = new View.CChampionAI(this);
                    break;
            }
        }
        GetSkill(skillId) {
            return this._skills.get(skillId);
        }
        CanUseSkill(skillId) {
            let skill = this.GetSkill(skillId);
            return this.CanUseSkill2(skill);
        }
        CanUseSkill2(skill) {
            return this._mp >= skill.cmp;
        }
        GetUsableSkills() {
            let skills = [];
            this._skills.forEach((skill) => {
                if (this.CanUseSkill2(skill))
                    skills.push(skill);
            });
            return skills;
        }
        RandomGetUsableSkill() {
            let skills = this.GetUsableSkills();
            if (skills.length == 0)
                return null;
            let r = Math.floor(Math.random() * skills.length);
            return skills[r];
        }
        UseSkill(skillId, target) {
            if (target == null) {
                target = this._owner.entityManager.RandomGetTarget(1 - this.team);
            }
            let skill = this._skills.get(skillId);
            this._mp -= skill.cmp;
            if (skill.missile == null || skill.missile == "") {
                this.MakeFightContext(skillId, target.rid);
            }
            else {
                let param = new Shared.Model.EntityParam();
                param.id = skill.missile;
                param.team = this.team;
                let missile = this._owner.CreateMissile(param);
                missile.Begin(skill, this, target);
            }
        }
        MakeFightContext(skillId, target) {
            let skill = this.GetSkill(skillId);
            let fightContext = new View.FightContext(skillId, this.rid, target);
            this._owner.fightHandler.Add(fightContext);
        }
    }
    View.CTower = CTower;
})(View || (View = {}));
var View;
(function (View) {
    class CChampion extends View.CTower {
        PlayRun() {
            this._graphic.Play(6, 13, -1, 6);
        }
        PlayFight() {
            this._graphic.Play(0, 5, 1, 6, new laya.utils.Handler(this, () => {
                this.PlayRun();
            }));
        }
        PlayDie() {
            this._graphic.Play(14, 14, 1, 14);
        }
    }
    View.CChampion = CChampion;
})(View || (View = {}));
var View;
(function (View) {
    class CChampionAI {
        constructor(owner) {
            this._owner = owner;
        }
        Update(context) {
        }
    }
    View.CChampionAI = CChampionAI;
})(View || (View = {}));
var View;
(function (View) {
    class CEffect extends View.CEntity {
        Begin(position) {
            this.position = position;
            if (this._data.duration <= 0)
                this._graphic.Play(0, -1, 1, -1, new laya.utils.Handler(this, this.OnPlayComplete));
            else {
                this._graphic.Play(0, -1, 0);
                this._endTime = this._owner.time + this._data.duration;
            }
        }
        OnPlayComplete() {
            this._graphic.Stop();
            this.MarkToDestroy();
        }
        OnUpdateState(context) {
            super.OnUpdateState(context);
            if (this._data.duration <= 0)
                return;
            if (context.time < this._endTime)
                return;
            this.OnPlayComplete();
        }
    }
    View.CEffect = CEffect;
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
            this._typeToEntity.setValue(View.CChampion, []);
            this._typeToEntity.setValue(View.CTower, []);
            this._typeToEntity.setValue(View.Missile, []);
            this._typeToEntity.setValue(View.CEffect, []);
        }
        Dispose() {
            this._entities.forEach((entity) => {
                entity.MarkToDestroy();
            });
            this.DestroyEnties();
            this._gPool.Dispose();
        }
        Foreach(handle) {
            for (let e of this._entities)
                handle(e);
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
        GetEntity(rid) {
            if (rid == null || rid == undefined)
                return null;
            let entity = this._idToEntity.getValue(rid);
            return entity;
        }
        GetTowersByTeam(team) {
            let towers = [];
            for (let entity of this._entities) {
                let tower = entity;
                if (tower == null || tower.team != team)
                    continue;
                towers.push(tower);
            }
            return towers;
        }
        RandomGetTarget(team) {
            let targets = this.GetTowersByTeam(team);
            let r2 = Math.floor(Math.random() * targets.length);
            return targets[r2];
        }
        GetEntityAt(index) {
            if (index < 0 ||
                index > this._entities.length - 1)
                return null;
            return this._entities[index];
        }
        Update(context) {
            this.UpdateState(context);
        }
        UpdateAgterFight(context) {
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
    class CSkill {
        constructor(id) {
            this._data = Shared.Model.ModelFactory.GetSkillData(id);
        }
        get id() { return this._data.id; }
        get cmp() { return this._data.cmp; }
        get damage() { return this._data.damage; }
        get fx() { return this._data.fx; }
        get missile() { return this._data.missile; }
    }
    View.CSkill = CSkill;
})(View || (View = {}));
var View;
(function (View) {
    class CTowerAI {
        constructor(owner) {
            this._owner = owner;
            this._nextUseSkillTime = this._owner.owner.time + Math.floor((Math.random() * 1.8 + 1) * 1000);
        }
        Update(context) {
            if (context.time < this._nextUseSkillTime)
                return;
            let skill = this._owner.RandomGetUsableSkill();
            if (skill == null)
                return;
            let target = this._owner.owner.entityManager.RandomGetTarget(1 - this._owner.team);
            this._owner.UseSkill(skill.id, target);
            this._nextUseSkillTime = context.time + Math.floor((Math.random() * 2.5 + 1.2) * 1000);
        }
    }
    View.CTowerAI = CTowerAI;
})(View || (View = {}));
var View;
(function (View) {
    class Graphic {
        constructor(manager) {
            this._manager = manager;
            this._root = new fairygui.GComponent();
            this._root.touchable = false;
            this._manager.root.addChild(this._root);
            this._modelContainer = new fairygui.GComponent();
            this._root.addChild(this._modelContainer);
            this._position = RC.Numerics.Vec2.zero;
            this._direction = RC.Numerics.Vec2.down;
            this._worldToLocalMat = RC.Numerics.Mat3.identity;
            this._worldToLocalMat.x.x = this._manager.battle.tileSize;
            this._worldToLocalMat.y.y = this._manager.battle.tileSize;
            this._worldToLocalMat.z.x = -this._manager.battle.tileSize * 0.5;
            this._worldToLocalMat.z.y = -this._manager.battle.tileSize * 0.5;
            this._localToWorldMat = RC.Numerics.Mat3.Invert(this._worldToLocalMat);
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
        get direction() { return this._direction.Clone(); }
        set direction(value) {
            if (value.EqualsTo(this._direction))
                return;
            this._direction.CopyFrom(value);
            this.UpdateDirection();
        }
        get alpha() { return this._root.alpha; }
        set alpha(value) { this._root.alpha = value; }
        get visible() { return this._root.visible; }
        set visible(value) { this._root.visible = value; }
        get sortingOrder() { return this._root.sortingOrder; }
        set sortingOrder(value) { this._root.sortingOrder = value; }
        Dispose() {
            this._root.dispose();
        }
        UpdatePosition() {
            let v = this._worldToLocalMat.TransformPoint(this._position);
            this._root.setXY(v.x, v.y);
        }
        UpdateDirection() {
            let angle = RC.Numerics.Vec2.Dot(RC.Numerics.Vec2.down, this._direction);
            angle = RC.Numerics.MathUtils.Clamp(angle, -1, 1);
            let sign = this._direction.x < 0 ? -1 : 1;
            this._modelContainer.rotation = RC.Numerics.MathUtils.RadToDeg(RC.Numerics.MathUtils.Acos(angle)) * sign;
        }
        WorldToLocal(point) {
            return this._worldToLocalMat.TransformPoint(point);
        }
        LocalToWorld(point) {
            return this._localToWorldMat.TransformPoint(point);
        }
    }
    View.Graphic = Graphic;
})(View || (View = {}));
var View;
(function (View) {
    class EntityGraphic extends View.Graphic {
        constructor(manager) {
            super(manager);
            this._hud = fairygui.UIPackage.createObject("global", "hud").asProgress;
            this._hud.visible = false;
            this._hud.setPivot(0.5, 0.5, true);
            this._root.addChild(this._hud);
        }
        Dispose() {
            this._sprite.dispose();
            this._hud.dispose();
            super.Dispose();
        }
        Load(id) {
            if (id == null || id == "")
                return;
            this._sprite = fairygui.UIPackage.createObject("global", id).asCom;
            this._modelContainer.addChild(this._sprite);
            this._sprite.setPivot(0.5, 0.5, true);
            this._mc = this._sprite.asMovieClip;
            this._hud.y = -this._sprite.height * 0.5 - this._sprite.height * 0.25;
            this.OnLoadComplete();
        }
        OnLoadComplete() {
        }
        Play(start, end, times, endAt, endHandler) {
            this._mc.setPlaySettings(start, end, times, endAt, endHandler);
            this._mc.playing = true;
        }
        Stop() {
            this._mc.playing = false;
        }
        ShowHUD() {
            this._hud.visible = true;
        }
        HideHUD() {
            this._hud.visible = false;
        }
        SetHP(mhp, hp) {
            this._hud.max = mhp;
            this._hud.value = hp;
        }
    }
    View.EntityGraphic = EntityGraphic;
})(View || (View = {}));
var View;
(function (View) {
    class FightContext {
        constructor(skill, attacker, target) {
            this._skill = skill;
            this._attacker = attacker;
            this._target = target;
        }
        get skill() { return this._skill; }
        get atacker() { return this._attacker; }
        get target() { return this._target; }
    }
    View.FightContext = FightContext;
})(View || (View = {}));
var View;
(function (View) {
    class FightHandler {
        constructor(owner) {
            this._owner = owner;
            this._fightContexts = new RC.Collections.Queue();
        }
        Dispose() {
            this._fightContexts.clear();
        }
        ProcessFight(context) {
            while (this._fightContexts.size() > 0) {
                let fightContext = this._fightContexts.dequeue();
                let target = this._owner.entityManager.GetEntity(fightContext.target);
                if (target == null)
                    continue;
                let attacker = this._owner.entityManager.GetEntity(fightContext.atacker);
                if (attacker == null)
                    continue;
                let skill = attacker.GetSkill(fightContext.skill);
                target.hp -= skill.damage;
                target.hp = RC.Numerics.MathUtils.Max(0, target.hp);
                if (target.hp == 0)
                    target.MarkToDestroy();
            }
        }
        Add(fightContext) {
            this._fightContexts.enqueue(fightContext);
        }
    }
    View.FightHandler = FightHandler;
})(View || (View = {}));
var View;
(function (View) {
    class GraphicManager {
        constructor(owner) {
            this._owner = owner;
            this._root = new fairygui.GComponent();
            this._root.touchable = false;
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
            return a.position.y < b.position.y ? -1 : 1;
        }
    }
    View.GraphicManager = GraphicManager;
})(View || (View = {}));
var View;
(function (View) {
    class MapGraphic {
        constructor(id) {
            this._root = fairygui.UIPackage.createObject("global", id).asCom;
        }
        get root() { return this._root; }
        Dispose() {
            this._root.dispose();
        }
    }
    View.MapGraphic = MapGraphic;
})(View || (View = {}));
var View;
(function (View) {
    class Missile extends View.CEntity {
        constructor() {
            super();
            this._lastPos = RC.Numerics.Vec2.zero;
        }
        PlayAni() {
            this._graphic.Play(0, -1, 0);
        }
        Begin(skill, caster, target) {
            this._skill = skill.id;
            this._caster = caster.rid;
            this._target = target.rid;
            this._lastPos.CopyFrom(target.position);
            this.position = caster.position;
            this.PlayAni();
        }
        End() {
            this._graphic.Stop();
            this.MarkToDestroy();
            if (this._data.dfx != null && this._data.dfx != "") {
                let param = new Shared.Model.EntityParam();
                param.id = this._data.dfx;
                let fx = this._owner.CreateEffect(param);
                fx.Begin(this.position);
            }
            let caster = this._owner.entityManager.GetEntity(this._caster);
            if (caster == null)
                return;
            caster.MakeFightContext(this._skill, this._target);
        }
        OnUpdateState(context) {
            super.OnUpdateState(context);
            let dir = RC.Numerics.Vec2.Sub(this._lastPos, this.position);
            dir.Normalize();
            let pos = RC.Numerics.Vec2.Add(this.position, RC.Numerics.Vec2.MulN(dir, this._data.speed * context.deltaTime * 0.001));
            this.position = pos;
            this.direction = dir;
            if (RC.Numerics.Vec2.DistanceSquared(pos, this._lastPos) < 5) {
                this.End();
            }
            let target = this._owner.entityManager.GetEntity(this._target);
            if (target != null)
                this._lastPos.CopyFrom(target.position);
        }
    }
    View.Missile = Missile;
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class FBInfoPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c4").asCom;
                this._root.getChild("fight_btn").onClick(this, this.OnFightBtnClick);
                this._root.getChild("cancel_btn").onClick(this, this.OnCancelBtnClick);
            }
            set fbID(id) {
                this._root.getChild("icon").asLoader.url = fairygui.UIPackage.getItemURL("main", id);
                let title;
                switch (id) {
                    case "fb0":
                        title = "第一章";
                        break;
                    case "fb1":
                        title = "第二章";
                        break;
                    case "fb2":
                        title = "第三章";
                        break;
                    case "fb3":
                        title = "第四章";
                        break;
                    case "fb4":
                        title = "第五章";
                        break;
                    case "fb5":
                        title = "竞技场";
                        break;
                }
                this._root.getChild("n0").asLabel.title = title;
            }
            Dispose() {
            }
            Enter() {
                this._root.getChild("atk1").asTextField.text = "" + Math.floor(Math.random() * 10000 + 3000);
                this._root.getChild("atk2").asTextField.text = "" + Math.floor(Math.random() * 10000 + 3000);
            }
            Exit() {
            }
            Update(deltaTime) {
            }
            OnResize(e) {
            }
            OnFightBtnClick() {
                this._owner.EnterBattle();
            }
            OnCancelBtnClick() {
                this._owner.panelIndex = 1;
            }
        }
        UI.FBInfoPanel = FBInfoPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class FBPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c1").asCom;
                this._root.getChild("fb0").onClick(this, this.OnFBBtnClick);
                this._root.getChild("fb1").onClick(this, this.OnFBBtnClick);
                this._root.getChild("fb2").onClick(this, this.OnFBBtnClick);
                this._root.getChild("fb3").onClick(this, this.OnFBBtnClick);
                this._root.getChild("fb4").onClick(this, this.OnFBBtnClick);
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
            OnFBBtnClick(e) {
                this._owner.panelIndex = 4;
                let target = fairygui.GObject.cast(e.currentTarget);
                this._owner.fbInfoPanel.fbID = target.name;
            }
        }
        UI.FBPanel = FBPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class PHBPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c3").asCom;
                this._list = this._root.getChild("list").asList;
            }
            Dispose() {
            }
            Enter() {
                let atks = [];
                for (let i = 0; i < 50; ++i) {
                    atks.push(Math.round(Math.random() * 25000 + 5000));
                }
                atks.sort();
                atks.reverse();
                for (let i = 0; i < 50; ++i) {
                    let item = this._list.addItemFromPool().asCom;
                    item.getChild("name").asTextField.text = (btoa(RC.Utils.GUID.Generate().ToString(RC.Utils.GuidFormat.DASHES))).substring(0, 8);
                    let rank;
                    switch (i) {
                        case 0:
                            rank = "a";
                            break;
                        case 1:
                            rank = "b";
                            break;
                        case 2:
                            rank = "c";
                            break;
                        default:
                            rank = "" + (i + 1);
                            break;
                    }
                    item.getChild("rank").asTextField.text = rank;
                    item.getChild("atk").asTextField.text = "" + atks[i];
                    item.getChild("lvl").asTextField.text = "" + Math.round(Math.random() * 30 + 20);
                }
            }
            Exit() {
                this._list.removeChildrenToPool();
            }
            Update(deltaTime) {
            }
            OnResize(e) {
            }
        }
        UI.PHBPanel = PHBPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class QDPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c6").asCom;
                this._list = this._root.getChild("list").asList;
            }
            Dispose() {
            }
            Enter() {
                for (let i = 0; i < 20; ++i) {
                    let item = this._list.addItemFromPool().asCom;
                    item.getController("c1").selectedIndex = Math.round(Math.random() * 2);
                    item.getChild("exp").asTextField.text = "" + Math.round(Math.random() * 3000 + 1500);
                }
            }
            Exit() {
                this._list.removeChildrenToPool();
            }
            Update(deltaTime) {
            }
            OnResize(e) {
            }
        }
        UI.QDPanel = QDPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class SkillPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c2").asCom;
                this._list = this._root.getChild("list").asList;
                this._list2 = this._root.getChild("list2").asList;
                let count = this._list.numItems;
                for (let i = 0; i < count; ++i) {
                    let item = this._list.getChildAt(i);
                    item.draggable = true;
                    item.on(fairygui.Events.DRAG_START, this, this.OnItemDragStart);
                }
                count = this._list2.numItems;
                for (let i = 0; i < count; ++i) {
                    let item = this._list2.getChildAt(i);
                    item.data = item.name;
                    item.on(fairygui.Events.DROP, this, this.OnItemDrop);
                }
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
            OnJJCBtnClick() {
            }
            OnPHBBtnClick() {
            }
            OnQDBtnClick() {
            }
            OnYXBtnClick() {
            }
            OnItemDragStart(e) {
                let item = fairygui.GObject.cast(e.currentTarget);
                item.stopDrag();
                fairygui.DragDropManager.inst.startDrag(item, item.icon, [item.icon, item.name]);
            }
            OnItemDrop(data, e) {
                let item = fairygui.GObject.cast(e.currentTarget);
                item.icon = data[0];
                item.data = data[1];
            }
            GetSkills() {
                let count = this._list2.numItems;
                let skills = [];
                for (let i = 0; i < count; ++i) {
                    skills.push(this._list2.getChildAt(i).data);
                }
                return skills;
            }
        }
        UI.SkillPanel = SkillPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class UIBattle {
            constructor() {
                fairygui.UIPackage.addPackage("res/ui/battle");
                this._skillGrids = [];
            }
            Dispose() {
            }
            Enter(param) {
                this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
                fairygui.GRoot.inst.addChild(this._root);
                this._root.width = fairygui.GRoot.inst.width;
                this._root.height = fairygui.GRoot.inst.height;
                this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
                this._result = fairygui.UIPackage.createObject("battle", "result").asCom;
                this._result.getChild("n8").onClick(this, () => {
                    UI.UIManager.EnterMain();
                });
                this._mpBar = this._root.getChild("n2").asProgress;
                let p = param;
                for (let i = 0; i < p.team0[0].skills.length; ++i) {
                    let skillGrid = this._root.getChild("c" + i).asCom;
                    let skillId = p.team0[0].skills[i];
                    skillGrid.icon = fairygui.UIPackage.getItemURL("global", skillId);
                    skillGrid.name = skillId;
                    skillGrid.onClick(this, this.OnSkillGridClick);
                    this._skillGrids.push(skillGrid);
                }
                this._battle = new View.CBattle(p);
                this._battle.winHandler = this.HandleBattleWin.bind(this);
                this._battle.SetGraphicRoot(this._root.getChild("n3").asCom);
            }
            Leave() {
                this._skillGrids.splice(0);
                this._battle.Dispose();
                this._battle = null;
                this._result.dispose();
                this._result = null;
                this._root.dispose();
                this._root = null;
            }
            Update(deltaTime) {
                this._battle.Update(deltaTime);
                this._mpBar.max = View.CTower.player.mmp;
                this._mpBar.value = View.CTower.player.mp;
                for (let skillGrid of this._skillGrids) {
                    let skillId = skillGrid.name;
                    skillGrid.grayed = !View.CTower.player.CanUseSkill(skillId);
                    skillGrid.touchable = !skillGrid.grayed;
                }
            }
            OnResize(e) {
            }
            HandleBattleWin(winTeam) {
                this._result.getController("c1").selectedIndex = winTeam == 0 ? 0 : 1;
                this._result.getChild("n10").asTextField.text = winTeam == 0 ? "" + Math.floor(Math.random() * 3000 + 1200) : "" + Math.floor(Math.random() * 500 + 800);
                fairygui.GRoot.inst.addChild(this._result);
            }
            OnSkillGridClick(e) {
                let skillGrid = fairygui.GObject.cast(e.currentTarget);
                let skillId = skillGrid.name;
                View.CTower.player.UseSkill(skillId);
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
                fairygui.UIPackage.addPackage("res/ui/login");
            }
            Dispose() {
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
                UI.UIManager.EnterMain();
            }
            OnRegBtnClick() {
                this._root.getChild("name").asTextField.text = this._root.getChild("reg_name").asTextField.text;
                this._root.getChild("password").asTextField.text = this._root.getChild("reg_password").asTextField.text;
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
                fairygui.UIPackage.addPackage("res/ui/main");
                this._panels = [];
            }
            get root() { return this._root; }
            get zcPanel() { return this._zcPanel; }
            get fbPanel() { return this._fbPanel; }
            get skillPanel() { return this._skillPanel; }
            get phbPanel() { return this._phbPanel; }
            get fbInfoPanel() { return this._fbInfoPanel; }
            get userInfoPanel() { return this._userInfoPanel; }
            get qdPanel() { return this._qdPanel; }
            set panelIndex(value) {
                if (this._controller.selectedIndex == value)
                    return;
                this._panels[this._controller.selectedIndex].Exit();
                this._panels[value].Enter();
                this._controller.selectedIndex = value;
            }
            Dispose() {
            }
            Enter(param) {
                this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
                fairygui.GRoot.inst.addChild(this._root);
                this._root.width = fairygui.GRoot.inst.width;
                this._root.height = fairygui.GRoot.inst.height;
                this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
                this._zcPanel = new UI.ZCPanel(this);
                this._fbPanel = new UI.FBPanel(this);
                this._skillPanel = new UI.SkillPanel(this);
                this._phbPanel = new UI.PHBPanel(this);
                this._fbInfoPanel = new UI.FBInfoPanel(this);
                this._userInfoPanel = new UI.UserInfoPanel(this);
                this._qdPanel = new UI.QDPanel(this);
                this._controller = this._root.getController("c1");
                this._panels.push(this._zcPanel);
                this._panels.push(this._fbPanel);
                this._panels.push(this._skillPanel);
                this._panels.push(this._phbPanel);
                this._panels.push(this._fbInfoPanel);
                this._panels.push(this._userInfoPanel);
                this._panels.push(this._qdPanel);
                this._root.getChild("main_btn").onClick(this, this.OnMainBtnClick);
                this._root.getChild("fuben_btn").onClick(this, this.OnFubenBtnClick);
                this._root.getChild("skill_btn").onClick(this, this.OnSkillBtnClick);
                this._root.getChild("n5").asTextField.text = "" + Math.floor(Math.random() * 30 + 5);
                this._root.getChild("n6").asTextField.text = "" + Math.floor(Math.random() * 10000 + 3000);
                this._root.getChild("n7").asTextField.text = "" + Math.floor(Math.random() * 10000 + 3000);
                this._root.getChild("n8").asTextField.text = "" + Math.floor(Math.random() * 10000 + 3000);
                this._root.getChild("n10").asTextField.text = "" + Math.floor(Math.random() * 10000 + 3000);
                this._root.getChild("n11").asTextField.text = "" + Math.floor(Math.random() * 3000 + 1000);
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
            OnMainBtnClick() {
            }
            OnFubenBtnClick() {
            }
            OnSkillBtnClick() {
            }
            EnterBattle() {
                let param = new Shared.Model.BattleParams();
                param.framesPerKeyFrame = 4;
                param.frameRate = 20;
                param.uid = "user";
                param.id = "m0";
                param.rndSeed = RC.Utils.Timer.utcTime;
                param.team0 = [];
                param.team1 = [];
                let tower = new Shared.Model.EntityParam();
                tower.id = "e0";
                tower.team = 0;
                tower.skills = this._skillPanel.GetSkills();
                param.team0.push(tower);
                tower = new Shared.Model.EntityParam();
                tower.id = "e1";
                tower.team = 0;
                tower.skills = [];
                param.team0.push(tower);
                tower = new Shared.Model.EntityParam();
                tower.id = "e1";
                tower.team = 0;
                tower.skills = [];
                param.team0.push(tower);
                tower = new Shared.Model.EntityParam();
                tower.id = "e0";
                tower.team = 1;
                tower.skills = this._skillPanel.GetSkills();
                param.team1.push(tower);
                tower = new Shared.Model.EntityParam();
                tower.id = "e1";
                tower.team = 1;
                tower.skills = [];
                param.team1.push(tower);
                tower = new Shared.Model.EntityParam();
                tower.id = "e1";
                tower.team = 1;
                tower.skills = [];
                param.team1.push(tower);
                UI.UIManager.EnterBattle(param);
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
            static EnterMain() {
                this.EnterModule(this._main);
            }
            static EnterBattle(param) {
                this.EnterModule(this._battle, param);
            }
        }
        UI.UIManager = UIManager;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class UserInfoPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c5").asCom;
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
        UI.UserInfoPanel = UserInfoPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class ZCPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c0").asCom;
                this._root.getChild("jjc_btn").onClick(this, this.OnJJCBtnClick);
                this._root.getChild("phb_btn").onClick(this, this.OnPHBBtnClick);
                this._root.getChild("qd_btn").onClick(this, this.OnQDBtnClick);
                this._root.getChild("yx_btn").onClick(this, this.OnYXBtnClick);
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
            OnJJCBtnClick() {
                this._owner.panelIndex = 4;
                this._owner.fbInfoPanel.fbID = "fb5";
            }
            OnPHBBtnClick() {
                this._owner.panelIndex = 3;
            }
            OnQDBtnClick() {
                this._owner.panelIndex = 6;
            }
            OnYXBtnClick() {
            }
        }
        UI.ZCPanel = ZCPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
//# sourceMappingURL=game.js.map