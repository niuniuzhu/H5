namespace View.UI {
	export class UIMain implements IUIModule {
		private _root: fairygui.GComponent;

		public get root(): fairygui.GComponent { return this._root; }

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/main");

			View.CUser.img = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(0, 6));
			View.CUser.lvl = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(20, 40));
			View.CUser.hp = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(760, 950));
			View.CUser.exp = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(120, 300));
			View.CUser.tl = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(130, 220));
			View.CUser.uname = "深蓝的天空";
		}

		public Dispose(): void {
		}

		public Enter(param?: any[]): void {
			this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
		}

		public Leave(): void {
			this._root.dispose();
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}
	}
}