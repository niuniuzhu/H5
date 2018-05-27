/// <reference path="./CChampionAIAction.ts" />

namespace View.Actions {
	export class Die extends CChampionAIAction {
		protected OnEnter(param: any[]): void {
			this.owner.owner.PlayDie();
		}

		protected OnExit(): void {
		}

		protected OnUpdate(context: Shared.UpdateContext): void {
		}
	}
}