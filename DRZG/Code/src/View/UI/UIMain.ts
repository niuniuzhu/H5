namespace View.UI {
	export class UIMain implements IUIModule {
		private _root: fairygui.GComponent;

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/main");
		}

		public Dispose(): void {
		}

		public Enter(param: any): void {
			this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);

			this._root.getChild("main_btn").onClick(this, this.OnMainBtnClick);
			this._root.getChild("fuben_btn").onClick(this, this.OnFubenBtnClick);
			this._root.getChild("skill_btn").onClick(this, this.OnSkillBtnClick);
		}

		public Leave(): void {
			this._root.dispose();
			this._root = null;
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private OnMainBtnClick(): void {

		}

		private OnFubenBtnClick(): void {
			let param = new Shared.Model.BattleParams();
			param.framesPerKeyFrame = 4;
			param.frameRate = 20;
			param.uid = "user";
			param.id = "m0";
			param.rndSeed = RC.Utils.Timer.utcTime;
			param.team0 = new Shared.Model.TeamParam();
			param.team0.mp = 5;
			param.team0.skills = [];
			param.team0.towers = [];
			param.team1 = new Shared.Model.TeamParam();
			param.team1.mp = 5;
			param.team1.skills = [];
			param.team1.towers = [];

			// team 0
			let tower = new Shared.Model.EntityParam();
			tower.uid = "user";
			tower.id = "t0";
			tower.team = 0;
			param.team0.towers.push(tower);

			tower = new Shared.Model.EntityParam();
			tower.uid = "user";
			tower.id = "t1";
			tower.team = 0;
			param.team0.towers.push(tower);

			tower = new Shared.Model.EntityParam();
			tower.uid = "user";
			tower.id = "t1";
			tower.team = 0;
			param.team0.towers.push(tower);

			// team 1
			tower = new Shared.Model.EntityParam();
			tower.uid = "xxx";
			tower.id = "t0";
			tower.team = 1;
			param.team1.towers.push(tower);

			tower = new Shared.Model.EntityParam();
			tower.uid = "xxx";
			tower.id = "t1";
			tower.team = 1;
			param.team1.towers.push(tower);

			tower = new Shared.Model.EntityParam();
			tower.uid = "xxx";
			tower.id = "t1";
			tower.team = 1;
			param.team1.towers.push(tower);

			UIManager.EnterBattle(param);
		}

		private OnSkillBtnClick(): void {

		}
	}
}