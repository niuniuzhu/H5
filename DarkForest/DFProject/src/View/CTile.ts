/// <reference path="../Shared/TileBase.ts"/>

namespace View {
	export class CTile extends Shared.TileBase {
		private readonly _tileToEntity: RC.Collections.Dictionary<number, CEntity>;
		private readonly _entityToTile: RC.Collections.Dictionary<CEntity, number[]>;

		constructor(slope: number, aspect: number, ratio: number) {
			super(slope, aspect, ratio);
			this._tileToEntity = new RC.Collections.Dictionary<number, CEntity>();
			this._entityToTile = new RC.Collections.Dictionary<CEntity, number[]>();
		}

		public Dispose(): void {
			super.Dispose();
			this._tileToEntity.clear();
			this._entityToTile.clear();
		}

		public SetEntity(entity: CEntity): void {
			let localPoint = this.WorldToTile(entity.position);
			let footprint = entity.footprint;
			let tiles = this._entityToTile.getValue(entity);
			if (tiles == null) {
				tiles = [];
				this._entityToTile.setValue(entity, tiles);
			}
			let keys = this.SetOccupies(localPoint, footprint.x, footprint.y);
			for (let key of keys) {
				this._tileToEntity.setValue(key, entity);
				tiles.push(key);
			}
		}

		public RemoveEntity(entity: CEntity): void {
			let localPoint = this.WorldToTile(entity.position);
			let footprint = entity.footprint;
			let tiles = this._entityToTile.getValue(entity);
			if (tiles == null) {
				tiles = [];
				this._entityToTile.setValue(entity, tiles);
			}
			let keys = this.RemoveOccupies(localPoint, footprint.x, footprint.y);
			for (let key of keys) {
				this._tileToEntity.setValue(key, entity);
				tiles.push(key);
			}
			// let keys = this._entityToTile.getValue(entity);
			// if (keys == null)
			// 	return false;
			// for (let key of keys) {
			// 	this._tileToEntity.remove(key);
			// }
		}

		public GetEntity(worldPosition): CEntity {
			let localPoint = this.WorldToTile(worldPosition);
			let key = this.EncodePoint(localPoint.x, localPoint.z);
			return this._tileToEntity.getValue(key);
		}
	}
}