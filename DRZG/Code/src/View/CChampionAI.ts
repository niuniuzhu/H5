namespace View {
	export class CChampionAI implements IEntityAI {
		private readonly _owner: CTower;
		private readonly _fsm: Shared.FSM.FSM;

		constructor(owner: CTower) {
			this._owner = owner;
			this._fsm = new Shared.FSM.FSM(this);
		}

		public Update(context: Shared.UpdateContext): void {
			this._fsm.Update(context);
		}
	}
}