namespace Shared {
	export class TileBase {
		protected readonly _occupied: Set<number>;
		protected readonly _worldToLocalMat: RC.Numerics.Mat4;
		protected readonly _localToWorldMat: RC.Numerics.Mat4;

		constructor(slope: number, aspect: number, ratio: number) {
			this._occupied = new Set<number>();
			this._localToWorldMat = RC.Numerics.Mat4.FromTRS(RC.Numerics.Vec3.zero,
				RC.Numerics.Quat.Euler(new RC.Numerics.Vec3(0, slope, 0)),
				new RC.Numerics.Vec3(1, 1, 1));
			this._localToWorldMat.Mul(RC.Numerics.Mat4.FromScale(new RC.Numerics.Vec3(ratio, 1, aspect * ratio)));
			this._worldToLocalMat = RC.Numerics.Mat4.NonhomogeneousInvert(this._localToWorldMat);
		}

		public Dispose(): void {
			this._occupied.clear();
		}

		public WorldToTile(point: RC.Numerics.Vec3): RC.Numerics.Vec3 {
			let v = this._worldToLocalMat.TransformPoint(point);
			v.x = RC.Numerics.MathUtils.Floor(v.x);
			v.y = RC.Numerics.MathUtils.Floor(v.y);
			v.z = RC.Numerics.MathUtils.Floor(v.z);
			return v;
		}

		public TileToWorld(point: RC.Numerics.Vec3): RC.Numerics.Vec3 {
			return this._localToWorldMat.TransformPoint(point);
		}

		public CheckOccupies(localCenter: RC.Numerics.Vec3, length: number, depth: number): boolean {
			let topLeftX = localCenter.x - length;
			let topLeftY = localCenter.z - depth;
			for (let x = 0; x < length; ++x) {
				for (let y = 0; y < depth; ++y) {
					if (!this.GetOccupy(new RC.Numerics.Vec3(x + topLeftX, y + topLeftY)))
						return false;
				}
			}
			return true;
		}

		public RemoveOccupies(localCenter: RC.Numerics.Vec3, length: number, depth: number): number[] {
			let keys: number[] = [];
			let topLeftX = localCenter.x - length;
			let topLeftY = localCenter.z - depth;
			for (let x = 0; x < length; ++x) {
				for (let y = 0; y < depth; ++y) {
					let key = this.RemoveOccupy(new RC.Numerics.Vec3(x + topLeftX, y + topLeftY));
					keys.push(key);
				}
			}
			return keys;
		}

		public SetOccupies(localCenter: RC.Numerics.Vec3, length: number, depth: number): number[] {
			let keys: number[] = [];
			let topLeftX = localCenter.x - length;
			let topLeftY = localCenter.z - depth;
			for (let x = 0; x < length; ++x) {
				for (let y = 0; y < depth; ++y) {
					let key = this.SetOccupy(new RC.Numerics.Vec3(x + topLeftX, y + topLeftY));
					keys.push(key);
				}
			}
			return keys;
		}

		public RemoveOccupy(localPoint: RC.Numerics.Vec3): number {
			let key = this.EncodePoint(localPoint.x, localPoint.z);
			this._occupied.add(key);
			if (this._occupied.delete(key))
				return key;
			return RC.Numerics.MathUtils.MAX_VALUE;
		}

		public SetOccupy(localPoint: RC.Numerics.Vec3): number {
			let key = this.EncodePoint(localPoint.x, localPoint.z);
			this._occupied.add(key);
			return key;
		}

		public GetOccupy(localPoint: RC.Numerics.Vec3): boolean {
			return this._occupied.has(this.EncodePoint(localPoint.x, localPoint.z));
		}

		protected EncodePoint(x: number, z: number): number {
			let value = x << 16;
			let sign = RC.Numerics.MathUtils.Sign(z);
			if (sign < 0)
				value |= 1 << 15;
			value |= z;
			return value;
		}
	}
}