namespace View.UI {
	export class UIManager {
		private static _login: UILogin;
		private static _battle: UIBattle;
		private static _currModule: IUIModule;

		public static get login(): UILogin { return this._login; }

		public static get battle(): UIBattle { return this._battle; }

		public static Init(resolution: RC.Numerics.Vec2): void {
			Laya.stage.addChild(fairygui.GRoot.inst.displayObject);

			fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "ModalWaiting");
			fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "ModalWaiting");
			fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");

			this._login = new UILogin();
			this._battle = new UIBattle();
		}

		public static Dispose(): void {
			if (this._currModule != null) {
				this._currModule.Leave();
				this._currModule = null;
			}
		}

		public static Update(deltaTime: number): void {
			if (this._currModule != null)
				this._currModule.Update(deltaTime);
		}

		private static EnterModule(module: IUIModule, param?: any): void {
			if (this._currModule != null)
				this._currModule.Leave();
			module.Enter(param);
			this._currModule = module;
		}

		public static LeaveModule(): void {
			if (this._currModule != null)
				this._currModule.Leave();
			this._currModule = null;
		}

		public static EnterLogin(): void {
			this.EnterModule(this._login);
		}

		public static EnterBattle(param: Logic.BattleParams): void {
			this.EnterModule(this._battle, param);
		}
	}
}