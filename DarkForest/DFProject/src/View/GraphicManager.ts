namespace View {
	export class GraphicManager {
		private readonly _battle: CBattle;
		private readonly _root: fairygui.GComponent;
		private readonly _graphics: Graphic[];

		public get battle(): CBattle { return this._battle; }

		constructor(battle: CBattle) {
			this._battle = battle;
			this._battle.camera.cameraTRSChangedHandler = this.OnCameraTRSChanged;
			this._root = new fairygui.GComponent();
			this._root.name = "graphic_root";
			fairygui.GRoot.inst.addChild(this._root);
			this._graphics = [];
		}

		public Dispose(): void {
			let count = this._graphics.length;
			for (let i = 0; i < count; ++i) {
				let graphic = this._graphics[i];
				graphic.Dispose();
			}
			this._graphics.splice(0);
			this._root.dispose();
		}

		public OnCameraTRSChanged(): void {
			let count = this._graphics.length;
			for (let i = 0; i < count; ++i) {
				let graphic = this._graphics[i];
				graphic.UpdatePosition();
				graphic.UpdateDirection();
			}
		}

		public CreateGraphic<T extends Graphic>(c: new (manager: GraphicManager) => T): T {
			let graphic = new c(this);
			this._graphics.push(graphic);
			return graphic;
		}

		public DestroyGraphic(graphic: Graphic): boolean {
			let pos = this._graphics.indexOf(graphic);
			if (pos < 0)
				return false;
			graphic.Dispose();
			this._graphics.splice(pos, 1);
			return true;
		}
	}
}