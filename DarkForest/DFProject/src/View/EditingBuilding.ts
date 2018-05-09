/// <reference path="./CEntity.ts" />

namespace View {
	export class EditingBuilding extends CEntity {
		private _srcBuilding: CBuilding;

		constructor() {
			super();
		}

		public Apply(srcBuilding:CBuilding):void{
			this._srcBuilding = srcBuilding;
			this._srcBuilding.graphic.visible = false;
			this.battle.tile.RemoveBuilding(this._srcBuilding);
		}
	}
}