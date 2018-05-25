namespace View {
	export class FightHandler {
		private readonly _owner: CBattle;
		private readonly _fightContexts: RC.Collections.Queue<FightContext>;

		constructor(owner: CBattle) {
			this._owner = owner;
			this._fightContexts = new RC.Collections.Queue<FightContext>();
		}

		public Dispose(): void {
			this._fightContexts.clear();
		}

		public ProcessFight(context: Shared.UpdateContext): void {
			while (this._fightContexts.size() > 0) {
				let fightContext = this._fightContexts.dequeue();
				let target = <CTower>this._owner.entityManager.GetEntity(fightContext.target);
				if (target == null)
					continue;
				let attacker = <CTower>this._owner.entityManager.GetEntity(fightContext.atacker);
				if (attacker == null)
					continue;
				let skill = attacker.GetSkill(fightContext.skill);
				target.hp -= skill.damage;
				target.hp = RC.Numerics.MathUtils.Max(0, target.hp);
				if (target.hp == 0)
					target.MarkToDestroy();
			}
		}

		public Add(fightContext: FightContext): void {
			this._fightContexts.enqueue(fightContext);
		}
	}
}