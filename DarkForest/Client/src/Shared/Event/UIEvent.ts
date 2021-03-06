import { CEntity } from "../../View/CEntity";
import { BaseEvent } from "./BaseEvent";
import { EAttr } from "../Model/Attr";

export class UIEvent extends BaseEvent {
	public static readonly WIN: number = 10010;

	public static readonly ENTITY_CREATED: number = 10020;
	public static readonly ENTITY_DESTROIED: number = 10021;
	public static readonly ENTITY_ATTR_CHANGED: number = 10023;

	public static readonly USE_SKILL: number = 10030;

	public static readonly START_LAYOUT: number = 10050;
	public static readonly END_LAYOUT: number = 10051;
	public static readonly UPDATE_BUILDING: number = 10052;

	public static readonly NETWORK_DISCONNECT: number = 10500;

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
		e.Invoke();
	}

	public static EntityCreated(target: CEntity): void {
		let e = this.Get();
		e._type = UIEvent.ENTITY_CREATED;
		e.target = target;
		e.Invoke();
	}

	public static EntityDestroied(target: CEntity): void {
		let e = this.Get();
		e._type = UIEvent.ENTITY_DESTROIED;
		e.target = target;
		e.Invoke();
	}

	public static EntityAttrChanged(target: CEntity, attr: EAttr, value: any): void {
		let e = this.Get();
		e._type = UIEvent.ENTITY_ATTR_CHANGED;
		e.target = target;
		e.attr = attr;
		e.o0 = value;
		e.Invoke();
	}

	public static StartLayout(): void {
		let e = this.Get();
		e._type = UIEvent.START_LAYOUT;
		e.Invoke();
	}

	public static EndLayout(): void {
		let e = this.Get();
		e._type = UIEvent.END_LAYOUT;
		e.Invoke();
	}

	public static UpdateBuilding(): void {
		let e = this.Get();
		e._type = UIEvent.UPDATE_BUILDING;
		e.Invoke();
	}

	public static NetworkDisconnect(): void {
		let e = this.Get();
		e._type = UIEvent.NETWORK_DISCONNECT;
		e.Invoke();
	}

	public i0: number;
	public i1: number;
	public b0: boolean;
	public b1: boolean;
	public o0: any;

	public target: CEntity;
	public itemId: string;

	public attr: EAttr;
}