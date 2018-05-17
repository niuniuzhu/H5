namespace View {
	export class CEffect {
		private _id: string;
		private readonly _data: Shared.Model.EffectData;

		public get id(): string { return this._id; }

		constructor(id: string) {
			this._data = Shared.Model.ModelFactory.GetEffectData(id);
		}
	}
}