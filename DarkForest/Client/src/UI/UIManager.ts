import { IUIModule } from "./IUIModule";
import { UILogin } from "./UILogin";
import { UIMain } from "./UIMain";
import { BattleParams } from "../Shared/Model/EntityParam";

export class UIManager {
	private static _login: UILogin;
	private static _main: UIMain;
	private static _currModule: IUIModule;

	public static get login(): UILogin { return this._login; }

	public static get battle(): UIMain { return this._main; }

	public static Init(resolution: RC.Numerics.Vec2): void {
		Laya.stage.addChild(fairygui.GRoot.inst.displayObject);

		fairygui.UIPackage.addPackage("res/ui/global");
		fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
		fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
		fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");

		this._login = new UILogin();
		this._main = new UIMain();
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

	public static EnterBattle(param: BattleParams): void {
		this.EnterModule(this._main, param);
	}
}