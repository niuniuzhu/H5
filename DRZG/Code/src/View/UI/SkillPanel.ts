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
				let item = this._list.getChildAt(i);
				item.draggable = true;
				item.on(fairygui.Events.DRAG_START, this, this.OnItemDragStart);
			}
			count = this._list2.numItems;
			for (let i = 0; i < count; ++i) {
				let item = this._list2.getChildAt(i);
				item.data = item.name;
				item.on(fairygui.Events.DROP, this, this.OnItemDrop);
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
			fairygui.DragDropManager.inst.startDrag(item, item.icon, [item.icon, item.name]);
		}

		private OnItemDrop(data: any, e: laya.events.Event): any {
			let item = <fairygui.GComponent>fairygui.GObject.cast(e.currentTarget);
			item.icon = data[0];
			item.data = data[1];
		}

		public GetSkills(): string[] {
			let count = this._list2.numItems;
			let skills: string[] = [];
			for (let i = 0; i < count; ++i) {
				skills.push(<string>this._list2.getChildAt(i).data);
			}
			return skills;
		}
	}
}