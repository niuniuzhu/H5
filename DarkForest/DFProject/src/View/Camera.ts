namespace View {
	export class Camera {
		private _position: RC.Numerics.Vec3;
		private _direction: RC.Numerics.Vec3;
		private _worldToLocalMat: RC.Numerics.Mat4;
		private _localToWorldMat: RC.Numerics.Mat4;
		private _restriMinOrgi: RC.Numerics.Vec3;
		private _restriMaxOrgi: RC.Numerics.Vec3;
		private _restriMin: RC.Numerics.Vec3;
		private _restriMax: RC.Numerics.Vec3;
		private _seekerPos: RC.Numerics.Vec3;
		private _seekerDir: RC.Numerics.Vec3;

		public get seekerPos(): RC.Numerics.Vec3 { return this._seekerPos.Clone(); }
		public set seekerPos(value: RC.Numerics.Vec3) {
			if (this._seekerPos.EqualsTo(value))
				return;
			this._seekerPos = value.Clone();
			this._seekerPos.Clamp(this._restriMin, this._restriMax);
		}

		public get seekerDir(): RC.Numerics.Vec3 { return this._seekerDir.Clone(); }
		public set seekerDir(value: RC.Numerics.Vec3) {
			if (this._seekerDir.EqualsTo(value))
				return;
			this._seekerDir = value.Clone();
		}

		public get position(): RC.Numerics.Vec3 { return this._position.Clone(); }
		public set position(value: RC.Numerics.Vec3) {
			if (value.EqualsTo(this._position))
				return;
			this._position = value.Clone();
			this.UpdateMatrixT();
			if (this.cameraTRSChangedHandler != null)
				this.cameraTRSChangedHandler();
		}

		public get direction(): RC.Numerics.Vec3 { return this._direction.Clone(); }
		public set direction(value: RC.Numerics.Vec3) {
			if (value.EqualsTo(this._direction))
				return;
			this._direction = value.Clone();
			this.UpdateMatrixR();
			if (this.cameraTRSChangedHandler != null)
				this.cameraTRSChangedHandler();
		}

		public cameraTRSChangedHandler: () => void;

		constructor() {
			this._position = RC.Numerics.Vec3.zero;
			this._direction = RC.Numerics.Vec3.forward;
			this._seekerPos = this._position.Clone();
			this._seekerDir = this._direction.Clone();
			this._restriMin = RC.Numerics.Vec3.zero;
			this._restriMax = new RC.Numerics.Vec3(RC.Numerics.MathUtils.MAX_VALUE, RC.Numerics.MathUtils.MAX_VALUE, RC.Numerics.MathUtils.MAX_VALUE);
			this._localToWorldMat = RC.Numerics.Mat4.FromTRS(RC.Numerics.Vec3.zero,
				RC.Numerics.Quat.Euler(new RC.Numerics.Vec3(90, 0, 0)),
				new RC.Numerics.Vec3(1, -1, 1));
			this._worldToLocalMat = RC.Numerics.Mat4.NonhomogeneousInvert(this._localToWorldMat);
			fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnScreenSizeChanged);
		}

		public SetRestriction(restriMin: RC.Numerics.Vec2, restriMax: RC.Numerics.Vec2): void {
			this._restriMinOrgi = new RC.Numerics.Vec3(restriMin.x, restriMin.y, 0);
			this._restriMaxOrgi = new RC.Numerics.Vec3(restriMax.x, restriMax.y, 0);
			this.UpdateRestriction();
		}

		public Update(context: Shared.UpdateContext): void {
			if (RC.Numerics.Vec3.DistanceSquared(this._position, this.seekerPos) < 0.01)
				return;
			this.position = RC.Numerics.Vec3.Lerp(this.position, this.seekerPos, context.deltaTime * 0.01);
		}

		private OnScreenSizeChanged(evt: laya.events.Event): any {
			this.UpdateRestriction();
		}

		private UpdateRestriction(): void {
			let min = this.LocalToWorld(new RC.Numerics.Vec3(this._restriMinOrgi.x, this._restriMinOrgi.y, 0));
			let max = this.LocalToWorld(new RC.Numerics.Vec3(this._restriMaxOrgi.x - fairygui.GRoot.inst.width, this._restriMaxOrgi.y - fairygui.GRoot.inst.height, 0));
			this._restriMin.x = RC.Numerics.MathUtils.Min(min.x, max.x);
			this._restriMin.y = RC.Numerics.MathUtils.Min(min.y, max.y);
			this._restriMin.z = RC.Numerics.MathUtils.Min(min.z, max.z);
			this._restriMax.x = RC.Numerics.MathUtils.Max(min.x, max.x);
			this._restriMax.y = RC.Numerics.MathUtils.Max(min.y, max.y);
			this._restriMax.z = RC.Numerics.MathUtils.Max(min.z, max.z);
		}

		private UpdateMatrixT(): void {
			this._localToWorldMat.SetTranslate(this._position);
			this._worldToLocalMat.CopyFrom(this._localToWorldMat);
			this._worldToLocalMat.NonhomogeneousInvert();
		}

		private UpdateMatrixR(): void {
			this._localToWorldMat.SetRotation(RC.Numerics.Quat.FromToRotation(this._direction, RC.Numerics.Vec3.forward));
			this._worldToLocalMat.CopyFrom(this._localToWorldMat);
			this._worldToLocalMat.NonhomogeneousInvert();
		}

		public WorldToLocal(point: RC.Numerics.Vec3): RC.Numerics.Vec3 {
			return this._worldToLocalMat.TransformPoint(point);
		}

		public LocalToWorld(point: RC.Numerics.Vec3): RC.Numerics.Vec3 {
			return this._localToWorldMat.TransformPoint(point);
		}
	}
}