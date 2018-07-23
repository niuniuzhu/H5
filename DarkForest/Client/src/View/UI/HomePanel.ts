import { UIMain } from "./UIMain";
import { IMainPanel } from "./IMainPanel";
import { CUser } from "../CUser";
import { Home } from "../Home";
import { BaseEvent } from "../../Shared/Event/BaseEvent";
import { EventCenter } from "../../Shared/Event/EventCenter";
import { UIEvent } from "../../Shared/Event/UIEvent";
import { BattleParams } from "../../Shared/Model/EntityParam";

export class HomePanel implements IMainPanel {
	private _owner: UIMain;
	private _root: fairygui.GComponent;
	private _buildPanel: fairygui.GComponent;
	private _home: Home;
	private _mine: fairygui.GTextField;
	private _energy: fairygui.GTextField;
	private _power: fairygui.GTextField;
	private _atk: fairygui.GTextField;
	private _def: fairygui.GTextField;

	constructor(owner: UIMain, param: BattleParams) {
		this._owner = owner;
		this._root = owner.root.getChild("c0").asCom;

		this._mine = this._root.getChild("mine").asTextField;
		this._energy = this._root.getChild("energy").asTextField;
		this._power = this._root.getChild("power").asTextField;
		this._atk = this._root.getChild("atk").asTextField;
		this._def = this._root.getChild("def").asTextField;
		this.UpdateResources();

		let tansuoBtn = this._root.getChild("tansuo_btn");
		tansuoBtn.onClick(this, (e) => { this._owner.panelIndex = 1 });

		let juseBtn = this._root.getChild("juse_btn");
		juseBtn.onClick(this, (e) => { this._owner.panelIndex = 3 });

		let renwuBtn = this._root.getChild("renwu_btn");
		renwuBtn.onClick(this, (e) => { this._owner.panelIndex = 4 });

		let xiaoxiBtn = this._root.getChild("xiaoxi_btn");
		xiaoxiBtn.onClick(this, (e) => { this._owner.panelIndex = 5 });

		let jiansheBtn = this._root.getChild("jianshe_btn");
		jiansheBtn.onClick(this, (e) => {
			if (this._buildPanel == null) {
				this._buildPanel = fairygui.UIPackage.createObject("battle", "buildPanel").asCom;
				this._buildPanel.getChild("list").on(fairygui.Events.CLICK_ITEM, this, this.OnBuildItemClick);
			}
			fairygui.GRoot.inst.togglePopup(this._buildPanel, fairygui.GRoot.inst);
			this._buildPanel.center();
		});

		EventCenter.AddListener(UIEvent.START_LAYOUT, this.HandleStartLayout.bind(this));
		EventCenter.AddListener(UIEvent.END_LAYOUT, this.HandleEndLayout.bind(this));
		EventCenter.AddListener(UIEvent.UPDATE_BUILDING, this.HandleUpdateBuilding.bind(this));

		this._home = new Home(param);
		this._home.SetGraphicRoot(this._root.getChild("n37").asCom);
	}

	public Dispose(): void {
		EventCenter.RemoveListener(UIEvent.START_LAYOUT, this.HandleStartLayout.bind(this));
		EventCenter.RemoveListener(UIEvent.END_LAYOUT, this.HandleEndLayout.bind(this));
		EventCenter.RemoveListener(UIEvent.UPDATE_BUILDING, this.HandleUpdateBuilding.bind(this));

		if (this._buildPanel != null) {
			this._buildPanel.dispose();
			this._buildPanel = null;
		}
		this._home.Dispose();
	}

	public Enter(): void {
		this.UpdateResources();
	}

	public Exit(): void {
	}

	public Update(deltaTime: number): void {
		this._home.Update(deltaTime);
	}

	public OnResize(e: laya.events.Event): void {
		this._home.OnResize(e);
	}

	private OnBuildItemClick(sender: fairygui.GObject, e: laya.events.Event): void {
		let bid = sender.asCom.name;
		let worldPoint = this._home.camera.ScreenToWorld(new RC.Numerics.Vec3(e.stageX, e.stageY));
		this._home.NewBuilding(bid, worldPoint);
		fairygui.GRoot.inst.hidePopup();
	}

	private HandleStartLayout(e: BaseEvent): void {
		this._root.getController("c1").selectedIndex = 1;
		this._root.getChild("jianshe_btn").asCom.touchable = false;
	}

	private HandleEndLayout(e: BaseEvent): void {
		this._root.getController("c1").selectedIndex = 0;
		this._root.getChild("jianshe_btn").asCom.touchable = true;
	}

	private HandleUpdateBuilding(e: BaseEvent): void {
		this.UpdateResources();
	}

	private UpdateResources(): void {
		this._mine.text = CUser.mine.toString();
		this._energy.text = CUser.energy.toString();
		this._power.text = CUser.power.toString();
		this._atk.text = CUser.atk.toString();
		this._def.text = CUser.def.toString();
	}

	public SetImage(id: string): void {
		this._root.getChild("juse_btn").asCom.getChild("n1").asLoader.url = fairygui.UIPackage.getItemURL("battle", id);
	}

	public SetName(name: string): void {
		this._root.getChild("juse_btn").asCom.getChild("n0").asTextField.text = name;
	}
}