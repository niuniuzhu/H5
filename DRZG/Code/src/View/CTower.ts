/// <reference path="./CEntity" />

namespace View {
	export class CTower extends CEntity {
		protected _team: number;

		public get team(): number { return this._team; }

		public OnCreated(owner: CBattle, param: Shared.Model.EntityParam): void {
			super.OnCreated(owner, param);
			this._team = param.team;
		}
	}
}