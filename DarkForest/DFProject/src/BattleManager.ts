namespace Game {
	export class BattleManager {
		public static cBattle: View.CBattle = null;
		public static lBattle: Logic.Battle = null;

		private static _init: boolean = false;
		private static _elapsedSinceLastLogicUpdate: number = 0;
		private static _elapsed: number = 0;
		private static _frameRate: number = 0;
		private static _framesPerKeyFrame: number = 0;
		private static _nextKeyFrame: number = 0;

		public static Init(param: Logic.BattleParams): void {
			this._init = true;

			this._elapsedSinceLastLogicUpdate = 0;
			this._framesPerKeyFrame = param.framesPerKeyFrame;
			this._frameRate = param.frameRate;
			this._nextKeyFrame = this._framesPerKeyFrame;

			this.cBattle = new View.CBattle(param);
			this.lBattle = new Logic.Battle(param);
		}

		public static Dispose(): void {
			if (!this._init)
				return;

			this._init = false;

			this._elapsed = 0;
			this._elapsedSinceLastLogicUpdate = 0;

			this.lBattle.Dispose();
			Shared.Event.EventCenter.Sync();
			this.cBattle.Dispose();

			this.lBattle = null;
			this.cBattle = null;
		}

		public static Update(deltaTime: number): void {
			if (!this._init)
				return;

			Shared.Event.EventCenter.Sync();
			this.cBattle.Update(deltaTime);
			this.UpdateLogic(deltaTime);
		}

		private static UpdateLogic(deltaTime: number): void {
			let millisecondsPreFrame = 1000 / this._frameRate;
			this._elapsed += deltaTime;
			while (this._elapsed >= millisecondsPreFrame) {
				this.lBattle.Update(millisecondsPreFrame);
				this._elapsed -= millisecondsPreFrame;
			}
		}
	}
}