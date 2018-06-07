namespace View.UI {
	export class LingshouPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;
		private readonly _list: fairygui.GList;
		private readonly _list2: fairygui.GList;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c4").asCom;
			this._list = this._root.getChild("list").asList;
		}

		public Dispose(): void {
		}

		public Enter(): void {
			for (let i = 0; i < View.CUser.pets.length; ++i) {
				let pet = View.CUser.pets[i];
				let def = Shared.Model.ModelFactory.GetEntityData(pet);
				let item = this._list.addItemFromPool().asCom;
				item.getChild("name").asTextField.text = def.name;
				item.getChild("lvl").asTextField.text = "" + RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(3, 10));
				item.getChild("type").asTextField.text = def.type;
				let img = item.getChild("img").asButton;
				img.icon = fairygui.UIPackage.getItemURL("global", def.icon);
				let loader = img.getChild("icon").asLoader;
				loader.playing = false;
				loader.frame = 0;
				let btn = item.getChild("n34").asButton;
				btn.onClick(this, this.OnFightBtnClick);
				btn.data = i;
				if (View.CUser.petForFight == i) {
					btn.grayed = true;
					btn.touchable = false;
				} else {
					btn.grayed = false;
					btn.touchable = true;
				}
			}
		}

		public Exit(): void {
			this._list.removeChildrenToPool();
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private OnFightBtnClick(e: laya.events.Event): void {
			let btn = <fairygui.GComponent>fairygui.GObject.cast(e.currentTarget);
			View.CUser.petForFight = <number>btn.data;
			this.UpdateList();
		}

		private UpdateList(): void {
			for (let i = 0; i < View.CUser.pets.length; ++i) {
				let item = this._list.getChildAt(i).asCom;
				let btn = item.getChild("n34").asButton;
				if (View.CUser.petForFight == i) {
					btn.grayed = true;
					btn.touchable = false;
				} else {
					btn.grayed = false;
					btn.touchable = true;
				}
			}
		}
	}
}