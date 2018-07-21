namespace View.UI {
	export class SearchPanel implements IMainPanel {
		private static readonly WAIT_TIME: number = 2000;

		private _owner: UIMain;
		private _root: fairygui.GComponent;
		private _timer: laya.utils.Timer;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c1").asCom;

			let backBtn = this._root.getChild("back_btn");
			backBtn.onClick(this, (e) => { this._owner.panelIndex = 0 });
		}

		public Dispose(): void {
		}

		public Enter(): void {
			let backBtn = this._root.getChild("back_btn");
			backBtn.touchable = true;
			backBtn.alpha = 1;

			let m = this._root.getChild("n40").asMovieClip;
			m.alpha = 1;
			m.playing = true;

			this._timer = new laya.utils.Timer();
			this._timer.once(Math.random() * 1000 - 500 + SearchPanel.WAIT_TIME, this, this.Matched);
		}

		public Exit(): void {
			this._timer.clear(this, this.Matched);
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private Matched(): void {
			let backBtn = this._root.getChild("back_btn");
			backBtn.touchable = false;
			let t = this._root.getTransition("t0");
			t.play(new laya.utils.Handler(this, this.OnTransitionComplete));
		}

		private OnTransitionComplete(): void {
			this._owner.panelIndex = 2;
		}
	}
}