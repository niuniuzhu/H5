import { Home } from "./Home";
import { CBuilding } from "./CBuilding";
import { EditingBuilding } from "./EditingBuilding";
import { UpdateContext } from "./UpdateContext";

export interface IInputState {
	Enter(param: any[]): void;
	Exit(): void;
	Update(context: UpdateContext): void;
}

export class InputIdleState implements IInputState {
	private static readonly TOUCH_TIME_TO_EDIT_MODE: number = 500;
	private static readonly TOUCHING_DISTANCE_THRESHOLD: number = 40 * 40;
	private readonly _owner: Input;
	private _touchTime: number;
	private _touchingBuilding: CBuilding;
	private _lastTouchPoint: RC.Numerics.Vec3;

	constructor(owner: Input) {
		this._owner = owner;
		this._lastTouchPoint = RC.Numerics.Vec3.zero;
	}

	public Enter(param: any[]): void {
		this._owner.battle.graphic.sprite.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
		this._touchingBuilding = null;
	}

	public Exit(): void {
		this._owner.battle.graphic.sprite.displayObject.off(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
		fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
		fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
	}

	public Update(context: UpdateContext): void {
		if (this._touchingBuilding != null) {
			this._touchTime += context.deltaTime;
			if (this._touchTime >= InputIdleState.TOUCH_TIME_TO_EDIT_MODE) {
				let touchPoing = new RC.Numerics.Vec3(Laya.stage.mouseX, Laya.stage.mouseY, 0);
				if (RC.Numerics.Vec3.DistanceSquared(touchPoing, this._lastTouchPoint) < InputIdleState.TOUCHING_DISTANCE_THRESHOLD) {
					this._owner.ChangeState(InputStateType.Layout, this._touchingBuilding, touchPoing, false);
					this.OnTouchEnd(null);
				}
			}
		}
	}

	private OnTouchBegin(evt: laya.events.Event): any {
		fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
		fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);

		this._owner.battle.camera.BeginMove(new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY));
		let touchPoint = new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0);
		this._lastTouchPoint.CopyFrom(touchPoint);

		let worldPoint = this._owner.battle.camera.ScreenToWorld(touchPoint);
		let building = this._owner.battle.tile.GetBuilding(worldPoint);
		if (building != null) {
			this._touchingBuilding = building;
			this._touchTime = 0;
		}
	}

	private OnTouchMove(evt: laya.events.Event): any {
		let point = new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY);
		this._owner.battle.camera.Move(point);
		// let p2 = this._owner.battle.camera.ScreenToWorld(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
		// let p1 = this._owner.battle.tile.WorldToTile(p2);
		// console.log(`p0:${p2.ToString()}\np1:${p1.ToString()}`);
	}

	private OnTouchEnd(evt: laya.events.Event): any {
		this._touchingBuilding = null;
		fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
		fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
	}
}

export class InputLayoutState implements IInputState {
	private readonly _owner: Input;
	private _editingBuilding: EditingBuilding;
	private _dragingBuilding: boolean;
	private _touchMovied: boolean;
	private _startDragPoint: RC.Numerics.Vec3;
	private _startDragPosition: RC.Numerics.Vec3;

	constructor(owner: Input) {
		this._owner = owner;
		this._startDragPoint = RC.Numerics.Vec3.zero;
		this._startDragPosition = RC.Numerics.Vec3.zero;
	}

	public Enter(param: any[]): void {
		this._owner.battle.NotifyStartLayout();
		this._owner.battle.graphic.sprite.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
		this._dragingBuilding = false;
		this._touchMovied = false;

		let srcBuilding = <CBuilding>param[0];
		let touchPoint = <RC.Numerics.Vec3>param[1];
		let isNew = <boolean>param[2];

		this._editingBuilding = this._owner.battle.CreateEditingBuilding(srcBuilding.id);
		this._editingBuilding.Steup(srcBuilding, isNew);
		if (touchPoint) {
			this.TouchBegin(touchPoint);
		}
	}

	public Exit(): void {
		this._owner.battle.graphic.sprite.displayObject.off(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
		fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
		fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
		this._owner.battle.NotifyEndLayout();
		this._owner.battle.NotifyUpdateBuilding();
	}

	public Update(context: UpdateContext): void {
	}

	private TouchBegin(touchPoint: RC.Numerics.Vec3): void {
		fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
		fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);

		let worldPoint = this._owner.battle.camera.ScreenToWorld(touchPoint);
		let tilePoint = this._owner.battle.tile.WorldToLocal(worldPoint);
		if (this._editingBuilding.ContainsPoint(tilePoint)) {
			this._dragingBuilding = true;
			this._startDragPoint.CopyFrom(worldPoint);
			this._startDragPosition.CopyFrom(this._editingBuilding.position);
		}
		else
			this._owner.battle.camera.BeginMove(new RC.Numerics.Vec3(touchPoint.x, 0, -touchPoint.y));
	}

	private OnTouchBegin(evt: laya.events.Event): any {
		this.TouchBegin(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
	}

	private OnTouchMove(evt: laya.events.Event): any {
		this._touchMovied = true;
		if (this._dragingBuilding) {
			let currPoint = this._owner.battle.camera.ScreenToWorld(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
			let delta = RC.Numerics.Vec3.Sub(currPoint, this._startDragPoint);
			this._editingBuilding.position = RC.Numerics.Vec3.Add(this._startDragPosition, delta);
			this._editingBuilding.SnapToTile();
		}
		else {
			let screenPoint = new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY);
			this._owner.battle.camera.Move(screenPoint);
		}
	}

	private OnTouchEnd(evt: laya.events.Event): any {
		fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
		fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);

		if (this._dragingBuilding) {
			this._dragingBuilding = false;
			this._touchMovied = false;
			let worldPoint = this._owner.battle.camera.ScreenToWorld(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
			if (this._editingBuilding.Apply()) {
				this._editingBuilding = null;
				this._owner.ChangeState(InputStateType.Idle);
			}
			else {
			}
		} else {
			if (!this._touchMovied) {
				this._editingBuilding.Cancel();
				this._owner.ChangeState(InputStateType.Idle);
			}
			this._touchMovied = false;
		}
	}
}

export enum InputStateType {
	Idle = 0,
	Layout = 1
}

export class Input {
	private readonly _owner: Home;
	private readonly _states: IInputState[];
	private _currentState: IInputState;

	public get battle(): Home { return this._owner; }

	constructor(owner: Home) {
		this._owner = owner;
		this._states = [
			new InputIdleState(this),
			new InputLayoutState(this)
		]
		this.ChangeState(InputStateType.Idle);
	}

	public ChangeState(type: InputStateType, ...param: any[]): void {
		if (this._currentState != null)
			this._currentState.Exit();
		this._currentState = this._states[type];
		this._currentState.Enter(param);
	}

	public Update(context: UpdateContext): void {
		if (this._currentState != null)
			this._currentState.Update(context);
	}
}