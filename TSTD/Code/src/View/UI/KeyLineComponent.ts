namespace View.UI {
	export class KeyLineComponent {
		private _com: fairygui.GComponent;
		private _attached: KeyComponent;

		constructor() {
			this._com = fairygui.UIPackage.createObject("main", "key_line").asCom;
		}

		public Dispose(): void {
			this._com.dispose();
		}

		public AttachTo(key: KeyComponent): void {
			this.Detach();
			key.parent.addChild(this._com);
			this._com.setXY(key.x, key.y);
			this._attached = key;
		}

		public Detach(): void {
			if (this._com.parent != null)
				this._com.parent.removeChild(this._com);
		}

		public UpdateVisual(v: RC.Numerics.Vec2): void {
			if (this._attached == null)
				return;
			let orgiPos = new RC.Numerics.Vec2(this._attached.x, this._attached.y);
			let curPos = new RC.Numerics.Vec2(v.x, v.y);
			let vec = RC.Numerics.Vec2.Sub(curPos, orgiPos);
			let dist = vec.Magnitude();
			this._com.height = dist;
			if (dist == 0)
				return;
			let dir = RC.Numerics.Vec2.DivN(vec, dist);
			let angle = RC.Numerics.Vec2.Dot(RC.Numerics.Vec2.up, dir);
			angle = RC.Numerics.MathUtils.Clamp(angle, -1, 1);
			angle = RC.Numerics.MathUtils.RadToDeg(RC.Numerics.MathUtils.Acos(angle));
			let sign = dir.x > 0 ? -1 : 1;
			this._com.rotation = angle * sign;
		}
	}
}