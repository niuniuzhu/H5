namespace Game {
	export class BattleManager {
		public static cBattle: View.CBattle = null;

		private static _init: boolean = false;

		public static Init(param: Shared.Model.BattleParams): void {
			this._init = true;
			this.cBattle = new View.CBattle(param);
		}

		public static Dispose(): void {
			if (!this._init)
				return;

			this._init = false;
			this.cBattle = null;
		}

		public static Update(deltaTime: number): void {
			if (!this._init)
				return;

			this.cBattle.Update(deltaTime);
		}

		public static OnResize(e: laya.events.Event): any {
			if (!this._init)
				return;
			this.cBattle.OnResize(e);
		}
	}
}