/// <reference path="./CEntity" />

namespace View {
	export class CTower extends CEntity {
		public static player: string;

		protected _team: number;
		protected _skills: Map<string, CSkill>;
		protected _mp: number;
		protected _ai: IEntityAI;
		protected _hp: number;

		public get radius(): number { return this._data.radius; }
		public get mmp(): number { return this._data.mmp; }
		public get mp(): number { return this._mp; }
		public get hp(): number { return this._hp; }
		public set hp(value: number) {
			if (value == this._hp)
				return;
			this._hp = value;
			this.graphic.SetHP(this._data.mhp, this.hp);
		}

		public get team(): number { return this._team; }
		public get numSkills(): number { return this._skills.size; }

		public OnCreated(owner: CBattle, param: Shared.Model.EntityParam): void {
			super.OnCreated(owner, param);
			this._team = param.team;
			this._mp = this._data.mp;
			this._skills = new Map<string, CSkill>();
			for (let skillId of this._data.skills) {
				let skill = new CSkill(this, skillId);
				this._skills.set(skillId, skill);
			}
			if (param.skills != null) {
				for (let skillId of param.skills) {
					if (this._skills.has(skillId))
						continue;
					let skill = new CSkill(this, skillId);
					this._skills.set(skillId, skill);
				}
			}
			this.direction = this._team == 0 ? RC.Numerics.Vec2.down : RC.Numerics.Vec2.up;
			this.graphic.ShowHUD();
			this.hp = this._data.mhp;
		}

		public OnUpdateState(context: Shared.UpdateContext): void {
			super.OnUpdateState(context);
			this._mp += this._data.gmp * context.deltaTime * 0.001;
			this._mp = RC.Numerics.MathUtils.Min(this._mp, this._data.mmp);
			if (this._ai != null)
				this._ai.Update(context);
		}

		public CreateAI(): void {
			switch (this._data.ai) {
				case "tower":
					this._ai = new CTowerAI(this);
					break;

				case "champion":
					this._ai = new CChampionAI(<any>this);
					break;
			}
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

		public RandomGetUsableSkill(): CSkill {
			let skills = this.GetUsableSkills();
			if (skills.length == 0)
				return null;
			let r = Math.floor(Math.random() * skills.length);
			return skills[r];
		}

		public UseSkill(skillId: string, target?: CTower): void {
			let skill = this._skills.get(skillId);
			if (target == null) {
				target = skill.RandomGetTarget();
			}
			if (target == null)
				return;
			this._mp -= skill.cmp;
			if (skill.fx != null && skill.fx != "") {
				let fx = this._owner.CreateEffect(skill.fx);
				fx.Begin2(this, target);
			}
			if (skill.missile == null || skill.missile == "") {
				this.MakeFightContext(skillId, target.rid);
			}
			else {
				let missile = this._owner.CreateMissile(skill.missile);
				missile.Begin(skill, this, target);
			}
			if (skill.summon != null && skill.summon != "") {
				let summon = this._owner.CreateChampion(skill.summon, this.team);
				summon.position = skill.summonPos[Math.floor(Math.random() * skill.summonPos.length)];
				summon.CreateAI();
				if (skill.summonFx != null && skill.summonFx != "") {
					let fx = this._owner.CreateEffect(skill.summonFx);
					fx.Begin2(this, summon);
				}
			}
		}

		public MakeFightContext(skillId: string, target: string): void {
			let skill = this.GetSkill(skillId);
			let fightContext = new FightContext(skillId, this.rid, target);
			this._owner.fightHandler.Add(fightContext);
		}
	}
}