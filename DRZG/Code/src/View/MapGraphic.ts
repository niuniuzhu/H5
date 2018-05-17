namespace View {
	export class MapGraphic {
		private _root: fairygui.GComponent;

		public get root(): fairygui.GComponent { return this._root; }

		constructor(id:string) {
			this._root = fairygui.UIPackage.createObject("global", id).asCom;
		}

		public Dispose(): void {
			this._root.dispose();
		}
	}
}