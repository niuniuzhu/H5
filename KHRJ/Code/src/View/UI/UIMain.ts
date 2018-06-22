namespace View.UI {
	export class UIMain implements IUIModule {
		private readonly _root: fairygui.GComponent;
		private _message: fairygui.GComponent;

		public get root(): fairygui.GComponent { return this._root; }

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/main");

			View.CUser.img = 0;
			View.CUser.lvl = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(20, 40));
			View.CUser.hp = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(100, 130));
			View.CUser.atk = 20;
			View.CUser.tool = 0;
			View.CUser.wood = 100;
			View.CUser.stone = 100;
			View.CUser.exp = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(120, 300));
			View.CUser.tl = 10;
			View.CUser.uname = "深蓝的天空";

			this._message = fairygui.UIPackage.createObject("global", "confirm").asCom;
			this._message.getChild("confirm_btn").onClick(this, () => {
				fairygui.GRoot.inst.hidePopup();
			});

			this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
			this._root.getChild("camp").onClick(this, () => UIManager.EnterCamp());
			this._root.getChild("c0").onClick(this, () => this.EnterLevel(0));
			this._root.getChild("c1").onClick(this, () => this.EnterLevel(1));
			this._root.getChild("c2").onClick(this, () => this.EnterLevel(2));
			this._root.getChild("c3").onClick(this, () => this.EnterLevel(3));
			this._root.getChild("c4").onClick(this, () => this.EnterLevel(4));
		}

		public Dispose(): void {
			this._root.dispose();
		}

		public Enter(param?: any[]): void {
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.getChild("n1").asCom.getChild("icon").asLoader.url = fairygui.UIPackage.getItemURL("global", "img" + View.CUser.img);
			this.UpdateUserInfo();
		}

		public Leave(): void {
			this._root.removeFromParent();
		}

		public Update(deltaTime: number): void {
			View.CUser.tl += 0.1 * deltaTime * 0.001;
			View.CUser.tl = RC.Numerics.MathUtils.Min(10, View.CUser.tl);
			this.UpdateUserInfo();
		}

		public OnResize(e: laya.events.Event): void {
		}

		private EnterLevel(index: number): void {
			if (View.CUser.tl < 2) {
				this._message.getChild("text").asTextField.text = "没有足够的体力";
				fairygui.GRoot.inst.showPopup(this._message);
				this._message.center();
				return;
			}
			View.CUser.tl -= 2;
			UIManager.EnterLevel(index);
		}

		private UpdateUserInfo(): void {
			this._root.getChild("lvl").asTextField.text = "" + View.CUser.lvl;
			this._root.getChild("exp").asTextField.text = "" + View.CUser.exp;
			this._root.getChild("tl").asList.width = RC.Numerics.MathUtils.Floor(View.CUser.tl * 48);
		}
	}
}