namespace View {
	export class FightHandler {
		private readonly _fightContexts: FightContext[];

		constructor() {
			this._fightContexts = [];
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