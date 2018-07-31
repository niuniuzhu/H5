import { Protos } from "../../libs/protos";
import { WSConnector } from "../../Net/WSConnector";
import { IUIModule } from "./IUIModule";
import { ProtoCreator } from "../../Protos/ProtoHelper";
import { UIAlert } from "./UIAlert";

export class UILogin implements IUIModule {
	private _root: fairygui.GComponent;
	private _connector: WSConnector;

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/login");
	}

	public Dispose(): void {
		this._root.dispose();
		this._root = null;
	}

	public Enter(param: any): void {
		this._root = fairygui.UIPackage.createObject("login", "Main").asCom;
		fairygui.GRoot.inst.addChild(this._root);
		this._root.width = fairygui.GRoot.inst.width;
		this._root.height = fairygui.GRoot.inst.height;
		this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
		this._root.getChild("login_btn").onClick(this, this.OnLoginBtnClick);
		this._root.getChild("reg_btn").onClick(this, this.OnRegBtnClick);

		this._connector = new WSConnector();
		this._connector.onopen = ((e: Event) => {
			fairygui.GRoot.inst.closeModalWait();
		});
		this._connector.onerror = ((e: Event) => {
			fairygui.GRoot.inst.closeModalWait();
			UIAlert.Show("无法连接服务器", () => {
				this.Connect();
			});
		});
		this.Connect();
	}

	public Leave(): void {
		this._connector.Close();
		this._connector = null;
		this._root.dispose();
		this._root = null;
	}

	public Update(deltaTime: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	private Connect(): void {
		fairygui.GRoot.inst.showModalWait();
		this._connector.Connect("localhost", 49996);
	}

	private OnLoginBtnClick(): void {
		let login = ProtoCreator.Q_GC2LS_AskLogin();
		// login.packet = new Protos.Packet();
		// login.packet.pid = 1;
		login.uin = "1";
		fairygui.GRoot.inst.showModalWait();
		this._connector.Send(Protos.GC2LS_AskLogin, login, ((message) => {
			let loginResult: Protos.LS2GC_Result = <Protos.LS2GC_Result>message;
			RC.Logger.Log(loginResult.result);
			fairygui.GRoot.inst.closeModalWait();
		}).bind(this));

		// let login=new Protos.GCToLS.AskLogin();
		// Protos.GCToLS.AskLogin.encode(login).finish();

		// Protos.GCToLS.AskLogin.decode(data)


		// let param = new Shared.Model.BattleParams();
		// param.framesPerKeyFrame = 4;
		// param.frameRate = 20;
		// param.uid = "user";
		// param.id = "m0";
		// param.rndSeed = RC.Utils.Timer.utcTime;

		// let building = new Shared.Model.Building();
		// building.uid = "user";
		// building.id = "b0";

		// param.buildings = [building];

		// View.UI.UIManager.EnterBattle(param);
	}

	private OnRegBtnClick(): void {
		let regName = this._root.getChild("reg_name").asTextField.text;
		if (regName == "") {
			UIAlert.Show("无效用户名");
			return;
		}
		let regPwd = this._root.getChild("reg_password").asTextField.text;
		if (regPwd == "") {
			UIAlert.Show("无效密码");
			return;
		}
		let register = ProtoCreator.Q_GC2LS_AskRegister();
		register.name = regName;
		register.passwd = regPwd;
		register.platform = 0;
		register.sdk = 0;

		fairygui.GRoot.inst.showModalWait();
		this._connector.Send(Protos.GC2LS_AskRegister, register, ((message) => {
			let resp: Protos.LS2GC_Result = <Protos.LS2GC_Result>message;
			switch (resp.result) {
				case Protos.LS2GC_Result.EResult.Success:
					UIAlert.Show("注册成功");
					this._root.getChild("name").asTextField.text = regName;
					this._root.getChild("password").asTextField.text = regPwd;
					break;
				case Protos.LS2GC_Result.EResult.Failed:
					UIAlert.Show("注册失败");
					break;
				case Protos.LS2GC_Result.EResult.UsernameExists:
					UIAlert.Show("用户名已存在");
					break;
				case Protos.LS2GC_Result.EResult.IllegalName:
					UIAlert.Show("无效用户名");
					break;
				case Protos.LS2GC_Result.EResult.IllegalPasswd:
					UIAlert.Show("无效密码");
					break;
			}
			fairygui.GRoot.inst.closeModalWait();
		}).bind(this));
	}
}