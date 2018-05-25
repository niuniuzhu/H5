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
		private _finish: boolean;

		public get frame(): number { return this._frame; }
		public get deltaTime(): number { return this._deltaTime; }
		public get time(): number { return this._time; }
		public get tileSize(): number { return this._data.tileSize; }

		public get graphicManager(): GraphicManager { return this._graphicManager };
		public get entityManager(): CEntityManager { return this._entityManager };
		public get fightHandler(): FightHandler { return this._fihgtHandler; }

		public get graphic(): MapGraphic { return this._graphic };

		public winHandler: (winTeam: number) => void;

		constructor(param: Shared.Model.BattleParams) {
			this._data = Shared.Model.ModelFactory.GetMapData(Shared.Utils.GetIDFromRID(param.id));
			this._context = new Shared.UpdateContext();
			this._entityManager = new CEntityManager(this);
			this._graphicManager = new GraphicManager(this);
			this._fihgtHandler = new FightHandler(this);
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
			if (this._finish)
				return;
			++this._frame;
			this._deltaTime = deltaTime;
			this._time += this.deltaTime;

			this._context.deltaTime = this.deltaTime;
			this._context.time = this.time;
			this._context.frame = this.frame;

			this._entityManager.Update(this._context);
			this._fihgtHandler.ProcessFight(this._context);
			this._entityManager.UpdateAgterFight(this._context);

			let winTeam = this.CheckWin();
			if (winTeam != -1) {
				this._finish = true;
				this.winHandler(winTeam);
			}
		}

		public OnResize(e: laya.events.Event): any {
		}

		public SetGraphicRoot(graphicRoot: fairygui.GComponent): void {
			graphicRoot.addChild(this._graphic.root);
			graphicRoot.addChild(this.graphicManager.root);
		}

		private CheckWin(): number {
			let team0Win = true;
			let team1Win = true;
			this._entityManager.Foreach((entity) => {
				let tower = entity as CTower;
				if (tower == null)
					return;
				if (tower.team == 0)
					team1Win = false;
				else if (tower.team == 1)
					team0Win = false;
			})
			if (team0Win)
				return 0;
			if (team1Win)
				return 1;
			return -1;
		}

		private CreateTowers(param: Shared.Model.BattleParams): void {
			for (let i = 0; i < param.team0.length; ++i) {
				let tower = this.CreateTower(param.team0[i]);
				let arr: number[] = this._data.towerPos[0][i];
				tower.position = new RC.Numerics.Vec2(arr[0], arr[1]);
			}
			for (let i = 0; i < param.team1.length; ++i) {
				let tower = this.CreateTower(param.team1[i]);
				let arr: number[] = this._data.towerPos[1][i];
				tower.position = new RC.Numerics.Vec2(arr[0], arr[1]);
			}
		}

		public CreateTower(param: Shared.Model.EntityParam): CTower {
			param.rid = Shared.Utils.MakeRIDFromID(param.id);
			let entity = this._entityManager.Create(CTower, param);
			return <CTower>entity;
		}

		public CreateChampion(param: Shared.Model.EntityParam): CChampion {
			param.rid = Shared.Utils.MakeRIDFromID(param.id);
			let entity = this._entityManager.Create(CChampion, param);
			return <CChampion>entity;
		}

		public CreateMissile(param: Shared.Model.EntityParam): Missile {
			param.rid = Shared.Utils.MakeRIDFromID(param.id);
			let entity = this._entityManager.Create(Missile, param);
			return <Missile>entity;
		}

		public CreateEffect(param: Shared.Model.EntityParam): CEffect {
			param.rid = Shared.Utils.MakeRIDFromID(param.id);
			let entity = this._entityManager.Create(CEffect, param);
			return <CEffect>entity;
		}
	}
}