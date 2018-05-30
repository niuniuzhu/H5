/// <reference path="./CChampionAIAction.ts" />

namespace View.Actions {
	export class Idle extends CChampionAIAction {
		protected OnEnter(param: any[]): void {
			this.owner.owner.graphic.Stop();
		}

		protected OnExit(): void {
		}

		protected OnUpdate(context: Shared.UpdateContext): void {
		}
	}
}