namespace View.UI {
	export class FBPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c1").asCom;

			this._root.getChild("fb0").onClick(this, this.OnFBBtnClick);
			this._root.getChild("fb1").onClick(this, this.OnFBBtnClick);
			this._root.getChild("fb2").onClick(this, this.OnFBBtnClick);
			this._root.getChild("fb3").onClick(this, this.OnFBBtnClick);
			this._root.getChild("fb4").onClick(this, this.OnFBBtnClick);
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

		private OnFBBtnClick(e:laya.events.Event): any {
			this._owner.panelIndex = 4;
			let target = <fairygui.GComponent>fairygui.GObject.cast(e.currentTarget);
			this._owner.fbInfoPanel.fbID = target.name;
		}
	}
}