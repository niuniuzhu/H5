namespace View.UI {
	export class UIMain implements IUIModule {
		private readonly _root: fairygui.GComponent;
		private readonly _controller: fairygui.Controller;
		private readonly _panels: IMainPanel[];
		private readonly _zcPanel: ZCPanel;
		private readonly _searchPanel: SearchPanel;
		private readonly _lingshouPanel: LingshouPanel;
		private readonly _taskPanel: TaskPabel;
		private readonly _userInfoPanel: UserInfoPanel;
		private readonly _msgPanel: MsgPanel;
		private readonly _fightPanel: FightPanel;
		private readonly _resultPanel: ResultPanel;

		public get root(): fairygui.GComponent { return this._root; }
		public get zcPanel(): ZCPanel { return this._zcPanel; }
		public get msgPanel(): MsgPanel { return this._msgPanel; }
		public get searchPanel(): SearchPanel { return this._searchPanel; }
		public get taskPanel(): TaskPabel { return this._taskPanel; }
		public get userInfoPanel(): UserInfoPanel { return this._userInfoPanel; }
		public get linghouPanel(): LingshouPanel { return this._lingshouPanel; }
		public get fightPanel(): FightPanel { return this._fightPanel; }
		public get resultPanel(): ResultPanel { return this._resultPanel; }

		public set panelIndex(value: number) {
			if (this._controller.selectedIndex == value)
				return;
			this._controller.selectedIndex = value;
		}

		private _lastIndex: number;

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/main");

			View.CUser.img = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(0, 6));
			View.CUser.lvl = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(20, 40));
			View.CUser.hp = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(760, 950));
			View.CUser.exp = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(120, 300));
			View.CUser.atk = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(130, 220));
			View.CUser.pets = [];
			let candidate: number[] = [];
			for (let i = 0; i < 30; ++i) {
				candidate.push(i);
			}
			for (let i = 0; i < 10; ++i) {
				let pos = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(0, candidate.length));
				let m = candidate.splice(pos, 1)[0];
				View.CUser.pets.push("e" + m);
			}
			View.CUser.petForFight = 0;
			View.CUser.uname = "深蓝的天空";

			this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
			this._controller = this._root.getController("c1");
			this._controller.on(fairygui.Events.STATE_CHANGED, this, this.OnSelectedIndexChanged);

			this._zcPanel = new ZCPanel(this);
			this._msgPanel = new MsgPanel(this);
			this._searchPanel = new SearchPanel(this);
			this._taskPanel = new TaskPabel(this);
			this._lingshouPanel = new LingshouPanel(this);
			this._userInfoPanel = new UserInfoPanel(this);
			this._fightPanel = new FightPanel(this);
			this._resultPanel = new ResultPanel(this);

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

		public Dispose(): void {
			for (let p of this._panels)
				p.Dispose();
			this._panels.splice(0);
			this._root.dispose();
		}

		public Enter(param?: any[]): void {
			this._lastIndex = 0;
			this._panels[0].Enter();
		}

		public Leave(): void {
		}

		public Update(deltaTime: number): void {
			for (let p of this._panels)
				p.Update(deltaTime);
		}

		public OnResize(e: laya.events.Event): void {
			for (let p of this._panels)
				p.OnResize(e);
		}

		private OnSelectedIndexChanged(): void {
			this._panels[this._lastIndex].Exit();
			this._panels[this._controller.selectedIndex].Enter();
			this._lastIndex = this._controller.selectedIndex;
		}
	}
}