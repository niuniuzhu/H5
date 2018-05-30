namespace Shared.Event {
	export class SyncEvent extends BaseEvent {
		public static readonly BATTLE_CREATED: number = 10;
		public static readonly BATTLE_DESTROIED: number = 11;
		public static readonly WIN: number = 13;

		public static readonly ENTITY_CREATED: number = 20;
		public static readonly ENTITY_ADDED_TO_BATTLE: number = 21;
		public static readonly ENTITY_REMOVE_FROM_BATTLE: number = 22;
		public static readonly ENTITY_STATE_CHANGED: number = 23;
		public static readonly ENTITY_SYNC_PROPS: number = 24;

		public static readonly SET_FRAME_ACTION: number = 99;

		private static readonly POOL: RC.Collections.Stack<SyncEvent> = new RC.Collections.Stack<SyncEvent>();

		private static Get(): SyncEvent {
			if (SyncEvent.POOL.size() > 0)
				return SyncEvent.POOL.pop();
			return new SyncEvent();
		}

		private static Release(element: SyncEvent): void {
			SyncEvent.POOL.push(element);
		}

		public Release(): void {
			SyncEvent.Release(this);
		}

		public static CreateBattle(id:string): void {
			let e = this.Get();
			e._type = SyncEvent.BATTLE_CREATED;
			e.genericId = id;
			e.BeginInvoke();
		}

		public static DestroyBattle(): void {
			let e = this.Get();
			e._type = SyncEvent.BATTLE_DESTROIED;
			e.BeginInvoke();
		}

		public static CreateEntity(type: string, param: Shared.Model.EntityParam): void {
			let e = this.Get();
			e._type = SyncEvent.ENTITY_CREATED;
			e.entityType = type;
			e.param = param;
			e.BeginInvoke();
		}

		public static EntityRemoveFromBattle(entityId: string): void {
			let e = this.Get();
			e._type = SyncEvent.ENTITY_REMOVE_FROM_BATTLE;
			e.targetId = entityId;
			e.BeginInvoke();
		}

		public static EntityAddedToBattle(entityId: string): void {
			let e = this.Get();
			e._type = SyncEvent.ENTITY_ADDED_TO_BATTLE;
			e.targetId = entityId;
			e.BeginInvoke();
		}

		public static BeginSyncProps(targetId: string): SyncEvent {
			let e = this.Get();
			e._type = SyncEvent.ENTITY_SYNC_PROPS;
			e.attrs.splice(0);
			e.targetId = targetId;
			return e;
		}

		public static EndSyncProps(e: SyncEvent): void {
			e.BeginInvoke();
		}

		public static AddSyncProp(e: SyncEvent, attr: Attr, value: any): void {
			e.attrs.push(attr);
			e.attrValues.push(value);
		}

		// public static ChangeState(targetId: string, type: FSMStateType, force: boolean = false, ...param: any[]): void {
		// 	let e = this.Get();
		// 	e._type = SyncEventType.ENTITY_STATE_CHANGED;
		// 	e.targetId = targetId;
		// 	e.stateType = type;
		// 	e.forceChange = force;
		// 	e.stateParam = param;
		// 	e.BeginInvoke();
		// }

		public static HandleFrameAction(): void {
			let e = SyncEvent.Get();
			e._type = SyncEvent.SET_FRAME_ACTION;
			e.BeginInvoke();
		}

		public param: Shared.Model.EntityParam;
		public entityType: string;
		public casterId: string;
		public targetId: string;
		public genericId: string;

		public readonly attrs: Shared.Attr[] = [];
		public readonly attrValues: any[] = [];
	}
}