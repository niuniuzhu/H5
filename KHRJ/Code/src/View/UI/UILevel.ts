namespace View.UI {
	export class UILevel implements IUIModule {
		private readonly _root: fairygui.GComponent;
		private _tileMap: TileMap;

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/level");
			this._root = fairygui.UIPackage.createObject("level", "Main").asCom;
			this._root.getChild("leave_btn").onClick(this, () => UIManager.EnterMain());
		}

		public Dispose(): void {
			this._root.dispose();
		}

		public Enter(param?: any[]): void {
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.getChild("icon").asLoader.url = fairygui.UIPackage.getItemURL("global", "img" + View.CUser.img);
			this._root.getChild("tool").asLoader.url = fairygui.UIPackage.getItemURL("global", "t" + View.CUser.tool);
			this._root.getChild("atk").asTextField.text = "" + View.CUser.atk;
			this._root.getChild("hp").asTextField.text = "" + View.CUser.hp;
			this._root.getChild("wood").asTextField.text = "" + View.CUser.wood;
			this._root.getChild("stone").asTextField.text = "" + View.CUser.stone;
			this._root.getChild("name").asTextField.text = "野兽洞窟";
			this._tileMap = new TileMap(this._root.getChild("place").asCom);
		}

		public Leave(): void {
			this._tileMap.Dispose();
			this._tileMap = null;
			this._root.removeFromParent();
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}
	}
}