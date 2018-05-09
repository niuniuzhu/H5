/// <reference path="./CEntity.ts" />

namespace View {
	export class CBuilding extends CEntity {
		private _occupies: number[];

		public get occupies(): number[] { return this._occupies; }
		public set occupies(value: number[]) {
			this._occupies.splice(0);
			for (let key of value) {
				this._occupies.push(key);
			}
		}

		constructor() {
			super();
			this._occupies = [];
		}

		public ContainsPoint(worldPoint: RC.Numerics.Vec3): boolean {
			let tileSpacePos = this._battle.tile.WorldToTile(this._position);
			let tileSpacePoint = this._battle.tile.WorldToTile(worldPoint);
			let halfX = RC.Numerics.MathUtils.Floor(this._data.footprint.x * 0.5);
			let halfZ = RC.Numerics.MathUtils.Floor(this._data.footprint.z * 0.5);
			let minX = tileSpacePos.x - halfX;
			let maxX = minX + this._data.footprint.x;
			let minZ = tileSpacePos.z - halfZ;
			let maxZ = minZ + this._data.footprint.z;
			if (tileSpacePoint.x < minX ||
				tileSpacePoint.z < minZ ||
				tileSpacePoint.x > maxX ||
				tileSpacePoint.z > maxZ)
				return false;
			return true;
		}
	}
}