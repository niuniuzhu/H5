namespace View.UI {
	export class Tile {
		public static readonly V: number = 5;
		public static readonly H: number = 5;

		private readonly _sprite: fairygui.GComponent;
		private readonly _index: number;
		private _state: number;
		private _item: fairygui.GComponent;
		private _itemID: number;
		private _disable: boolean;
		private _monster: Player;

		public set state(value: number) {
			if (this._state == value)
				return;
			this._state = value;
			this._sprite.getController("c1").selectedIndex = value;
			this.GenItem();
		}
		public get state(): number { return this._state; }

		public set disable(value: boolean) {
			if (this._disable == value)
				return;
			this._disable = value;
			if (this._state == 0)
				this._sprite.getController("c2").selectedIndex = this._disable ? 1 : 0;
		}
		public get disable(): boolean { return this._disable; }

		public get index(): number { return this._index; }
		public get itemID(): number { return this._itemID; }
		public get monster(): Player { return this._monster; }

		constructor(parent: fairygui.GComponent, index: number, flipHandler: (index: number) => void, triggerHandler: (index: number) => void) {
			this._sprite = fairygui.UIPackage.createObject("level", "g" + RC.Numerics.MathUtils.RandomFloor(0, 3)).asCom;
			parent.addChild(this._sprite);
			this._state = 0;
			this._index = index;
			this._disable = false;
			this._monster = null;
			let coord = this.IndexToCoord(this._index);
			let x = coord.x * this._sprite.width;
			let y = coord.y * this._sprite.height;
			this._sprite.setXY(x, y);
			this._sprite.onClick(this, () => {
				if (this._disable)
					return;
				if (this._state == 0) {
					this.state = 1;
					flipHandler(this._index);
				}
				else {
					triggerHandler(this._index);
				}
			});
		}

		public Dispose(): void {
			this._state = 0;
			this._disable = false;
			this._monster = null;
			this._sprite.dispose();
			if (this._item != null) {
				this._item.dispose();
				this._item = null;
			}
		}

		public GenItem(): void {
			if (RC.Numerics.MathUtils.Random(0, 1) >= 0.5) {
				this._item = null;
				this._itemID = -1;
			}
			else {
				this._itemID = RC.Numerics.MathUtils.RandomFloor(0, 6);
				this._item = fairygui.UIPackage.createObject("level", "m" + this._itemID).asCom;
				this._sprite.addChild(this._item);
				this._item.touchable = false;
				this._item.center();
				this._monster = new Player();
				this._monster.atk = RC.Numerics.MathUtils.Floor(View.CUser.atk * 0.6) + RC.Numerics.MathUtils.RandomFloor(-3, 3);
				this._monster.hp = RC.Numerics.MathUtils.Floor(View.CUser.hp * 0.6);
			}
		}

		public Die(): void {
			this._sprite.grayed = true;
			this._item.grayed = true;
			this._sprite.touchable = false;
		}

		public CoordToIndex(x: number, y: number): number {
			return y * Tile.H + x;
		}

		public IndexToCoord(index: number): RC.Numerics.Vec2 {
			return new RC.Numerics.Vec2(this._index % Tile.H, RC.Numerics.MathUtils.Floor(this._index / Tile.H));
		}
	}
}