namespace View {
	export class Camera {
		private _position: RC.Numerics.Vec3;
		private _direction: RC.Numerics.Vec3;
		private _worldToLocal: RC.Numerics.Mat4;
		private _localtoWorld: RC.Numerics.Mat4;

		public get position(): RC.Numerics.Vec3 { return this._position.Clone(); }
		public set position(value: RC.Numerics.Vec3) {
			if (value.EqualsTo(this._position))
				return;
			this._position = value.Clone();
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
		public get worldToLocal(): RC.Numerics.Mat4 { return this._worldToLocal.Clone(); }
		public get localtoWorld(): RC.Numerics.Mat4 { return this._localtoWorld.Clone(); }

		public cameraTRSChangedHandler: () => void;

		constructor() {
			this._localtoWorld = RC.Numerics.Mat4.FromTRS(RC.Numerics.Vec3.zero,
				RC.Numerics.Quat.Euler(new RC.Numerics.Vec3(90, 0, 0)), new RC.Numerics.Vec3(1, -1, 1));
			this._worldToLocal = RC.Numerics.Mat4.NonhomogeneousInvert(this._localtoWorld);
			console.log(this._worldToLocal.TransformPoint(new RC.Numerics.Vec3(1, 0, -1)));
		}
	}
}