namespace View.UI {
	export class UserInfoPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;
		private _popup: fairygui.GComponent;
		private _img: fairygui.GButton;
		private _input: fairygui.GTextInput;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c5").asCom;
			this._popup = fairygui.UIPackage.createObject("main", "img_selector").asCom;
			this._img = this._root.getChild("img").asButton;
			this._img.onClick(this, this.OnImageBtnClick);
			let imgList = this._popup.getChild("n1").asList;
			imgList.on(fairygui.Events.CLICK_ITEM, this, this.OnListItemClick);
			this._input= this._root.getChild("name").asTextInput;
			this._input.on(laya.events.Event.INPUT, this, this.OnNameChanged);
		}

		public Dispose(): void {
			this._popup.dispose();
		}

		public Enter(): void {
			this._root.getChild("name").asTextField.text = View.CUser.uname;
			this._root.getChild("lvl").asTextField.text = "" + View.CUser.lvl;
			this._root.getChild("exp").asTextField.text = "" + View.CUser.exp;
			this._root.getChild("atk").asTextField.text = "" + View.CUser.atk;
			this._img.icon = fairygui.UIPackage.getItemURL("main", "u" + View.CUser.img);
		}

		public Exit(): void {
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private OnImageBtnClick(e: laya.events.Event): void {
			fairygui.GRoot.inst.showPopup(this._popup, this._img);
		}

		private OnListItemClick(sender: fairygui.GObject, e: laya.events.Event): void {
			let id = sender.asCom.name;
			View.CUser.img = Number.parseInt(id);
			this._img.icon = fairygui.UIPackage.getItemURL("main", "u" + View.CUser.img);
			fairygui.GRoot.inst.hidePopup();
		}

		private OnNameChanged(e: laya.events.Event): void {
			if (this._input.text == "") {
				this._input.text = View.CUser.uname;
				return;
			}
			View.CUser.uname = this._input.text;
		}
	}
}