namespace Shared.Event {
	export class UIEvent extends BaseEvent {
		public static readonly WIN: number = 10010;

		public static readonly ENTITY_CREATED: number = 10020;
		public static readonly ENTITY_DESTROIED: number = 10021;
		public static readonly ENTITY_ATTR_CHANGED: number = 10023;

		public static readonly USE_SKILL: number = 10030;

		private static readonly POOL: RC.Collections.Stack<UIEvent> = new RC.Collections.Stack<UIEvent>();

		private static Get(): UIEvent {
			if (UIEvent.POOL.size() > 0)
				return UIEvent.POOL.pop();
			return new UIEvent();
		}

		private static Release(element: UIEvent): void {
			UIEvent.POOL.push(element);
		}

		public Release(): void {
			UIEvent.Release(this);
		}

		public static Win(team: number): void {
			let e = this.Get();
			e._type = UIEvent.WIN;
			e.i0 = team;
			e.BeginInvoke();
		}

		public static EntityCreated(target: View.CEntity): void {
			let e = this.Get();
			e._type = UIEvent.ENTITY_CREATED;
			e.target = target;
			e.Invoke();
		}

		public static EntityDestroied(target: View.CEntity): void {
			let e = this.Get();
			e._type = UIEvent.ENTITY_DESTROIED;
			e.target = target;
			e.Invoke();
		}

		public static EntityAttrChanged(target: View.CEntity, attr: Shared.Attr, value: any): void {
			let e = this.Get();
			e._type = UIEvent.ENTITY_ATTR_CHANGED;
			e.target = target;
			e.attr = attr;
			e.o0 = value;
			e.Invoke();
		}

		public i0: number;
		public i1: number;
		public b0: boolean;
		public b1: boolean;
		public o0: any;

		public target: View.CEntity;
		public itemId: string;

		public attr: Shared.Attr;
	}
}