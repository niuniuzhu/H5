namespace View.UI {
	export class FightPanel implements IMainPanel {
		private static readonly COUNT_DOWN = 10000;

		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;
		private readonly _time: fairygui.GTextField;
		private readonly _result: fairygui.GComponent;
		private readonly _gesture: GestureComponent;
		private _countdown: number;
		private _gestureShowing: boolean;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c6").asCom;
			this._time = this._root.getChild("time").asTextField;
			this._result = this._root.getChild("g_result").asCom;
			this._gesture = new GestureComponent(this._root, this.OnGestureSuccess.bind(this), this.OnGestureError.bind(this));
		}

		public Dispose(): void {
			this._gesture.Dispose();
		}

		public Enter(): void {
			this.ShowGesture();
		}

		public Exit(): void {
		}

		public Update(deltaTime: number): void {
			if (!this._gestureShowing)
				return;
			this._countdown -= deltaTime;
			if (this._countdown <= 0) {
				this._countdown = 0;
				this.OnGestureError();
			}
			this._time.text = "" + RC.Numerics.MathUtils.Floor((this._countdown + 1000) * 0.001);
		}

		public OnResize(e: laya.events.Event): void {
		}

		private ShowGesture(): void {
			this._countdown = FightPanel.COUNT_DOWN;
			this._gesture.Show();
			this._gestureShowing = true;
		}

		private OnGestureSuccess(): void {
			this._result.getController("c1").selectedIndex = 0;
			this._gesture.Hide();
			this._gestureShowing = false;
		}

		private OnGestureError(): void {
			this._result.getController("c1").selectedIndex = 1;
			this._gesture.Hide();
			this._gestureShowing = false;
		}
	}
}