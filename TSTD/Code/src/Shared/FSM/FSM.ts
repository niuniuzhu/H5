namespace Shared.FSM {
	export class FSM {
		private _previousState: FSMState;
		private _globalState: FSMState;
		private _currState: FSMState;
		private _owner: any;
		private _enabled: boolean;
		private _parent: FSM;
		private _isRunning: boolean;
		private _disposed: boolean;
		private readonly _states: RC.Collections.Dictionary<number, FSMState>;
		private readonly _subFSMList: FSM[];

		public get previousState(): FSMState { return this._previousState }
		public get globalState(): FSMState { return this._globalState }
		public get currState(): FSMState { return this._currState }
		public get owner(): any { return this._owner; }
		public get enabled(): boolean { return this._enabled; }
		public set enabled(value: boolean) {
			if (this._enabled == value)
				return;
			this._enabled = value;
			if (this._enabled)
				this.OnEnable();
			else
				this.OnDisable();
		}
		public get parent(): FSM { return this._parent; }
		public get isRunning(): boolean { return this._isRunning; }
		public get disposed(): boolean { return this._disposed; }


		constructor(owner: any) {
			this._states = new RC.Collections.Dictionary<number, FSMState>();
			this._subFSMList = [];
			this._owner = owner;
			this.enabled = true;
		}

		private OnEnable(): void {
			for (let subFSM of this._subFSMList)
				subFSM.OnEnable();
		}

		private OnDisable(): void {
			for (let subFSM of this._subFSMList)
				subFSM.OnDisable();
		}

		public Start(): void {
			if (this._isRunning)
				return;

			this._isRunning = true;

			for (let subFSM of this._subFSMList)
				subFSM.Start();

			if (this._globalState != null)
				this._globalState.Enter(null);
		}

		public Stop(): void {
			if (!this._isRunning)
				return;

			this._isRunning = false;

			if (this._globalState != null)
				this._globalState.Exit();
			if (this._currState != null)
				this._currState.Exit();

			for (let subFSM of this._subFSMList)
				subFSM.Stop();
		}

		/// <summary>
		/// 创建状态
		/// </summary>
		/// <param name="type">类型</param>
		/// <returns>被创建的状态</returns>
		public CreateState(type: number): FSMState {
			if (this._states.containsKey(type))
				console.error(`Specified name '${type}' of component already exists`);

			let state = new FSMState(type, this);
			this._states.setValue(type, state);

			return state;
		}

		/// <summary>
		/// 销毁状态
		/// </summary>
		/// <param name="type">类型</param>
		public DestroyState(type: number): void {
			this._states.remove(type);
		}

		/// <summary>
		/// 创建全局状态
		/// </summary>
		/// <param name="type">类型</param>
		/// <returns>全局状态</returns>
		public CreateGlobalState(type: number): FSMState {
			if (this.globalState != null)
				console.error("A global state already exist.");

			if (this._states.containsKey(type))
				console.error(`Specified name '${type}' of component already exists`);

			this._globalState = new FSMState(type, this);
			if (this._isRunning)
				this._globalState.Enter(null);
			return this._globalState;
		}

		public DestroyGlobalState(): void {
			this._globalState = null;
		}

		/// <summary>
		/// 状态转换
		/// </summary>
		/// <param name="type">指定需要转换的状态</param>
		/// <param name="force">是否强制转换(即需要转换的状态是当前状态的情况下仍然转换)</param>
		/// <param name="param">参数</param>
		public ChangeState(type: number, force: boolean = false, ...param: any[]): boolean {
			let state = this._states.getValue(type);
			if (state != null)
				return this.InternalChangeState(state, force, param);

			console.warn(`State '${type}' not exist.`);
			return false;
		}

		private InternalChangeState(state: FSMState, force: boolean = false, param: any[] = null): boolean {
			if (!force && this._currState == state)
				return false;

			this._previousState = this._currState;
			if (this._currState != null)
				this._currState.Exit();

			this._currState = state;
			if (this._currState != null)
				this._currState.Enter(param);

			return true;
		}

		public RevertToPreviousState(): void {
			if (this._previousState != null)
				this.InternalChangeState(this._previousState);
		}

		/// <summary>
		/// 创建子状态机
		/// </summary>
		/// <param name="subFSM"></param>
		/// <returns>子状态机</returns>
		public AddSubFSM(subFSM: FSM): void {
			subFSM._owner = this._owner;
			subFSM._parent = this;
			subFSM.enabled = this._enabled;
			this._subFSMList.push(subFSM);
		}

		/// <summary>
		/// 销毁所有子状态机
		/// </summary>
		public DestroyAllSubFSM(): void {
			this._subFSMList.splice(0);
		}

		/// <summary>
		/// 销毁子状态机
		/// </summary>
		public DestroySubFSM(subFSM: FSM): void {
			this._subFSMList.splice(this._subFSMList.indexOf(subFSM), 1);
		}

		/// <summary>
		/// 获取子状态机数量
		/// </summary>
		public SubFSMCount(): number {
			return this._subFSMList.length;
		}

		public GetSubFsm(index: number): FSM {
			return this._subFSMList[index];
		}

		/// <summary>
		/// 获取指定名称的状态
		/// </summary>
		/// <param name="type">类型</param>
		/// <returns>状态</returns>
		public GetState(type: number): FSMState {
			return this._states.getValue(type);
		}

		/// <summary>
		/// 获取状态数量
		/// </summary>
		/// <returns>状态数量</returns>
		public StateCount(): number {
			return this._states.size();
		}

		public Update(context: Shared.UpdateContext): void {
			if (!this._isRunning || !this._enabled)
				return;
			if (this._globalState != null)
				this._globalState.Update(context);
			if (this._currState != null)
				this._currState.Update(context);
			for (let subFSM of this._subFSMList)
				subFSM.Update(context);
		}
	}
}