namespace View {
	export class CBattle {
		private _frame: number = 0;
		private _deltaTime: number = 0;
		private _time: number = 0;
		private _uid: string = "";

		private _data: Shared.Model.MapData;
		private _graphic: MapGraphic;
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

			Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.BATTLE_CREATED, this.HandleCreateBattle.bind(this));
			Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.BATTLE_DESTROIED, this.HandleDestroyBattle.bind(this));
			Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.ENTITY_CREATED, this.HandleEntityCreate.bind(this));
			Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.ENTITY_ADDED_TO_BATTLE, this.HandleEntityAddedToBattle.bind(this));
			Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.ENTITY_REMOVE_FROM_BATTLE, this.HandleEntityRemoveFromBattle.bind(this));
			Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.ENTITY_STATE_CHANGED, this.HandleEntityStateChanged.bind(this));
			Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.ENTITY_SYNC_PROPS, this.HandleEntitySyncProps.bind(this));
			Shared.Event.EventCenter.AddListener(Shared.Event.SyncEvent.WIN, this.HandleWin.bind(this));
		}

		public Dispose(): void {
			Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.BATTLE_CREATED, this.HandleCreateBattle.bind(this));
			Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.BATTLE_DESTROIED, this.HandleDestroyBattle.bind(this));
			Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.ENTITY_CREATED, this.HandleEntityCreate.bind(this));
			Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.ENTITY_ADDED_TO_BATTLE, this.HandleEntityAddedToBattle.bind(this));
			Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.ENTITY_REMOVE_FROM_BATTLE, this.HandleEntityRemoveFromBattle.bind(this));
			Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.ENTITY_STATE_CHANGED, this.HandleEntityStateChanged.bind(this));
			Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.ENTITY_SYNC_PROPS, this.HandleEntitySyncProps.bind(this));
			Shared.Event.EventCenter.RemoveListener(Shared.Event.SyncEvent.WIN, this.HandleWin.bind(this));

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

		private HandleCreateBattle(baseEvent: Shared.Event.BaseEvent): void {
			let e = <Shared.Event.SyncEvent>baseEvent;
			this._data = Shared.Model.ModelFactory.GetMapData(Shared.Utils.GetIDFromRID(e.genericId));
			this._camera.SetRestriction(this._data.restriMin, this._data.restriMax);
			this._graphic = this._graphicManager.CreateGraphic(MapGraphic);
			this._graphic.OnCreate(this._data.model);
		}

		private HandleDestroyBattle(baseEvent: Shared.Event.BaseEvent): void {
			this._graphicManager.DestroyGraphic(this._graphic);
			this._data = null;
		}

		private HandleEntityCreate(baseEvent: Shared.Event.BaseEvent): void {
			let e = <Shared.Event.SyncEvent>baseEvent;
			let type = e.entityType;
			let param = e.param;
			switch (type) {
				case "Entity":
					this._entityManager.Create<CEntity>(param)
					break;
			}
		}

		private HandleEntityAddedToBattle(baseEvent: Shared.Event.BaseEvent): void {
			let e = <Shared.Event.SyncEvent>baseEvent;
			let entity = this._entityManager.GetEntity(e.targetId);
			entity.OnAddedToBattle();
			Shared.Event.UIEvent.EntityCreated(entity);
		}

		private HandleEntityRemoveFromBattle(baseEvent: Shared.Event.BaseEvent): void {
			let e = <Shared.Event.SyncEvent>baseEvent;
			let entity = this._entityManager.GetEntity(e.targetId);
			entity.OnRemoveFromBattle();
		}

		private HandleEntityStateChanged(baseEvent: Shared.Event.BaseEvent): void {
			let e = <Shared.Event.SyncEvent>baseEvent;
			// let entity = this._entityManager.GetChampion( e.targetId );
			// entity.HandleEntityStateChanged( type, force, param );
		}

		private HandleEntitySyncProps(baseEvent: Shared.Event.BaseEvent): void {
			let e = <Shared.Event.SyncEvent>baseEvent;
			let entity = this._entityManager.GetEntity(e.targetId);
			entity.HandleSyncProps(e.attrs, e.attrValues);
		}

		private HandleWin(baseEvent: Shared.Event.BaseEvent): void {
			let e = <Shared.Event.SyncEvent>baseEvent;
		}
	}
}