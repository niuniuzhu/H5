namespace View.UI {
	export class SearchPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;
		private _opponentId: string;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c2").asCom;
			this._root.getChild("back_btn").onClick(this, this.OnBackBtnClick);
			this._root.getChild("atk_btn").onClick(this, this.OnAtkBtnClick);
			this._root.getController("c1").on(fairygui.Events.STATE_CHANGED, this, this.OnControllerIndexChanged);
		}

		public Dispose(): void {
		}

		public Enter(): void {
			this._root.getController("c1").selectedIndex = 0;
			this.SearchOpponent();
		}

		public Exit(): void {
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private OnBackBtnClick(e: laya.events.Event): any {
			this._owner.panelIndex = 0;
		}

		private OnAtkBtnClick(e: laya.events.Event): any {
			this._owner.fightPanel.opponentId = this._opponentId;
			this._owner.panelIndex = 6;
		}

		private OnControllerIndexChanged(): void {
			this.SearchOpponent();
		}

		private SearchOpponent(): void {
			this._opponentId = "e" + RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(0, 30));
			let def = Shared.Model.ModelFactory.GetEntityData(this._opponentId);
			this._root.getChild("name").asTextField.text = def.name;
			this._root.getChild("type").asTextField.text = def.type;
			this._root.getChild("lvl").asTextField.text = "" + RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(CUser.lvl - 3, CUser.lvl + 3));
			let img = this._root.getChild("img").asButton;
			img.icon = fairygui.UIPackage.getItemURL("global", def.model);
			let loader = img.getChild("icon").asLoader;
			loader.playing = false;
			loader.frame = 0;
		}
	}
}