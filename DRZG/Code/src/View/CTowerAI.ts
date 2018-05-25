namespace View {
	export class CTowerAI implements IEntityAI {
		private readonly _owner: CTower;
		private _nextUseSkillTime: number;

		constructor(owner: CTower) {
			this._owner = owner;
			this._nextUseSkillTime = this._owner.battle.time + Math.floor((Math.random() * 3 + 1) * 1000);
		}

		public Update(context: Shared.UpdateContext): void {
			if (context.time < this._nextUseSkillTime)
				return;
			let skills = this._owner.GetUsableSkills();
			if (skills.length == 0)
				return;
			let r = Math.floor(Math.random() * skills.length);
			let targets = this._owner.battle.entityManager.GetTowersByTeam(1 - this._owner.team);
			let r2 = Math.floor(Math.random() * targets.length);
			this._owner.UseSkill(skills[r].id, targets[r2]);
			this._nextUseSkillTime = context.time + Math.floor((Math.random() * 2.8 + 2) * 1000);
		}
	}
}