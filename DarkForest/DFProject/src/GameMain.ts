namespace Game {
	export class GameMain {
		constructor() {
			Laya.init(720, 1280);
			Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
			Laya.stage.alignH = Laya.Stage.ALIGN_LEFT;
			Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
			Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
			laya.utils.Stat.show(0, 0);
			this.LoadDefs();
		}

		private LoadDefs(): void {
			console.log("loading defs...");
			Laya.loader.load("res/defs/b_defs.json", Laya.Handler.create(this, this.OnDefsLoadComplete), undefined, Laya.Loader.JSON);
		}

		private OnDefsLoadComplete(): void {
			let json: JSON = Laya.loader.getRes("res/defs/b_defs.json");
			Shared.Defs.Init(json);
			this.LoadUIRes();
		}

		private LoadUIRes(): void {
			console.log("loading res...");
			let res = ["global", "battle"];
			let urls = [];
			let i = 0;
			for (let u of res) {
				urls[i++] = { url: "res/ui/" + u + "@atlas0.png", type: Laya.Loader.IMAGE };
				urls[i++] = { url: "res/ui/" + u + ".fui", type: Laya.Loader.BUFFER }
			}
			Laya.loader.load(urls, Laya.Handler.create(this, this.OnUIResLoadComplete));
		}

		private OnUIResLoadComplete(): void {
			this.StartGame();
		}

		private StartGame(): void {
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

		private Update(): void {
			let dt = Laya.timer.delta;
			View.UI.UIManager.Update(dt);
			BattleManager.Update(dt);
		}

		private OnResize(e: laya.events.Event): void {
			View.UI.UIManager.OnResize(e);
			BattleManager.OnResize(e);
		}
	}
}