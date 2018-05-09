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
			let localPoint = this.WorldToTile(building.position);
			let footprint = building.footprint;
			return this.CheckOccupies(localPoint, footprint.x, footprint.y);
		}

		public SetBuilding(building: CBuilding): boolean {
			let localPoint = this.WorldToTile(building.position);
			let footprint = building.footprint;
			if (!this.CheckOccupies(localPoint, footprint.x, footprint.y))
				return false;
			let keys = this.SetOccupies(localPoint, footprint.x, footprint.y);
			for (let key of keys) {
				this._tileToEntity.setValue(key, building);
			}
			return true;
		}

		public RemoveBuilding(building: CBuilding): void {
			let localPoint = this.WorldToTile(building.position);
			let footprint = building.footprint;
			let keys = this.RemoveOccupies(localPoint, footprint.x, footprint.y);
			for (let key of keys) {
				this._tileToEntity.remove(key);
			}
		}

		public GetBuilding(worldPosition): CBuilding {
			let localPoint = this.WorldToTile(worldPosition);
			let key = this.EncodePoint(localPoint.x, localPoint.z);
			return this._tileToEntity.getValue(key);
		}
	}
}