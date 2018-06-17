var Game;
(function (Game) {
    class GameMain {
        constructor() {
            Laya.init(720, 1280);
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
            Laya.stage.alignH = Laya.Stage.ALIGN_LEFT;
            Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
            Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
            Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
            let urls = [];
            urls.push({ url: "res/ui/loading.fui", type: Laya.Loader.BUFFER });
            urls.push({ url: "res/ui/loading@atlas0.png", type: Laya.Loader.IMAGE });
            Laya.loader.load(urls, Laya.Handler.create(this, this.OnLoadingResComplete));
        }
        OnLoadingResComplete() {
            fairygui.UIPackage.addPackage("res/ui/loading");
            this._loading = fairygui.UIPackage.createObject("loading", "Main").asCom;
            fairygui.GRoot.inst.addChild(this._loading);
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
            this._loading.dispose();
            this._loading = null;
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
    class CUser {
    }
    View.CUser = CUser;
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class UICamp {
            constructor() {
                fairygui.UIPackage.addPackage("res/ui/camp");
                this._confirm = fairygui.UIPackage.createObject("camp", "build_confirm").asCom;
                this._confirm.getChild("confirm_btn").onClick(this, this.OnBuildComplete);
                this._confirm.getChild("cancel_btn").onClick(this, () => fairygui.GRoot.inst.hidePopup());
                this._confirm2 = fairygui.UIPackage.createObject("camp", "build_confirm").asCom;
                this._confirm2.getChild("confirm_btn").onClick(this, this.OnRecruitComplete);
                this._confirm2.getChild("cancel_btn").onClick(this, () => fairygui.GRoot.inst.hidePopup());
                this._tools = fairygui.UIPackage.createObject("camp", "tools_confirm").asCom;
                this._tools.getChild("close_btn").onClick(this, () => fairygui.GRoot.inst.hidePopup());
                this._tools.getChild("t0").onClick(this, () => {
                    View.CUser.tool = 0;
                    View.CUser.atk = 10;
                    fairygui.GRoot.inst.hidePopup();
                });
                this._tools.getChild("t1").onClick(this, () => {
                    View.CUser.tool = 1;
                    View.CUser.atk = 15;
                    fairygui.GRoot.inst.hidePopup();
                });
                this._tools.getChild("t2").onClick(this, () => {
                    View.CUser.tool = 2;
                    View.CUser.atk = 20;
                    fairygui.GRoot.inst.hidePopup();
                });
                this._root = fairygui.UIPackage.createObject("camp", "Main").asCom;
                this._root.getChild("btn0").onClick(this, this.ShowBuildConfirm);
                this._root.getChild("btn1").onClick(this, this.ShowRecruitConfirm);
                this._root.getChild("btn2").onClick(this, this.ShowToolSelect);
                this._root.getChild("btn3").onClick(this, () => UI.UIManager.EnterMain());
            }
            get root() { return this._root; }
            Dispose() {
                this._confirm.dispose();
                this._tools.dispose();
                this._root.dispose();
            }
            Enter(param) {
                fairygui.GRoot.inst.addChild(this._root);
                this._root.width = fairygui.GRoot.inst.width;
                this._root.height = fairygui.GRoot.inst.height;
                this._root.getChild("n1").asCom.getChild("icon").asLoader.url = fairygui.UIPackage.getItemURL("global", "img" + View.CUser.img);
                this._root.getChild("wood").asTextField.text = "" + View.CUser.wood;
                this._root.getChild("stone").asTextField.text = "" + View.CUser.stone;
            }
            Leave() {
                this._root.removeFromParent();
            }
            Update(deltaTime) {
            }
            OnResize(e) {
            }
            ShowBuildConfirm() {
                fairygui.GRoot.inst.showPopup(this._confirm);
                this._confirm.center();
                this._confirm.getChild("n14").asTextField.text = "建筑营地需要消耗石材和木材";
            }
            ShowRecruitConfirm() {
                fairygui.GRoot.inst.showPopup(this._confirm2);
                this._confirm2.center();
                this._confirm2.getChild("n14").asTextField.text = "招募原始人需要消耗石材和木材";
            }
            ShowToolSelect() {
                fairygui.GRoot.inst.showPopup(this._tools);
                this._tools.center();
                let controller = this._tools.getController("c1");
                controller.setSelectedIndex(View.CUser.tool);
            }
            OnBuildComplete() {
                console.log("Build");
                fairygui.GRoot.inst.hidePopup();
            }
            OnRecruitComplete() {
                console.log("Recruit");
                fairygui.GRoot.inst.hidePopup();
            }
        }
        UI.UICamp = UICamp;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class UILevel {
            constructor() {
                fairygui.UIPackage.addPackage("res/ui/level");
                this._root = fairygui.UIPackage.createObject("level", "Main").asCom;
                this._root.getChild("leave_btn").onClick(this, () => UI.UIManager.EnterMain());
            }
            Dispose() {
                this._root.dispose();
            }
            Enter(param) {
                fairygui.GRoot.inst.addChild(this._root);
                this._root.width = fairygui.GRoot.inst.width;
                this._root.height = fairygui.GRoot.inst.height;
                this._root.getChild("icon").asLoader.url = fairygui.UIPackage.getItemURL("global", "img" + View.CUser.img);
                this._root.getChild("tool").asLoader.url = fairygui.UIPackage.getItemURL("global", "t" + View.CUser.tool);
                this._root.getChild("atk").asTextField.text = "" + View.CUser.atk;
                this._root.getChild("hp").asTextField.text = "" + View.CUser.hp;
                this._root.getChild("wood").asTextField.text = "" + View.CUser.wood;
                this._root.getChild("stone").asTextField.text = "" + View.CUser.stone;
                this._root.getChild("name").asTextField.text = "野兽洞窟";
            }
            Leave() {
                this._root.removeFromParent();
            }
            Update(deltaTime) {
            }
            OnResize(e) {
            }
        }
        UI.UILevel = UILevel;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class UILogin {
            constructor() {
                fairygui.UIPackage.addPackage("res/ui/login");
                this._root = fairygui.UIPackage.createObject("login", "Main").asCom;
                this._root.getChild("enter_btn").onClick(this, this.OnEnterBtnClick);
                this._root.getChild("reg_btn").onClick(this, this.OnRegBtnClick);
            }
            Dispose() {
                this._root.dispose();
            }
            Enter(param) {
                fairygui.GRoot.inst.addChild(this._root);
                this._root.width = fairygui.GRoot.inst.width;
                this._root.height = fairygui.GRoot.inst.height;
            }
            Leave() {
                this._root.removeFromParent();
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
                View.CUser.img = 0;
                View.CUser.lvl = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(20, 40));
                View.CUser.hp = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(760, 950));
                View.CUser.atk = 10;
                View.CUser.tool = 0;
                View.CUser.wood = 100;
                View.CUser.stone = 100;
                View.CUser.exp = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(120, 300));
                View.CUser.tl = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(130, 220));
                View.CUser.uname = "深蓝的天空";
                this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
                this._root.getChild("camp").onClick(this, () => UI.UIManager.EnterCamp());
                this._root.getChild("c0").onClick(this, () => UI.UIManager.EnterLevel(0));
                this._root.getChild("c1").onClick(this, () => UI.UIManager.EnterLevel(1));
                this._root.getChild("c2").onClick(this, () => UI.UIManager.EnterLevel(2));
                this._root.getChild("c3").onClick(this, () => UI.UIManager.EnterLevel(3));
            }
            get root() { return this._root; }
            Dispose() {
                this._root.dispose();
            }
            Enter(param) {
                fairygui.GRoot.inst.addChild(this._root);
                this._root.width = fairygui.GRoot.inst.width;
                this._root.height = fairygui.GRoot.inst.height;
                this._root.getChild("n1").asCom.getChild("icon").asLoader.url = fairygui.UIPackage.getItemURL("global", "img" + View.CUser.img);
                this._root.getChild("lvl").asTextField.text = "" + View.CUser.lvl;
                this._root.getChild("exp").asTextField.text = "" + View.CUser.exp;
            }
            Leave() {
                this._root.removeFromParent();
            }
            Update(deltaTime) {
            }
            OnResize(e) {
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
            static get main() { return this._main; }
            static get camp() { return this._camp; }
            static get level() { return this._level; }
            static Init(resolution) {
                fairygui.UIPackage.addPackage("res/ui/global");
                fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "qtm011");
                fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "qtm011");
                fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");
                this._login = new UI.UILogin();
                this._main = new UI.UIMain();
                this._camp = new UI.UICamp();
                this._level = new UI.UILevel();
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
            static EnterModule(module, ...param) {
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
            static EnterCamp() {
                this.EnterModule(this._camp);
            }
            static EnterLevel(index) {
                this.EnterModule(this._level, index);
            }
        }
        UI.UIManager = UIManager;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
//# sourceMappingURL=game.js.map