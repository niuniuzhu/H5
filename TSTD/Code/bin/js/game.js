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
                this.type = RC.Utils.Hashtable.GetString(def, "type");
                this.model = RC.Utils.Hashtable.GetString(def, "model");
                this.icon = RC.Utils.Hashtable.GetString(def, "icon");
                let map = RC.Utils.Hashtable.GetMap(def, "actions");
                this.dup = new RC.Collections.Dictionary();
                this.ddown = new RC.Collections.Dictionary();
                for (let key in map) {
                    let arr = map[key];
                    let eaction = new EAction();
                    eaction.name = key;
                    eaction.start = arr[0] - 1;
                    eaction.end = arr[1] - 1;
                    this.dup.setValue(key, eaction);
                    eaction = new EAction();
                    eaction.name = key;
                    eaction.start = arr[2] - 1;
                    eaction.end = arr[3] - 1;
                    this.ddown.setValue(key, eaction);
                }
            }
        }
        Model.EntityData = EntityData;
        class EAction {
        }
        Model.EAction = EAction;
    })(Model = Shared.Model || (Shared.Model = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var Model;
    (function (Model) {
        class ModelFactory {
            static GetEntityData(id) {
                let data = this.ENTITY_DATA.getValue(id);
                if (data != null)
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
    class CPets {
        constructor(id, container, team) {
            this.id = id;
            let def = Shared.Model.ModelFactory.GetEntityData(this.id);
            this._model = def.model;
            this._dup = def.dup;
            this._ddown = def.ddown;
            this._team = team;
            this._root = fairygui.UIPackage.createObject("global", this._model).asMovieClip;
            container.addChild(this._root);
            this._root.setPivot(0.5, 0.5);
            this._root.center();
            this._root.playing = false;
            this.Idle();
        }
        Dispose() {
            this._root.dispose();
        }
        GetAction(name) {
            let d = this._team == 0 ? this._dup : this._ddown;
            return d.getValue(name);
        }
        Idle() {
            let action = this.GetAction("idle");
            this._root.setPlaySettings(action.start, action.end, 0);
            this._root.playing = true;
        }
        Attack(completeHandler) {
            let action = this.GetAction("atk");
            this._root.setPlaySettings(action.start, action.end, 1, action.start, new laya.utils.Handler(this, () => {
                this.Idle();
                completeHandler();
            }));
            this._root.playing = true;
        }
        Die() {
            let action = this.GetAction("die");
            this._root.setPlaySettings(action.start, action.end, 0);
            this._root.playing = true;
        }
    }
    View.CPets = CPets;
})(View || (View = {}));
var View;
(function (View) {
    class CUser {
    }
    View.CUser = CUser;
})(View || (View = {}));
var View;
(function (View) {
    class Fight {
        get player() { return this._player; }
        get opponent() { return this._opponent; }
        Dispose() {
            this._player.Dispose();
            this._player = null;
            this._opponent.Dispose();
            this._opponent = null;
        }
        CreateFighter(p1, p2, p1container, p2container) {
            this._player = new View.CPets(p1, p1container, 0);
            this._player.atk = View.CUser.atk;
            this._player.hp = View.CUser.hp;
            this._opponent = new View.CPets(p2, p2container, 1);
            this._opponent.atk = View.CUser.atk;
            this._opponent.hp = View.CUser.hp;
        }
        BeginFight(playerAction, completeHandler) {
            let opponentAction = RC.Numerics.MathUtils.Random(0, 1) > 0.2 ? true : false;
            if (playerAction) {
                let offset = RC.Numerics.MathUtils.Floor(this._player.atk * 0.1);
                this._opponent.hp -= this._player.atk + RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(-offset, offset));
            }
            if (opponentAction) {
                let offset = RC.Numerics.MathUtils.Floor(this._player.atk * 0.1);
                this._player.hp -= this._opponent.atk + RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(-offset, offset));
            }
            this._player.Attack((() => completeHandler()).bind(this));
        }
    }
    View.Fight = Fight;
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class FightPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c6").asCom;
                this._time = this._root.getChild("time").asTextField;
                this._result = this._root.getChild("g_result").asCom;
                this._gesture = new UI.GestureComponent(this._root, this.OnGestureSuccess.bind(this), this.OnGestureError.bind(this));
                this._hp1 = this._root.getChild("hp_bar").asProgress;
                this._hp2 = this._root.getChild("hp_bar2").asProgress;
            }
            get fight() { return this._fight; }
            Dispose() {
                this._gesture.Dispose();
            }
            Enter() {
                this.ShowGesture();
                this._fight = new View.Fight();
                this._fight.CreateFighter(View.CUser.pets[View.CUser.petForFight], this.opponentId, this._root.getChild("p1").asCom, this._root.getChild("p2").asCom);
                this._hp1.value = this._fight.player.hp;
                this._hp2.value = this._fight.opponent.hp;
                this._hp1.max = this._fight.player.hp;
                this._hp2.max = this._fight.opponent.hp;
            }
            Exit() {
                this._fight.Dispose();
                this._fight = null;
            }
            Update(deltaTime) {
                if (!this._gestureShowing)
                    return;
                this._countdown -= deltaTime;
                if (this._countdown <= 0) {
                    this._countdown = 0;
                    this._gesture.TouchEnd();
                }
                this._time.text = "" + RC.Numerics.MathUtils.Floor((this._countdown + 1000) * 0.001);
            }
            OnResize(e) {
            }
            ShowGesture() {
                this._countdown = FightPanel.COUNT_DOWN;
                this._gesture.Show();
                this._gestureShowing = true;
            }
            OnGestureSuccess() {
                this._result.getController("c1").selectedIndex = 0;
                this._gesture.Hide((() => {
                    this._fight.BeginFight(true, this.OnFightComplete.bind(this));
                }).bind(this));
                this._gestureShowing = false;
            }
            OnGestureError() {
                this._result.getController("c1").selectedIndex = 1;
                this._gesture.Hide((() => {
                    this._fight.BeginFight(false, this.OnFightComplete.bind(this));
                }).bind(this));
                this._gestureShowing = false;
            }
            OnFightComplete() {
                this._hp1.value = this._fight.player.hp;
                this._hp2.value = this._fight.opponent.hp;
                let result = 0;
                if (this._fight.opponent.hp <= 0)
                    result = 1;
                else if (this._fight.player.hp <= 0)
                    result = -1;
                if (result == 0)
                    this.ShowGesture();
                else {
                    this._owner.resultPanel.win = result == 1 ? true : false;
                    this._owner.resultPanel.opponent = this._fight.opponent;
                    this._owner.panelIndex = 7;
                }
            }
        }
        FightPanel.COUNT_DOWN = 10000;
        UI.FightPanel = FightPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class GestureComponent {
            constructor(root, successtHandler, errorHandler) {
                this._root = root;
                this._keypad = this._root.getChild("keypad").asCom;
                this._line = this._keypad.getChild("line").asCom;
                this._keys = [];
                for (let i = 0; i < 9; ++i) {
                    this._keys.push(new UI.KeyComponent(this._keypad.getChild("n" + i).asCom, i));
                }
                this._keyRadius = this._keys[0].width * 0.5;
                this._keyLine = new UI.KeyLineComponent();
                this._touched = [];
                this._lines = [];
                this._successtHandler = successtHandler;
                this._errorHandler = errorHandler;
            }
            Dispose() {
                this._keyLine.Dispose();
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
                    }
                }
                this._keyLine.UpdateVisual(v);
            }
            OnTouchEnd(e) {
                if (this._touched.length == 0)
                    return;
                this.HandleTouchEnd();
            }
            HandleTouchEnd() {
                fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
                fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
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
                this._successtHandler();
            }
            HandleIncorrectGesture() {
                this._errorHandler();
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
            TouchEnd() {
                this.HandleTouchEnd();
            }
            Show() {
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
                this._keypad.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
                this._root.getTransition("t0").play();
            }
            Hide(completeHandler) {
                this._keypad.displayObject.off(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
                this._root.getTransition("t1").play(new laya.utils.Handler(this, () => {
                    this._keyLine.Detach();
                    for (let key of this._keys) {
                        key.touched = false;
                        key.selectedIndex = 0;
                    }
                    this._touched.splice(0);
                    for (let line of this._lines)
                        line.dispose();
                    this._lines.splice(0);
                    completeHandler();
                }));
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
                for (let i = 0; i < View.CUser.pets.length; ++i) {
                    let pet = View.CUser.pets[i];
                    let def = Shared.Model.ModelFactory.GetEntityData(pet);
                    let item = this._list.addItemFromPool().asCom;
                    item.getChild("name").asTextField.text = def.name;
                    item.getChild("lvl").asTextField.text = "" + RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(3, 10));
                    item.getChild("type").asTextField.text = def.type;
                    let btn = item.getChild("n34").asButton;
                    btn.onClick(this, this.OnFightBtnClick);
                    btn.data = i;
                    if (View.CUser.petForFight == i) {
                        btn.grayed = true;
                        btn.touchable = false;
                    }
                    else {
                        btn.grayed = false;
                        btn.touchable = true;
                    }
                }
            }
            Exit() {
                this._list.removeChildrenToPool();
            }
            Update(deltaTime) {
            }
            OnResize(e) {
            }
            OnFightBtnClick(e) {
                let btn = fairygui.GObject.cast(e.currentTarget);
                View.CUser.petForFight = btn.data;
                this.UpdateList();
            }
            UpdateList() {
                for (let i = 0; i < View.CUser.pets.length; ++i) {
                    let item = this._list.getChildAt(i).asCom;
                    let btn = item.getChild("n34").asButton;
                    if (View.CUser.petForFight == i) {
                        btn.grayed = true;
                        btn.touchable = false;
                    }
                    else {
                        btn.grayed = false;
                        btn.touchable = true;
                    }
                }
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
                let tasksDef = Shared.Defs.GetMessage();
                for (let taskDef of tasksDef) {
                    let com = this._list.addItemFromPool().asCom;
                    com.getChild("content").asTextField.text = taskDef;
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
        UI.MsgPanel = MsgPanel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class ResultPanel {
            constructor(owner) {
                this._owner = owner;
                this._root = owner.root.getChild("c7").asCom;
                this._root.getChild("n21").onClick(this, () => this._owner.panelIndex = 0);
                this._root.getChild("n10").onClick(this, () => this._owner.panelIndex = 6);
                this._root.getChild("n11").onClick(this, () => this._owner.panelIndex = 0);
                this._root.getChild("n28").onClick(this, () => this._owner.panelIndex = 0);
                this._root.getChild("n9").displayObject.on(laya.events.Event.MOUSE_DOWN, this, this.OnTunshiBegin);
                this._bar = this._root.getChild("n24").asProgress;
                this._bar.max = 1;
            }
            set win(value) {
                this._root.getController("c1").selectedIndex = value ? 0 : 1;
            }
            Dispose() {
            }
            Enter() {
            }
            Exit() {
            }
            Update(deltaTime) {
                if (!this._eating)
                    return;
                let cur = this._bar.value;
                cur += deltaTime * ResultPanel.EATING_RATE;
                this._bar.value = cur;
                if (cur >= this._bar.max) {
                    this.OnTunshiEnd(null);
                    this.TunshiSuccess();
                }
            }
            OnResize(e) {
            }
            OnTunshiBegin(e) {
                fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTunshiEnd);
                this._bar.visible = true;
                this._bar.value = 0;
                this._eating = true;
            }
            OnTunshiEnd(e) {
                fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTunshiEnd);
                this._bar.visible = false;
                this._eating = false;
            }
            TunshiSuccess() {
                this._root.getController("c1").selectedIndex = 2;
                let def = Shared.Model.ModelFactory.GetEntityData(this._owner.fightPanel.fight.opponent.id);
                this._root.getChild("n27").asTextField.text = `你成功收复了${def.name}作为麾下灵兽,恭喜!`;
            }
        }
        ResultPanel.EATING_RATE = 0.2 / 1000;
        UI.ResultPanel = ResultPanel;
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
                this._root.getController("c1").selectedIndex = 0;
                this._opponentId = "e" + RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(0, 5));
                let def = Shared.Model.ModelFactory.GetEntityData(this._opponentId);
                this._root.getChild("name").asTextField.text = def.name;
                this._root.getChild("type").asTextField.text = def.type;
                this._root.getChild("lvl").asTextField.text = "" + View.CUser.lvl;
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
                this._owner.fightPanel.opponentId = this._opponentId;
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
                let tasksDef = Shared.Defs.GetTask();
                for (let taskDef of tasksDef) {
                    let com = this._list.addItemFromPool().asCom;
                    com.getChild("content").asTextField.text = taskDef;
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
        UI.TaskPabel = TaskPabel;
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
                View.CUser.img = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(0, 6));
                View.CUser.lvl = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(20, 40));
                View.CUser.hp = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(1, 2));
                View.CUser.exp = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(120, 300));
                View.CUser.atk = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(100, 200));
                View.CUser.pets = ["e0", "e1", "e2", "e3", "e4"];
                View.CUser.petForFight = 0;
                View.CUser.uname = "深蓝的天空";
                this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
                fairygui.GRoot.inst.addChild(this._root);
                this._root.width = fairygui.GRoot.inst.width;
                this._root.height = fairygui.GRoot.inst.height;
                this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
                this._controller = this._root.getController("c1");
                this._controller.on(fairygui.Events.STATE_CHANGED, this, this.OnSelectedIndexChanged);
                this._zcPanel = new UI.ZCPanel(this);
                this._msgPanel = new UI.MsgPanel(this);
                this._searchPanel = new UI.SearchPanel(this);
                this._taskPanel = new UI.TaskPabel(this);
                this._lingshouPanel = new UI.LingshouPanel(this);
                this._userInfoPanel = new UI.UserInfoPanel(this);
                this._fightPanel = new UI.FightPanel(this);
                this._resultPanel = new UI.ResultPanel(this);
                this._panels = [];
                this._panels.push(this._zcPanel);
                this._panels.push(this._msgPanel);
                this._panels.push(this._searchPanel);
                this._panels.push(this._taskPanel);
                this._panels.push(this._lingshouPanel);
                this._panels.push(this._userInfoPanel);
                this._panels.push(this._fightPanel);
                this._panels.push(this._resultPanel);
            }
            get root() { return this._root; }
            get zcPanel() { return this._zcPanel; }
            get msgPanel() { return this._msgPanel; }
            get searchPanel() { return this._searchPanel; }
            get taskPanel() { return this._taskPanel; }
            get userInfoPanel() { return this._userInfoPanel; }
            get linghouPanel() { return this._lingshouPanel; }
            get fightPanel() { return this._fightPanel; }
            get resultPanel() { return this._resultPanel; }
            set panelIndex(value) {
                if (this._controller.selectedIndex == value)
                    return;
                this._controller.selectedIndex = value;
            }
            Dispose() {
                for (let p of this._panels)
                    p.Dispose();
                this._panels.splice(0);
                this._root.dispose();
            }
            Enter(param) {
                this._lastIndex = 0;
                this._panels[0].Enter();
            }
            Leave() {
            }
            Update(deltaTime) {
                for (let p of this._panels)
                    p.Update(deltaTime);
            }
            OnResize(e) {
                for (let p of this._panels)
                    p.OnResize(e);
            }
            OnSelectedIndexChanged() {
                this._panels[this._lastIndex].Exit();
                this._panels[this._controller.selectedIndex].Enter();
                this._lastIndex = this._controller.selectedIndex;
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
            static EnterMain() {
                this.EnterModule(this._main);
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
                this._root.getChild("name").asTextField.text = View.CUser.uname;
                this._root.getChild("lvl").asTextField.text = "" + View.CUser.lvl;
                this._root.getChild("exp").asTextField.text = "" + View.CUser.exp;
                this._root.getChild("atk").asTextField.text = "" + View.CUser.atk;
                this._root.getChild("img").asCom.getChild("icon").asLoader.url = fairygui.UIPackage.getItemURL("main", "u" + View.CUser.img);
                this._root.getChild("img").onClick(this, this.OnImageBtnClick);
            }
            Exit() {
            }
            Update(deltaTime) {
            }
            OnResize(e) {
            }
            OnImageBtnClick(e) {
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
            }
            Dispose() {
            }
            Enter() {
                this._root.getChild("name").asTextField.text = View.CUser.uname;
                this._root.getChild("lvl").asTextField.text = "" + View.CUser.lvl;
                this._root.getChild("hp").asTextField.text = `${View.CUser.hp}/${View.CUser.hp}`;
                this._root.getChild("exp").asTextField.text = `${View.CUser.exp}/${View.CUser.exp}`;
                this._root.getChild("hp_bar").asProgress.max = View.CUser.hp;
                this._root.getChild("hp_bar").asProgress.value = View.CUser.hp;
                this._root.getChild("exp_bar").asProgress.max = View.CUser.exp;
                this._root.getChild("exp_bar").asProgress.value = View.CUser.exp;
                this._root.getChild("atk").asTextField.text = "" + View.CUser.atk;
                this._root.getChild("img").asCom.getChild("icon").asLoader.url = fairygui.UIPackage.getItemURL("main", "u" + View.CUser.img);
                this._root.getChild("img").onClick(this, this.OnImageBtnClick);
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