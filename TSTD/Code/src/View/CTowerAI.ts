namespace View {
	export class CTowerAI implements IEntityAI {
		private readonly _owner: CTower;
		private _nextUseSkillTime: number;

		constructor(owner: CTower) {
			this._owner = owner;
			this._nextUseSkillTime = this._owner.owner.time + Math.floor((Math.random() * 1.8 + 1) * 1000);
		}

		public Update(context: Shared.UpdateContext): void {
			if (context.time < this._nextUseSkillTime)
				return;
			let skill = this._owner.RandomGetUsableSkill();
			if (skill == null)
				return;
			let target = skill.RandomGetTarget();
			this._owner.UseSkill(skill.id, target);
			this._nextUseSkillTime = context.time + Math.floor((Math.random() * 2.0 + 1.2) * 1000);
		}
	}
}