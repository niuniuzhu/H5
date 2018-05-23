namespace View {
	export abstract class Graphic {
		protected readonly _manager: GraphicManager;
		protected readonly _root: fairygui.GComponent;
		protected readonly _localToWorldMat: RC.Numerics.Mat3;
		protected readonly _worldToLocalMat: RC.Numerics.Mat3;
		protected _position: RC.Numerics.Vec2;
		public get root(): fairygui.GComponent { return this._root; }

		public get position(): RC.Numerics.Vec2 { return this._position.Clone(); }
		public set position(value: RC.Numerics.Vec2) {
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
			this._position = RC.Numerics.Vec2.zero;
			this._worldToLocalMat = RC.Numerics.Mat3.identity;
			this._worldToLocalMat.x.x = this._manager.battle.tileSize;
			this._worldToLocalMat.y.y = this._manager.battle.tileSize;
			this._worldToLocalMat.z.x = -this._manager.battle.tileSize * 0.5;
			this._worldToLocalMat.z.y = -this._manager.battle.tileSize * 0.5;
			this._localToWorldMat = RC.Numerics.Mat3.Invert(this._worldToLocalMat);
			this.UpdatePosition();
		}

		public abstract Load(id: string): void;

		public Dispose(): void {
			this._root.dispose();
		}

		public UpdatePosition(): void {
			let v = this._worldToLocalMat.TransformPoint(this._position);
			this._root.setXY(v.x, v.y);
		}

		public UpdateDirection(): void {
		}

		public WorldToLocal(point: RC.Numerics.Vec2): RC.Numerics.Vec2 {
			return this._worldToLocalMat.TransformPoint(point);
		}

		public LocalToWorld(point: RC.Numerics.Vec2): RC.Numerics.Vec2 {
			return this._localToWorldMat.TransformPoint(point);
		}
	}
}