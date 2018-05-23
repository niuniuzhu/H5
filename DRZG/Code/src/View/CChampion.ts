/// <reference path="./CTower" />

namespace View {
	export class CChampion extends CTower {
		public PlayRun(): void {
			this._graphic.Play(6, 13, -1, 6);
		}

		public PlayFight(): void {
			this._graphic.Play(0, 5, 1, 6, new laya.utils.Handler(this, () => {
				this.PlayRun();
			}));
		}

		public PlayDie(): void {
			this._graphic.Play(14, 14, 1, 14);
		}
	}
}