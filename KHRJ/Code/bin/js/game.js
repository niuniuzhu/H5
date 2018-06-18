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
    class Opponent {
    }
    View.Opponent = Opponent;
})(View || (View = {}));
var View;
(function (View) {
    class Player {
    }
    View.Player = Player;
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class Tile {
            constructor(parent, index, flipHandler, triggerHandler) {
                this._sprite = fairygui.UIPackage.createObject("level", "g" + RC.Numerics.MathUtils.RandomFloor(0, 3)).asCom;
                parent.addChild(this._sprite);
                this._state = 0;
                this._index = index;
                this._disable = false;
                this._monster = null;
                let coord = this.IndexToCoord(this._index);
                let x = coord.x * this._sprite.width;
                let y = coord.y * this._sprite.height;
                this._sprite.setXY(x, y);
                this._sprite.onClick(this, () => {
                    if (this._disable)
                        return;
                    if (this._state == 0) {
                        this.state = 1;
                        flipHandler(this._index);
                    }
                    else {
                        triggerHandler(this._index);
                    }
                });
            }
            set state(value) {
                if (this._state == value)
                    return;
                this._state = value;
                this._sprite.getController("c1").selectedIndex = value;
                this.GenItem();
            }
            get state() { return this._state; }
            set disable(value) {
                if (this._disable == value)
                    return;
                this._disable = value;
                if (this._state == 0)
                    this._sprite.getController("c2").selectedIndex = this._disable ? 1 : 0;
            }
            get disable() { return this._disable; }
            get index() { return this._index; }
            get itemID() { return this._itemID; }
            get monster() { return this._monster; }
            Dispose() {
                this._state = 0;
                this._disable = false;
                this._monster = null;
                this._sprite.dispose();
                if (this._item != null) {
                    this._item.dispose();
                    this._item = null;
                }
            }
            GenItem() {
                if (RC.Numerics.MathUtils.Random(0, 1) >= 0.5) {
                    this._item = null;
                    this._itemID = -1;
                }
                else {
                    this._itemID = RC.Numerics.MathUtils.RandomFloor(0, 6);
                    this._item = fairygui.UIPackage.createObject("level", "m" + this._itemID).asCom;
                    this._sprite.addChild(this._item);
                    this._item.touchable = false;
                    this._item.center();
                    this._monster = new View.Player();
                    this._monster.atk = RC.Numerics.MathUtils.Floor(View.CUser.atk * 0.6) + RC.Numerics.MathUtils.RandomFloor(-3, 3);
                    this._monster.hp = RC.Numerics.MathUtils.Floor(View.CUser.hp * 0.6);
                }
            }
            Die() {
                this._sprite.grayed = true;
                this._item.grayed = true;
                this._sprite.touchable = false;
            }
            CoordToIndex(x, y) {
                return y * Tile.H + x;
            }
            IndexToCoord(index) {
                return new RC.Numerics.Vec2(this._index % Tile.H, RC.Numerics.MathUtils.Floor(this._index / Tile.H));
            }
        }
        Tile.V = 5;
        Tile.H = 5;
        UI.Tile = Tile;
    })(UI = View.UI || (View.UI = {}));
})(View || (View = {}));
var View;
(function (View) {
    var UI;
    (function (UI) {
        class TileMap {
            constructor(root) {
                this._root = root;
                this._tiles = [];
                this._player = new View.Player();
                this._player.atk = View.CUser.atk;
                let count = UI.Tile.V * UI.Tile.H;
                for (let i = 0; i < count; ++i) {
                    let tile = new UI.Tile(this._root, i, this.OnTileClick.bind(this), this.OnTileTrigger.bind(this));
                    this._tiles[i] = tile;
                }
            }
            Dispose() {
                for (let tile of this._tiles)
                    tile.Dispose();
            }
            OnTileClick(index) {
                let itemID = this._tiles[index].itemID;
                if (itemID >= 0)
                    this.DisableAround(index);
                switch (itemID) {
                    case 0:
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                }
            }
            OnTileTrigger(index) {
                let itemID = this._tiles[index].itemID;
                switch (itemID) {
                    case 0:
                        this._player.hp += RC.Numerics.MathUtils.RandomFloor(10, 30);
                        break;
                    case 1:
                        View.CUser.wood += RC.Numerics.MathUtils.RandomFloor(10, 30);
                        View.CUser.stone += RC.Numerics.MathUtils.RandomFloor(10, 30);
                        break;
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        let monster = this._tiles[index].monster;
                        this._player.hp -= monster.atk + RC.Numerics.MathUtils.RandomFloor(-10, 10);
                        monster.hp -= this._player.atk + RC.Numerics.MathUtils.RandomFloor(-10, 10);
                        if (monster.hp <= 0) {
                            this._tiles[index].Die();
                            this.EnableAround(index);
                        }
                        break;
                }
            }
            CanFlip(index) {
                let canPlaceLeft = index % UI.Tile.H != 0;
                let canPlaceRight = index % UI.Tile.H != UI.Tile.H - 1;
                let canPlaceUp = RC.Numerics.MathUtils.Floor(index / UI.Tile.H) != 0;
                let canPlaceDown = RC.Numerics.MathUtils.Floor(index / UI.Tile.H) != UI.Tile.V - 1;
                if (canPlaceLeft && this._tiles[index - 1].itemID >= 0)
                    return false;
                if (canPlaceRight && this._tiles[index + 1].itemID >= 0)
                    return false;
                if (canPlaceUp && this._tiles[index - UI.Tile.H].itemID >= 0)
                    return false;
                if (canPlaceDown && this._tiles[index + UI.Tile.H].itemID >= 0)
                    return false;
                if (canPlaceLeft && canPlaceUp && this._tiles[index - UI.Tile.H - 1].itemID >= 0)
                    return false;
                if (canPlaceRight && canPlaceUp && this._tiles[index - UI.Tile.H + 1].itemID >= 0)
                    return false;
                if (canPlaceLeft && canPlaceDown && this._tiles[index + UI.Tile.H - 1].itemID >= 0)
                    return false;
                if (canPlaceRight && canPlaceDown && this._tiles[index + UI.Tile.H + 1].itemID >= 0)
                    return false;
                return true;
            }
            DisableAround(index) {
                let canPlaceLeft = index % UI.Tile.H != 0;
                let canPlaceRight = index % UI.Tile.H != UI.Tile.H - 1;
                let canPlaceUp = RC.Numerics.MathUtils.Floor(index / UI.Tile.H) != 0;
                let canPlaceDown = RC.Numerics.MathUtils.Floor(index / UI.Tile.H) != UI.Tile.V - 1;
                if (canPlaceLeft)
                    this._tiles[index - 1].disable = true;
                if (canPlaceRight)
                    this._tiles[index + 1].disable = true;
                if (canPlaceUp)
                    this._tiles[index - UI.Tile.H].disable = true;
                if (canPlaceDown)
                    this._tiles[index + UI.Tile.H].disable = true;
                if (canPlaceLeft && canPlaceUp)
                    this._tiles[index - UI.Tile.H - 1].disable = true;
                if (canPlaceRight && canPlaceUp)
                    this._tiles[index - UI.Tile.H + 1].disable = true;
                if (canPlaceLeft && canPlaceDown)
                    this._tiles[index + UI.Tile.H - 1].disable = true;
                if (canPlaceRight && canPlaceDown)
                    this._tiles[index + UI.Tile.H + 1].disable = true;
            }
            EnableAround(index) {
                let canPlaceLeft = index % UI.Tile.H != 0;
                let canPlaceRight = index % UI.Tile.H != UI.Tile.H - 1;
                let canPlaceUp = RC.Numerics.MathUtils.Floor(index / UI.Tile.H) != 0;
                let canPlaceDown = RC.Numerics.MathUtils.Floor(index / UI.Tile.H) != UI.Tile.V - 1;
                if (canPlaceLeft && this.CanFlip(index - 1))
                    this._tiles[index - 1].disable = false;
                if (canPlaceRight && this.CanFlip(index + 1))
                    this._tiles[index + 1].disable = false;
                if (canPlaceUp && this.CanFlip(index - UI.Tile.H))
                    this._tiles[index - UI.Tile.H].disable = false;
                if (canPlaceDown && this.CanFlip(index + UI.Tile.H))
                    this._tiles[index + UI.Tile.H].disable = false;
                if (canPlaceLeft && canPlaceUp && this.CanFlip(index - UI.Tile.H - 1))
                    this._tiles[index - UI.Tile.H - 1].disable = false;
                if (canPlaceRight && canPlaceUp && this.CanFlip(index - UI.Tile.H + 1))
                    this._tiles[index - UI.Tile.H + 1].disable = false;
                if (canPlaceLeft && canPlaceDown && this.CanFlip(index + UI.Tile.H - 1))
                    this._tiles[index + UI.Tile.H - 1].disable = false;
                if (canPlaceRight && canPlaceDown && this.CanFlip(index + UI.Tile.H + 1))
                    this._tiles[index + UI.Tile.H + 1].disable = false;
            }
        }
        UI.TileMap = TileMap;
    })(UI = View.UI || (View.UI = {}));
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
                this._tileMap = new UI.TileMap(this._root.getChild("place").asCom);
            }
            Leave() {
                this._tileMap.Dispose();
                this._tileMap = null;
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
                View.CUser.hp = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(100, 130));
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