/// <reference path="./Graphic" />

namespace View {
	export class EntityGraphic extends Graphic {
		constructor(manager: GraphicManager) {
			super(manager);
		}

		public OnCreate(owner: View.CEntity, id: string): void {
			this.OnCreateInternal(id);
		}
	}
}