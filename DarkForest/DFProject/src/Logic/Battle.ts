namespace Logic {
	export class BattleParams {
		public frameRate: number = 0;
		public framesPerKeyFrame: number = 0;
		public uid: string = "";
		public id: string = "";
		public rndSeed: number = 0;
		public players: Player[] = null;
	}

	export class Player {
		public id: string = "";
		public name: string = "";
		public cid: string = "";
		public team: number = 0;
	}

	export class Battle {
		private _frame: number = 0;
		private _deltaTime: number = 0;
		private _time: number = 0;
		private readonly _data: Shared.Model.MapData;
		private readonly _random: Shared.ConsistentRandom;
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

		constructor(param: BattleParams) {
			this._data = Shared.Model.ModelFactory.GetMapData(Shared.Utils.GetIDFromRID(param.id));
			this._random = new Shared.ConsistentRandom(param.rndSeed);
			this._context = new Shared.UpdateContext();
			this._entityManager = new EntityManager(this);

			Shared.Event.SyncEvent.CreateBattle(param.id);

			this.CreatePlayers(param.players);
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

		public CreatePlayers(players: Player[]): void {
			for (let i = 0; i < players.length; ++i) {
				let player = players[i];
				let entityParam = new Shared.Model.EntityParam();
				entityParam.rid = player.cid + "@" + player.id;
				entityParam.uid = player.id;
				entityParam.team = player.team;
				entityParam.position = new RC.Numerics.Vec3();
				entityParam.direction = new RC.Numerics.Vec3(1, 0, 0);
				let entity = this._entityManager.Create<Logic.Entity>(entityParam);
			}
		}
	}
}