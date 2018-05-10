namespace View.UI {
	export class SearchPanel implements IMainPanel {
		private _owner: UIMain;
		private _root: fairygui.GComponent;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c1").asCom;

			let searchBtn = this._root.getChild("search_btn");
			searchBtn.onClick(this, (e) => { this._owner.panelIndex = 2 });

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