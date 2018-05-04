namespace View {
	export class Graphic {
		private readonly _manager: GraphicManager;
		private readonly _root: fairygui.GLoader;
		private _position: RC.Numerics.Vec3;
		private _rotation: RC.Numerics.Quat;

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
		}

		protected OnCreateInternal(id: string): void {
			this._root.url = fairygui.UIPackage.getItemURL("global", id);
		}

		public Dispose(): void {
			this._root.dispose();
		}

		public UpdatePosition(): void {
			let mat = this._manager.battle.camera.worldToLocal;
			let localPos = mat.TransformPoint(this._position);
			this._root.x = localPos.x;
			this._root.y = localPos.y;
		}

		public UpdateDirection(): void {
		}
	}
}