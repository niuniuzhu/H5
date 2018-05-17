namespace View.UI {
	export class UILogin implements IUIModule {
		private _root: fairygui.GComponent;

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/login");
		}

		public Dispose(): void {
		}

		public Enter(param: any): void {
			this._root = fairygui.UIPackage.createObject("login", "Main").asCom;
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);

			this._root.getChild("login_btn").onClick(this, this.OnLoginBtnClick);
			this._root.getChild("reg_btn").onClick(this, this.OnRegBtnClick);
		}

		public Leave(): void {
			this._root.dispose();
			this._root = null;
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private OnLoginBtnClick(): void {
			UIManager.EnterMain();
		}

		private OnRegBtnClick(): void {
			this._root.getChild("name").asTextField.text = this._root.getChild("reg_name").asTextField.text;
			this._root.getChild("password").asTextField.text = this._root.getChild("reg_password").asTextField.text;
		}
	}
}