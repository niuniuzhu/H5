/// <reference path="./CEntity" />

namespace View {
	export class CTower extends CEntity {
		protected _team: number;
		protected _skills: Map<string, CSkill>;
		protected _mp: number;
		protected _ai: IEntityAI;

		public get team(): number { return this._team; }
		public get numSkills(): number { return this._skills.size; }

		constructor() {
			super();
		}

		public OnCreated(owner: CBattle, param: Shared.Model.EntityParam): void {
			super.OnCreated(owner, param);
			this._team = param.team;
			this.direction = this._team == 0 ? RC.Numerics.Vec2.down : RC.Numerics.Vec2.up;
			this._mp = this._data.mp;
			this._skills = new Map<string, CSkill>();
			for (let skillId of this._data.skills) {
				let skill = new CSkill(skillId);
				this._skills.set(skillId, skill);
			}
			for (let skillId of param.skills) {
				if (this._skills.has(skillId))
					continue;
				let skill = new CSkill(skillId);
				this._skills.set(skillId, skill);
			}
			switch (this._data.ai) {
				case "tower":
					this._ai = new CTowerAI(this);
					break;

				case "champion":
					this._ai = new CChampionAI(this);
					break;
			}
		}

		public OnUpdateState(context: Shared.UpdateContext): void {
			super.OnUpdateState(context);
			this._mp += this._data.gmp * context.deltaTime * 0.001;
			this._mp = RC.Numerics.MathUtils.Max(this._mp, this._data.mmp);
			if (this._ai != null)
				this._ai.Update(context);
		}

		public GetSkill(skillId: string): CSkill {
			return this._skills.get(skillId);
		}

		public CanUseSkill(skillId: string): boolean {
			let skill = this.GetSkill(skillId);
			return this.CanUseSkill2(skill);
		}

		public CanUseSkill2(skill: CSkill): boolean {
			return this._mp >= skill.cmp;
		}

		public GetUsableSkills(): CSkill[] {
			let skills: CSkill[] = [];
			this._skills.forEach((skill) => {
				if (this.CanUseSkill2(skill))
					skills.push(skill);
			});
			return skills;
		}

		public UseSkill(skillId: string, target: CEntity): void {
			let skill = this._skills.get(skillId);
			if (skill.missile == null || skill.missile == "") {
				let fightContext = new FightContext(skill, this, target);
				this._owner.fightHandler.Add(fightContext);
			}
			else {
				let param = new Shared.Model.EntityParam();
				param.id = skill.missile;
				param.team = this.team;
				let missile = this._owner.CreateMissile(param);
				missile.Begin(skill, this, target);
			}
		}
	}
}