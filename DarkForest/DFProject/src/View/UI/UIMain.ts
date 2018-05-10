namespace View.UI {
	export class UIMain implements IUIModule {
		private _root: fairygui.GComponent;
		private _controller: fairygui.Controller;
		private _homePanel: HomePanel;
		private _searchPanel: SearchPanel;
		private _fightPanel: FightPanel;
		private _rolePanel: RolePanel;
		private _taskPanel: TaskPanel;
		private _msgPanel: MsgPanel;
		private readonly _panels: IMainPanel[];

		public get root(): fairygui.GComponent { return this._root; }
		public get homePanel(): HomePanel { return this._homePanel; }
		public get searchPanel(): SearchPanel { return this._searchPanel; }
		public get fightPanel(): FightPanel { return this._fightPanel; }
		public get rolePanel(): RolePanel { return this._rolePanel; }

		public set panelIndex(value: number) {
			if (this._controller.selectedIndex == value)
				return;
			this._panels[value].Exit();
			this._panels[value].Enter();
			this._controller.selectedIndex = value;
		}

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/battle");
			this._panels = [];
		}

		public Dispose(): void {
		}

		public Enter(param: any): void {
			this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
			this._root.displayObject.name = "Battle";
			this._root.opaque = false;
			this._root.getChild("c0").asCom.opaque = false;
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);

			this._controller = this._root.getController("c1");
			this._homePanel = new HomePanel(this, <Shared.Model.BattleParams>param);
			this._searchPanel = new SearchPanel(this);
			this._fightPanel = new FightPanel(this);
			this._rolePanel = new RolePanel(this);
			this._taskPanel = new TaskPanel(this);
			this._msgPanel = new MsgPanel(this);

			this._panels.push(this._homePanel);
			this._panels.push(this._searchPanel);
			this._panels.push(this._fightPanel);
			this._panels.push(this._rolePanel);
			this._panels.push(this._taskPanel);
			this._panels.push(this._msgPanel);

			this._controller.selectedIndex = 0;
			this._homePanel.Enter();
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