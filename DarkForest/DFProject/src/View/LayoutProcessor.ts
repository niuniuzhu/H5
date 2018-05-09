namespace View {
	export class LayoutProcessor {
		private _battle: CBattle;
		private _editingItem: CEntity;

		constructor(battle: CBattle) {
			this._battle = battle;
		}

		public Enter(entity: CEntity): void {
			this._editingItem = entity;
		}
	}
}