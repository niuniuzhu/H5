/// <reference path="../Shared/GPoolObject" />

namespace Logic {
	export class Entity extends Shared.GPoolObject {
		private _position: RC.Numerics.Vec3 = RC.Numerics.Vec3.zero;
		private _direction: RC.Numerics.Vec3 = RC.Numerics.Vec3.zero;
		private _battle: Logic.Battle = null;
		private _markToDestroy: boolean = false;

		protected _data: Shared.Model.EntityData = null;

		public get position(): RC.Numerics.Vec3 { return this._position.Clone(); }
		public set position(value: RC.Numerics.Vec3) {
			if (this._position.EqualsTo(value))
				return;
			this._position = value.Clone();
			this.OnPositionChanged();
		}

		public get direction(): RC.Numerics.Vec3 { return this._direction.Clone(); }
		public set direction(value: RC.Numerics.Vec3) {
			if (this._direction.EqualsTo(value))
				return;
			this._direction = value.Clone();
			this.OnDirectionChanged();
		}

		public get battle(): Logic.Battle { return this._battle; }

		public get markToDestroy(): boolean { return this._markToDestroy; }

		constructor() {
			super();
		}

		protected InternalDispose(): void {
		}

		public OnAddedToBattle(battle: Battle, param: Shared.Model.EntityParam): void {
			this._battle = battle;
			this._rid = param.rid;
			this._data = Shared.Model.ModelFactory.GetEntityData(Shared.Utils.GetIDFromRID(this.rid));
			this.position = param.position;
			this.direction = param.direction;
			Shared.Event.SyncEvent.EntityAddedToBattle(this.rid);
			this.InternalOnAddedToBattle(param);
			this.OnSyncState();
		}

		public OnRemoveFromBattle(): void {
			Shared.Event.SyncEvent.EntityRemoveFromBattle(this.rid);
			this.InternalOnRemoveFromBattle();

			this._markToDestroy = false;
			this._battle = null;
			this._data = null;
		}

		protected InternalOnAddedToBattle(param: Shared.Model.EntityParam): void {
		}

		protected InternalOnRemoveFromBattle(): void {
		}

		protected OnPositionChanged(): void {
		}

		protected OnDirectionChanged(): void {
		}

		public OnGenericUpdate(context: Shared.UpdateContext): void {
		}

		public OnSyncState(): void {
			let e = Shared.Event.SyncEvent.BeginSyncProps(this.rid);
			Shared.Event.SyncEvent.AddSyncProp(e, Shared.Attr.Position, this._position);
			Shared.Event.SyncEvent.AddSyncProp(e, Shared.Attr.Direction, this._direction);
			Shared.Event.SyncEvent.EndSyncProps(e);
		}

		public MarkToDestroy(): void {
			this._markToDestroy = true;
		}

		public PointToWorld(point: RC.Numerics.Vec3): RC.Numerics.Vec3 {
			return RC.Numerics.Vec3.Add(this.position, RC.Numerics.Quat.FromToRotation(RC.Numerics.Vec3.forward, this.direction).Transform(point));
		}

		public PointToLocal(point: RC.Numerics.Vec3): RC.Numerics.Vec3 {
			let q = RC.Numerics.Quat.Invert(RC.Numerics.Quat.FromToRotation(RC.Numerics.Vec3.forward, this.direction));
			return q.Transform(RC.Numerics.Vec3.Sub(point, this.position));
		}

		public VectorToWorld(point: RC.Numerics.Vec3): RC.Numerics.Vec3 {
			return RC.Numerics.Quat.FromToRotation(RC.Numerics.Vec3.forward, this.direction).Transform(point);
		}

		public VectorToLocal(point: RC.Numerics.Vec3): RC.Numerics.Vec3 {
			let q = RC.Numerics.Quat.Invert(RC.Numerics.Quat.FromToRotation(RC.Numerics.Vec3.forward, this.direction));
			return q.Transform(point);
		}
	}
}