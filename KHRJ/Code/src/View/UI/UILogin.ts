namespace View.UI {
	export class UILogin implements IUIModule {
		private readonly _root: fairygui.GComponent;

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/login");

			this._root = fairygui.UIPackage.createObject("login", "Main").asCom;
			this._root.getChild("enter_btn").onClick(this, this.OnEnterBtnClick);
			this._root.getChild("reg_btn").onClick(this, this.OnRegBtnClick);
		}

		public Dispose(): void {
			this._root.dispose();
		}

		public Enter(param?: any[]): void {
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
		}

		public Leave(): void {
			this._root.removeFromParent();
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private OnEnterBtnClick(): void {
			UIManager.EnterMain();
		}

		private OnRegBtnClick(): void {
			this._root.getChild("name").asTextField.text = this._root.getChild("reg_name").asTextField.text;
			this._root.getChild("password").asTextField.text = this._root.getChild("reg_password").asTextField.text;
		}
	}
}