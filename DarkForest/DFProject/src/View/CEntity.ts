/// <reference path="../Shared/GPoolObject" />

namespace View {
	export class CEntity extends Shared.GPoolObject {
		protected _position: RC.Numerics.Vec3;
		protected _direction: RC.Numerics.Vec3;
		protected _battle: View.CBattle;
		protected _markToDestroy: boolean;
		protected _graphic: EntityGraphic;
		protected _logicPos: RC.Numerics.Vec3;
		protected _logicDir: RC.Numerics.Vec3;

		protected _data: Shared.Model.EntityData = null;

		public get id(): string { return this._data.id; }

		public get position(): RC.Numerics.Vec3 { return this._position.Clone(); }
		public set position(value: RC.Numerics.Vec3) {
			if (this._position.EqualsTo(value))
				return;
			this._position = value.Clone();
			if (this._graphic != null)
				this._graphic.position = this._position;
		}

		public get direction(): RC.Numerics.Vec3 { return this._direction.Clone(); }
		public set direction(value: RC.Numerics.Vec3) {
			if (this._direction.EqualsTo(value))
				return;
			this._direction = value.Clone();
			if (this._graphic != null)
				this._graphic.rotation = RC.Numerics.Quat.LookRotation(this._direction, RC.Numerics.Vec3.up);
		}

		public get footprint(): RC.Numerics.Vec3 { return this._data.footprint.Clone(); }
		public get battle(): View.CBattle { return this._battle; }
		public get graphic(): EntityGraphic { return this._graphic; }
		public get markToDestroy(): boolean { return this._markToDestroy; }

		public disableTransformLerp: boolean;

		constructor() {
			super();
			this._position = RC.Numerics.Vec3.zero;
			this._direction = RC.Numerics.Vec3.forward;
		}

		protected InternalDispose(): void {
		}

		public OnCreated(battle: CBattle, param: Shared.Model.EntityParam): void {
			this._battle = battle;
			this._rid = param.rid;
			this._data = Shared.Model.ModelFactory.GetEntityData(Shared.Utils.GetIDFromRID(this.rid));

			this._logicPos = this._position = param.position.Clone();
			this._logicDir = this._direction = param.direction.Clone();

			this._graphic = this._battle.graphicManager.CreateGraphic(EntityGraphic);
			this._graphic.Load(this._data.model);
			this._graphic.position = this.position;
			this._graphic.rotation = RC.Numerics.Quat.LookRotation(this.direction, RC.Numerics.Vec3.up);
		}

		public OnAddedToBattle(): void {
		}

		public OnRemoveFromBattle(): void {
			this._markToDestroy = false;
			this._battle.graphicManager.DestroyGraphic(this._graphic);
			this._graphic = null;
			this._battle = null;
			this._data = null;
		}

		public MarkToDestroy(): void {
			this._markToDestroy = true;
		}

		public HandleSyncProps(attrs: Shared.Attr[], values: any[]): void {
			for (let i = 0; i < attrs.length; i++)
				this.OnAttrChanged(attrs[i], values[i]);
		}

		protected OnAttrChanged(attr: Shared.Attr, value: any): void {
			switch (attr) {
				case Shared.Attr.Position:
					this._logicPos = value;
					break;

				case Shared.Attr.Direction:
					this._logicDir = value;
					break;
			}

			Shared.Event.UIEvent.EntityAttrChanged(this, attr, value);
		}

		public OnUpdateState(context: Shared.UpdateContext): void {
			let dt = context.deltaTime;
			if (!this.disableTransformLerp) {
				this.position = RC.Numerics.Vec3.Lerp(this._position, this._logicPos, dt * 10);
				this.direction = RC.Numerics.Vec3.Slerp(this._direction, this._logicDir, dt * 8);
			}
		}
	}
}