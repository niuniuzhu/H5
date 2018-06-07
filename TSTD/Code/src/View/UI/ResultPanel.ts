namespace View.UI {
	export class ResultPanel implements IMainPanel {
		private static readonly EATING_RATE = 0.2 / 1000;
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;
		private readonly _bar: fairygui.GProgressBar;
		private _eating: boolean;

		public opponent: CPets;
		public set win(value: boolean) {
			this._root.getController("c1").selectedIndex = value ? 0 : 1;
		}

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c7").asCom;
			this._root.getChild("n21").onClick(this, () => this._owner.panelIndex = 0);
			this._root.getChild("n10").onClick(this, () => this._owner.panelIndex = 6);
			this._root.getChild("n11").onClick(this, () => this._owner.panelIndex = 0);
			this._root.getChild("n28").onClick(this, () => this._owner.panelIndex = 0);
			this._root.getChild("n9").displayObject.on(laya.events.Event.MOUSE_DOWN, this, this.OnTunshiBegin);
			this._bar = this._root.getChild("n24").asProgress;
			this._bar.max = 1;
		}

		public Dispose(): void {
		}

		public Enter(): void {
		}

		public Exit(): void {
		}

		public Update(deltaTime: number): void {
			if (!this._eating)
				return;
			let cur = this._bar.value;
			cur += deltaTime * ResultPanel.EATING_RATE;
			this._bar.value = cur;
			if (cur >= this._bar.max) {
				this.OnTunshiEnd(null);
				this.TunshiSuccess();
			}
		}

		public OnResize(e: laya.events.Event): void {
		}

		private OnTunshiBegin(e: laya.events.Event): void {
			fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTunshiEnd);
			this._bar.visible = true;
			this._bar.value = 0;
			this._eating = true;
		}

		private OnTunshiEnd(e: laya.events.Event): void {
			fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTunshiEnd);
			this._bar.visible = false;
			this._eating = false;
		}

		private TunshiSuccess(): void {
			this._root.getController("c1").selectedIndex = 2;
			let id = this.opponent.id;
			let def = Shared.Model.ModelFactory.GetEntityData(id);
			this._root.getChild("n27").asTextField.text = `你成功收复了${def.name}作为麾下灵兽,恭喜!`;
			if (View.CUser.pets.indexOf(id) < 0)
				View.CUser.pets.push(id);
		}
	}
}