namespace View.UI {
	export class TileMap {
		private readonly _root: fairygui.GComponent;
		private readonly _tiles: Tile[];
		private readonly _player: Player;

		constructor(root: fairygui.GComponent) {
			this._root = root;
			this._tiles = [];
			this._player = new Player();
			this._player.atk = View.CUser.atk;

			let count = Tile.V * Tile.H;
			for (let i: number = 0; i < count; ++i) {
				let tile: Tile = new Tile(this._root, i, this.OnTileClick.bind(this), this.OnTileTrigger.bind(this));
				this._tiles[i] = tile;
			}
		}

		public Dispose(): void {
			for (let tile of this._tiles)
				tile.Dispose();
		}

		private OnTileClick(index: number): void {
			let itemID = this._tiles[index].itemID;
			if (itemID >= 0)
				this.DisableAround(index);
			switch (itemID) {
				case 0:
					break;
				case 1:
					break;
				case 2:
					break;
				case 3:
					break;
				case 4:
					break;
				case 5:
					break;
			}
		}

		private OnTileTrigger(index: number): void {
			let itemID = this._tiles[index].itemID;
			switch (itemID) {
				case 0:
					this._player.hp += RC.Numerics.MathUtils.RandomFloor(10, 30);
					break;
				case 1:
					View.CUser.wood += RC.Numerics.MathUtils.RandomFloor(10, 30);
					View.CUser.stone += RC.Numerics.MathUtils.RandomFloor(10, 30);
					break;
				case 2:
				case 3:
				case 4:
				case 5:
					let monster = this._tiles[index].monster;
					this._player.hp -= monster.atk + RC.Numerics.MathUtils.RandomFloor(-10, 10);
					monster.hp -= this._player.atk + RC.Numerics.MathUtils.RandomFloor(-10, 10);
					if (monster.hp <= 0) {
						this._tiles[index].Die();
						this.EnableAround(index);
					}
					break;
			}
		}

		public CanFlip(index: number): boolean {
			let canPlaceLeft = index % Tile.H != 0;
			let canPlaceRight = index % Tile.H != Tile.H - 1;
			let canPlaceUp = RC.Numerics.MathUtils.Floor(index / Tile.H) != 0;
			let canPlaceDown = RC.Numerics.MathUtils.Floor(index / Tile.H) != Tile.V - 1;
			if (canPlaceLeft && this._tiles[index - 1].isMonster)
				return false;
			if (canPlaceRight && this._tiles[index + 1].isMonster)
				return false;
			if (canPlaceUp && this._tiles[index - Tile.H].isMonster)
				return false;
			if (canPlaceDown && this._tiles[index + Tile.H].isMonster)
				return false;
			if (canPlaceLeft && canPlaceUp && this._tiles[index - Tile.H - 1].isMonster)
				return false;
			if (canPlaceRight && canPlaceUp && this._tiles[index - Tile.H + 1].isMonster)
				return false;
			if (canPlaceLeft && canPlaceDown && this._tiles[index + Tile.H - 1].isMonster)
				return false;
			if (canPlaceRight && canPlaceDown && this._tiles[index + Tile.H + 1].isMonster)
				return false;
			return true;
		}

		public DisableAround(index: number): void {
			if (!this._tiles[index].isMonster)
				return;
			let canPlaceLeft = index % Tile.H != 0;
			let canPlaceRight = index % Tile.H != Tile.H - 1;
			let canPlaceUp = RC.Numerics.MathUtils.Floor(index / Tile.H) != 0;
			let canPlaceDown = RC.Numerics.MathUtils.Floor(index / Tile.H) != Tile.V - 1;
			if (canPlaceLeft)
				this._tiles[index - 1].disable = true;
			if (canPlaceRight)
				this._tiles[index + 1].disable = true;
			if (canPlaceUp)
				this._tiles[index - Tile.H].disable = true;
			if (canPlaceDown)
				this._tiles[index + Tile.H].disable = true;
			if (canPlaceLeft && canPlaceUp)
				this._tiles[index - Tile.H - 1].disable = true;
			if (canPlaceRight && canPlaceUp)
				this._tiles[index - Tile.H + 1].disable = true;
			if (canPlaceLeft && canPlaceDown)
				this._tiles[index + Tile.H - 1].disable = true;
			if (canPlaceRight && canPlaceDown)
				this._tiles[index + Tile.H + 1].disable = true;
		}

		public EnableAround(index: number): void {
			let canPlaceLeft = index % Tile.H != 0;
			let canPlaceRight = index % Tile.H != Tile.H - 1;
			let canPlaceUp = RC.Numerics.MathUtils.Floor(index / Tile.H) != 0;
			let canPlaceDown = RC.Numerics.MathUtils.Floor(index / Tile.H) != Tile.V - 1;
			if (canPlaceLeft && this.CanFlip(index - 1))
				this._tiles[index - 1].disable = false;
			if (canPlaceRight && this.CanFlip(index + 1))
				this._tiles[index + 1].disable = false;
			if (canPlaceUp && this.CanFlip(index - Tile.H))
				this._tiles[index - Tile.H].disable = false;
			if (canPlaceDown && this.CanFlip(index + Tile.H))
				this._tiles[index + Tile.H].disable = false;
			if (canPlaceLeft && canPlaceUp && this.CanFlip(index - Tile.H - 1))
				this._tiles[index - Tile.H - 1].disable = false;
			if (canPlaceRight && canPlaceUp && this.CanFlip(index - Tile.H + 1))
				this._tiles[index - Tile.H + 1].disable = false;
			if (canPlaceLeft && canPlaceDown && this.CanFlip(index + Tile.H - 1))
				this._tiles[index + Tile.H - 1].disable = false;
			if (canPlaceRight && canPlaceDown && this.CanFlip(index + Tile.H + 1))
				this._tiles[index + Tile.H + 1].disable = false;
		}
	}
}