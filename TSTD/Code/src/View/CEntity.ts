/// <reference path="../Shared/GPoolObject" />

namespace View {
	export class CEntity extends Shared.GPoolObject {
		protected _owner: View.CBattle;
		protected _position: RC.Numerics.Vec2;
		protected _direction: RC.Numerics.Vec2;
		protected _markToDestroy: boolean;
		protected _graphic: EntityGraphic;
		protected _data: Shared.Model.EntityData;

		public get id(): string { return this._data.id; }

		public get position(): RC.Numerics.Vec2 { return this._position.Clone(); }
		public set position(value: RC.Numerics.Vec2) {
			if (this._position.EqualsTo(value))
				return;
			this._position.CopyFrom(value);
			if (this._graphic != null)
				this._graphic.position = this._position;
			this.OnPositionChanged();
		}

		public get direction(): RC.Numerics.Vec2 { return this._direction.Clone(); }
		public set direction(value: RC.Numerics.Vec2) {
			if (this._direction.EqualsTo(value))
				return;
			this._direction.CopyFrom(value);
			if (this._graphic != null)
				this._graphic.direction = this._direction;
			this.OnDirectionChanged();
		}

		public get owner(): View.CBattle { return this._owner; }
		public get graphic(): EntityGraphic { return this._graphic; }
		public get markToDestroy(): boolean { return this._markToDestroy; }

		constructor() {
			super();
			this._position = RC.Numerics.Vec2.zero;
			this._direction = RC.Numerics.Vec2.down;
		}

		protected InternalDispose(): void {
		}

		public OnCreated(owner: CBattle, param: Shared.Model.EntityParam): void {
			this._owner = owner;
			this._rid = param.rid;
			this._data = Shared.Model.ModelFactory.GetEntityData(Shared.Utils.GetIDFromRID(this._rid));
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

		protected OnDirectionChanged(): void {
		}

		public MarkToDestroy(): void {
			this._markToDestroy = true;
		}

		public UpdateState(context: Shared.UpdateContext): void {
			this.InternalUpdateState(context);
		}

		protected InternalUpdateState(context: Shared.UpdateContext): void {
		}

		protected CreateGraphic(): void {
			this._graphic = this._owner.graphicManager.CreateGraphic(EntityGraphic);
			this._graphic.Load(this._data.model);
			this._graphic.scale = this._data.scale;
			this._graphic.position = this._position;
			this._graphic.direction = this._direction;
		}
	}
}