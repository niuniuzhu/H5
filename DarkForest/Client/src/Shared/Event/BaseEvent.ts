import { EventCenter } from "./EventCenter";

export abstract class BaseEvent {
	// tslint:disable-next-line:variable-name
	public __type: number;

	public get type(): number {
		return this.__type;
	}

	protected set _type(value: number) {
		this.__type = value;
	}

	protected BeginInvoke(): void {
		EventCenter.BeginInvoke(this);
	}

	protected Invoke(): void {
		EventCenter.Invoke(this);
	}

	public abstract Release();
}