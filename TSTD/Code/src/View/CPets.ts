namespace View {
	export class CPets {
		public readonly id: string;
		public hp: number;
		public atk: number;

		private readonly _model: string;
		private readonly _dup: RC.Collections.Dictionary<string, Shared.Model.EAction>;
		private readonly _ddown: RC.Collections.Dictionary<string, Shared.Model.EAction>;
		private readonly _team: number;
		private readonly _root: fairygui.GMovieClip;
		private readonly _hitFx: fairygui.GMovieClip;

		constructor(id: string, container: fairygui.GComponent, team: number) {
			this.id = id;
			let def = Shared.Model.ModelFactory.GetEntityData(this.id);
			this._model = def.model;
			this._dup = def.dup;
			this._ddown = def.ddown;

			this._team = team;
			this._root = fairygui.UIPackage.createObject("global", this._model).asMovieClip;
			container.addChild(this._root);
			this._root.setPivot(0.5, 0.5);
			this._root.center();
			this._root.playing = false;

			this._hitFx = fairygui.UIPackage.createObject("global", "hit").asMovieClip;
			container.addChild(this._hitFx);
			this._hitFx.setPivot(0.5, 0.5);
			this._hitFx.center();
			this._hitFx.playing = false;
			this._hitFx.visible = false;

			this.Idle();
		}

		public Dispose(): void {
			this._root.dispose();
		}

		private GetAction(name: string): Shared.Model.EAction {
			let d = this._team == 0 ? this._dup : this._ddown;
			return d.getValue(name);
		}

		public Idle(): void {
			let action = this.GetAction("idle");
			this._root.setPlaySettings(action.start, action.end, 0);
			this._root.playing = true;
		}

		public Attack(completeHandler: () => void): void {
			let action = this.GetAction("atk");
			this._root.setPlaySettings(action.start, action.end, 1, action.start, new laya.utils.Handler(this, () => {
				this.Idle();
				completeHandler();
			}));
			this._root.playing = true;
		}

		public Die(): void {
			let action = this.GetAction("die");
			this._root.setPlaySettings(action.start, action.end, 0);
			this._root.playing = true;
		}

		public Hit(): void {
			this._hitFx.visible = true;
			this._hitFx.frame = 0;
			this._hitFx.setPlaySettings(0, -1, 1, 0, new laya.utils.Handler(this, (() => this._hitFx.visible = false).bind(this)));
			this._hitFx.playing = true;
		}
	}
}