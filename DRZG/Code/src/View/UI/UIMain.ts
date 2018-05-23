namespace View.UI {
	export class UIMain implements IUIModule {
		private _root: fairygui.GComponent;
		private _controller: fairygui.Controller;
		private readonly _panels: IMainPanel[];
		private _zcPanel: ZCPanel;
		private _fbPanel: FBPanel;
		private _skillPanel: SkillPanel;
		private _phbPanel: PHBPanel;
		private _fbInfoPanel: FBInfoPanel;
		private _userInfoPanel: UserInfoPanel;
		private _qdPanel: QDPanel;

		public get root(): fairygui.GComponent { return this._root; }
		public get zcPanel(): ZCPanel { return this._zcPanel; }
		public get fbPanel(): FBPanel { return this._fbPanel; }
		public get skillPanel(): SkillPanel { return this._skillPanel; }
		public get phbPanel(): PHBPanel { return this._phbPanel; }
		public get fbInfoPanel(): FBInfoPanel { return this._fbInfoPanel; }
		public get userInfoPanel(): UserInfoPanel { return this._userInfoPanel; }
		public get qdPanel(): QDPanel { return this._qdPanel; }

		public set panelIndex(value: number) {
			if (this._controller.selectedIndex == value)
				return;
			this._panels[this._controller.selectedIndex].Exit();
			this._panels[value].Enter();
			this._controller.selectedIndex = value;
		}

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/main");
			this._panels = [];
		}

		public Dispose(): void {
		}

		public Enter(param: any): void {
			this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);

			this._zcPanel = new ZCPanel(this);
			this._fbPanel = new FBPanel(this);
			this._skillPanel = new SkillPanel(this);
			this._phbPanel = new PHBPanel(this);
			this._fbInfoPanel = new FBInfoPanel(this);
			this._userInfoPanel = new UserInfoPanel(this);
			this._qdPanel = new QDPanel(this);

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

			this._root.getChild("n5").asTextField.text = "" + Math.round(Math.random() * 30 + 5);
			this._root.getChild("n6").asTextField.text = "" + Math.round(Math.random() * 10000 + 3000);
			this._root.getChild("n7").asTextField.text = "" + Math.round(Math.random() * 10000 + 3000);
			this._root.getChild("n8").asTextField.text = "" + Math.round(Math.random() * 10000 + 3000);
			this._root.getChild("n10").asTextField.text = "" + Math.round(Math.random() * 10000 + 3000);
			this._root.getChild("n11").asTextField.text = "" + Math.round(Math.random() * 3000 + 1000);
		}

		public Leave(): void {
			for (let p of this._panels)
				p.Dispose();
			this._panels.splice(0);

			this._root.dispose();
			this._root = null;
			this._controller = null;
		}

		public Update(deltaTime: number): void {
			for (let p of this._panels)
				p.Update(deltaTime);
		}

		public OnResize(e: laya.events.Event): void {
			for (let p of this._panels)
				p.OnResize(e);
		}

		private OnMainBtnClick(): void {
		}

		private OnFubenBtnClick(): void {
		}

		private OnSkillBtnClick(): void {
		}

		public EnterBattle(): void {
			let param = new Shared.Model.BattleParams();
			param.framesPerKeyFrame = 4;
			param.frameRate = 20;
			param.uid = "user";
			param.id = "m0";
			param.rndSeed = RC.Utils.Timer.utcTime;
			param.team0 = new Shared.Model.TeamParam();
			param.team0.mp = 5;
			param.team0.skills = this._skillPanel.GetSkills();
			param.team0.towers = [];
			param.team1 = new Shared.Model.TeamParam();
			param.team1.mp = 5;
			param.team1.skills = this._skillPanel.GetSkills();
			param.team1.towers = [];

			// team 0
			let tower = new Shared.Model.EntityParam();
			tower.uid = "user";
			tower.id = "e0";
			tower.team = 0;
			param.team0.towers.push(tower);

			tower = new Shared.Model.EntityParam();
			tower.uid = "user";
			tower.id = "e1";
			tower.team = 0;
			param.team0.towers.push(tower);

			tower = new Shared.Model.EntityParam();
			tower.uid = "user";
			tower.id = "e1";
			tower.team = 0;
			param.team0.towers.push(tower);

			// team 1
			tower = new Shared.Model.EntityParam();
			tower.uid = "xxx";
			tower.id = "e0";
			tower.team = 1;
			param.team1.towers.push(tower);

			tower = new Shared.Model.EntityParam();
			tower.uid = "xxx";
			tower.id = "e1";
			tower.team = 1;
			param.team1.towers.push(tower);

			tower = new Shared.Model.EntityParam();
			tower.uid = "xxx";
			tower.id = "e1";
			tower.team = 1;
			param.team1.towers.push(tower);

			UIManager.EnterBattle(param);
		}
	}
}