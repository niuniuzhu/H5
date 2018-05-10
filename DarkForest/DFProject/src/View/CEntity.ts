/// <reference path="../Shared/GPoolObject" />

namespace View {
	export class CEntity extends Shared.GPoolObject {
		protected _position: RC.Numerics.Vec3;
		protected _battle: View.CBattle;
		protected _markToDestroy: boolean;
		protected _graphic: EntityGraphic;
		protected _data: Shared.Model.EntityData = null;

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
		public get battle(): View.CBattle { return this._battle; }
		public get graphic(): EntityGraphic { return this._graphic; }
		public get markToDestroy(): boolean { return this._markToDestroy; }

		constructor() {
			super();
			this._position = RC.Numerics.Vec3.zero;
		}

		protected InternalDispose(): void {
		}

		public OnCreated(battle: CBattle, param: Shared.Model.EntityParam): void {
			this._battle = battle;
			this._rid = param.rid;
			this._data = Shared.Model.ModelFactory.GetEntityData(Shared.Utils.GetIDFromRID(this.rid));
			this.position = param.position;
			this._graphic = this._battle.graphicManager.CreateGraphic(EntityGraphic);
			this._graphic.Load(this._data.model);
			this._graphic.position = this.position;
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

		protected OnPositionChanged():void{
		}

		public MarkToDestroy(): void {
			this._markToDestroy = true;
		}

		public OnUpdateState(context: Shared.UpdateContext): void {
		}
	}
}