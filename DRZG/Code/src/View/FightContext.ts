namespace View {
	export class FightContext {
		private _skill: string;
		private _attacker: string;
		private _target: string;

		public get skill(): string { return this._skill; }
		public get atacker(): string { return this._attacker; }
		public get target(): string { return this._target; }

		constructor(skill: string, attacker: string, target: string) {
			this._skill = skill;
			this._attacker = attacker;
			this._target = target;
		}
	}
}