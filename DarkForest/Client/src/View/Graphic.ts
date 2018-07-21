namespace View {
	export abstract class Graphic {
		protected readonly _manager: GraphicManager;
		protected readonly _root: fairygui.GComponent;
		protected _position: RC.Numerics.Vec3;

		public get root(): fairygui.GComponent { return this._root; }

		public get position(): RC.Numerics.Vec3 { return this._position.Clone(); }
		public set position(value: RC.Numerics.Vec3) {
			if (value.EqualsTo(this._position))
				return;
			this._position.CopyFrom(value);
			this.UpdatePosition();
		}

		public get alpha(): number { return this._root.alpha; }
		public set alpha(value: number) { this._root.alpha = value; }

		public get visible(): boolean { return this._root.visible; }
		public set visible(value: boolean) { this._root.visible = value; }

		public get sortingOrder(): number { return this._root.sortingOrder; }
		public set sortingOrder(value: number) { this._root.sortingOrder = value; }

		constructor(manager: GraphicManager) {
			this._manager = manager;
			this._root = new fairygui.GComponent();
			this._manager.root.addChild(this._root);
			this._position = RC.Numerics.Vec3.zero;
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
	}
}