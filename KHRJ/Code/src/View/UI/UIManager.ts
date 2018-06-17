namespace View.UI {
	export class UIManager {
		private static _login: UILogin;
		private static _main: UIMain;
		private static _camp: UICamp;
		private static _level: UILevel;
		private static _currModule: IUIModule;

		public static get login(): UILogin { return this._login; }
		public static get main(): UIMain { return this._main; }
		public static get camp(): UICamp { return this._camp; }
		public static get level(): UILevel { return this._level; }

		public static Init(resolution: RC.Numerics.Vec2): void {
			fairygui.UIPackage.addPackage("res/ui/global");
			fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "qtm011");
			fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "qtm011");
			fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");

			this._login = new UILogin();
			this._main = new UIMain();
			this._camp = new UICamp();
			this._level = new UILevel();
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

		public static OnResize(e: laya.events.Event): any {
			if (this._currModule != null)
				this._currModule.OnResize(e);
		}

		private static EnterModule(module: IUIModule, ...param: any[]): void {
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

		public static EnterMain(): void {
			this.EnterModule(this._main);
		}

		public static EnterCamp(): void {
			this.EnterModule(this._camp);
		}

		public static EnterLevel(index: number): void {
			this.EnterModule(this._level, index);
		}
	}
}