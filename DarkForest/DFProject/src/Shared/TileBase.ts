namespace Shared {
	export class TileBase {
		protected _worldToLocalMat: RC.Numerics.Mat4;
		protected _localToWorldMat: RC.Numerics.Mat4;

		constructor(slope: number, aspect: number, ratio: number) {
			this._localToWorldMat = RC.Numerics.Mat4.FromTRS(RC.Numerics.Vec3.zero,
				RC.Numerics.Quat.Euler(new RC.Numerics.Vec3(0, slope, 0)),
				new RC.Numerics.Vec3(1, 1, 1));
			this._localToWorldMat.Mul(RC.Numerics.Mat4.FromScale(new RC.Numerics.Vec3(ratio, 1, aspect * ratio)));
			this._worldToLocalMat = RC.Numerics.Mat4.NonhomogeneousInvert(this._localToWorldMat);
		}

		public WorldToTile(point: RC.Numerics.Vec3): RC.Numerics.Vec3 {
			return this._worldToLocalMat.TransformPoint(point);
		}

		public TileToWorld(point: RC.Numerics.Vec3): RC.Numerics.Vec3 {
			return this._localToWorldMat.TransformPoint(point);
		}
	}
}