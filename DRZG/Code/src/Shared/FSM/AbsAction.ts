namespace Shared.FSM {
	export class AbsActionAbsAction implements IAction {
		private _enabled: boolean;

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

		public state: FSMState;

		protected OnEnable(): void {
		}

		protected OnDisable(): void {
		}

		public Enter(param: any[]): void {
			if (!this._enabled) return;
			this.OnEnter(param);
		}

		public Exit(): void {
			if (!this._enabled) return;
			this.OnExit();
		}

		public Update(context: Shared.UpdateContext): void {
			if (!this.enabled) return;
			this.OnUpdate(context);
		}

		protected OnEnter(param: any[]): void {
		}

		protected OnExit(): void {
		}

		protected OnUpdate(context: Shared.UpdateContext): void {
		}
	}
}