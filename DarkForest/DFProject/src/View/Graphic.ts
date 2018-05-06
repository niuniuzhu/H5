namespace View {
	export class Graphic {
		protected readonly _manager: GraphicManager;
		protected readonly _root: fairygui.GLoader;
		protected _position: RC.Numerics.Vec3;
		protected _rotation: RC.Numerics.Quat;

		public get root(): fairygui.GLoader { return this._root; }

		public get position(): RC.Numerics.Vec3 { return this._position.Clone(); }
		public set position(value: RC.Numerics.Vec3) {
			if (value.EqualsTo(this._position))
				return;
			this._position = value.Clone();
			this.UpdatePosition();
		}

		public get rotation(): RC.Numerics.Quat { return this._rotation.Clone(); }
		public set rotation(value: RC.Numerics.Quat) {
			if (value.EqualsTo(this._rotation))
				return;
			this._rotation = value.Clone();
			this.UpdateDirection();
		}

		constructor(manager: GraphicManager) {
			this._manager = manager;
			this._root = new fairygui.GLoader();
			this._root.autoSize = true;
			this._position = RC.Numerics.Vec3.zero;
			this._rotation = RC.Numerics.Quat.identity;
			this.UpdatePosition();
		}

		public Load(id: string): void {
			this._root.url = fairygui.UIPackage.getItemURL("global", id);
		}

		public Dispose(): void {
			this._root.dispose();
		}

		public UpdatePosition(): void {
			let localPos = this._manager.battle.camera.WorldToLocal(this._position);
			this._root.setXY(localPos.x, localPos.y);
		}

		public UpdateDirection(): void {
		}
	}
}