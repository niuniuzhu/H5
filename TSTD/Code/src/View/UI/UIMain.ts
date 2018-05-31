namespace View.UI {
	export class UIMain implements IUIModule {
		private _root: fairygui.GComponent;
		private _controller: fairygui.Controller;
		private readonly _panels: IMainPanel[];
		private _zcPanel: ZCPanel;
		private _searchPanel: SearchPanel;
		private _lingshouPanel: LingshouPanel;
		private _taskPanel: TaskPabel;
		private _fightPanel: FightPanel;
		private _userInfoPanel: UserInfoPanel;
		private _msgPanel: MsgPanel;

		public get root(): fairygui.GComponent { return this._root; }
		public get zcPanel(): ZCPanel { return this._zcPanel; }
		public get msgPanel(): MsgPanel { return this._msgPanel; }
		public get searchPanel(): SearchPanel { return this._searchPanel; }
		public get taskPanel(): TaskPabel { return this._taskPanel; }
		public get userInfoPanel(): UserInfoPanel { return this._userInfoPanel; }
		public get linghouPanel(): LingshouPanel { return this._lingshouPanel; }
		public get fightPanel(): FightPanel { return this._fightPanel; }

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

		public Enter(param?: any[]): void {
			this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);

			this._zcPanel = new ZCPanel(this);
			this._msgPanel = new MsgPanel(this);
			this._searchPanel = new SearchPanel(this);
			this._taskPanel = new TaskPabel(this);
			this._lingshouPanel = new LingshouPanel(this);
			this._userInfoPanel = new UserInfoPanel(this);
			this._fightPanel = new FightPanel(this);

			this._controller = this._root.getController("c1");
			this._panels.push(this._zcPanel);
			this._panels.push(this._msgPanel);
			this._panels.push(this._searchPanel);
			this._panels.push(this._taskPanel);
			this._panels.push(this._lingshouPanel);
			this._panels.push(this._userInfoPanel);
			this._panels.push(this._fightPanel);
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
	}
}