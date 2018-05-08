namespace View {
	export abstract class Graphic {
		protected readonly _manager: GraphicManager;
		protected readonly _root: fairygui.GComponent;
		protected _position: RC.Numerics.Vec3;
		protected _rotation: RC.Numerics.Quat;

		public get root(): fairygui.GComponent { return this._root; }

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
			this._root = new fairygui.GComponent();
			this._manager.root.addChild(this._root);
			this._position = RC.Numerics.Vec3.zero;
			this._rotation = RC.Numerics.Quat.identity;
			this.UpdatePosition();
		}

		public abstract Load(id: string): void;

		public Dispose(): void {
			this._root.dispose();
		}

		public UpdatePosition(): void {
			let localPos = this._manager.battle.camera.WorldToScreen(this._position);
			this._root.setXY(localPos.x, localPos.y);
		}

		public UpdateDirection(): void {
		}
	}
}