namespace View.UI {
	export class PHBPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;
		private readonly _list: fairygui.GList;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c3").asCom;

			this._list = this._root.getChild("list").asList;
		}

		public Dispose(): void {
		}

		public Enter(): void {
			let atks: number[] = [];
			for (let i = 0; i < 50; ++i) {
				atks.push(Math.round(Math.random() * 25000 + 5000));
			}
			atks.sort();
			atks.reverse();

			for (let i = 0; i < 50; ++i) {
				let item = this._list.addItemFromPool().asCom;
				item.getChild("name").asTextField.text = btoa(RC.Utils.GUID.Generate().ToString(RC.Utils.GuidFormat.DASHES));
				let rank: string;
				switch (i) {
					case 0:
						rank = "a";
						break;
					case 1:
						rank = "b";
						break;
					case 2:
						rank = "c";
						break;
					default:
						rank = "" + (i + 1);
						break;
				}
				item.getChild("rank").asTextField.text = rank;
				item.getChild("atk").asTextField.text = "" + atks[i];
				item.getChild("lvl").asTextField.text = "" + Math.round(Math.random() * 30 + 20);
			}
		}

		public Exit(): void {
			this._list.removeChildrenToPool();
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}
	}
}