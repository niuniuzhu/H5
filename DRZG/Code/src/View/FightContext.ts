namespace View {
	export class FightContext {
		private _skill: CSkill;
		private _attacker: CTower;
		private _target: CTower;

		public get skill(): CSkill { return this._skill; }
		public get atacker(): CTower { return this._attacker; }
		public get target(): CTower { return this._target; }

		constructor(skill: CSkill, attacker: CTower, target: CTower) {
			this._skill = skill;
			this._attacker = attacker;
			this._target = target;
		}
	}
}