import { EntityGraphic } from "./EntityGraphic";
import { Home } from "./Home";
import { Utils } from "./Utils";
import { EntityParam } from "../Shared/Model/EntityParam";
import { EntityData } from "../Shared/Model/EntityData";
import { GPoolObject } from "./GPoolObject";
import { UpdateContext } from "./UpdateContext";
import { ModelFactory } from "../Shared/Model/ModelFactory";

export class CEntity extends GPoolObject {
	protected _position: RC.Numerics.Vec3;
	protected _owner: Home;
	protected _markToDestroy: boolean;
	protected _graphic: EntityGraphic;
	protected _data: EntityData = null;

	public get id(): string { return this._data.id; }

	public get position(): RC.Numerics.Vec3 { return this._position.Clone(); }
	public set position(value: RC.Numerics.Vec3) {
		if (this._position.EqualsTo(value))
			return;
		this._position.CopyFrom(value);
		if (this._graphic != null)
			this._graphic.position = this._position;
		this.OnPositionChanged();
	}

	public get footprint(): RC.Numerics.Vec3 { return this._data.footprint.Clone(); }
	public get battle(): Home { return this._owner; }
	public get graphic(): EntityGraphic { return this._graphic; }
	public get markToDestroy(): boolean { return this._markToDestroy; }

	constructor() {
		super();
		this._position = RC.Numerics.Vec3.zero;
	}

	protected InternalDispose(): void {
	}

	public OnCreated(owner: Home, param: EntityParam): void {
		this._owner = owner;
		this._rid = param.rid;
		this._data = ModelFactory.GetEntityData(Utils.GetIDFromRID(this.rid));
		this.position = param.position;
		this.CreateGraphic();
	}

	public OnAddedToBattle(): void {
	}

	public OnRemoveFromBattle(): void {
		this._markToDestroy = false;
		this._owner.graphicManager.DestroyGraphic(this._graphic);
		this._graphic = null;
		this._owner = null;
		this._data = null;
	}

	protected OnPositionChanged(): void {
	}

	public MarkToDestroy(): void {
		this._markToDestroy = true;
	}

	public OnUpdateState(context: UpdateContext): void {
	}

	protected CreateGraphic(): void {
		this._graphic = this._owner.graphicManager.CreateGraphic(EntityGraphic);
		this._graphic.Load(this._data.model);
		this._graphic.position = this.position;
	}
}