namespace View.UI {
	export class ZCPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;
		private readonly _list: fairygui.GList;
		private readonly _pets: fairygui.GMovieClip[];

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c0").asCom;
			this._list = this._root.getChild("n53").asList;
			this._pets = [];
		}

		public Dispose(): void {
		}

		public Enter(): void {
			this._root.getChild("name").asTextField.text = View.CUser.uname;
			this._root.getChild("lvl").asTextField.text = "" + View.CUser.lvl;
			this._root.getChild("hp").asTextField.text = `${View.CUser.hp}/${View.CUser.hp}`;
			this._root.getChild("exp").asTextField.text = `${View.CUser.exp}/${View.CUser.exp}`;
			this._root.getChild("hp_bar").asProgress.max = View.CUser.hp;
			this._root.getChild("hp_bar").asProgress.value = View.CUser.hp;
			this._root.getChild("exp_bar").asProgress.max = View.CUser.exp;
			this._root.getChild("exp_bar").asProgress.value = View.CUser.exp;
			this._root.getChild("atk").asTextField.text = "" + View.CUser.atk;
			this._root.getChild("img").asCom.getChild("icon").asLoader.url = fairygui.UIPackage.getItemURL("main", "u" + View.CUser.img);
			this._root.getChild("img").onClick(this, this.OnImageBtnClick);
			this.CreatePets();
		}

		public Exit(): void {
			for (let pet of this._pets)
				pet.dispose();
			this._list.removeChildrenToPool();
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private OnImageBtnClick(e: laya.events.Event): void {
			this._owner.panelIndex = 5;
		}

		private CreatePets(): void {
			let pets = View.CUser.pets.slice(0);
			let count = RC.Numerics.MathUtils.Min(3, pets.length);
			for (let i = 0; i < count; ++i) {
				let pos = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(0, pets.length));
				let id = pets.splice(pos, 1)[0];
				let def = Shared.Model.ModelFactory.GetEntityData(id);
				let pet = fairygui.UIPackage.createObject("global", def.model).asMovieClip;
				this._root.getChild("pet" + i).asCom.addChild(pet);
				pet.center();
				let action = def.ddown.getValue("idle");
				pet.setPlaySettings(action.start, action.end, -1);
				pet.playing = true;
				this._pets.push(pet);

				let item = this._list.addItemFromPool().asCom;
				item.getChild("title").asTextField.text = def.name;
			}
		}
	}
}