namespace View.UI {
	export class ZCPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c0").asCom;
		}

		public Dispose(): void {
		}

		public Enter(): void {
			this._root.getChild("name").asTextField.text = View.CUser.uname;
			this._root.getChild("lvl").asTextField.text = "" + View.CUser.lvl;
			this._root.getChild("hp").asTextField.text = `${View.CUser.hp}/${View.CUser.hp}`;
			this._root.getChild("exp").asTextField.text = `${View.CUser.exp}/${View.CUser.exp}`;
			this._root.getChild("hp_bar").asProgress.max = View.CUser.hp;
			this._root.getChild("hp_bar").asProgress.value = View.CUser.hp;
			this._root.getChild("exp_bar").asProgress.max = View.CUser.exp;
			this._root.getChild("exp_bar").asProgress.value = View.CUser.exp;
			this._root.getChild("atk").asTextField.text = "" + View.CUser.atk;
			this._root.getChild("img").asCom.getChild("icon").asLoader.url = fairygui.UIPackage.getItemURL("main", "u" + View.CUser.img);
			this._root.getChild("img").onClick(this, this.OnImageBtnClick);
		}

		public Exit(): void {
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private OnImageBtnClick(e: laya.events.Event): void {
			this._owner.panelIndex = 5;
		}
	}
}