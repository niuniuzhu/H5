namespace View.UI {
	export class UIBattle implements IUIModule {
		private _root: fairygui.GComponent;
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

			let p = <Shared.Model.BattleParams>param;
			for (let i = 0; i < p.team0.skills.length; ++i) {
				this._root.getChild("c" + i).icon = fairygui.UIPackage.getItemURL("global", p.team0.skills[i]);
			}

			this._battle = new View.CBattle(p);
			this._battle.SetGraphicRoot(this._root.getChild("n3").asCom);
		}

		public Leave(): void {
			this._battle.Dispose();
			this._battle = null;
			this._root.dispose();
			this._root = null;
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}
	}
}