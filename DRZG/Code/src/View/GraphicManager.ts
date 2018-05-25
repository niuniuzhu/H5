namespace View {
	export class GraphicManager {
		private readonly _owner: CBattle;
		private readonly _graphics: Graphic[];

		private _root: fairygui.GComponent;

		public get battle(): CBattle { return this._owner; }

		public get root(): fairygui.GComponent { return this._root; }
		public set root(value: fairygui.GComponent) { this._root = value; }

		constructor(owner: CBattle) {
			this._owner = owner;
			this._root = new fairygui.GComponent();
			this._root.touchable = false;
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
			this.SortGraphics(graphic);
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

		public SortGraphics(graphic: Graphic): void {
			this._graphics.sort(this.SortFunc.bind(this));
			let count = this._graphics.length;
			for (let i = 1; i < count; ++i) {
				this._graphics[i].sortingOrder = i + 100;
			}
		}

		private SortFunc(a: Graphic, b: Graphic): number {
			if (a == this._graphics[0] || b == this._graphics[0])
				return 0;
			return a.position.y < b.position.y ? -1 : 1;
		}
	}
}