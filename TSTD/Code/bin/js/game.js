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
    var FSM;
    (function (FSM) {
        class AbsAction {
            constructor() {
                this.enabled = true;
            }
            get enabled() { return this._enabled; }
            set enabled(value) {
                if (this._enabled == value)
                    return;
                this._enabled = value;
                if (this._enabled)
                    this.OnEnable();
                else
                    this.OnDisable();
            }
            OnEnable() {
            }
            OnDisable() {
            }
            Enter(param) {
                if (!this._enabled)
                    return;
                this.OnEnter(param);
            }
            Exit() {
                if (!this._enabled)
                    return;
                this.OnExit();
            }
            Update(context) {
                if (!this.enabled)
                    return;
                this.OnUpdate(context);
            }
            OnEnter(param) {
            }
            OnExit() {
            }
            OnUpdate(context) {
            }
        }
        FSM.AbsAction = AbsAction;
    })(FSM = Shared.FSM || (Shared.FSM = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var FSM;
    (function (FSM_1) {
        class FSM {
            constructor(owner) {
                this._states = new RC.Collections.Dictionary();
                this._subFSMList = [];
                this._owner = owner;
                this.enabled = true;
            }
            get previousState() { return this._previousState; }
            get globalState() { return this._globalState; }
            get currState() { return this._currState; }
            get owner() { return this._owner; }
            get enabled() { return this._enabled; }
            set enabled(value) {
                if (this._enabled == value)
                    return;
                this._enabled = value;
                if (this._enabled)
                    this.OnEnable();
                else
                    this.OnDisable();
            }
            get parent() { return this._parent; }
            get isRunning() { return this._isRunning; }
            get disposed() { return this._disposed; }
            OnEnable() {
                for (let subFSM of this._subFSMList)
                    subFSM.OnEnable();
            }
            OnDisable() {
                for (let subFSM of this._subFSMList)
                    subFSM.OnDisable();
            }
            Start() {
                if (this._isRunning)
                    return;
                this._isRunning = true;
                for (let subFSM of this._subFSMList)
                    subFSM.Start();
                if (this._globalState != null)
                    this._globalState.Enter(null);
            }
            Stop() {
                if (!this._isRunning)
                    return;
                this._isRunning = false;
                if (this._globalState != null)
                    this._globalState.Exit();
                if (this._currState != null)
                    this._currState.Exit();
                for (let subFSM of this._subFSMList)
                    subFSM.Stop();
            }
            CreateState(type) {
                if (this._states.containsKey(type))
                    console.error(`Specified name '${type}' of component already exists`);
                let state = new FSM_1.FSMState(type, this);
                this._states.setValue(type, state);
                return state;
            }
            DestroyState(type) {
                this._states.remove(type);
            }
            CreateGlobalState(type) {
                if (this.globalState != null)
                    console.error("A global state already exist.");
                if (this._states.containsKey(type))
                    console.error(`Specified name '${type}' of component already exists`);
                this._globalState = new FSM_1.FSMState(type, this);
                if (this._isRunning)
                    this._globalState.Enter(null);
                return this._globalState;
            }
            DestroyGlobalState() {
                this._globalState = null;
            }
            ChangeState(type, force = false, ...param) {
                let state = this._states.getValue(type);
                if (state != null)
                    return this.InternalChangeState(state, force, param);
                console.warn(`State '${type}' not exist.`);
                return false;
            }
            InternalChangeState(state, force = false, param = null) {
                if (!force && this._currState == state)
                    return false;
                this._previousState = this._currState;
                if (this._currState != null)
                    this._currState.Exit();
                this._currState = state;
                if (this._currState != null)
                    this._currState.Enter(param);
                return true;
            }
            RevertToPreviousState() {
                if (this._previousState != null)
                    this.InternalChangeState(this._previousState);
            }
            AddSubFSM(subFSM) {
                subFSM._owner = this._owner;
                subFSM._parent = this;
                subFSM.enabled = this._enabled;
                this._subFSMList.push(subFSM);
            }
            DestroyAllSubFSM() {
                this._subFSMList.splice(0);
            }
            DestroySubFSM(subFSM) {
                this._subFSMList.splice(this._subFSMList.indexOf(subFSM), 1);
            }
            SubFSMCount() {
                return this._subFSMList.length;
            }
            GetSubFsm(index) {
                return this._subFSMList[index];
            }
            GetState(type) {
                return this._states.getValue(type);
            }
            StateCount() {
                return this._states.size();
            }
            Update(context) {
                if (!this._isRunning || !this._enabled)
                    return;
                if (this._globalState != null)
                    this._globalState.Update(context);
                if (this._currState != null)
                    this._currState.Update(context);
                for (let subFSM of this._subFSMList)
                    subFSM.Update(context);
            }
        }
        FSM_1.FSM = FSM;
    })(FSM = Shared.FSM || (Shared.FSM = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var FSM;
    (function (FSM) {
        class FSMState {
            constructor(type, fsm) {
                this._actions = [];
                this._typeToAction = new RC.Collections.Dictionary();
                this._type = type;
                this._fsm = fsm;
            }
            get type() { return this._type; }
            get fsm() { return this._fsm; }
            Enter(param) {
                for (let action of this._actions)
                    action.Enter(param);
            }
            Exit() {
                for (let action of this._actions)
                    action.Exit();
            }
            Update(context) {
                for (let action of this._actions)
                    action.Update(context);
            }
            CreateAction(c) {
                let action = new c();
                action.state = this;
                this._actions.push(action);
                this._typeToAction.setValue(c, action);
                return action;
            }
            GetAction(c) {
                return this._typeToAction.getValue(c);
            }
            DestroyAction(c) {
                let action = this._typeToAction.remove(c);
                this._actions.splice(this._actions.indexOf(action), 1);
            }
        }
        FSM.FSMState = FSMState;
    })(FSM = Shared.FSM || (Shared.FSM = {}));
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
                this.scale = RC.Utils.Hashtable.GetVec2(def, "scale");
                if (this.scale == null)
                    this.scale = RC.Numerics.Vec2.one;
                this.radius = RC.Utils.Hashtable.GetNumber(def, "radius");
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
                this.duration = RC.Utils.Hashtable.GetNumber(def, "duration");
                this.hit = RC.Utils.Hashtable.GetNumber(def, "hit");
                this.targetMode = RC.Utils.Hashtable.GetNumber(def, "target_mode");
                this.targetFilter = RC.Utils.Hashtable.GetNumber(def, "target_filter");
                this.fx = RC.Utils.Hashtable.GetString(def, "fx");
                this.missile = RC.Utils.Hashtable.GetString(def, "missile");
                this.summon = RC.Utils.Hashtable.GetString(def, "summon");
                this.summonPos = RC.Utils.Hashtable.GetVec2Array(def, "summon_pos");
                this.summonFx = RC.Utils.Hashtable.GetString(def, "summon_fx");
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
            this._tileMap = new View.CTileMap(this._data.model);
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
        get tileMap() { return this._tileMap; }
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
                let team0 = param.team0[i];
                let tower = this.CreateTower(team0.id, team0.team, team0.skills);
                let arr = this._data.towerPos[0][i];
                tower.position = new RC.Numerics.Vec2(arr[0], arr[1]);
                if (i == 0)
                    View.CTower.player = tower.rid;
                else
                    tower.CreateAI();
            }
            for (let i = 0; i < param.team1.length; ++i) {
                let team1 = param.team1[i];
                let tower = this.CreateTower(team1.id, team1.team, team1.skills);
                let arr = this._data.towerPos[1][i];
                tower.position = new RC.Numerics.Vec2(arr[0], arr[1]);
                tower.CreateAI();
            }
        }
        CreateTower(id, team, skills) {
            let param = new Shared.Model.EntityParam();
            param.id = id;
            param.rid = Shared.Utils.MakeRIDFromID(param.id);
            param.team = team;
            param.skills = skills;
            let entity = this._entityManager.Create(View.CTower, param);
            return entity;
        }
        CreateChampion(id, team, skills) {
            let param = new Shared.Model.EntityParam();
            param.id = id;
            param.rid = Shared.Utils.MakeRIDFromID(param.id);
            param.team = team;
            param.skills = skills;
            param.rid = Shared.Utils.MakeRIDFromID(param.id);
            let entity = this._entityManager.Create(View.CChampion, param);
            return entity;
        }
        CreateMissile(id) {
            let param = new Shared.Model.EntityParam();
            param.id = id;
            param.rid = Shared.Utils.MakeRIDFromID(param.id);
            let entity = this._entityManager.Create(View.Missile, param);
            return entity;
        }
        CreateEffect(id) {
            let param = new Shared.Model.EntityParam();
            param.id = id;
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
        UpdateState(context) {
            this.InternalUpdateState(context);
        }
        InternalUpdateState(context) {
        }
        CreateGraphic() {
            this._graphic = this._owner.graphicManager.CreateGraphic(View.EntityGraphic);
            this._graphic.Load(this._data.model);
            this._graphic.scale = this._data.scale;
            this._graphic.position = this._position;
            this._graphic.direction = this._direction;
        }
    }
    View.CEntity = CEntity;
})(View || (View = {}));
var View;
(function (View) {
    class CTower extends View.CEntity {
        get radius() { return this._data.radius; }
        get mhp() { return this._data.mhp; }
        get mmp() { return this._data.mmp; }
        get mp() { return this._mp; }
        get hp() { return this._hp; }
        set hp(value) {
            if (value == this._hp)
                return;
            this._hp = value;
            this.graphic.SetHP(this._data.mhp, this.hp);
        }
        get isDead() { return this._hp <= 0; }
        get team() { return this._team; }
        get numSkills() { return this._skills.size; }
        OnCreated(owner, param) {
            super.OnCreated(owner, param);
            this._team = param.team;
            this._mp = this._data.mp;
            this._skills = new Map();
            for (let skillId of this._data.skills) {
                let skill = new View.CSkill(this, skillId);
                this._skills.set(skillId, skill);
            }
            if (param.skills != null) {
                for (let skillId of param.skills) {
                    if (this._skills.has(skillId))
                        continue;
                    let skill = new View.CSkill(this, skillId);
                    this._skills.set(skillId, skill);
                }
            }
            this.direction = this._team == 0 ? RC.Numerics.Vec2.down : RC.Numerics.Vec2.up;
            this.graphic.ShowHUD();
            this.hp = this._data.mhp;
        }
        UpdateState(context) {
            this.InternalUpdateState(context);
        }
        InternalUpdateState(context) {
            super.InternalUpdateState(context);
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
            let skill = this._skills.get(skillId);
            if (target == null) {
                target = skill.RandomGetTarget();
            }
            if (target == null)
                return;
            this._mp -= skill.cmp;
            if (skill.fx != null && skill.fx != "") {
                let fx = this._owner.CreateEffect(skill.fx);
                fx.Begin2(this, target);
            }
            if (skill.missile == null || skill.missile == "") {
                this.MakeFightContext(skillId, target.rid);
            }
            else {
                let missile = this._owner.CreateMissile(skill.missile);
                missile.Begin(skill, this, target);
            }
            if (skill.summon != null && skill.summon != "") {
                let summon = this._owner.CreateChampion(skill.summon, this.team);
                summon.position = skill.summonPos[Math.floor(Math.random() * skill.summonPos.length)];
                summon.CreateAI();
                if (skill.summonFx != null && skill.summonFx != "") {
                    let fx = this._owner.CreateEffect(skill.summonFx);
                    fx.Begin2(this, summon);
                }
            }
        }
        MakeFightContext(skillId, target) {
            let skill = this.GetSkill(skillId);
            let fightContext = new View.FightContext(skillId, this.rid, target);
            this._owner.fightHandler.Add(fightContext);
        }
        OnDead() {
            this.MarkToDestroy();
        }
    }
    View.CTower = CTower;
})(View || (View = {}));
var View;
(function (View) {
    class CChampion extends View.CTower {
        get speed() { return this._data.speed; }
        OnCreated(owner, param) {
            super.OnCreated(owner, param);
            this._graphic.Stop();
        }
        InternalUpdateState(context) {
            super.InternalUpdateState(context);
            if (this._destroyTime != undefined) {
                if (context.time >= this._destroyTime) {
                    this.MarkToDestroy();
                    this._destroyTime = undefined;
                }
            }
        }
        PlayRun() {
            this._graphic.Play(6, 13, -1, 6);
        }
        PlayFight() {
            this._graphic.Play(0, 5, 1, 0);
        }
        OnDead() {
            this._graphic.Play(13, 14, 1, 14, new laya.utils.Handler(this, () => {
                this._destroyTime = this.owner.time + CChampion.DELAY_DESTROY;
            }));
        }
    }
    CChampion.DELAY_DESTROY = 3000;
    View.CChampion = CChampion;
})(View || (View = {}));
var View;
(function (View) {
    class CChampionAI {
        constructor(owner) {
            this._owner = owner;
            this._fsm = new Shared.FSM.FSM(this);
            let idleState = this._fsm.CreateState(View.Actions.FSMStateType.IDLE);
            idleState.CreateAction(View.Actions.Idle);
            let seekState = this._fsm.CreateState(View.Actions.FSMStateType.SEEK);
            seekState.CreateAction(View.Actions.Seek);
            let attackState = this._fsm.CreateState(View.Actions.FSMStateType.ATTACK);
            attackState.CreateAction(View.Actions.Attack);
            this._fsm.Start();
            this._fsm.ChangeState(View.Actions.FSMStateType.SEEK);
        }
        get owner() { return this._owner; }
        Update(context) {
            if (this.owner.isDead)
                return;
            this._fsm.Update(context);
        }
    }
    View.CChampionAI = CChampionAI;
})(View || (View = {}));
var View;
(function (View) {
    let EffectFollowMode;
    (function (EffectFollowMode) {
        EffectFollowMode[EffectFollowMode["None"] = 0] = "None";
        EffectFollowMode[EffectFollowMode["Caster"] = 1] = "Caster";
        EffectFollowMode[EffectFollowMode["Target"] = 2] = "Target";
        EffectFollowMode[EffectFollowMode["FollowCster"] = 3] = "FollowCster";
        EffectFollowMode[EffectFollowMode["FollowTarget"] = 4] = "FollowTarget";
    })(EffectFollowMode = View.EffectFollowMode || (View.EffectFollowMode = {}));
    class CEffect extends View.CEntity {
        get followMode() { return this._data.followMode; }
        Begin(position) {
            this.position = position;
            if (this._data.duration <= 0)
                this._graphic.Play(0, -1, 1, -1, new laya.utils.Handler(this, this.OnPlayComplete));
            else {
                this._graphic.Play(0, -1, 0);
                this._endTime = this._owner.time + this._data.duration;
            }
        }
        Begin2(caster, target) {
            switch (this.followMode) {
                case EffectFollowMode.Caster:
                case EffectFollowMode.FollowCster:
                    this.Begin(caster.position);
                    break;
                case EffectFollowMode.Target:
                case EffectFollowMode.FollowTarget:
                    this.Begin(target.position);
                    break;
            }
            switch (this.followMode) {
                case EffectFollowMode.FollowCster:
                    this._follow = caster.rid;
                    break;
                case EffectFollowMode.FollowTarget:
                    this._follow = target.rid;
                    break;
            }
        }
        OnPlayComplete() {
            this._graphic.Stop();
            this.MarkToDestroy();
        }
        InternalUpdateState(context) {
            super.InternalUpdateState(context);
            if (this._follow != null && this._follow != "") {
                let follow = this.owner.entityManager.GetEntity(this._follow);
                if (follow != null) {
                    this.position = follow.position;
                }
            }
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
        GetTargetsByTeam(team) {
            let towers = [];
            for (let entity of this._entities) {
                if (!(entity instanceof View.CTower))
                    continue;
                let tower = entity;
                if (tower.isDead || tower.team != team)
                    continue;
                towers.push(tower);
            }
            return towers;
        }
        GetEntityAt(index) {
            if (index < 0 ||
                index > this._entities.length - 1)
                return null;
            return this._entities[index];
        }
        GetEnemyNearby(entity) {
            let nearest = null;
            let minDist = RC.Numerics.MathUtils.MAX_VALUE;
            for (let e of this._entities) {
                if (!(e instanceof View.CTower))
                    continue;
                let target = e;
                if (target.isDead || target.team == entity.team)
                    continue;
                let dist = RC.Numerics.Vec2.DistanceSquared(entity.position, target.position);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = target;
                }
            }
            return nearest;
        }
        Update(context) {
            this.UpdateState(context);
        }
        UpdateAgterFight(context) {
            this.DestroyEnties();
        }
        UpdateState(context) {
            this._entities.forEach((entity) => {
                entity.UpdateState(context);
            });
        }
    }
    View.CEntityManager = CEntityManager;
})(View || (View = {}));
var View;
(function (View) {
    let SkillTargetMode;
    (function (SkillTargetMode) {
        SkillTargetMode[SkillTargetMode["Undefine"] = 0] = "Undefine";
        SkillTargetMode[SkillTargetMode["Teammate"] = 1] = "Teammate";
        SkillTargetMode[SkillTargetMode["Opponent"] = 2] = "Opponent";
    })(SkillTargetMode = View.SkillTargetMode || (View.SkillTargetMode = {}));
    let SkillTargetFilter;
    (function (SkillTargetFilter) {
        SkillTargetFilter[SkillTargetFilter["None"] = 0] = "None";
        SkillTargetFilter[SkillTargetFilter["MaxHp"] = 1] = "MaxHp";
        SkillTargetFilter[SkillTargetFilter["MinHp"] = 2] = "MinHp";
    })(SkillTargetFilter = View.SkillTargetFilter || (View.SkillTargetFilter = {}));
    class CSkill {
        constructor(owner, id) {
            this._owner = owner;
            this._data = Shared.Model.ModelFactory.GetSkillData(id);
        }
        get id() { return this._data.id; }
        get cmp() { return this._data.cmp; }
        get damage() { return this._data.damage; }
        get duration() { return this._data.duration; }
        get hit() { return this._data.hit; }
        get targetMode() { return this._data.targetMode; }
        get targetFilter() { return this._data.targetFilter; }
        get fx() { return this._data.fx; }
        get missile() { return this._data.missile; }
        get summon() { return this._data.summon; }
        get summonPos() { return this._data.summonPos; }
        get summonFx() { return this._data.summonFx; }
        RandomGetTarget() {
            let team = this.targetMode == SkillTargetMode.Teammate ? this._owner.team : 1 - this._owner.team;
            let targets = this._owner.owner.entityManager.GetTargetsByTeam(team);
            switch (this.targetFilter) {
                case SkillTargetFilter.None:
                    return targets[Math.floor(Math.random() * targets.length)];
                case SkillTargetFilter.MaxHp: {
                    let max = RC.Numerics.MathUtils.MIN_VALUE;
                    let target = null;
                    for (let curTarget of targets) {
                        let p = curTarget.hp / curTarget.mhp;
                        if (p > max) {
                            max = p;
                            target = curTarget;
                        }
                    }
                    return target;
                }
                case SkillTargetFilter.MinHp: {
                    let min = RC.Numerics.MathUtils.MAX_VALUE;
                    let target = null;
                    for (let curTarget of targets) {
                        let p = curTarget.hp / curTarget.mhp;
                        if (p < min) {
                            min = p;
                            target = curTarget;
                        }
                    }
                    return target;
                }
            }
        }
    }
    View.CSkill = CSkill;
})(View || (View = {}));
var View;
(function (View) {
    class CTileMap {
        constructor(id) {
            id = id + "_data";
            this._mapData = [];
            let image = fairygui.UIPackage.createObject("global", id);
            let texture = image.image.tex;
            let pixels = texture.getPixels(0, 0, texture.width, texture.height);
            for (let i = 0; i < pixels.length; i += 4) {
                this._mapData.push(pixels[i]);
            }
            image.dispose();
            this._graph = RC.Algorithm.Graph.Graph2D.CreateFullDigraph(texture.height, texture.width, this.GetCost.bind(this));
        }
        GetCost(index) {
            return this._mapData[index];
        }
        AStarSearch(from, to) {
            return RC.Algorithm.Graph.GraphSearcher.AStarSearch(this._graph, from, to);
        }
        CoordToIndex(x, y) {
            return this._graph.CoordToIndex(RC.Numerics.MathUtils.Floor(x), RC.Numerics.MathUtils.Floor(y));
        }
        IndexToCoord(index) {
            let arr = this._graph.IndexToCoord(index);
            return new RC.Numerics.Vec2(arr[0], arr[1]);
        }
    }
    View.CTileMap = CTileMap;
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
            let target = skill.RandomGetTarget();
            this._owner.UseSkill(skill.id, target);
            this._nextUseSkillTime = context.time + Math.floor((Math.random() * 2.0 + 1.2) * 1000);
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
        get scale() { return new RC.Numerics.Vec2(this._modelContainer.scaleX, this._modelContainer.scaleY); }
        set scale(value) { this._modelContainer.setScale(value.x, value.y); }
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
                    target.OnDead();
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
    class FSMStateType {
    }
    View.FSMStateType = FSMStateType;
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
            let dist = RC.Numerics.Vec2.Distance(this._lastPos, this.position);
            if (dist != 0)
                this.direction = RC.Numerics.Vec2.DivN(RC.Numerics.Vec2.Sub(this._lastPos, this.position), dist);
            this.PlayAni();
        }
        End() {
            this._graphic.Stop();
            this.MarkToDestroy();
            if (this._data.dfx != null && this._data.dfx != "") {
                let fx = this._owner.CreateEffect(this._data.dfx);
                fx.Begin(this.position);
            }
            let caster = this._owner.entityManager.GetEntity(this._caster);
            if (caster == null)
                return;
            caster.MakeFightContext(this._skill, this._target);
        }
        InternalUpdateState(context) {
            super.InternalUpdateState(context);
            let dist = RC.Numerics.Vec2.Distance(this._lastPos, this.position);
            if (dist != 0)
                this.direction = RC.Numerics.Vec2.DivN(RC.Numerics.Vec2.Sub(this._lastPos, this.position), dist);
            let expectTime = dist * 1000 / this._data.speed;
            let curPos = RC.Numerics.Vec2.Lerp(this.position, this._lastPos, context.deltaTime / expectTime);
            this.position = curPos;
            if (RC.Numerics.Vec2.DistanceSquared(curPos, this._lastPos) < 0.1) {
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
    var Actions;
    (function (Actions) {
        class CChampionAIAction extends Shared.FSM.AbsAction {
            get owner() { return this.state.fsm.owner; }
        }
        Actions.CChampionAIAction = CChampionAIAction;
    })(Actions = View.Actions || (View.Actions = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Actions;
    (function (Actions) {
        class Attack extends Actions.CChampionAIAction {
            OnEnter(param) {
                let self = this.owner.owner;
                self.PlayFight();
                let enemy = self.owner.entityManager.GetEntity(param[0]);
                if (enemy == null) {
                    this.state.fsm.ChangeState(Actions.FSMStateType.SEEK);
                    return;
                }
                let skill = self.RandomGetUsableSkill();
                this._endTime = self.owner.time + skill.duration;
                this._hitTime = self.owner.time + skill.hit;
                this._skill = skill.id;
                this._target = enemy.rid;
            }
            OnExit() {
            }
            OnUpdate(context) {
                if (context.time >= this._hitTime) {
                    this.owner.owner.MakeFightContext(this._skill, this._target);
                    this._hitTime = RC.Numerics.MathUtils.MAX_VALUE;
                }
                if (context.time >= this._endTime) {
                    this.state.fsm.ChangeState(Actions.FSMStateType.SEEK);
                }
            }
        }
        Actions.Attack = Attack;
    })(Actions = View.Actions || (View.Actions = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Actions;
    (function (Actions) {
        class FSMStateType {
        }
        FSMStateType.IDLE = 0;
        FSMStateType.SEEK = 1;
        FSMStateType.ATTACK = 2;
        Actions.FSMStateType = FSMStateType;
    })(Actions = View.Actions || (View.Actions = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Actions;
    (function (Actions) {
        class Idle extends Actions.CChampionAIAction {
            OnEnter(param) {
                this.owner.owner.graphic.Stop();
            }
            OnExit() {
            }
            OnUpdate(context) {
            }
        }
        Actions.Idle = Idle;
    })(Actions = View.Actions || (View.Actions = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Actions;
    (function (Actions) {
        class Seek extends Actions.CChampionAIAction {
            constructor() {
                super();
                this._lastEnemyPos = RC.Numerics.Vec2.zero;
            }
            OnEnter(param) {
                this.PlanningPath();
                if (this._path == null || this._path.length == 1) {
                    this.WalkComplete();
                    return;
                }
                this.owner.owner.PlayRun();
            }
            OnExit() {
                this._path = null;
            }
            OnUpdate(context) {
                this.PlanningPath();
                this.WalkPath(context.deltaTime);
            }
            PlanningPath() {
                let self = this.owner.owner;
                let enemy = self.owner.entityManager.GetEnemyNearby(self);
                if (enemy == null)
                    return;
                let ownerPos = self.position;
                let enemyPos = enemy.position;
                let dist = RC.Numerics.Vec2.Distance(enemyPos, ownerPos);
                let dir = RC.Numerics.Vec2.DivN(RC.Numerics.Vec2.Sub(enemy.position, self.position), dist);
                enemyPos.Sub(dir.MulN(enemy.radius));
                if (enemy.rid != this._lastEnemy || !RC.Numerics.Vec2.Equals(this._lastEnemyPos, enemyPos)) {
                    if (dist <= enemy.radius) {
                        self.direction = dir;
                    }
                    else {
                        let from = self.owner.tileMap.CoordToIndex(ownerPos.x, ownerPos.y);
                        let to = self.owner.tileMap.CoordToIndex(enemyPos.x, enemyPos.y);
                        this._path = self.owner.tileMap.AStarSearch(from, to);
                    }
                    this._lastEnemy = enemy.rid;
                    this._lastEnemyPos.CopyFrom(enemyPos);
                }
            }
            WalkPath(dt) {
                if (this._path.length <= 1) {
                    this.WalkComplete();
                    return;
                }
                let self = this.owner.owner;
                let ownerPos = self.position;
                let nextPos = self.owner.tileMap.IndexToCoord(this._path[1]);
                let dist = RC.Numerics.Vec2.Distance(ownerPos, nextPos);
                self.direction = RC.Numerics.Vec2.DivN(RC.Numerics.Vec2.Sub(nextPos, self.position), dist);
                let expectTime = dist * 1000 / self.speed;
                let curPos = RC.Numerics.Vec2.Lerp(ownerPos, nextPos, dt / expectTime);
                if (RC.Numerics.Vec2.DistanceSquared(curPos, nextPos) < 0.1) {
                    this._path.shift();
                }
                self.position = curPos;
            }
            WalkComplete() {
                this.state.fsm.ChangeState(View.Actions.FSMStateType.ATTACK, true, this._lastEnemy);
            }
        }
        Actions.Seek = Seek;
    })(Actions = View.Actions || (View.Actions = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class FightPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c6").asCom;
                this._gesture = new UI.GestureComponent(this._root);
            }
            Dispose() {
                this._gesture.Dispose();
            }
            Enter() {
                this._gesture.Enter();
            }
            Exit() {
                this._gesture.Exit();
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
        class GestureComponent {
            constructor(root) {
                this._root = root;
                this._line = this._root.getChild("line").asCom;
                this._keypad = this._root.getChild("keypad").asCom;
                this._keypad.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
                this._keys = [];
                for (let i = 0; i < 9; ++i) {
                    this._keys.push(new UI.KeyComponent(this._keypad.getChild("n" + i).asCom, i));
                }
                this._keyRadius = this._keys[0].width * 0.5;
                this._keyLine = new UI.KeyLineComponent();
                this._touched = [];
                this._lines = [];
            }
            Dispose() {
                this._keyLine.Dispose();
            }
            Enter() {
                let graph = RC.Algorithm.Graph.Graph2D.CreateFullDigraph(3, 3);
                let path = RC.Algorithm.Graph.GraphSearcher.MazeSearch(graph, 0, 7, RC.Numerics.MathUtils.Random);
                for (let p of path)
                    this._keys[p].selectedIndex = 1;
                for (let i = 0; i < path.length - 1; ++i) {
                    let curPoint = graph.IndexToCoord(path[i]);
                    let nextPoint = graph.IndexToCoord(path[i + 1]);
                    let curPos = new RC.Numerics.Vec2(curPoint[0], curPoint[1]);
                    let nextPos = new RC.Numerics.Vec2(nextPoint[0], nextPoint[1]);
                    let dir = RC.Numerics.Vec2.Sub(nextPos, curPos);
                    dir.Normalize();
                    let angle = RC.Numerics.Vec2.Dot(RC.Numerics.Vec2.up, dir);
                    angle = RC.Numerics.MathUtils.Clamp(angle, -1, 1);
                    angle = RC.Numerics.MathUtils.RadToDeg(RC.Numerics.MathUtils.Acos(angle));
                    let sign = dir.x > 0 ? -1 : 1;
                    this._keys[path[i]].rotation = angle * sign;
                }
                this._path = path;
            }
            Exit() {
                for (let key of this._keys) {
                    key.touched = false;
                    key.selectedIndex = 0;
                }
                this._touched.splice(0);
                for (let line of this._lines)
                    line.dispose();
                this._lines.splice(0);
            }
            Update(deltaTime) {
            }
            OnResize(e) {
            }
            OnTouchBegin(e) {
                fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
                fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
            }
            OnTouchMove(e) {
                let p = this._keypad.globalToLocal(e.stageX, e.stageY);
                let v = new RC.Numerics.Vec2(p.x, p.y);
                let key = this.PointOverKey(v, this._keyRadius);
                if (key != null && this._touched.indexOf(key) < 0) {
                    key.touched = true;
                    if (this._touched.length > 0)
                        this.UpdateVisual(key, this._touched[this._touched.length - 1]);
                    this._touched.push(key);
                    this._keyLine.AttachTo(key);
                    if (this._touched.length == this._path.length) {
                        this.HandleTouchEnd();
                        return;
                    }
                }
                this._keyLine.UpdateVisual(v);
            }
            OnTouchEnd(e) {
                this.HandleTouchEnd();
            }
            HandleTouchEnd() {
                fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
                fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
                this._keyLine.Detach();
                if (this._touched.length != this._path.length)
                    this.HandleIncorrectGesture();
                else {
                    let pass = true;
                    for (let i = 0; i < this._path.length; ++i) {
                        if (this._path[i] != this._touched[i].id) {
                            pass = false;
                            break;
                        }
                    }
                    if (pass)
                        this.HandleCorrectGesture();
                    else
                        this.HandleIncorrectGesture();
                }
            }
            HandleCorrectGesture() {
                console.log("t");
            }
            HandleIncorrectGesture() {
                console.log("f");
            }
            UpdateVisual(key, lastKey) {
                let line = fairygui.UIPackage.createObject("main", "key_line").asCom;
                this._lines.push(line);
                line.setXY(lastKey.x, lastKey.y);
                this._line.addChild(line);
                let orgiPos = new RC.Numerics.Vec2(lastKey.x, lastKey.y);
                let curPos = new RC.Numerics.Vec2(key.x, key.y);
                let vec = RC.Numerics.Vec2.Sub(curPos, orgiPos);
                let dist = vec.Magnitude();
                line.height = dist;
                if (dist == 0)
                    return;
                let dir = RC.Numerics.Vec2.DivN(vec, dist);
                let angle = RC.Numerics.Vec2.Dot(RC.Numerics.Vec2.up, dir);
                angle = RC.Numerics.MathUtils.Clamp(angle, -1, 1);
                angle = RC.Numerics.MathUtils.RadToDeg(RC.Numerics.MathUtils.Acos(angle));
                let sign = dir.x > 0 ? -1 : 1;
                line.rotation = angle * sign;
            }
            ClearKeypadsStates() {
                for (let key of this._keys)
                    key.touched = false;
            }
            PointOverKey(v, radius) {
                let r2 = radius * radius;
                for (let key of this._keys) {
                    let dx = v.x - key.x;
                    let dy = v.y - key.y;
                    if (dx * dx + dy * dy < r2) {
                        return key;
                    }
                }
                return null;
            }
        }
        UI.GestureComponent = GestureComponent;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class KeyComponent {
            constructor(com, id) {
                this._com = com;
                this._id = id;
                this._controller = this._com.getController("c1");
            }
            get id() { return this._id; }
            get parent() { return this._com.parent; }
            get x() { return this._com.x; }
            get y() { return this._com.y; }
            get width() { return this._com.width; }
            set width(value) { this._com.width = value; }
            get height() { return this._com.height; }
            set height(value) { this._com.height = value; }
            get selectedIndex() { return this._controller.selectedIndex; }
            set selectedIndex(value) { this._controller.selectedIndex = value; }
            get rotation() { return this._com.rotation; }
            set rotation(value) { this._com.rotation = value; }
            get touched() { return this._touched; }
            set touched(value) {
                if (this._touched == value)
                    return;
                this._touched = true;
                this._com.getChild("n0").asCom.getController("c1").selectedIndex = this._touched ? 1 : 0;
                this._com.getChild("n1").asCom.getController("c1").selectedIndex = this._touched ? 1 : 0;
            }
            AddChild(child) {
                this._com.addChild(child);
            }
            RemoveChild(child) {
                this._com.removeChild(child);
            }
        }
        UI.KeyComponent = KeyComponent;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class KeyLineComponent {
            constructor() {
                this._com = fairygui.UIPackage.createObject("main", "key_line").asCom;
            }
            Dispose() {
                this._com.dispose();
            }
            AttachTo(key) {
                this.Detach();
                key.parent.addChild(this._com);
                this._com.setXY(key.x, key.y);
                this._attached = key;
            }
            Detach() {
                if (this._com.parent != null)
                    this._com.parent.removeChild(this._com);
            }
            UpdateVisual(v) {
                let orgiPos = new RC.Numerics.Vec2(this._attached.x, this._attached.y);
                let curPos = new RC.Numerics.Vec2(v.x, v.y);
                let vec = RC.Numerics.Vec2.Sub(curPos, orgiPos);
                let dist = vec.Magnitude();
                this._com.height = dist;
                if (dist == 0)
                    return;
                let dir = RC.Numerics.Vec2.DivN(vec, dist);
                let angle = RC.Numerics.Vec2.Dot(RC.Numerics.Vec2.up, dir);
                angle = RC.Numerics.MathUtils.Clamp(angle, -1, 1);
                angle = RC.Numerics.MathUtils.RadToDeg(RC.Numerics.MathUtils.Acos(angle));
                let sign = dir.x > 0 ? -1 : 1;
                this._com.rotation = angle * sign;
            }
        }
        UI.KeyLineComponent = KeyLineComponent;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class LingshouPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c4").asCom;
                this._list = this._root.getChild("list").asList;
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
        UI.LingshouPanel = LingshouPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class MsgPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c1").asCom;
                this._list = this._root.getChild("list").asList;
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
        class SearchPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c2").asCom;
                this._root.getChild("back_btn").onClick(this, this.OnBackBtnClick);
                this._root.getChild("atk_btn").onClick(this, this.OnAtkBtnClick);
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
            OnBackBtnClick(e) {
                this._owner.panelIndex = 0;
            }
            OnAtkBtnClick(e) {
                this._owner.panelIndex = 6;
            }
        }
        UI.SearchPanel = SearchPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class TaskPabel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c3").asCom;
                this._list = this._root.getChild("list").asList;
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
        UI.TaskPabel = TaskPabel;
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
                this._mp = this._root.getChild("mp").asTextField;
                let p = param[0];
                let n = param[1];
                for (let i = 0; i < p.team0[0].skills.length; ++i) {
                    let skillGrid = this._root.getChild("c" + i).asCom;
                    let skillId = p.team0[0].skills[i];
                    let skillData = Shared.Model.ModelFactory.GetSkillData(skillId);
                    skillGrid.icon = fairygui.UIPackage.getItemURL("global", n[i]);
                    skillGrid.data = skillId;
                    skillGrid.getChild("mp").asTextField.text = "" + skillData.cmp;
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
                let player = this.GetPlayer();
                if (player == null)
                    return;
                this._mpBar.max = player.mmp;
                this._mpBar.value = player.mp;
                this._mp.text = "" + RC.Numerics.MathUtils.Floor(player.mp);
                for (let skillGrid of this._skillGrids) {
                    let skillId = skillGrid.data;
                    skillGrid.grayed = !player.CanUseSkill(skillId);
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
            GetPlayer() {
                let player = this._battle.entityManager.GetEntity(View.CTower.player);
                if (player == null)
                    return null;
                return player;
            }
            OnSkillGridClick(e) {
                let skillGrid = fairygui.GObject.cast(e.currentTarget);
                let skillId = skillGrid.data;
                let player = this.GetPlayer();
                if (player == null)
                    return;
                player.UseSkill(skillId);
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
                this._root.getChild("enter_btn").onClick(this, this.OnEnterBtnClick);
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
            OnEnterBtnClick() {
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
            get msgPanel() { return this._msgPanel; }
            get searchPanel() { return this._searchPanel; }
            get taskPanel() { return this._taskPanel; }
            get userInfoPanel() { return this._userInfoPanel; }
            get linghouPanel() { return this._lingshouPanel; }
            get fightPanel() { return this._fightPanel; }
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
                this._msgPanel = new UI.MsgPanel(this);
                this._searchPanel = new UI.SearchPanel(this);
                this._taskPanel = new UI.TaskPabel(this);
                this._lingshouPanel = new UI.LingshouPanel(this);
                this._userInfoPanel = new UI.UserInfoPanel(this);
                this._fightPanel = new UI.FightPanel(this);
                this._controller = this._root.getController("c1");
                this._panels.push(this._zcPanel);
                this._panels.push(this._msgPanel);
                this._panels.push(this._searchPanel);
                this._panels.push(this._taskPanel);
                this._panels.push(this._lingshouPanel);
                this._panels.push(this._userInfoPanel);
                this._panels.push(this._fightPanel);
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
            static EnterBattle(...param) {
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
                let hp = Math.floor(Math.random() * 10000 + 3000);
                let exp = Math.floor(Math.random() * 10000 + 3000);
                this._root.getChild("lvl").asTextField.text = "" + Math.floor(Math.random() * 30 + 5);
                this._root.getChild("hp").asTextField.text = `${hp}/${hp}`;
                this._root.getChild("exp").asTextField.text = `${exp}/${exp}`;
                this._root.getChild("atk").asTextField.text = "" + Math.floor(Math.random() * 10000 + 3000);
                this._root.getChild("n34").asProgress.max = hp;
                this._root.getChild("n34").asProgress.value = hp;
                this._root.getChild("n37").asProgress.max = exp;
                this._root.getChild("n37").asProgress.value = exp;
                this._root.getChild("n33").onClick(this, this.OnImageBtnClick);
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
            OnImageBtnClick(e) {
                this._owner.panelIndex = 5;
            }
        }
        UI.ZCPanel = ZCPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
//# sourceMappingURL=game.js.map