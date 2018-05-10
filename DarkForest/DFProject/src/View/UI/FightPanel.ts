namespace View.UI {
	export class FightPanel implements IMainPanel {
		private _owner: UIMain;
		private _root: fairygui.GComponent;

		private _opAtk: number;
		private _opDef: number;

		private _fightRecords;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c2").asCom;
		}

		public Dispose(): void {
		}

		public Enter(): void {
			this._root.getChild("atk0").text = View.CUser.atk.toString();
			this._root.getChild("def0").text = View.CUser.def.toString();
			this.CreateOpponent();
		}

		public Exit(): void {
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private CreateOpponent(): void {
			this._opAtk = Math.max(Math.random() * 3 + 2, View.CUser.atk + (Math.random() * 40 - 20));
			this._opDef = Math.max(Math.random() * 3 + 2, View.CUser.def + (Math.random() * 40 - 20));
		}
	}

	export class FightRecord{
		public player0Def:number;
		public player1Def:number;
	}
}