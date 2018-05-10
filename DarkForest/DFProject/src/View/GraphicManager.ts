namespace View {
	export class GraphicManager {
		private readonly _owner: Home;
		private readonly _graphics: Graphic[];

		private _root: fairygui.GComponent;

		public get battle(): Home { return this._owner; }

		public get root(): fairygui.GComponent { return this._root; }
		public set root(value: fairygui.GComponent) { this._root = value; }

		constructor(owner: Home) {
			this._owner = owner;
			this._root = new fairygui.GComponent();
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
		}

		public OnCameraTRSChanged(): void {
			let count = this._graphics.length;
			for (let i = 0; i < count; ++i) {
				let graphic = this._graphics[i];
				graphic.UpdatePosition();
			}
		}

		public CreateGraphic<T extends Graphic>(c: new (manager: GraphicManager) => T): T {
			let graphic: Graphic = new c(this);
			this._graphics.push(graphic);
			return <T>graphic;
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