/// <reference path="./CEntity.ts" />

namespace View {
	export class EditingBuilding extends CBuilding {
		private _srcBuilding: CBuilding;

		constructor() {
			super();
			this.disableTransformLerp = true;
		}

		public OnRemoveFromBattle(): void {
			super.OnRemoveFromBattle();
			this._srcBuilding = null;
		}

		public Steup(srcBuilding: CBuilding): void {
			this._srcBuilding = srcBuilding;
			this._srcBuilding.graphic.visible = false;
			this._graphic.alpha = 0.6;
			this._battle.tile.RemoveBuilding(this._srcBuilding);
		}

		public Apply(): boolean {
			if (this._battle.tile.CanPlace(this)) {
				this._srcBuilding.disableTransformLerp = true;// todo
				this._srcBuilding.position = this._position;
				this._srcBuilding.graphic.visible = true;
				this._battle.tile.PlaceBuilding(this._srcBuilding);
				this.MarkToDestroy();
				console.log("apply");
				return true;
			}
			return false;
		}

		public Cancel():void{
			this._srcBuilding.graphic.visible = true;
			this._battle.tile.PlaceBuilding(this._srcBuilding);
			this.MarkToDestroy();
			console.log("cancel");
		}
	}
}