/// <reference path="./CChampionAIAction.ts" />

namespace View.Actions {
	export class Seek extends CChampionAIAction {
		private _lastEnemy: string;
		private _lastEnemyPos: RC.Numerics.Vec2;
		private _path: number[];

		constructor() {
			super();
			this._lastEnemyPos = RC.Numerics.Vec2.zero;
		}

		protected OnEnter(param: any[]): void {
			this.PlanningPath();
			if (this._path == null || this._path.length == 1) {
				this.WalkComplete();
				return;
			}
			this.owner.owner.PlayRun();
		}

		protected OnExit(): void {
			this._path = null;
		}

		protected OnUpdate(context: Shared.UpdateContext): void {
			this.PlanningPath();
			this.WalkPath(context.deltaTime);
		}

		private PlanningPath(): void {
			let self = this.owner.owner;
			let enemy = self.owner.entityManager.GetEnemyNearby(self);
			if (enemy == null)
				return;
			let ownerPos = self.position;
			let enemyPos = enemy.position;
			let dist = RC.Numerics.Vec2.Distance(enemyPos, ownerPos);
			let dir = RC.Numerics.Vec2.DivN(RC.Numerics.Vec2.Sub(enemy.position, self.position), dist);
			enemyPos.Sub(dir.MulN(enemy.radius));
			if (enemy.rid != this._lastEnemy || !RC.Numerics.Vec2.Equals(this._lastEnemyPos, enemyPos)) {
				if (dist <= enemy.radius) {
					self.direction = dir;
				}
				else {
					let from = self.owner.tileMap.CoordToIndex(ownerPos.x, ownerPos.y);
					let to = self.owner.tileMap.CoordToIndex(enemyPos.x, enemyPos.y);
					this._path = self.owner.tileMap.AStarSearch(from, to);
				}
				this._lastEnemy = enemy.rid;
				this._lastEnemyPos.CopyFrom(enemyPos);
			}
		}

		private WalkPath(dt: number): void {
			if (this._path.length <= 1) {
				this.WalkComplete();
				return;
			}
			let self = this.owner.owner;
			let ownerPos = self.position;
			let nextPos = self.owner.tileMap.IndexToCoord(this._path[1]);
			let dist = RC.Numerics.Vec2.Distance(ownerPos, nextPos);
			self.direction = RC.Numerics.Vec2.DivN(RC.Numerics.Vec2.Sub(nextPos, self.position), dist);
			let expectTime = dist * 1000 / self.speed;// convert to ms
			let curPos = RC.Numerics.Vec2.Lerp(ownerPos, nextPos, dt / expectTime);
			if (RC.Numerics.Vec2.DistanceSquared(curPos, nextPos) < 0.1) {
				this._path.shift();
			}
			self.position = curPos;
		}

		private WalkComplete(): void {
			this.state.fsm.ChangeState(View.Actions.FSMStateType.ATTACK, true, this._lastEnemy);
		}
	}
}