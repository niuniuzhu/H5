/// <reference path="./CEntity" />

namespace View {
	export class CTower extends CEntity {
		protected _team: number;
		protected _skills: Map<string, CSkill>;

		public get team(): number { return this._team; }

		public OnCreated(owner: CBattle, param: Shared.Model.EntityParam): void {
			super.OnCreated(owner, param);
			this._team = param.team;
			this._skills = new Map<string, CSkill>();
			for (let skillId of this._data.skills) {
				let skill = new CSkill(skillId);
				this._skills.set(skillId, skill);
			}
		}

		public UseSkill(skillId: string, targetId: string): void {
			let fightContext = new FightContext(this._team, targetId, skillId);
			this._owner.fightHandler.Add(fightContext);
		}
	}
}