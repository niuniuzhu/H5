namespace View {
	export class Fight {
		private _player: CPets;
		private _opponent: CPets;

		public get player(): CPets { return this._player; }
		public get opponent(): CPets { return this._opponent; }

		public Dispose() {
			this._player.Dispose();
			this._player = null;
			this._opponent.Dispose();
			this._opponent = null;
		}

		public CreateFighter(p1: string, p2: string, p1container: fairygui.GComponent, p2container: fairygui.GComponent): void {
			// create self
			this._player = new View.CPets(p1, p1container, 0);
			this._player.atk = View.CUser.atk;
			this._player.hp = View.CUser.hp;

			// create opponent
			this._opponent = new View.CPets(p2, p2container, 1);
			this._opponent.atk = View.CUser.atk;
			this._opponent.hp = View.CUser.hp;
		}

		public BeginFight(playerAction: boolean, completeHandler: () => void) {
			this.playerAction(playerAction, completeHandler);
		}

		private playerAction(playerAction: boolean, completeHandler: () => void): void {
			if (playerAction) {
				let offset = RC.Numerics.MathUtils.Floor(this._player.atk * 0.1);
				this._opponent.hp -= this._player.atk + RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(-offset, offset));
				this._opponent.Hit();
				this._player.Attack((() => {
					this.opponentAction(completeHandler);
				}).bind(this));
			}
			else
				this.opponentAction(completeHandler);
		}

		private opponentAction(completeHandler: () => void): void {
			if (this._opponent.hp <= 0) {
				completeHandler();
				return;
			}
			let opponentAction = RC.Numerics.MathUtils.Random(0, 1) > 0.15 ? true : false;
			if (opponentAction) {
				let offset = RC.Numerics.MathUtils.Floor(this._player.atk * 0.1);
				this._player.hp -= this._opponent.atk + RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(-offset, offset));
				this._player.Hit();
				this._opponent.Attack((() => completeHandler()).bind(this));
			}
			else
				completeHandler();
		}
	}
}