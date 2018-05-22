namespace View.UI {
	export class FBPanel implements IMainPanel {
		private _owner: UIMain;
		private _root: fairygui.GComponent;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c1").asCom;

			this._root.getChild("b0").onClick(this, this.OnB0BtnClick);
			this._root.getChild("b1").onClick(this, this.OnB1BtnClick);
			this._root.getChild("b2").onClick(this, this.OnB2BtnClick);
			this._root.getChild("b3").onClick(this, this.OnB3BtnClick);
			this._root.getChild("b4").onClick(this, this.OnB4BtnClick);
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

		private OnB0BtnClick(): any {
			this._owner.EnterBattle();
		}

		private OnB1BtnClick(): any {
			this._owner.EnterBattle();
		}

		private OnB2BtnClick(): any {
			this._owner.EnterBattle();
		}

		private OnB3BtnClick(): any {
			this._owner.EnterBattle();
		}

		private OnB4BtnClick(): any {
			this._owner.EnterBattle();
		}
	}
}