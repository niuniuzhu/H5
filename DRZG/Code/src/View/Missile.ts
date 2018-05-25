namespace View {
	export class Missile extends CEntity {
		private _skill: CSkill;
		private _caster: CTower;
		private _target: CTower;

		public PlayAni(): void {
			this._graphic.Play(0, -1, 0);
		}

		public Begin(skill: CSkill, caster: CTower, target: CTower): void {
			this._skill = skill;
			this._caster = caster;
			this._target = target;
			this.position = this._caster.position;
			this.PlayAni();
		}

		private End(): void {
			this._graphic.Stop();
			this.MarkToDestroy();
			if (this._data.dfx != null && this._data.dfx != "") {
				let param = new Shared.Model.EntityParam();
				param.id = this._data.dfx;
				let fx = this._owner.CreateEffect(param);
				fx.Begin(this.position);
			}
			let fightContext = new FightContext(this._skill, this._caster, this._target);
			this._owner.fightHandler.Add(fightContext);
		}

		public OnUpdateState(context: Shared.UpdateContext): void {
			super.OnUpdateState(context);
			let dir = RC.Numerics.Vec2.Sub(this._target.position, this.position);
			dir.Normalize();
			let pos = RC.Numerics.Vec2.Add(this.position, RC.Numerics.Vec2.MulN(dir, this._data.speed * context.deltaTime * 0.001));
			this.position = pos;
			this.direction = dir;
			if (RC.Numerics.Vec2.DistanceSquared(pos, this._target.position) < 5) {
				this.End();
			}
		}
	}
}