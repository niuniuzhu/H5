namespace View.UI {
	export class UICamp implements IUIModule {
		private _root: fairygui.GComponent;
		private _confirm: fairygui.GComponent;
		private _confirm2: fairygui.GComponent;
		private _tools: fairygui.GComponent;

		public get root(): fairygui.GComponent { return this._root; }

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/camp");

			this._confirm = fairygui.UIPackage.createObject("camp", "build_confirm").asCom;
			this._confirm.getChild("confirm_btn").onClick(this, this.OnBuildComplete);
			this._confirm.getChild("cancel_btn").onClick(this, () => fairygui.GRoot.inst.hidePopup());

			this._confirm2 = fairygui.UIPackage.createObject("camp", "build_confirm").asCom;
			this._confirm2.getChild("confirm_btn").onClick(this, this.OnRecruitComplete);
			this._confirm2.getChild("cancel_btn").onClick(this, () => fairygui.GRoot.inst.hidePopup());

			this._tools = fairygui.UIPackage.createObject("camp", "tools_confirm").asCom;
			this._tools.getChild("close_btn").onClick(this, () => fairygui.GRoot.inst.hidePopup());
			this._tools.getChild("t0").onClick(this, () => {
				View.CUser.tool = 0;
				View.CUser.atk = 10;
				fairygui.GRoot.inst.hidePopup();
			});
			this._tools.getChild("t1").onClick(this, () => {
				View.CUser.tool = 1;
				View.CUser.atk = 15;
				fairygui.GRoot.inst.hidePopup();
			});
			this._tools.getChild("t2").onClick(this, () => {
				View.CUser.tool = 2;
				View.CUser.atk = 20;
				fairygui.GRoot.inst.hidePopup();
			});

			this._root = fairygui.UIPackage.createObject("camp", "Main").asCom;
			this._root.getChild("btn0").onClick(this, this.ShowBuildConfirm);
			this._root.getChild("btn1").onClick(this, this.ShowRecruitConfirm);
			this._root.getChild("btn2").onClick(this, this.ShowToolSelect);
			this._root.getChild("btn3").onClick(this, () => UIManager.EnterMain());
		}

		public Dispose(): void {
			this._confirm.dispose();
			this._tools.dispose();
			this._root.dispose();
		}

		public Enter(param?: any[]): void {
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.getChild("n1").asCom.getChild("icon").asLoader.url = fairygui.UIPackage.getItemURL("global", "img" + View.CUser.img);
			this._root.getChild("wood").asTextField.text = "" + View.CUser.wood;
			this._root.getChild("stone").asTextField.text = "" + View.CUser.stone;
		}

		public Leave(): void {
			this._root.removeFromParent();
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private ShowBuildConfirm(): void {
			fairygui.GRoot.inst.showPopup(this._confirm);
			this._confirm.center();
			this._confirm.getChild("n14").asTextField.text = "建筑营地需要消耗石材和木材";
		}

		private ShowRecruitConfirm(): void {
			fairygui.GRoot.inst.showPopup(this._confirm2);
			this._confirm2.center();
			this._confirm2.getChild("n14").asTextField.text = "招募原始人需要消耗石材和木材";
		}

		private ShowToolSelect(): void {
			fairygui.GRoot.inst.showPopup(this._tools);
			this._tools.center();
			let controller = this._tools.getController("c1");
			controller.setSelectedIndex(View.CUser.tool);
		}

		private OnBuildComplete(): void {
			console.log("Build");
			fairygui.GRoot.inst.hidePopup();
		}

		private OnRecruitComplete(): void {
			console.log("Recruit");
			fairygui.GRoot.inst.hidePopup();
		}
	}
}