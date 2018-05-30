namespace View.UI {
	export class ZCPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c0").asCom;

			let hp = Math.floor(Math.random() * 10000 + 3000);
			let exp = Math.floor(Math.random() * 10000 + 3000);
			this._root.getChild("lvl").asTextField.text = "" + Math.floor(Math.random() * 30 + 5);
			this._root.getChild("hp").asTextField.text = `${hp}/${hp}`;
			this._root.getChild("exp").asTextField.text = `${exp}/${exp}`;
			this._root.getChild("atk").asTextField.text = "" + Math.floor(Math.random() * 10000 + 3000);
			this._root.getChild("n34").asProgress.max = hp;
			this._root.getChild("n34").asProgress.value = hp;
			this._root.getChild("n37").asProgress.max = exp;
			this._root.getChild("n37").asProgress.value = exp;
			this._root.getChild("n33").onClick(this, this.OnImageBtnClick);
		}

		public Dispose(): void {
		}

		public Enter(): void {
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