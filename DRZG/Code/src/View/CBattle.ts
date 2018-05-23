namespace View {
	export class CBattle {
		private _frame: number = 0;
		private _deltaTime: number = 0;
		private _time: number = 0;

		private readonly _data: Shared.Model.MapData;
		private readonly _context: Shared.UpdateContext;
		private readonly _entityManager: CEntityManager;
		private readonly _graphicManager: GraphicManager;
		private readonly _fihgtHandler: FightHandler;
		private readonly _graphic: MapGraphic;

		private _player0: CPlayer;
		private _player1: CPlayer;

		public get frame(): number { return this._frame; }
		public get deltaTime(): number { return this._deltaTime; }
		public get time(): number { return this._time; }
		public get tileSize(): number { return this._data.tileSize; }

		public get graphicManager(): GraphicManager { return this._graphicManager };
		public get entityManager(): CEntityManager { return this._entityManager };
		public get fightHandler(): FightHandler { return this._fihgtHandler; }

		public get graphic(): MapGraphic { return this._graphic };

		constructor(param: Shared.Model.BattleParams) {
			this._data = Shared.Model.ModelFactory.GetMapData(Shared.Utils.GetIDFromRID(param.id));
			this._context = new Shared.UpdateContext();
			this._entityManager = new CEntityManager(this);
			this._graphicManager = new GraphicManager(this);
			this._fihgtHandler = new FightHandler();

			this._graphic = new MapGraphic(this._data.model);

			this.CreateTowers(param);
		}

		public Dispose(): void {
			this._graphic.Dispose();
			this._graphicManager.Dispose();
			this._entityManager.Dispose();
			this.fightHandler.Dispose();
		}

		public Update(deltaTime: number): void {
			++this._frame;
			this._deltaTime = deltaTime;
			this._time += this.deltaTime;

			this._context.deltaTime = this.deltaTime;
			this._context.time = this.time;
			this._context.frame = this.frame;

			this._entityManager.Update(this._context);
			this._fihgtHandler.Update(this._context);
		}

		public OnResize(e: laya.events.Event): any {
		}

		public SetGraphicRoot(graphicRoot: fairygui.GComponent): void {
			graphicRoot.addChild(this._graphic.root);
			graphicRoot.addChild(this.graphicManager.root);
		}

		private CreateTowers(param: Shared.Model.BattleParams): void {
			this._player0 = new CPlayer(this, 0, param.team0.skills, param.team0.mp);
			this._player1 = new CPlayer(this, 1, param.team1.skills, param.team1.mp);
			for (let i = 0; i < param.team0.towers.length; ++i) {
				let tower = this.CreateTower(param.team0.towers[i]);
				let arr: number[] = this._data.towerPos[0][i];
				tower.position = new RC.Numerics.Vec2(arr[0], arr[1]);
			}
			for (let i = 0; i < param.team1.towers.length; ++i) {
				let tower = this.CreateTower(param.team0.towers[i]);
				let arr: number[] = this._data.towerPos[1][i];
				tower.position = new RC.Numerics.Vec2(arr[0], arr[1]);
			}
		}

		public CreateTower(param: Shared.Model.EntityParam): CTower {
			param.rid = Shared.Utils.MakeRIDFromID(param.id);
			let tower = this._entityManager.Create(CTower, param);
			return <CTower>tower;
		}

		public CreateChampion(param: Shared.Model.EntityParam): CChampion {
			param.rid = Shared.Utils.MakeRIDFromID(param.id);
			let champion = this._entityManager.Create(CChampion, param);
			return <CChampion>champion;
		}
	}
}