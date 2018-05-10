namespace View.UI {
	export class TaskPanel {
		private _owner: UIMain;
		private _root: fairygui.GComponent;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c4").asCom;

			let backBtn = this._root.getChild("back_btn");
			backBtn.onClick(this, (e) => { this._owner.controller.selectedIndex = 0 });
		}

		public Dispose(): void {

		}
	}
}