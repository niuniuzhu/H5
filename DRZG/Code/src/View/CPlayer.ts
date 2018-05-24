namespace View {
	export class CPlayer {
		private _mp: number;
		private readonly _owner: CBattle;
		private readonly _data: Shared.Model.PlayerData;
		private readonly _team: number;
		private readonly _skills: Map<string, CSkill>;

		constructor(owner: CBattle, team: number, initSKills: string[], initMp: number) {
			this._owner = owner;
			this._data = Shared.Model.ModelFactory.GetPlayerData();
			this._team = team;
			this._skills = new Map<string, CSkill>();
			for (let skillId of initSKills) {
				let skill = new CSkill(skillId);
				this._skills.set(skillId, skill);
			}
			this._mp = initMp;
		}

		public Dispose(): void {
			this._skills.clear();
		}

		public Update(context: Shared.UpdateContext): void {
			this._mp += this._data.gmp * context.deltaTime * 0.001;
			this._mp = RC.Numerics.MathUtils.Max(this._mp, this._data.mmp);
		}

		public GetSkill(skillId: string): CSkill {
			return this._skills.get(skillId);
		}

		public CanUseSkill(skillId: string): boolean {
			let skill = this.GetSkill(skillId);
			return this._mp >= skill.cmp;
		}
	}
}