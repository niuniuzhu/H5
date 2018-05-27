namespace View {
	export enum SkillTargetMode {
		Undefine,
		Teammate,
		Opponent
	}

	export enum SkillTargetFilter {
		None,
		MaxHp,
		MinHp
	}

	export class CSkill {
		private readonly _data: Shared.Model.SkillData;
		private readonly _owner: CTower;

		public get id(): string { return this._data.id; }
		public get cmp(): number { return this._data.cmp; }
		public get damage(): number { return this._data.damage; }
		public get duration(): number { return this._data.duration; }
		public get hit(): number { return this._data.hit; }
		public get targetMode(): SkillTargetMode { return <SkillTargetMode>this._data.targetMode; }
		public get targetFilter(): SkillTargetFilter { return <SkillTargetFilter>this._data.targetFilter; }
		public get fx(): string { return this._data.fx; }
		public get missile(): string { return this._data.missile; }
		public get summon(): string { return this._data.summon; }
		public get summonPos(): RC.Numerics.Vec2[] { return this._data.summonPos; }
		public get summonFx(): string { return this._data.summonFx; }

		constructor(owner: CTower, id: string) {
			this._owner = owner;
			this._data = Shared.Model.ModelFactory.GetSkillData(id);
		}

		public RandomGetTarget(): CTower {
			let team = this.targetMode == SkillTargetMode.Teammate ? this._owner.team : 1 - this._owner.team;
			let targets = this._owner.owner.entityManager.GetTargetsByTeam(team);

			switch (this.targetFilter) {
				case SkillTargetFilter.None:
					return targets[Math.floor(Math.random() * targets.length)];

				case SkillTargetFilter.MaxHp: {
					let max = RC.Numerics.MathUtils.MIN_VALUE;
					let target: CTower = null;
					for (let curTarget of targets) {
						if (curTarget.hp > max) {
							max = curTarget.hp;
							target = curTarget;
						}
					}
					return target;
				}

				case SkillTargetFilter.MinHp: {
					let min = RC.Numerics.MathUtils.MAX_VALUE;
					let target: CTower = null;
					for (let curTarget of targets) {
						if (curTarget.hp < min) {
							min = curTarget.hp;
							target = curTarget;
						}
					}
					return target;
				}
			}
		}
	}
}