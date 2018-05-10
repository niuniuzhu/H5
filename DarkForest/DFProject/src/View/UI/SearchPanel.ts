namespace View.UI {
	export class SearchPanel {
		private _owner: UIMain;
		private _root: fairygui.GComponent;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c2").asCom;
		}

		public Dispose(): void {

		}
	}
}