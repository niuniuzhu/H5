/// <reference path="./Graphic" />

namespace View {
	export class EntityGraphic extends Graphic {
		constructor(manager: GraphicManager) {
			super(manager);
		}

		public OnCreate(owner: CEntity, id: string): void {
			this.Load(id);
		}
	}
}