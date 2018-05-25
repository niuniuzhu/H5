namespace View.UI {
	export class UIBattle implements IUIModule {
		private _root: fairygui.GComponent;
		private _result: fairygui.GComponent;
		private _battle: CBattle;

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/battle");
		}

		public Dispose(): void {
		}

		public Enter(param: any): void {
			this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);

			this._result = fairygui.UIPackage.createObject("battle", "result").asCom;
			this._result.getChild("n8").onClick(this, () => {
				UIManager.EnterMain();
			})

			let p = <Shared.Model.BattleParams>param;
			for (let i = 0; i < p.team0[0].skills.length; ++i) {
				this._root.getChild("c" + i).icon = fairygui.UIPackage.getItemURL("global", p.team0[0].skills[i]);
			}

			this._battle = new View.CBattle(p);
			this._battle.winHandler = this.HandleBattleWin.bind(this);
			this._battle.SetGraphicRoot(this._root.getChild("n3").asCom);
		}

		public Leave(): void {
			this._battle.Dispose();
			this._battle = null;
			this._result.dispose();
			this._result = null;
			this._root.dispose();
			this._root = null;
		}

		public Update(deltaTime: number): void {
			this._battle.Update(deltaTime);
		}

		public OnResize(e: laya.events.Event): void {
		}

		private HandleBattleWin(winTeam: number): void {
			this._result.getController("c1").selectedIndex = winTeam == 0 ? 0 : 1;
			this._result.getChild("n10").asTextField.text = winTeam == 0 ? "" + Math.floor(Math.random() * 3000 + 1200) : "" + Math.floor(Math.random() * 500 + 800);
			fairygui.GRoot.inst.addChild(this._result);
		}
	}
}