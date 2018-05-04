namespace View.UI {
	export class UIBattle implements IUIModule {
		private _root: fairygui.GComponent;
		private _winCom: fairygui.GComponent;

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/battle");
		}

		public Dispose(): void {
		}

		public Update(deltaTime: number): void {
		}

		public Enter(param: any): void {
			Game.BattleManager.Init(<Logic.BattleParams>param);

			this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
			this._root.displayObject.name = "Battle";
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);

			this._winCom = this._root.getChild("win_com").asCom;
			this._winCom.getChild("n4").onClick(this, this.OnQuitBtnClick);

			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.WIN, this.HandleWin);
			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.ENTITY_CREATED, this.HandleEntityCreated);
			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.ENTITY_DESTROIED, this.HandleEntityDestroied);
			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.ENTITY_ATTR_CHANGED, this.HandleEntityAttrChanged);
			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.USE_SKILL, this.HandleUseSkill);
		}

		public Leave(): void {
			Game.BattleManager.Dispose();

			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.WIN, this.HandleWin);
			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.ENTITY_CREATED, this.HandleEntityCreated);
			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.ENTITY_DESTROIED, this.HandleEntityDestroied);
			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.ENTITY_ATTR_CHANGED, this.HandleEntityAttrChanged);
			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.USE_SKILL, this.HandleUseSkill);
		}

		private HandleWin(e: Shared.Event.BaseEvent): void {
			this._winCom.visible = true;
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

		private OnQuitBtnClick(e: Event): void {
		}
	}
}