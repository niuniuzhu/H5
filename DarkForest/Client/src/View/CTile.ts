/// <reference path="../Shared/TileBase.ts"/>

namespace View {
	export class CTile extends Shared.TileBase {
		private readonly _tileToEntity: RC.Collections.Dictionary<number, CBuilding>;

		constructor(slope: number, aspect: number, ratio: number) {
			super(slope, aspect, ratio);
			this._tileToEntity = new RC.Collections.Dictionary<number, CBuilding>();
		}

		public Dispose(): void {
			super.Dispose();
			this._tileToEntity.clear();
		}

		public CanPlace(building: CBuilding): boolean {
			let footprint = building.footprint;
			return this.CheckOccupies(building.tilePoint, footprint.x, footprint.z);
		}

		public PlaceBuilding(building: CBuilding): void {
			let footprint = building.footprint;
			let keys = this.SetOccupies(building.tilePoint, footprint.x, footprint.z);
			building.occupies = keys;
			for (let key of keys) {
				this._tileToEntity.setValue(key, building);
			}
		}

		public RemoveBuilding(building: CBuilding): void {
			for (let key of building.occupies) {
				this.RemoveOccupyByKey(key);
				this._tileToEntity.remove(key);
			}
			building.occupies.splice(0);
		}

		public GetBuilding(worldPosition: RC.Numerics.Vec3): CBuilding {
			let localPoint = this.WorldToLocal(worldPosition);
			let key = this.EncodePoint(localPoint.x, localPoint.z);
			return this._tileToEntity.getValue(key);
		}
	}
}