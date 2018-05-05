namespace View {
	export class CEntityManager {
		private readonly _battle: CBattle;
		private readonly _gPool: Shared.GPool;
		private readonly _entities: CEntity[];
		private readonly _idToEntity: RC.Collections.Dictionary<string, CEntity>;

		constructor(battle: CBattle) {
			this._battle = battle;
			this._gPool = new Shared.GPool();
			this._entities = [];
			this._idToEntity = new RC.Collections.Dictionary<string, CEntity>();
		}

		public Dispose():void{
			this._entities.forEach((entity) => {
				entity.MarkToDestroy();
			});
			this.DestroyEnties();
			this._gPool.Dispose();
		}

		private DestroyEnties(): void {
			let count = this._entities.length;
			for (let i = 0; i < count; i++) {
				let entity = this._entities[i];
				if (!entity.markToDestroy)
					continue;
				entity.OnRemoveFromBattle();
				this._entities.splice(i, 1);
				this._idToEntity.remove(entity.rid);
				this._gPool.Push(entity);
				--i;
				--count;
			}
		}

		public Create<T extends Shared.GPoolObject>(param: Shared.Model.EntityParam): Shared.GPoolObject {
			let entity = <CEntity>this._gPool.Pop(CEntity);
			this._idToEntity.setValue(param.rid, entity);
			this._entities.push(entity);

			Shared.Event.SyncEvent.CreateEntity((<any>entity).constructor.name, param);
			entity.OnCreated(this._battle, param);
			return entity;
		}

		public GetEntity(rid: string): CEntity {
			if (rid == null || rid == undefined)
				return null;
			let entity = this._idToEntity.getValue(rid);
			return entity;
		}

		public GetEntityAt(index: number): CEntity {
			if (index < 0 ||
				index > this._entities.length - 1)
				return null;
			return this._entities[index];
		}

		public Update(context: Shared.UpdateContext): void {
			// 更新状态
			this.UpdateState(context);
			// 清理实体
			this.DestroyEnties();
		}

		private UpdateState(context: Shared.UpdateContext): void {
		}
	}
}