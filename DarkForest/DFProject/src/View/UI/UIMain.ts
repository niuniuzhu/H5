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

		public get controller(): fairygui.Controller { return this._controller; }
		public get root(): fairygui.GComponent { return this._root; }
		public get homePanel(): HomePanel { return this._homePanel; }
		public get searchPanel(): SearchPanel { return this._searchPanel; }
		public get fightPanel(): FightPanel { return this._fightPanel; }
		public get rolePanel(): RolePanel { return this._rolePanel; }

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/battle");
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
		}

		public Leave(): void {
			this._homePanel.Dispose();
			this._searchPanel.Dispose();
			this._fightPanel.Dispose();
			this._rolePanel.Dispose();
			this._taskPanel.Dispose();
			this._msgPanel.Dispose();

			this._root.dispose();
			this._root = null;
			this._controller = null;
		}

		public Update(deltaTime: number): void {
			this._homePanel.Update(deltaTime);
		}

		public OnResize(e: laya.events.Event): void {
			this._homePanel.OnResize(e);
		}
	}
}