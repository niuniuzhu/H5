namespace View {
	export class Missile extends CEntity {
		private _skill: string;
		private _caster: string;
		private _target: string;
		private readonly _lastPos: RC.Numerics.Vec2;

		constructor() {
			super();
			this._lastPos = RC.Numerics.Vec2.zero;
		}

		public PlayAni(): void {
			this._graphic.Play(0, -1, 0);
		}

		public Begin(skill: CSkill, caster: CTower, target: CTower): void {
			this._skill = skill.id;
			this._caster = caster.rid;
			this._target = target.rid;
			this._lastPos.CopyFrom(target.position);
			this.position = caster.position;
			let dist = RC.Numerics.Vec2.Distance(this._lastPos, this.position);
			if (dist != 0)
				this.direction = RC.Numerics.Vec2.DivN(RC.Numerics.Vec2.Sub(this._lastPos, this.position), dist);
			this.PlayAni();
		}

		private End(): void {
			this._graphic.Stop();
			this.MarkToDestroy();
			if (this._data.dfx != null && this._data.dfx != "") {
				let fx = this._owner.CreateEffect(this._data.dfx);
				fx.Begin(this.position);
			}
			let caster = <CTower>this._owner.entityManager.GetEntity(this._caster);
			if (caster == null)
				return;
			caster.MakeFightContext(this._skill, this._target);
		}

		public InternalUpdateState(context: Shared.UpdateContext): void {
			super.InternalUpdateState(context);

			let dist = RC.Numerics.Vec2.Distance(this._lastPos, this.position);
			if (dist != 0)
				this.direction = RC.Numerics.Vec2.DivN(RC.Numerics.Vec2.Sub(this._lastPos, this.position), dist);

			let expectTime = dist * 1000 / this._data.speed;
			let curPos = RC.Numerics.Vec2.Lerp(this.position, this._lastPos, context.deltaTime / expectTime);
			this.position = curPos;

			if (RC.Numerics.Vec2.DistanceSquared(curPos, this._lastPos) < 0.1) {
				this.End();
			}
			let target = this._owner.entityManager.GetEntity(this._target);
			if (target != null)
				this._lastPos.CopyFrom(target.position);
		}
	}
}