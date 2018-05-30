namespace View.UI {
	export class SearchPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c2").asCom;

			this._root.getChild("back_btn").onClick(this, this.OnBackBtnClick);
			this._root.getChild("atk_btn").onClick(this, this.OnAtkBtnClick);
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

		private OnBackBtnClick(e:laya.events.Event): any {
			this._owner.panelIndex = 0;
		}

		private OnAtkBtnClick(e:laya.events.Event): any {
			this._owner.panelIndex = 6;
		}
	}
}