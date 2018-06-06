namespace View.UI {
	export class MsgPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;
		private readonly _list: fairygui.GList;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c1").asCom;
			this._list = this._root.getChild("list").asList;
		}

		public Dispose(): void {
		}

		public Enter(): void {
			let tasksDef = Shared.Defs.GetMessage();
			for ( let taskDef of tasksDef){
				let com = this._list.addItemFromPool().asCom;
				com.getChild("content").asTextField.text = taskDef;
			}
		}

		public Exit(): void {
			this._list.removeChildrenToPool();
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}
	}
}