namespace View {
	export class FightHandler {
		private _fightContexts: FightContext[];

		constructor() {

		}

		public Dispose(): void {

		}

		public Update(context: Shared.UpdateContext): void {

		}

		public Add(fightContext: FightContext): void {
			this._fightContexts.push(fightContext);
		}
	}
}