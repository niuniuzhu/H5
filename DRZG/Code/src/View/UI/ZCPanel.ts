namespace View.UI {
	export class ZCPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c0").asCom;

			this._root.getChild("jjc_btn").onClick(this, this.OnJJCBtnClick);
			this._root.getChild("phb_btn").onClick(this, this.OnPHBBtnClick);
			this._root.getChild("qd_btn").onClick(this, this.OnQDBtnClick);
			this._root.getChild("yx_btn").onClick(this, this.OnYXBtnClick);
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

		private OnJJCBtnClick(): any {
		}

		private OnPHBBtnClick(): any {
			this._owner.panelIndex = 3;
		}

		private OnQDBtnClick(): any {
		}

		private OnYXBtnClick(): any {
		}
	}
}