namespace View.UI {
	export class FightPanel implements IMainPanel {
		private static readonly COUNT_DOWN = 10000;

		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;
		private readonly _hp1: fairygui.GProgressBar;
		private readonly _hp2: fairygui.GProgressBar;
		private readonly _time: fairygui.GTextField;
		private readonly _result: fairygui.GComponent;
		private readonly _gesture: GestureComponent;
		private _countdown: number;
		private _gestureShowing: boolean;
		private _fight: Fight;

		public opponentId: string;
		public get fight(): Fight { return this._fight; }

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c6").asCom;
			this._time = this._root.getChild("time").asTextField;
			this._result = this._root.getChild("g_result").asCom;
			this._gesture = new GestureComponent(this._root, this.OnGestureSuccess.bind(this), this.OnGestureError.bind(this));
			this._hp1 = this._root.getChild("hp_bar").asProgress;
			this._hp2 = this._root.getChild("hp_bar2").asProgress;
		}

		public Dispose(): void {
			this._gesture.Dispose();
		}

		public Enter(): void {
			this.ShowGesture();
			this._fight = new Fight();
			this._fight.CreateFighter(View.CUser.pets[View.CUser.petForFight], this.opponentId,
				this._root.getChild("p1").asCom, this._root.getChild("p2").asCom);
			this._hp1.value = this._fight.player.hp;
			this._hp2.value = this._fight.opponent.hp;
			this._hp1.max = this._fight.player.hp;
			this._hp2.max = this._fight.opponent.hp;
		}

		public Exit(): void {
			this._fight.Dispose();
			this._fight = null;
		}

		public Update(deltaTime: number): void {
			if (!this._gestureShowing)
				return;
			this._countdown -= deltaTime;
			if (this._countdown <= 0) {
				this._countdown = 0;
				this._gesture.TouchEnd();
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
			this._gesture.Hide((() => {
				this._fight.BeginFight(true, this.OnFightComplete.bind(this));
			}).bind(this));
			this._gestureShowing = false;
		}

		private OnGestureError(): void {
			this._result.getController("c1").selectedIndex = 1;
			this._gesture.Hide((() => {
				this._fight.BeginFight(false, this.OnFightComplete.bind(this));
			}).bind(this));
			this._gestureShowing = false;
		}

		private OnFightComplete(): void {
			this._hp1.value = this._fight.player.hp;
			this._hp2.value = this._fight.opponent.hp;
			let result = 0;
			if (this._fight.opponent.hp <= 0)
				result = 1;
			else if (this._fight.player.hp <= 0)
				result = -1
			if (result == 0)
				this.ShowGesture();
			else {
				this._owner.resultPanel.win = result == 1 ? true : false;
				this._owner.resultPanel.opponent = this._fight.opponent;
				this._owner.panelIndex = 7;
			}
		}
	}
}