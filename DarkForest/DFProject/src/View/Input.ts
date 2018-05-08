namespace View {
	export interface IInputState {
		Enter(): void;
		Exit(): void;
		Update(context: Shared.UpdateContext): void;
	}

	export class InputIdleState implements IInputState {
		private _owner: Input;

		constructor(owner: Input) {
			this._owner = owner;
		}

		public Enter(): void {
			this._owner.battle.graphic.sprite.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
		}

		public Exit(): void {
			this._owner.battle.graphic.sprite.displayObject.off(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
		}

		public Update(context: Shared.UpdateContext): void {
		}

		private OnTouchBegin(evt: laya.events.Event): any {
			fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
			fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
			this._owner.battle.camera.BeginMove(new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY));
		}

		private OnTouchMove(evt: laya.events.Event): any {
			let point = new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY);
			this._owner.battle.camera.Move(point);
		}

		private OnTouchEnd(evt: laya.events.Event): any {
			fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
			fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
		}
	}

	export class InputLayoutState implements IInputState {
		private _owner: Input;

		constructor(owner: Input) {
			this._owner = owner;
		}

		public Enter(): void {
			fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
		}

		public Exit(): void {
			fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
		}

		public Update(context: Shared.UpdateContext): void {
		}

		private OnTouchMove(evt: laya.events.Event): any {
			let point = this._owner.battle.camera.ScreenToWorld(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
			let p1 = this._owner.battle.tile.WorldToTile(point);
			let x = RC.Numerics.MathUtils.Floor(p1.x);
			let y = RC.Numerics.MathUtils.Floor(p1.z);
			// console.log(`p0:${point.ToString()}\np1:${x},${y}`);
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

		public ChangeState(type: InputStateType): void {
			if (this._currentState != null)
				this._currentState.Exit();
			this._currentState = this._states[type];
			this._currentState.Enter();
		}

		public Update(context: Shared.UpdateContext): void {
			if (this._currentState != null)
				this._currentState.Update(context);
		}
	}
}