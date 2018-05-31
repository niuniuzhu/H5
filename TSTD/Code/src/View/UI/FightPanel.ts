namespace View.UI {
	export class FightPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;
		private readonly _gesture: GestureComponent;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c6").asCom;
			this._gesture = new GestureComponent(this._root);
		}

		public Dispose(): void {
			this._gesture.Dispose();
		}

		public Enter(): void {
			this._gesture.Enter();
		}

		public Exit(): void {
			this._gesture.Exit();
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}
	}
}