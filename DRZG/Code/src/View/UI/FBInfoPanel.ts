namespace View.UI {
	export class FBInfoPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;

		public set fbID(id: string) {
			this._root.getChild("icon").asLoader.url = fairygui.UIPackage.getItemURL("main", id);
		}

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c4").asCom;

			this._root.getChild("fight_btn").onClick(this, this.OnFightBtnClick);
			this._root.getChild("cancel_btn").onClick(this, this.OnCancelBtnClick);
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

		private OnFightBtnClick(): any {
			this._owner.EnterBattle();
		}

		private OnCancelBtnClick(): any {
			this._owner.panelIndex = 1;
		}
	}
}