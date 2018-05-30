namespace Shared.Event {
	export interface IEventCallback {
		(e: BaseEvent): void;
	}

	export class EventCenter {
		private static readonly HANDLERS: { [key: number]: IEventCallback[] } = {};
		private static readonly PENDING_LIST: RC.Collections.Queue<BaseEvent> = new RC.Collections.Queue<BaseEvent>();

		public static AddListener(type: number, handler: IEventCallback): void {
			let list = EventCenter.HANDLERS[type];
			if (list == undefined)
				EventCenter.HANDLERS[type] = list = [];
			list.push(handler);
		}

		public static RemoveListener(type: number, handler: IEventCallback): void {
			let list = EventCenter.HANDLERS[type];
			if (list == undefined)
				return;
			let result = list.splice(list.indexOf(handler), 1);
			if (!result)
				return;
			if (list.length == 0)
				EventCenter.HANDLERS[type] = undefined;
		}

		public static BeginInvoke(e: BaseEvent): void {
			EventCenter.PENDING_LIST.enqueue(e);
		}

		public static Invoke(e: BaseEvent): void {
			let handlers = EventCenter.HANDLERS[e.type];
			if (handlers != undefined) {
				handlers.forEach((callback) => {
					callback(e);
				});
			}
			e.Release();
		}

		public static Sync(): void {
			while (!EventCenter.PENDING_LIST.isEmpty()) {
				let e = EventCenter.PENDING_LIST.dequeue();
				EventCenter.Invoke(e);
			}
		}
	}
}