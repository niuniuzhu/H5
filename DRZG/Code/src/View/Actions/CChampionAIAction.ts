namespace View.Actions {
	export class CChampionAIAction extends Shared.FSM.AbsAction {
		public get owner(): CChampionAI { return <CChampionAI>this.state.fsm.owner; }
	}
}