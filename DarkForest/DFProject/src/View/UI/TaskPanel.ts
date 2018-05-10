namespace View.UI {
	export class TaskPanel implements IMainPanel {
		private _owner: UIMain;
		private _root: fairygui.GComponent;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c4").asCom;

			let backBtn = this._root.getChild("back_btn");
			backBtn.onClick(this, (e) => { this._owner.panelIndex = 0 });
		}

		public Dispose(): void {
		}

		public Enter(): void {
		}

		public Exit(): void {
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}
	}
}