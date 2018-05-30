/// <reference path="./CTower" />

namespace View {
	export class CChampion extends CTower {
		private static readonly DELAY_DESTROY = 3000;

		public get speed(): number { return this._data.speed; }

		private _destroyTime;

		public OnCreated(owner: CBattle, param: Shared.Model.EntityParam): void {
			super.OnCreated(owner, param);
			this._graphic.Stop();
		}

		public InternalUpdateState(context: Shared.UpdateContext): void {
			super.InternalUpdateState(context);
			if (this._destroyTime != undefined) {
				if (context.time >= this._destroyTime) {
					this.MarkToDestroy();
					this._destroyTime = undefined;
				}
			}
		}

		public PlayRun(): void {
			this._graphic.Play(6, 13, -1, 6);
		}

		public PlayFight(): void {
			this._graphic.Play(0, 5, 1, 0);
		}

		public OnDead(): void {
			this._graphic.Play(13, 14, 1, 14, new laya.utils.Handler(this, () => {
				this._destroyTime = this.owner.time + CChampion.DELAY_DESTROY
			}));
		}
	}
}