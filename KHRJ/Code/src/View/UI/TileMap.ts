namespace View.UI {
	export class TileMap {
		private readonly _owner: UILevel;
		private readonly _tiles: Tile[];
		private readonly _player: Player;

		public get player(): Player { return this._player; }

		constructor(owner: UILevel) {
			this._owner = owner;
			this._tiles = [];
			this._player = new Player();
			this._player.atk = View.CUser.atk;
			this._player.hp = View.CUser.hp;

			let count = Tile.V * Tile.H;
			for (let i: number = 0; i < count; ++i) {
				let tile: Tile = new Tile(this._owner.tileContainer, i, this.OnTileClick.bind(this), this.OnTileTrigger.bind(this));
				this._tiles[i] = tile;
			}
		}

		public Dispose(): void {
			for (let tile of this._tiles)
				tile.Dispose();
		}

		private OnTileClick(index: number): void {
			if (this._tiles[index].isMonster)
				this.DisableAround(index);
			else
				this.CheckWin();
		}

		private OnTileTrigger(index: number): void {
			let itemID = this._tiles[index].itemID;
			switch (itemID) {
				case 0:
					this._player.hp += RC.Numerics.MathUtils.RandomFloor(15, 35);
					View.CUser.wood += RC.Numerics.MathUtils.RandomFloor(8, 20);
					View.CUser.stone += RC.Numerics.MathUtils.RandomFloor(8, 20);
					this._player.hp = RC.Numerics.MathUtils.Min(View.CUser.hp, this._player.hp);
					this.UpdatePlayerInfo();
					this._tiles[index].Die();
					break;
				case 1:
					this._player.hp += RC.Numerics.MathUtils.RandomFloor(25, 45);
					View.CUser.wood += RC.Numerics.MathUtils.RandomFloor(10, 30);
					View.CUser.stone += RC.Numerics.MathUtils.RandomFloor(10, 30);
					this.UpdatePlayerInfo();
					this._tiles[index].Die();
					break;
				case 2:
				case 3:
				case 4:
				case 5:
					let tile = this._tiles[index];
					let monster = tile.monster;
					tile.touchable = false;
					let fx = fairygui.UIPackage.createObject("level", "hit").asMovieClip;
					tile.sprite.addChild(fx);
					fx.center();
					fx.setPlaySettings(0, -1, 1, 0, new laya.utils.Handler(this, () => {
						fx.dispose();
						let hurt = this._player.atk + RC.Numerics.MathUtils.RandomFloor(-10, 10);
						let hurtText = fairygui.UIPackage.createObject("level", "hurt").asCom;
						hurtText.getChild("text").asTextField.text = "" + hurt;
						hurtText.getTransition("t0").play(new laya.utils.Handler(() => hurtText.dispose()));
						tile.sprite.addChild(hurtText);
						hurtText.center();
						monster.hp -= hurt;
						monster.hp = RC.Numerics.MathUtils.Max(0, monster.hp);
						if (monster.hp <= 0) {
							tile.Die();
							this.EnableAround(index);
							tile.touchable = true;
							this.CheckWin();
							return;
						}
						// player hit
						let holder = this._owner.root.getChild("hit_holder").asCom;
						let fx2 = fairygui.UIPackage.createObject("level", "hit").asMovieClip;
						holder.addChild(fx2);
						fx2.center();
						fx2.setPlaySettings(0, -1, 1, 0, new laya.utils.Handler(this, () => {
							fx2.dispose();
							let hurt = monster.atk + RC.Numerics.MathUtils.RandomFloor(-10, 10);
							let hurtText = fairygui.UIPackage.createObject("level", "hurt").asCom;
							hurtText.getChild("text").asTextField.text = "" + hurt;
							hurtText.getTransition("t0").play(new laya.utils.Handler(() => hurtText.dispose()));
							holder.addChild(hurtText);
							hurtText.center();
							this._player.hp -= hurt;
							this._player.hp = RC.Numerics.MathUtils.Max(0, this._player.hp);
							this.UpdatePlayerInfo();
							tile.touchable = true;
							if (this._player.hp <= 0) {
								this._owner.OnFail();
							}
						}));
						fx2.playing = true;
					}));
					fx.playing = true;
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

		private UpdatePlayerInfo(): void {
			this._owner.UpdatePlayerInfo();
		}

		private CheckWin(): void {
			for (let tile of this._tiles) {
				if (tile.state == 0 || tile.isMonster)
					return;
			}
			this._owner.OnWin();
		}
	}
}