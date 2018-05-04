namespace View {
	export class CEntityManager {
		private _battle: CBattle;

		constructor(battle: CBattle) {
			this._battle = battle;
		}

		public Dispose():void{
		}

		public Update(context: Shared.UpdateContext): void {
		}
	}
}