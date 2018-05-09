namespace View {
	export interface IInputState {
		Enter(param: any[]): void;
		Exit(): void;
		Update(context: Shared.UpdateContext): void;
	}

	export class InputIdleState implements IInputState {
		private static readonly TOUCH_TIME_TO_EDIT_MODE: number = 300;
		private readonly _owner: Input;
		private _touchTime: number;
		private _touchingBuilding: CBuilding;

		constructor(owner: Input) {
			this._owner = owner;
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

		public Update(context: Shared.UpdateContext): void {
			if (this._touchingBuilding != null) {
				this._touchTime += context.deltaTime;
				if (this._touchTime >= InputIdleState.TOUCH_TIME_TO_EDIT_MODE) {
					this._owner.ChangeState(InputStateType.Layout, this._touchingBuilding,
						new RC.Numerics.Vec3(Laya.stage.mouseX, Laya.stage.mouseY, 0));
					this.OnTouchEnd(null);
				}
			}
		}

		private OnTouchBegin(evt: laya.events.Event): any {
			fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
			fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
			this._owner.battle.camera.BeginMove(new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY));

			let worldPoint = this._owner.battle.camera.ScreenToWorld(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
			let building = this._owner.battle.tile.GetBuilding(worldPoint);
			if (building != null) {
				this._touchingBuilding = building;
				this._touchTime = 0;
			}
		}

		private OnTouchMove(evt: laya.events.Event): any {
			this._touchingBuilding = null;
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
		private _editingBuilding: CBuilding;
		private _dragingBuilding: boolean;
		private _touchMovied: boolean;

		constructor(owner: Input) {
			this._owner = owner;
		}

		public Enter(param: any[]): void {
			this._owner.battle.graphic.sprite.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
			this._dragingBuilding = false;
			this._touchMovied = false;
			this._editingBuilding = <CBuilding>param[0];
			this._editingBuilding.disableTransformLerp = true;
			this._editingBuilding.graphic.alpha = 0.6;
			let touchPoint = <RC.Numerics.Vec3>param[1];
			if (touchPoint) {
				this.TouchBegin(touchPoint);
			}
			this._owner.battle.tile.RemoveBuilding(this._editingBuilding);
		}

		public Exit(): void {
			this._owner.battle.graphic.sprite.displayObject.off(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
			fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
			fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
		}

		public Update(context: Shared.UpdateContext): void {
		}

		private TouchBegin(touchPoint: RC.Numerics.Vec3): void {
			fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
			fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
			// 是否点在建筑物上
			let worldPoint = this._owner.battle.camera.ScreenToWorld(touchPoint);
			let building = this._owner.battle.tile.GetBuilding(worldPoint);
			if (building == this._editingBuilding) {
				this._dragingBuilding = true;
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
				let worldPoint = this._owner.battle.camera.ScreenToWorld(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
				worldPoint = this._owner.battle.tile.WorldToTile(worldPoint);
				worldPoint = this._owner.battle.tile.TileToWorld(worldPoint);
				this._editingBuilding.position = worldPoint;
			}
			else {
				let screenPoint = new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY);
				this._owner.battle.camera.Move(screenPoint);
			}
		}

		private OnTouchEnd(evt: laya.events.Event): any {
			this._touchMovied = false;
			if (this._dragingBuilding) {
				let worldPoint = this._owner.battle.camera.ScreenToWorld(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
				let building = this._editingBuilding;
				this._editingBuilding.graphic.alpha = 1;
				this._editingBuilding = null;
				if (this._owner.battle.tile.SetBuilding(building)) {
					this._owner.ChangeState(InputStateType.Idle);
				}
			} else {
				if (!this._touchMovied) {
					console.log("back");
					this._owner.ChangeState(InputStateType.Idle);
				}
			}
		}
	}

	export enum InputStateType {
		Idle = 0,
		Layout = 1
	}

	export class Input {
		private readonly _battle: CBattle;
		private readonly _states: IInputState[];
		private _currentState: IInputState;

		public get battle(): CBattle { return this._battle; }

		constructor(battle: CBattle) {
			this._battle = battle;
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

		public Update(context: Shared.UpdateContext): void {
			if (this._currentState != null)
				this._currentState.Update(context);
		}
	}
}