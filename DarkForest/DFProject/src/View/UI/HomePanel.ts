namespace View.UI {
	export class HomePanel {
		private _owner: UIMain;
		private _root: fairygui.GComponent;
		private _buildPanel: fairygui.GComponent;
		private _home: View.Home;

		constructor(owner: UIMain, param: Shared.Model.BattleParams) {
			this._owner = owner;
			this._root = owner.root.getChild("c0").asCom;

			let tansuoBtn = this._root.getChild("tansuo_btn");
			tansuoBtn.onClick(this, (e) => { this._owner.controller.selectedIndex = 1 });

			let juseBtn = this._root.getChild("juse_btn");
			juseBtn.onClick(this, (e) => { this._owner.controller.selectedIndex = 3 });

			let renwuBtn = this._root.getChild("renwu_btn");
			renwuBtn.onClick(this, (e) => { this._owner.controller.selectedIndex = 4 });

			let xiaoxiBtn = this._root.getChild("xiaoxi_btn");
			xiaoxiBtn.onClick(this, (e) => { this._owner.controller.selectedIndex = 5 });

			let jiansheBtn = this._root.getChild("jianshe_btn");
			jiansheBtn.onClick(this, (e) => {
				if (this._buildPanel == null) {
					this._buildPanel = fairygui.UIPackage.createObject("battle", "buildPanel").asCom;
					this._buildPanel.getChild("list").on(fairygui.Events.CLICK_ITEM, this, this.OnBuildItemClick);
				}
				fairygui.GRoot.inst.togglePopup(this._buildPanel, fairygui.GRoot.inst);
				this._buildPanel.center();
			});

			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.START_LAYOUT, this.HandleStartLayout.bind(this));
			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.END_LAYOUT, this.HandleEndLayout.bind(this));

			this._home = new View.Home(param);
			this._home.SetGraphicRoot(this._root.getChild("n37").asCom);
		}

		public Dispose(): void {
			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.START_LAYOUT, this.HandleStartLayout.bind(this));
			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.END_LAYOUT, this.HandleEndLayout.bind(this));

			if (this._buildPanel != null) {
				this._buildPanel.dispose();
				this._buildPanel = null;
			}
			this._home.Dispose();
		}

		public Update(deltaTime: number): void {
			this._home.Update(deltaTime);
		}

		public OnResize(e: laya.events.Event): any {
			this._home.OnResize(e);
		}

		private OnBuildItemClick(sender: fairygui.GObject, e: laya.events.Event): void {
			let bid = sender.asCom.name;
			let worldPoint = this._home.camera.ScreenToWorld(new RC.Numerics.Vec3(e.stageX, e.stageY));
			let building = this._home.CreateBuilding(bid, worldPoint);
			building.SnapToTile();
			if (!this._home.tile.CanPlace(building)) {
				this._home.input.ChangeState(InputStateType.Layout, building);
			} else {
				this._home.tile.PlaceBuilding(building);
			}
			fairygui.GRoot.inst.hidePopup();
		}

		private HandleStartLayout(e: Shared.Event.BaseEvent): void {
			this._root.getController("c1").selectedIndex = 1;
			this._root.getChild("jianshe_btn").asCom.touchable = false;
		}

		private HandleEndLayout(e: Shared.Event.BaseEvent): void {
			this._root.getController("c1").selectedIndex = 0;
			this._root.getChild("jianshe_btn").asCom.touchable = true;
		}

		public SetImage(id: string): void {
			this._root.getChild("juse_btn").asCom.getChild("n1").asLoader.url = fairygui.UIPackage.getItemURL("battle", id);
		}

		public SetName(name:string):void{
			this._root.getChild("juse_btn").asCom.getChild("n0").asTextField.text = name;
		}
	}
}