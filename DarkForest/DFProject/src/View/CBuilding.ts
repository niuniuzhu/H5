/// <reference path="./CEntity.ts" />

namespace View {
	export class CBuilding extends CEntity {
		protected _occupies: number[];
		protected _tilePoint: RC.Numerics.Vec3;

		public get tilePoint(): RC.Numerics.Vec3 { return this._tilePoint.Clone(); }
		public set tilePoint(value: RC.Numerics.Vec3) { this._tilePoint = value.Clone(); }

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

		public SnapToTile(): void {
			this._tilePoint = this._battle.tile.WorldToLocal(this._position);
			this.position = this._battle.tile.LocalToWorld(this._tilePoint);
		}

		public ContainsPoint(tileSpaceTouchPoint: RC.Numerics.Vec3): boolean {
			let tileSpacePos = this._battle.tile.WorldToLocal(this._position);
			let minX = tileSpacePos.x - this._data.footprint.x + 1;
			let maxX = tileSpacePos.x;
			let minZ = tileSpacePos.z;
			let maxZ = minZ + this._data.footprint.z - 1
			if (tileSpaceTouchPoint.x < minX ||
				tileSpaceTouchPoint.z < minZ ||
				tileSpaceTouchPoint.x > maxX ||
				tileSpaceTouchPoint.z > maxZ)
				return false;
			return true;
		}
	}
}