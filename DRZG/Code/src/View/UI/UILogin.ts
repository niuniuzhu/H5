namespace View.UI {
	export class UILogin implements IUIModule {
		private _root: fairygui.GComponent;

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/login");
		}

		public Dispose(): void {
			this._root.dispose();
			this._root = null;
		}

		public Enter(param: any): void {
			this._root = fairygui.UIPackage.createObject("login", "Main").asCom;
			this._root.getChild("login_btn").onClick(this, this.OnLoginBtnClick);
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
			this._root.getChild("reg_btn").onClick(this,this.OnRegBtnClick);
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
			let param = new Shared.Model.BattleParams();
			param.framesPerKeyFrame = 4;
			param.frameRate = 20;
			param.uid = "user";
			param.id = "m0";
			param.rndSeed = RC.Utils.Timer.utcTime;

			let building = new Shared.Model.Building();
			building.uid = "user";
			building.id = "b0";

			param.buildings = [building];

			View.UI.UIManager.EnterBattle(param);
		}

		private OnRegBtnClick(): void {
			this._root.getChild("name").asTextField.text = this._root.getChild("reg_name").asTextField.text;
			this._root.getChild("password").asTextField.text = this._root.getChild("reg_password").asTextField.text;
		}
	}
}