namespace View {
	export class CBattle {
		private _frame: number = 0;
		private _deltaTime: number = 0;
		private _time: number = 0;
		private _uid: string = "";

		private readonly _context: Shared.UpdateContext;
		private readonly _camera: Camera;
		private readonly _graphicManager: GraphicManager;
		private readonly _entityManager: CEntityManager;

		public get camera(): Camera { return this._camera };
		public get graphicManager(): GraphicManager { return this._graphicManager };
		public get frame(): number { return this._frame; }
		public get deltaTime(): number { return this._deltaTime; }
		public get time(): number { return this._time; }

		constructor(param: Logic.BattleParams) {
			this._uid = param.uid;
			this._context = new Shared.UpdateContext();
			this._camera = new Camera();
			this._graphicManager = new GraphicManager(this);
			this._entityManager = new CEntityManager(this);
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
		}
	}
}