namespace View {
	export class CChampionAI implements IEntityAI {
		private readonly _owner: CChampion;
		private readonly _fsm: Shared.FSM.FSM;

		public get owner(): CChampion { return this._owner; }

		constructor(owner: CChampion) {
			this._owner = owner;
			this._fsm = new Shared.FSM.FSM(this);

			let idleState = this._fsm.CreateState(View.Actions.FSMStateType.IDLE);
			idleState.CreateAction(View.Actions.Idle);
			let seekState = this._fsm.CreateState(View.Actions.FSMStateType.SEEK);
			seekState.CreateAction(View.Actions.Seek);
			let attackState = this._fsm.CreateState(View.Actions.FSMStateType.ATTACK);
			attackState.CreateAction(View.Actions.Attack);

			this._fsm.Start();
			this._fsm.ChangeState(View.Actions.FSMStateType.SEEK);
		}

		public Update(context: Shared.UpdateContext): void {
			if (this.owner.isDead)
				return;
			this._fsm.Update(context);
		}
	}
}