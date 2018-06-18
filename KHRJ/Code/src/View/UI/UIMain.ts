namespace View.UI {
	export class UIMain implements IUIModule {
		private readonly _root: fairygui.GComponent;

		public get root(): fairygui.GComponent { return this._root; }

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/main");

			View.CUser.img = 0;
			View.CUser.lvl = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(20, 40));
			View.CUser.hp = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(100, 130));
			View.CUser.atk = 10;
			View.CUser.tool = 0;
			View.CUser.wood = 100;
			View.CUser.stone = 100;
			View.CUser.exp = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(120, 300));
			View.CUser.tl = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(130, 220));
			View.CUser.uname = "深蓝的天空";

			this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
			this._root.getChild("camp").onClick(this, () => UIManager.EnterCamp());
			this._root.getChild("c0").onClick(this, () => UIManager.EnterLevel(0));
			this._root.getChild("c1").onClick(this, () => UIManager.EnterLevel(1));
			this._root.getChild("c2").onClick(this, () => UIManager.EnterLevel(2));
			this._root.getChild("c3").onClick(this, () => UIManager.EnterLevel(3));
		}

		public Dispose(): void {
			this._root.dispose();
		}

		public Enter(param?: any[]): void {
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.getChild("n1").asCom.getChild("icon").asLoader.url = fairygui.UIPackage.getItemURL("global", "img" + View.CUser.img);
			this._root.getChild("lvl").asTextField.text = "" + View.CUser.lvl;
			this._root.getChild("exp").asTextField.text = "" + View.CUser.exp;
		}

		public Leave(): void {
			this._root.removeFromParent();
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}
	}
}