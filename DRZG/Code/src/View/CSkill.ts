namespace View {
	export class CSkill {
		private _id: string;
		private readonly _data: Shared.Model.SkillData;

		public get id(): string { return this._id; }
		public get cmp(): number { return this._data.cmp; }
		public get damage(): number { return this._data.damage; }
		public get fx(): string { return this._data.fx; }

		constructor(id: string) {
			this._data = Shared.Model.ModelFactory.GetSkillData(id);
		}
	}
}