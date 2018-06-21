namespace View.UI {
	export class UILevel implements IUIModule {
		private readonly _root: fairygui.GComponent;
		private readonly _result: fairygui.GComponent;
		private _tileMap: TileMap;

		public get root(): fairygui.GComponent { return this._root; }
		public get tileContainer(): fairygui.GComponent { return this._root.getChild("place").asCom; }

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/level");

			let confirm = fairygui.UIPackage.createObject("global", "confirm").asCom;
			confirm.getChild("confirm_btn").onClick(this, () => {
				fairygui.GRoot.inst.hidePopup();
				UIManager.EnterMain();
			});
			confirm.getChild("cancel_btn").onClick(this, () => fairygui.GRoot.inst.hidePopup());

			this._root = fairygui.UIPackage.createObject("level", "Main").asCom;
			this._root.getChild("leave_btn").onClick(this, () => {
				confirm.getChild("text").asTextField.text = "确定离开关卡回到主界面?";
				fairygui.GRoot.inst.showPopup(confirm);
				confirm.center();
			});

			this._result = fairygui.UIPackage.createObject("level", "result").asCom;
			this._result.getChild("cancel_btn").onClick(this, () => {
				UIManager.EnterMain();
			});
			this._result.getChild("next_btn").onClick(this, () => {
				UIManager.EnterMain();
				UIManager.EnterLevel(0);
			});
			this._result.getChild("again_btn").onClick(this, () => {
				UIManager.EnterMain();
				UIManager.EnterLevel(0);
			});
		}

		public Dispose(): void {
			this._result.dispose();
			this._root.dispose();
		}

		public Enter(param?: any[]): void {
			fairygui.GRoot.inst.addChild(this._root);
			this._tileMap = new TileMap(this);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.getChild("icon").asLoader.url = fairygui.UIPackage.getItemURL("global", "img" + View.CUser.img);
			this._root.getChild("tool").asLoader.url = fairygui.UIPackage.getItemURL("global", "t" + View.CUser.tool);
			this._root.getChild("name").asTextField.text = "野兽洞窟";
			this.UpdatePlayerInfo();
		}

		public Leave(): void {
			this._tileMap.Dispose();
			this._tileMap = null;
			this._root.removeFromParent();
			this._result.removeFromParent();
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		public UpdatePlayerInfo(): void {
			this._root.getChild("atk").asTextField.text = "" + this._tileMap.player.atk;
			this._root.getChild("hp").asTextField.text = "" + this._tileMap.player.hp;
			this._root.getChild("wood").asTextField.text = "" + View.CUser.wood;
			this._root.getChild("stone").asTextField.text = "" + View.CUser.stone;
		}

		public OnWin(): void {
			this._root.addChild(this._result);
			this._result.getController("c1").selectedIndex = 0;
			let exp = RC.Numerics.MathUtils.RandomFloor(40, 80);
			this._result.getChild("exp").asTextField.text = "" + exp;
			View.CUser.exp += exp;
		}

		public OnFail(): void {
			this._root.addChild(this._result);
			this._result.getController("c1").selectedIndex = 1;
			let exp = RC.Numerics.MathUtils.RandomFloor(20, 50);
			this._result.getChild("exp").asTextField.text = "" + exp;
			View.CUser.exp += exp;
		}
	}
}