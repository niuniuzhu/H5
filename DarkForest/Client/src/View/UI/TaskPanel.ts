import { CUser } from "../CUser";
import { IMainPanel } from "./IMainPanel";
import { UIMain } from "./UIMain";
import { UIEvent } from "../../Shared/Event/UIEvent";
import { EventCenter } from "../../Shared/Event/EventCenter";
import { BaseEvent } from "../../Shared/Event/BaseEvent";
import { Defs } from "../../Shared/Defs";

export class TaskPanel implements IMainPanel {
	private _owner: UIMain;
	private _root: fairygui.GComponent;
	private _atk: fairygui.GTextField;
	private _def: fairygui.GTextField;

	constructor(owner: UIMain) {
		this._owner = owner;
		this._root = owner.root.getChild("c4").asCom;
		this._atk = this._root.getChild("atk").asTextField;
		this._def = this._root.getChild("def").asTextField;

		let backBtn = this._root.getChild("back_btn");
		backBtn.onClick(this, (e) => { this._owner.panelIndex = 0 });

		EventCenter.AddListener(UIEvent.UPDATE_BUILDING, this.HandleUpdateBuilding.bind(this));
	}

	public Dispose(): void {
		EventCenter.RemoveListener(UIEvent.UPDATE_BUILDING, this.HandleUpdateBuilding.bind(this));
	}

	public Enter(): void {
		let tasksDef = Defs.GetTask();
		let list = this._root.getChild("list").asList;
		for (let taskDef of tasksDef) {
			let com = list.addItemFromPool().asCom;
			com.getChild("n6").asTextField.text = taskDef;
		}
	}

	public Exit(): void {
		let list = this._root.getChild("list").asList;
		list.removeChildrenToPool();
	}

	public Update(deltaTime: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	private HandleUpdateBuilding(e: BaseEvent): void {
		this.UpdateResources();
	}

	private UpdateResources(): void {
		this._atk.text = CUser.atk.toString();
		this._def.text = CUser.def.toString();
	}
}