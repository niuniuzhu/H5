namespace View {
	export class CChampionAI implements IEntityAI {
		private _owner: CTower;

		constructor(owner: CTower) {
			this._owner = owner;

		}

		public Update(context: Shared.UpdateContext): void {
		}
	}
}