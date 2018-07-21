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

		public WorldToLocal(worldPoint: RC.Numerics.Vec3): RC.Numerics.Vec3 {
			let v = this._worldToLocalMat.TransformPoint(worldPoint);
			v.x = RC.Numerics.MathUtils.Ceil(v.x);
			v.y = 0;
			v.z = RC.Numerics.MathUtils.Floor(v.z);
			return v;
		}

		public LocalToWorld(localPoint: RC.Numerics.Vec3): RC.Numerics.Vec3 {
			return this._localToWorldMat.TransformPoint(localPoint);
		}

		public CheckOccupies(localPoint: RC.Numerics.Vec3, length: number, depth: number): boolean {
			let topLeftX = localPoint.x - length + 1;
			let topLeftZ = localPoint.z;
			for (let x = 0; x < length; ++x) {
				for (let z = 0; z < depth; ++z) {
					if (this.IsOccupied(new RC.Numerics.Vec3(x + topLeftX, 0, z + topLeftZ)))
						return false;
				}
			}
			return true;
		}

		public RemoveOccupies(localPoint: RC.Numerics.Vec3, length: number, depth: number): number[] {
			let keys: number[] = [];
			let topLeftX = localPoint.x - length + 1;
			let topLeftZ = localPoint.z;
			for (let x = 0; x < length; ++x) {
				for (let z = 0; z < depth; ++z) {
					let key = this.RemoveOccupy(new RC.Numerics.Vec3(x + topLeftX, 0, z + topLeftZ));
					if (key != RC.Numerics.MathUtils.MAX_VALUE)
						keys.push(key);
				}
			}
			return keys;
		}

		public SetOccupies(localPoint: RC.Numerics.Vec3, length: number, depth: number): number[] {
			let keys: number[] = [];
			let topLeftX = localPoint.x - length + 1;
			let topLeftZ = localPoint.z;
			for (let x = 0; x < length; ++x) {
				for (let z = 0; z < depth; ++z) {
					let key = this.SetOccupy(new RC.Numerics.Vec3(x + topLeftX, 0, z + topLeftZ));
					keys.push(key);
				}
			}
			return keys;
		}

		public RemoveOccupy(localPoint: RC.Numerics.Vec3): number {
			let key = this.EncodePoint(localPoint.x, localPoint.z);
			if (this._occupied.delete(key))
				return key;
			return RC.Numerics.MathUtils.MAX_VALUE;
		}

		public RemoveOccupyByKey(key: number): boolean {
			return this._occupied.delete(key);
		}

		public SetOccupy(localPoint: RC.Numerics.Vec3): number {
			let key = this.EncodePoint(localPoint.x, localPoint.z);
			this._occupied.add(key);
			return key;
		}

		public IsOccupied(localPoint: RC.Numerics.Vec3): boolean {
			return this._occupied.has(this.EncodePoint(localPoint.x, localPoint.z));
		}

		protected EncodePoint(x: number, z: number): number {
			let value = x << 16;
			let sign = RC.Numerics.MathUtils.Sign(z);
			if (sign < 0) {
				value |= 1 << 15;
				value |= -z;
			}
			else
				value |= z;
			return value;
		}

		protected DecodePoint(key: number): number[] {
			let x = key >> 16;
			let sign = (key & 0x8000) >> 15;
			let z = key & 0x7fff;
			if (sign == 1)
				z = -z;
			return [x, z];
		}
	}
}