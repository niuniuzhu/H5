namespace Shared.FSM {
	export class FSMState {
		private readonly _type: number;
		private readonly _fsm: FSM;
		private readonly _actions: IAction[];
		private readonly _typeToAction: RC.Collections.Dictionary<new () => IAction, IAction>;

		public get type(): number { return this._type; }
		public get fsm(): FSM { return this._fsm; }

		constructor(type: number, fsm: FSM) {
			this._actions = [];
			this._typeToAction = new RC.Collections.Dictionary<new () => IAction, IAction>();
			this._type = type;
			this._fsm = fsm;
		}

		public Enter(param: any[]): void {
			for (let action of this._actions)
				action.Enter(param);
		}

		public Exit(): void {
			for (let action of this._actions)
				action.Exit();
		}

		public Update(context: Shared.UpdateContext): void {
			for (let action of this._actions)
				action.Update(context);
		}

		public CreateAction<T extends IAction>(c: new () => T): T {
			let action = new c();
			action.state = this;
			this._actions.push(action);
			this._typeToAction.setValue(c, action);
			return action;
		}

		public GetAction<T extends IAction>(c: new () => T): T {
			return <T>this._typeToAction.getValue(c);
		}

		public DestroyAction<T extends IAction>(c: new () => T): void {
			let action = this._typeToAction.remove(c);
			this._actions.splice(this._actions.indexOf(action), 1);
		}
	}
}