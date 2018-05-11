/// <reference path="./CEntity.ts" />

namespace View {
	export class EditingBuilding extends CBuilding {
		private _srcBuilding: CBuilding;

		constructor() {
			super();
		}

		public OnRemoveFromBattle(): void {
			super.OnRemoveFromBattle();
			this._srcBuilding = null;
		}

		public Steup(srcBuilding: CBuilding): void {
			this._srcBuilding = srcBuilding;
			this._srcBuilding.graphic.visible = false;
			this.tilePoint = this._srcBuilding.tilePoint;
			this.position = this._srcBuilding.position;
			this._graphic.alpha = 0.6;
			this._graphic.sortingOrder = 999;
			this._owner.tile.RemoveBuilding(this._srcBuilding);
		}

		public Apply(): boolean {
			if (this.CanPlace()) {
				this._srcBuilding.tilePoint = this._tilePoint;
				this._srcBuilding.graphic.visible = true;
				this._srcBuilding.position = this._position;
				this._srcBuilding.Place();
				this.MarkToDestroy();
				return true;
			}
			return false;
		}

		public Cancel(): void {
			this._srcBuilding.graphic.visible = true;
			this._srcBuilding.Place();
			this.MarkToDestroy();
		}
	}
}