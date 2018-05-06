namespace Logic {
	export class Battle {
		private _frame: number = 0;
		private _deltaTime: number = 0;
		private _time: number = 0;
		private readonly _data: Shared.Model.MapData;
		private readonly _random: RC.Utils.ConsistentRandom;
		private readonly _context: Shared.UpdateContext;
		private readonly _entityManager: EntityManager;

		public get frame(): number {
			return this._frame;
		}

		public get deltaTime(): number {
			return this._deltaTime;
		}

		public get time(): number {
			return this._time;
		}

		constructor(param: Shared.Model.BattleParams) {
			this._data = Shared.Model.ModelFactory.GetMapData(Shared.Utils.GetIDFromRID(param.id));
			this._random = new RC.Utils.ConsistentRandom(param.rndSeed);
			this._context = new Shared.UpdateContext();
			this._entityManager = new EntityManager(this);

			Shared.Event.SyncEvent.CreateBattle(param.id);

			this.CreateBuildings(param);
		}

		public Dispose(): void {
			this._entityManager.Dispose();

			Shared.Event.SyncEvent.DestroyBattle();
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

		public CreateBuildings(param: Shared.Model.BattleParams): void {
			let buildings = param.buildings;
			for (let i = 0; i < buildings.length; ++i) {
				let building = buildings[i];
				let entityParam = new Shared.Model.EntityParam();
				entityParam.rid = Shared.Utils.MakeRIDFromID(building.id);
				entityParam.uid = param.uid;
				entityParam.position = new RC.Numerics.Vec3();
				entityParam.direction = new RC.Numerics.Vec3(1, 0, 0);
				let entity = this._entityManager.Create(Logic.Building, entityParam);
			}
		}
	}
}