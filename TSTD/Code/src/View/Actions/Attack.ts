/// <reference path="./CChampionAIAction.ts" />

namespace View.Actions {
	export class Attack extends CChampionAIAction {
		private _skill: string;
		private _target: string;
		private _endTime: number;
		private _hitTime: number;

		protected OnEnter(param: any[]): void {
			let self = this.owner.owner;
			self.PlayFight();
			let enemy = self.owner.entityManager.GetEntity(param[0]);
			if (enemy == null) {
				this.state.fsm.ChangeState(FSMStateType.SEEK);
				return;
			}
			let skill = self.RandomGetUsableSkill();
			this._endTime = self.owner.time + skill.duration;
			this._hitTime = self.owner.time + skill.hit;
			this._skill = skill.id;
			this._target = enemy.rid;
		}

		protected OnExit(): void {
		}

		protected OnUpdate(context: Shared.UpdateContext): void {
			if (context.time >= this._hitTime) {
				this.owner.owner.MakeFightContext(this._skill, this._target);
				this._hitTime = RC.Numerics.MathUtils.MAX_VALUE;
			}
			if (context.time >= this._endTime) {
				this.state.fsm.ChangeState(FSMStateType.SEEK);
			}
		}
	}
}