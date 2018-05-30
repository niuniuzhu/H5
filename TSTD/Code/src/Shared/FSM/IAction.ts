namespace Shared.FSM {
	export interface IAction {
		state: FSMState;
		enabled: boolean;

		Enter(param: any[]): void;
		Exit(): void;
		Update(context: Shared.UpdateContext): void;
	}
}