namespace View.UI {
	export class UICamp implements IUIModule {
		private readonly _root: fairygui.GComponent;
		private readonly _confirm: fairygui.GComponent;
		private readonly _confirm2: fairygui.GComponent;
		private readonly _tools: fairygui.GComponent;
		private readonly _bar0: fairygui.GProgressBar;
		private readonly _bar1: fairygui.GProgressBar;
		private _building: boolean;
		private _pplt: number;
		private _maxpplt: number;
		private readonly _mans: fairygui.GMovieClip[];

		public get root(): fairygui.GComponent { return this._root; }

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/camp");

			this._confirm = fairygui.UIPackage.createObject("camp", "build_confirm").asCom;
			this._confirm.getChild("confirm_btn").onClick(this, this.OnBuildStart);
			this._confirm.getChild("cancel_btn").onClick(this, () => fairygui.GRoot.inst.hidePopup());

			this._confirm2 = fairygui.UIPackage.createObject("camp", "build_confirm").asCom;
			this._confirm2.getChild("confirm_btn").onClick(this, this.OnRecruitStart);
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

			this._bar0 = this._root.getChild("bar0").asProgress;
			this._bar1 = this._root.getChild("bar1").asProgress;

			this._maxpplt = 20;
			this._pplt = 0;
			this._mans = [];
		}

		public Dispose(): void {
			for (let man of this._mans)
				man.dispose();
			this._confirm.dispose();
			this._confirm2.dispose();
			this._tools.dispose();
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
			if (this._building) {
				if (this._bar0.value < this._bar0.max) {
					this._bar0.value += deltaTime * 0.001;
					// let d = RC.Numerics.MathUtils.Floor(this._bar0.max - this._bar0.value);
					// this._bar0.text = UICamp.FormatMillisecond(d);
				}
				else
					this._bar0.visible = false;

				if (this._bar1.value < this._bar1.max) {
					this._bar1.value += deltaTime * 0.001;
					// let d = RC.Numerics.MathUtils.Floor(this._bar1.max - this._bar1.value);
					// this._bar1.text = UICamp.FormatMillisecond(d);
				}
				else
					this._bar1.visible = false;
			}
		}

		public OnResize(e: laya.events.Event): void {
		}

		private ShowBuildConfirm(): void {
			fairygui.GRoot.inst.showPopup(this._confirm);
			this._confirm.center();
			this._confirm.getChild("n14").asTextField.text = "建筑营地需要消耗石材和木材";
			this._confirm.getChild("n17").asTextField.text = "";
		}

		private ShowRecruitConfirm(): void {
			fairygui.GRoot.inst.showPopup(this._confirm2);
			this._confirm2.center();
			this._confirm2.getChild("n14").asTextField.text = "招募原始人需要消耗石材和木材";
			this._confirm2.getChild("n17").asTextField.text = "";
		}

		private ShowToolSelect(): void {
			fairygui.GRoot.inst.showPopup(this._tools);
			this._tools.center();
			let controller = this._tools.getController("c1");
			controller.setSelectedIndex(View.CUser.tool);
		}

		private OnBuildStart(): void {
			if (View.CUser.wood < 36) {
				this._confirm.getChild("n17").asTextField.text = "没有足够的木材";
				return;
			}
			if (View.CUser.stone < 50) {
				this._confirm.getChild("n17").asTextField.text = "没有足够的石材";
				return;
			}
			this._root.getTransition("t0").play();
			this._bar0.max = 1 * 60;
			this._bar0.value = 0;
			this._bar1.max = 10 * 60;
			this._bar1.value = 0;
			this._building = true;
			View.CUser.wood -= 36;
			View.CUser.stone -= 50;
			fairygui.GRoot.inst.hidePopup();
			this.UpdateUserInfo();
			this._root.getChild("btn0").enabled = false;
		}

		private OnRecruitStart(): void {
			if (View.CUser.wood < 16) {
				this._confirm2.getChild("n17").asTextField.text = "没有足够的木材";
				return;
			}
			if (View.CUser.stone < 14) {
				this._confirm2.getChild("n17").asTextField.text = "没有足够的石材";
				return;
			}
			if (this._pplt == this._maxpplt) {
				this._confirm2.getChild("n17").asTextField.text = "已达到最高人口";
				return;
			}
			let man = fairygui.UIPackage.createObject("camp", "man").asMovieClip;
			man.setPivot(0.5, 1, true);
			let r0 = RC.Numerics.MathUtils.RandomFloor(0, 4);
			let container = this._root.getChild("place" + r0).asCom;
			container.addChild(man);
			man.x = RC.Numerics.MathUtils.RandomFloor(0, container.width);
			man.y = RC.Numerics.MathUtils.RandomFloor(0, container.height);
			this._mans.push(man);
			this.SortGraphics();
			View.CUser.wood -= 16;
			View.CUser.stone -= 14;
			++this._pplt;
			this.UpdateUserInfo();
			fairygui.GRoot.inst.hidePopup();
		}

		private UpdateUserInfo(): void {
			this._root.getChild("wood").asTextField.text = "" + View.CUser.wood;
			this._root.getChild("stone").asTextField.text = "" + View.CUser.stone;
			this._root.getChild("pplt").asTextField.text = this._pplt + "/" + this._maxpplt;
		}

		public SortGraphics(): void {
			this._mans.sort(this.SortFunc.bind(this));
			let count = this._mans.length;
			for (let i = 0; i < count; ++i) {
				this._mans[i].sortingOrder = i;
			}
		}

		private SortFunc(a: fairygui.GComponent, b: fairygui.GComponent): number {
			return a.y > b.y ? 1 : -1;
		}

		private static FormatMillisecond(msd: number): string {
			let time = msd / 1000;
			if (time > 60 && time < 60 * 60) {
				return RC.Numerics.MathUtils.Floor(time / 60.0) + "分钟" + RC.Numerics.MathUtils.Floor(((time / 60.0) -
					RC.Numerics.MathUtils.Floor(time / 60.0)) * 60) + "秒";
			}
			return RC.Numerics.MathUtils.Floor(time / 3600.0) + "小时" + RC.Numerics.MathUtils.Floor(((time / 3600.0) -
				RC.Numerics.MathUtils.Floor(time / 3600.0)) * 60) + "分钟" +
				RC.Numerics.MathUtils.Floor(((((time / 3600.0) - RC.Numerics.MathUtils.Floor(time / 3600.0)) * 60) -
					RC.Numerics.MathUtils.Floor(((time / 3600.0) - RC.Numerics.MathUtils.Floor(time / 3600.0)) * 60)) * 60) + "秒";
		}
	}
}