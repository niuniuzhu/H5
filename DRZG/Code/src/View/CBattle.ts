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
		private readonly _tileMap: CTileMap;
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
			this._tileMap = new CTileMap(this._data.model);
			this.CreateTowers(param);
		}

		public Dispose(): void {
			CTower.player = null;
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
				let team0 = param.team0[i];
				let tower = this.CreateTower(team0.id, team0.team, team0.skills);
				let arr: number[] = this._data.towerPos[0][i];
				tower.position = new RC.Numerics.Vec2(arr[0], arr[1]);
				if (i == 0)
					CTower.player = tower.rid;
				else
					tower.CreateAI();
			}
			for (let i = 0; i < param.team1.length; ++i) {
				let team1 = param.team1[i];
				let tower = this.CreateTower(team1.id, team1.team, team1.skills);
				let arr: number[] = this._data.towerPos[1][i];
				tower.position = new RC.Numerics.Vec2(arr[0], arr[1]);
				tower.CreateAI();
			}
		}

		public CreateTower(id: string, team: number, skills?: string[]): CTower {
			let param = new Shared.Model.EntityParam();
			param.id = id;
			param.rid = Shared.Utils.MakeRIDFromID(param.id);
			param.team = team;
			param.skills = skills;
			let entity = this._entityManager.Create(CTower, param);
			return <CTower>entity;
		}

		public CreateChampion(id: string, team: number, skills?: string[]): CChampion {
			let param = new Shared.Model.EntityParam();
			param.id = id;
			param.rid = Shared.Utils.MakeRIDFromID(param.id);
			param.team = team;
			param.skills = skills;
			param.rid = Shared.Utils.MakeRIDFromID(param.id);
			let entity = this._entityManager.Create(CChampion, param);
			return <CChampion>entity;
		}

		public CreateMissile(id: string): Missile {
			let param = new Shared.Model.EntityParam();
			param.id = id;
			param.rid = Shared.Utils.MakeRIDFromID(param.id);
			let entity = this._entityManager.Create(Missile, param);
			return <Missile>entity;
		}

		public CreateEffect(id: string): CEffect {
			let param = new Shared.Model.EntityParam();
			param.id = id;
			param.rid = Shared.Utils.MakeRIDFromID(param.id);
			let entity = this._entityManager.Create(CEffect, param);
			return <CEffect>entity;
		}
	}
}