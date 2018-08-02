import { Protos } from "../../libs/protos";
import { WSConnector } from "../../Net/WSConnector";
import { IUIModule } from "./IUIModule";
import { ProtoCreator } from "../../Protos/ProtoHelper";
import { UIAlert } from "./UIAlert";
import Long from "../../libs/long";
import { BattleParams, Building } from "../../Shared/Model/EntityParam";
import { UIManager } from "./UIManager";

export class UILogin implements IUIModule {
	private _root: fairygui.GComponent;
	private _list: fairygui.GList;
	private _connector: WSConnector;

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/login");

		this._root = fairygui.UIPackage.createObject("login", "Main").asCom;
		this._root.width = fairygui.GRoot.inst.width;
		this._root.height = fairygui.GRoot.inst.height;
		this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
		this._root.getChild("login_btn").onClick(this, this.OnLoginBtnClick);
		this._root.getChild("reg_btn").onClick(this, this.OnRegBtnClick);
		this._root.getChild("enter_btn").onClick(this, this.OnEnterBtnClick);
		this._list = this._root.getChild("alist").asList;
		this._list.on(fairygui.Events.CLICK_ITEM, this, this.OnAreaClick);
	}

	public Dispose(): void {
		this._root.dispose();
		this._root = null;
	}

	public Enter(param: any): void {
		fairygui.GRoot.inst.addChild(this._root);

		this._connector = new WSConnector();
		this._connector.onopen = () => fairygui.GRoot.inst.closeModalWait();
		this._connector.onerror = () => {
			fairygui.GRoot.inst.closeModalWait();
			UIAlert.Show("无法连接服务器", () => this.Connect());
		};
		this._connector.onclose = () => RC.Logger.Log("connection closed.");
		this.Connect();
	}

	public Leave(): void {
		this._connector.Close();
		this._connector = null;
		fairygui.GRoot.inst.removeChild(this._root);
	}

	public Update(deltaTime: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	private Connect(): void {
		fairygui.GRoot.inst.showModalWait();
		this._connector.Connect("localhost", 49996);
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
			let resp: Protos.LS2GC_RegResult = <Protos.LS2GC_RegResult>message;
			switch (resp.result) {
				case Protos.LS2GC_RegResult.EResult.Success:
					UIAlert.Show("注册成功");
					this._root.getChild("name").asTextField.text = regName;
					this._root.getChild("password").asTextField.text = regPwd;
					this._root.getController("c1").selectedIndex = 0;
					break;
				case Protos.LS2GC_RegResult.EResult.Failed:
					UIAlert.Show("注册失败");
					break;
				case Protos.LS2GC_RegResult.EResult.UnameExists:
					UIAlert.Show("用户名已存在");
					break;
				case Protos.LS2GC_RegResult.EResult.UnameIllegal:
					UIAlert.Show("无效用户名");
					break;
				case Protos.LS2GC_RegResult.EResult.PwdIllegal:
					UIAlert.Show("无效密码");
					break;
			}
			fairygui.GRoot.inst.closeModalWait();
		}).bind(this));
	}

	private OnLoginBtnClick(): void {
		let uname = this._root.getChild("name").asTextField.text;
		if (uname == "") {
			UIAlert.Show("无效用户名");
			return;
		}
		let password = this._root.getChild("password").asTextField.text;
		if (password == "") {
			UIAlert.Show("无效密码");
			return;
		}
		let login = ProtoCreator.Q_GC2LS_AskLogin();
		login.name = uname;
		login.passwd = password;
		fairygui.GRoot.inst.showModalWait();
		this._connector.Send(Protos.GC2LS_AskLogin, login, message => {
			let resp: Protos.LS2GC_LoginResult = <Protos.LS2GC_LoginResult>message;
			switch (resp.result) {
				case Protos.LS2GC_LoginResult.EResult.Success:
					this.HandleLoginLSSuccess(resp);
					break;
				case Protos.LS2GC_LoginResult.EResult.Failed:
					UIAlert.Show("登陆失败");
					break;
				case Protos.LS2GC_LoginResult.EResult.InvalidUname:
					UIAlert.Show("无效用户名");
					break;
				case Protos.LS2GC_LoginResult.EResult.InvalidUname:
					UIAlert.Show("密码不正确");
					break;
			}
			fairygui.GRoot.inst.closeModalWait();
		});
	}

	private HandleLoginLSSuccess(loginResult: Protos.LS2GC_LoginResult): void {
		let count = loginResult.gsInfos.length;
		for (let i = 0; i < count; ++i) {
			let gsInfo = loginResult.gsInfos[i];
			let item = this._list.addItemFromPool().asButton;
			item.title = gsInfo.name;
			let sessionID: Long = <Long><any>loginResult.sessionID;
			item.data = { "data": gsInfo, "s": sessionID.toNumber() };
		}
		if (count > 0)
			this._list.selectedIndex = 0;
	}

	private OnAreaClick(): void {
	}

	private OnEnterBtnClick(): void {
		let item = this._list.getChildAt(this._list.selectedIndex);
		let data: Protos.GSInfo = <Protos.GSInfo>item.data["data"];
		this.ConnectToGS(data.ip, data.port, data.password, item.data["s"]);
	}

	private ConnectToGS(ip: string, port: number, pwd: string, sessionID: number): void {
		fairygui.GRoot.inst.showModalWait();
		this._connector.onopen = () => {
			let askLogin = ProtoCreator.Q_GC2GS_AskLogin();
			askLogin.pwd = pwd;
			askLogin.sessionID = sessionID;
			this._connector.Send(Protos.GC2GS_AskLogin, askLogin, message => {
				let resp: Protos.GS2GC_LoginResult = <Protos.GS2GC_LoginResult>message;
				switch (resp.result) {
					case Protos.GS2GC_LoginResult.EResult.Success:
						this.HandleLoginBSSuccess(resp);
						break;
					case Protos.GS2GC_LoginResult.EResult.Failed:
						UIAlert.Show("登陆失败");
						break;
				}
				fairygui.GRoot.inst.closeModalWait();
			});
		}
		this._connector.Connect(ip, port);
	}

	private HandleLoginBSSuccess(loginResult: Protos.GS2GC_LoginResult): void {
		let param = new BattleParams();
		param.framesPerKeyFrame = 4;
		param.frameRate = 20;
		param.uid = "user";
		param.id = "m0";
		param.rndSeed = RC.Utils.Timer.utcTime;

		let building = new Building();
		building.uid = "user";
		building.id = "b0";

		param.buildings = [building];

		UIManager.EnterBattle(param);
	}
}