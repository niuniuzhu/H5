namespace View.UI {
	export class UIBattle implements IUIModule {
		private _root: fairygui.GComponent;
		private _controller: fairygui.Controller;
		private _buildPanel: fairygui.GComponent;

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/battle");
		}

		public Dispose(): void {
		}

		public Update(deltaTime: number): void {
		}

		public Enter(param: any): void {
			Game.BattleManager.Init(<Shared.Model.BattleParams>param);

			this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
			this._root.displayObject.name = "Battle";
			this._root.opaque = false;
			this._root.getChild("c0").asCom.opaque = false;
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);

			this._controller = this._root.getController("c1");

			let tansuoBtn = this._root.getChild("c0").asCom.getChild("tansuo_btn");
			tansuoBtn.onClick(this, (e) => { this._controller.selectedIndex = 1 });

			let backBtn = this._root.getChild("c1").asCom.getChild("back_btn");
			backBtn.onClick(this, (e) => { this._controller.selectedIndex = 0 });

			let jiansheBtn = this._root.getChild("c0").asCom.getChild("jianshe_btn");
			jiansheBtn.onClick(this, (e) => {
				if (this._buildPanel == null) {
					this._buildPanel = fairygui.UIPackage.createObject("battle", "buildPanel").asCom;
					this._buildPanel.getChild("list").on(fairygui.Events.CLICK_ITEM, this, this.OnBuildItemClick);
				}
				fairygui.GRoot.inst.togglePopup(this._buildPanel, fairygui.GRoot.inst);
				this._buildPanel.center();
			});

			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.WIN, this.HandleWin.bind(this));
			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.ENTITY_CREATED, this.HandleEntityCreated.bind(this));
			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.ENTITY_DESTROIED, this.HandleEntityDestroied.bind(this));
			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.ENTITY_ATTR_CHANGED, this.HandleEntityAttrChanged.bind(this));
			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.USE_SKILL, this.HandleUseSkill.bind(this));
			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.START_LAYOUT, this.HandleStartLayout.bind(this));
			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.END_LAYOUT, this.HandleEndLayout.bind(this));
		}

		public Leave(): void {
			Game.BattleManager.Dispose();

			if (this._buildPanel != null) {
				this._buildPanel.dispose();
				this._buildPanel = null;
			}
			this._root.dispose();
			this._root = null;
			this._controller = null;

			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.WIN, this.HandleWin.bind(this));
			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.ENTITY_CREATED, this.HandleEntityCreated.bind(this));
			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.ENTITY_DESTROIED, this.HandleEntityDestroied.bind(this));
			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.ENTITY_ATTR_CHANGED, this.HandleEntityAttrChanged.bind(this));
			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.USE_SKILL, this.HandleUseSkill.bind(this));
			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.START_LAYOUT, this.HandleStartLayout.bind(this));
			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.END_LAYOUT, this.HandleEndLayout.bind(this));
		}

		private HandleWin(e: Shared.Event.BaseEvent): void {
		}

		private HandleEntityCreated(e: Shared.Event.BaseEvent): void {
			let uiEvent = <Shared.Event.UIEvent>e;
		}

		private HandleEntityDestroied(e: Shared.Event.BaseEvent): void {
			let uiEvent = <Shared.Event.UIEvent>e;
		}

		private HandleEntityAttrChanged(e: Shared.Event.BaseEvent): void {
			let uiEvent = <Shared.Event.UIEvent>e;
		}

		private HandleUseSkill(e: Shared.Event.BaseEvent): void {
		}

		private HandleStartLayout(e: Shared.Event.BaseEvent): void {
			this._root.getChild("c0").asCom.getController("c1").selectedIndex = 1;
			this._root.getChild("c0").asCom.getChild("jianshe_btn").asCom.touchable = false;
		}

		private HandleEndLayout(e: Shared.Event.BaseEvent): void {
			this._root.getChild("c0").asCom.getController("c1").selectedIndex = 0;
			this._root.getChild("c0").asCom.getChild("jianshe_btn").asCom.touchable = true;
		}

		private OnBuildItemClick(sender: fairygui.GObject, e: laya.events.Event): void {
			let bid = sender.asCom.name;
			let worldPoint = Game.BattleManager.cBattle.camera.ScreenToWorld(new RC.Numerics.Vec3(e.stageX, e.stageY));
			let building = Game.BattleManager.cBattle.CreateBuilding(bid, worldPoint);
			building.SnapToTile();
			fairygui.GRoot.inst.hidePopup();
			if (!Game.BattleManager.cBattle.tile.CanPlace(building)) {
				Game.BattleManager.cBattle.input.ChangeState(InputStateType.Layout, building);
			} else {
				Game.BattleManager.cBattle.tile.PlaceBuilding(building);
			}
		}
	}
}