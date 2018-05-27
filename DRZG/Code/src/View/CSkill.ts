namespace View {
	export class CSkill {
		private readonly _data: Shared.Model.SkillData;

		public get id(): string { return this._data.id; }
		public get cmp(): number { return this._data.cmp; }
		public get damage(): number { return this._data.damage; }
		public get duration(): number { return this._data.duration; }
		public get hit(): number { return this._data.hit; }
		public get fx(): string { return this._data.fx; }
		public get missile(): string { return this._data.missile; }
		public get summon(): string { return this._data.summon; }
		public get summonPos(): RC.Numerics.Vec2[] { return this._data.summonPos; }
		public get summonFx(): string { return this._data.summonFx; }

		constructor(id: string) {
			this._data = Shared.Model.ModelFactory.GetSkillData(id);
		}
	}
}