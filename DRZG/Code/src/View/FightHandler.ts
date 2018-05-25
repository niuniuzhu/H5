namespace View {
	export class FightHandler {
		private readonly _fightContexts: RC.Collections.Queue<FightContext>;

		constructor() {
			this._fightContexts = new RC.Collections.Queue<FightContext>();
		}

		public Dispose(): void {
			this._fightContexts.clear();
		}

		public ProcessFight(context: Shared.UpdateContext): void {
			while (this._fightContexts.size() > 0) {
				let fightContext = this._fightContexts.dequeue();
				fightContext.target.hp -= fightContext.skill.damage;
				fightContext.target.hp = RC.Numerics.MathUtils.Max(0, fightContext.target.hp);
				if (fightContext.target.hp == 0)
					fightContext.target.MarkToDestroy();
			}
		}

		public Add(fightContext: FightContext): void {
			this._fightContexts.enqueue(fightContext);
		}
	}
}