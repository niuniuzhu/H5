namespace View {
	export class Camera {
		private _position: RC.Numerics.Vec3;
		private _direction: RC.Numerics.Vec3;
		private _worldToLocalMat: RC.Numerics.Mat4;
		private _localToWorldMat: RC.Numerics.Mat4;

		public get position(): RC.Numerics.Vec3 { return this._position.Clone(); }
		public set position(value: RC.Numerics.Vec3) {
			if (value.EqualsTo(this._position))
				return;
			this._position = value.Clone();
			this._localToWorldMat.SetTranslate(this._position);
			if (this.cameraTRSChangedHandler != null)
				this.cameraTRSChangedHandler();
		}
		public get direction(): RC.Numerics.Vec3 { return this._direction.Clone(); }
		public set direction(value: RC.Numerics.Vec3) {
			if (value.EqualsTo(this._direction))
				return;
			this._direction = value.Clone();
			if (this.cameraTRSChangedHandler != null)
				this.cameraTRSChangedHandler();
		}

		public cameraTRSChangedHandler: () => void;

		constructor() {
			this._position = RC.Numerics.Vec3.zero;
			this._direction = new RC.Numerics.Vec3(0, 0, 1);
			this._localToWorldMat = RC.Numerics.Mat4.FromTRS(RC.Numerics.Vec3.zero,
				RC.Numerics.Quat.Euler(new RC.Numerics.Vec3(90, 0, 0)), new RC.Numerics.Vec3(1, -1, 1));
			this._worldToLocalMat = RC.Numerics.Mat4.NonhomogeneousInvert(this._localToWorldMat);
		}

		public WorldToLocal(point: RC.Numerics.Vec3): RC.Numerics.Vec3 {
			return this._worldToLocalMat.TransformPoint(point);
		}

		public LocalToWorld(point: RC.Numerics.Vec3): RC.Numerics.Vec3 {
			return this._localToWorldMat.TransformPoint(point);
		}
	}
}