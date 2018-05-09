namespace View {
	export class CBattle {
		private _frame: number = 0;
		private _deltaTime: number = 0;
		private _time: number = 0;

		private readonly _uid: string = "";
		private readonly _data: Shared.Model.MapData;
		private readonly _entityManager: CEntityManager;
		private readonly _graphicManager: GraphicManager;
		private readonly _context: Shared.UpdateContext;

		private readonly _camera: Camera;
		private readonly _graphic: MapGraphic;
		private readonly _tile: CTile;
		private readonly _input: Input;

		public get frame(): number { return this._frame; }
		public get deltaTime(): number { return this._deltaTime; }
		public get time(): number { return this._time; }

		public get graphicManager(): GraphicManager { return this._graphicManager };

		public get camera(): Camera { return this._camera };
		public get graphic(): MapGraphic { return this._graphic };
		public get tile(): CTile { return this._tile };
		public get input(): Input { return this._input; }

		constructor(param: Shared.Model.BattleParams) {
			this._uid = param.uid;
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

			this._tile = new CTile(this._data.tileSlope, this._data.tileAspect, this._data.tileRatio);
			this._input = new Input(this);

			this.camera.UpdateRestriction(RC.Numerics.Vec3.zero,
				new RC.Numerics.Vec3(this._graphic.sprite.width - fairygui.GRoot.inst.width,
					this._graphic.sprite.height - fairygui.GRoot.inst.height, 0));

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
			this._tile.Dispose();
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
			this._input.Update(this._context);
		}

		public OnResize(e: laya.events.Event): any {
			this.camera.UpdateRestriction(RC.Numerics.Vec3.zero,
				new RC.Numerics.Vec3(this._graphic.sprite.width - fairygui.GRoot.inst.width,
					this._graphic.sprite.height - fairygui.GRoot.inst.height, 0));
		}

		public CreateBuilding(id: string, position: RC.Numerics.Vec3 = RC.Numerics.Vec3.zero, direction: RC.Numerics.Vec3 = RC.Numerics.Vec3.forward): CBuilding {
			let rid = Shared.Utils.MakeRIDFromID(id);
			let param = new Shared.Model.EntityParam();
			param.rid = rid;
			param.position = position;
			param.direction = direction;
			let entity = this._entityManager.Create(CBuilding, param);
			return <CBuilding>entity;
		}

		private HandleCreateBattle(baseEvent: Shared.Event.BaseEvent): void {
			let e = <Shared.Event.SyncEvent>baseEvent;
		}

		private HandleDestroyBattle(baseEvent: Shared.Event.BaseEvent): void {
			this._graphicManager.DestroyGraphic(this._graphic);
		}

		private HandleEntityCreate(baseEvent: Shared.Event.BaseEvent): void {
			let e = <Shared.Event.SyncEvent>baseEvent;
			let type = e.entityType;
			let param = e.param;
			switch (type) {
				case "Building":
					this._entityManager.Create(CBuilding, param);
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