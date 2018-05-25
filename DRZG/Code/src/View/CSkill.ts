namespace View {
	export class CSkill {
		private readonly _data: Shared.Model.SkillData;

		public get id(): string { return this._data.id; }
		public get cmp(): number { return this._data.cmp; }
		public get damage(): number { return this._data.damage; }
		public get fx(): string { return this._data.fx; }
		public get missile(): string { return this._data.missile; }

		constructor(id: string) {
			this._data = Shared.Model.ModelFactory.GetSkillData(id);
		}
	}
}