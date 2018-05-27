namespace View.UI {
	export class SkillPanel implements IMainPanel {
		private readonly _owner: UIMain;
		private readonly _root: fairygui.GComponent;
		private readonly _list: fairygui.GList;
		private readonly _list2: fairygui.GList;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c2").asCom;
			this._list = this._root.getChild("list").asList;
			this._list2 = this._root.getChild("list2").asList;

			let count = this._list.numItems;
			for (let i = 0; i < count; ++i) {
				let item = this._list.getChildAt(i).asCom
				let skillId = "s" + i % 3;// 只有3个技能
				item.data = skillId;
				item.draggable = true;
				item.on(fairygui.Events.DRAG_START, this, this.OnItemDragStart);
				let skillData = Shared.Model.ModelFactory.GetSkillData(skillId);
				item.getChild("mp").asTextField.text = "" + skillData.cmp;
			}
			count = this._list2.numItems;
			for (let i = 0; i < count; ++i) {
				let item = this._list2.getChildAt(i).asCom;
				let skillId = "s" + i % 3;
				item.data = skillId;
				item.on(fairygui.Events.DROP, this, this.OnItemDrop);
				let skillData = Shared.Model.ModelFactory.GetSkillData(skillId);
				item.getChild("mp").asTextField.text = "" + skillData.cmp;
			}
		}

		public Dispose(): void {
		}

		public Enter(): void {
		}

		public Exit(): void {
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private OnJJCBtnClick(): any {
		}

		private OnPHBBtnClick(): any {
		}

		private OnQDBtnClick(): any {
		}

		private OnYXBtnClick(): any {
		}

		private OnItemDragStart(e: laya.events.Event): any {
			let item = <fairygui.GComponent>fairygui.GObject.cast(e.currentTarget);
			item.stopDrag();
			fairygui.DragDropManager.inst.startDrag(item, item.icon, [item.icon, item.data]);
		}

		private OnItemDrop(data: any, e: laya.events.Event): any {
			let item = <fairygui.GComponent>fairygui.GObject.cast(e.currentTarget);
			let skillId = <string>data[1];
			item.icon = data[0];
			item.data = skillId;
			let skillData = Shared.Model.ModelFactory.GetSkillData(skillId);
			item.getChild("mp").asTextField.text = "" + skillData.cmp;
		}

		public GetSkills(): string[] {
			let count = this._list2.numItems;
			let skills: string[] = [];
			for (let i = 0; i < count; ++i) {
				skills.push(<string>this._list2.getChildAt(i).data);
			}
			return skills;
		}

		public GetGridNames(): string[] {
			let count = this._list2.numItems;
			let names: string[] = [];
			for (let i = 0; i < count; ++i) {
				names.push(this._list2.getChildAt(i).name);
			}
			return names;
		}
	}
}