namespace View.UI {
	export class QDPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;
		private readonly _list: fairygui.GList;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c6").asCom;
			this._list = this._root.getChild("list").asList;
		}

		public Dispose(): void {
		}

		public Enter(): void {
			for (let i = 0; i < 20; ++i) {
				let item = this._list.addItemFromPool().asCom;
				item.getController("c1").selectedIndex = Math.round(Math.random() * 2);
				item.getChild("exp").asTextField.text = "" + Math.round(Math.random() * 3000 + 1500);
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