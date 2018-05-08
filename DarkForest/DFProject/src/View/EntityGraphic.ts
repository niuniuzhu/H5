/// <reference path="./Graphic" />

namespace View {
	export class EntityGraphic extends Graphic {
		private _loader:fairygui.GLoader;

		constructor(manager: GraphicManager) {
			super(manager);
		}

		public Dispose():void{
			this._loader.dispose();
			super.Dispose();
		}

		public Load(id: string): void {
			this._loader = new fairygui.GLoader();
			this._loader.autoSize = true;
			this._loader.url = fairygui.UIPackage.getItemURL("global", id);
			this._root.addChild(this._loader);
		}
	}
}