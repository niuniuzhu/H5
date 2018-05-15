namespace View {
	export class Home {
		private _frame: number = 0;
		private _deltaTime: number = 0;
		private _time: number = 0;

		private readonly _data: Shared.Model.MapData;
		private readonly _entityManager: CEntityManager;
		private readonly _graphicManager: GraphicManager;
		private readonly _context: Shared.UpdateContext;

		private readonly _camera: Camera;
		private readonly _graphic: MapGraphic;

		public get frame(): number { return this._frame; }
		public get deltaTime(): number { return this._deltaTime; }
		public get time(): number { return this._time; }

		public get graphicManager(): GraphicManager { return this._graphicManager };
		public get entityManager(): CEntityManager { return this._entityManager };

		public get camera(): Camera { return this._camera };
		public get graphic(): MapGraphic { return this._graphic };

		constructor(param: Shared.Model.BattleParams) {
			this._data = Shared.Model.ModelFactory.GetMapData(Shared.Utils.GetIDFromRID(param.id));
			this._entityManager = new CEntityManager(this);
			this._graphicManager = new GraphicManager(this);
			this._context = new Shared.UpdateContext();

			this._camera = new Camera();
			this._camera.seekerPos = new RC.Numerics.Vec3((this._data.size.x - fairygui.GRoot.inst.width) * 0.5, 0,
				(this._data.size.y - fairygui.GRoot.inst.height) * -0.5);
			this._camera.position = this._camera.seekerPos;
			this._camera.cameraTRSChangedHandler = this._graphicManager.OnCameraTRSChanged.bind(this._graphicManager);

			this._graphic = this._graphicManager.CreateGraphic(MapGraphic);
			this._graphic.Load(this._data.model);

			this.camera.UpdateRestriction(RC.Numerics.Vec3.zero,
				new RC.Numerics.Vec3(this._graphic.sprite.width - fairygui.GRoot.inst.width,
					this._graphic.sprite.height - fairygui.GRoot.inst.height, 0));
		}

		public Dispose(): void {
			this._graphicManager.Dispose();
			this._entityManager.Dispose();
		}

		public Update(deltaTime: number): void {
			++this._frame;
			this._deltaTime = deltaTime;
			this._time += this.deltaTime;

			this._context.deltaTime = this.deltaTime;
			this._context.time = this.time;
			this._context.frame = this.frame;

			this._entityManager.Update(this._context);
			this._camera.Update(this._context);
		}

		public OnResize(e: laya.events.Event): any {
			this.camera.UpdateRestriction(RC.Numerics.Vec3.zero,
				new RC.Numerics.Vec3(this._graphic.sprite.width - fairygui.GRoot.inst.width,
					this._graphic.sprite.height - fairygui.GRoot.inst.height, 0));
		}

		public SetGraphicRoot(graphicRoot: fairygui.GComponent): void {
			graphicRoot.addChild(this.graphicManager.root);
		}
	}
}