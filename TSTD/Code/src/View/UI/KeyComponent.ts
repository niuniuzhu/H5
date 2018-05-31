namespace View.UI {
	export class KeyComponent {
		private _com: fairygui.GComponent;
		private _id: number;
		private _controller: fairygui.Controller;

		public get id(): number { return this._id; }
		public get parent(): fairygui.GComponent { return this._com.parent; }

		public get x(): number { return this._com.x; }
		public get y(): number { return this._com.y; }

		public get width(): number { return this._com.width; }
		public set width(value: number) { this._com.width = value; }
		public get height(): number { return this._com.height; }
		public set height(value: number) { this._com.height = value; }

		public get selectedIndex(): number { return this._controller.selectedIndex; }
		public set selectedIndex(value: number) { this._controller.selectedIndex = value; }

		public get rotation(): number { return this._com.rotation; }
		public set rotation(value: number) { this._com.rotation = value; }

		private _touched: boolean;
		public get touched(): boolean { return this._touched; }
		public set touched(value: boolean) {
			if (this._touched == value)
				return;
			this._touched = true;
			this._com.getChild("n0").asCom.getController("c1").selectedIndex = this._touched ? 1 : 0;
			this._com.getChild("n1").asCom.getController("c1").selectedIndex = this._touched ? 1 : 0;
		}

		constructor(com: fairygui.GComponent, id: number) {
			this._com = com;
			this._id = id;
			this._controller = this._com.getController("c1");
		}

		public AddChild(child: fairygui.GComponent) {
			this._com.addChild(child);
		}

		public RemoveChild(child: fairygui.GComponent) {
			this._com.removeChild(child);
		}
	}
}