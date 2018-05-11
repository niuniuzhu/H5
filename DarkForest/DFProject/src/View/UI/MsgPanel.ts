namespace View.UI {
	export class MsgPanel implements IMainPanel {
		private _owner: UIMain;
		private _root: fairygui.GComponent;
		private _atk: fairygui.GTextField;
		private _def: fairygui.GTextField;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c5").asCom;
			this._atk = this._root.getChild("atk").asTextField;
			this._def = this._root.getChild("def").asTextField;

			let backBtn = this._root.getChild("back_btn");
			backBtn.onClick(this, (e) => { this._owner.panelIndex = 0 });

			Shared.Event.EventCenter.AddListener(Shared.Event.UIEvent.UPDATE_BUILDING, this.HandleUpdateBuilding.bind(this));
		}

		public Dispose(): void {
			Shared.Event.EventCenter.RemoveListener(Shared.Event.UIEvent.UPDATE_BUILDING, this.HandleUpdateBuilding.bind(this));
		}

		public Enter(): void {
			let tasksDef = Shared.Defs.GetMessage();
			let list = this._root.getChild("list").asList;
			for ( let taskDef of tasksDef){
				let com = list.addItemFromPool().asCom;
				com.getChild("n6").asTextField.text = taskDef;
			}
		}

		public Exit(): void {
			let list = this._root.getChild("list").asList;
			list.removeChildrenToPool();
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private HandleUpdateBuilding(e: Shared.Event.BaseEvent): void {
			this.UpdateResources();
		}

		private UpdateResources(): void {
			this._atk.text = CUser.atk.toString();
			this._def.text = CUser.def.toString();
		}
	}
}