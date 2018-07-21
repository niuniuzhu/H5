/// <reference path="./CEntity.ts" />

namespace View {
	export class CBuilding extends CEntity {
		protected _occupies: number[];
		protected _tilePoint: RC.Numerics.Vec3;
		protected _lvl: number;
		protected _bGraphic: BuildingGraphic;
		protected _underConstruction: boolean
		protected _finishTime: number;

		public get tilePoint(): RC.Numerics.Vec3 { return this._tilePoint.Clone(); }
		public set tilePoint(value: RC.Numerics.Vec3) { this._tilePoint = value.Clone(); }

		public get occupies(): number[] { return this._occupies; }
		public set occupies(value: number[]) {
			this._occupies.splice(0);
			for (let key of value) {
				this._occupies.push(key);
			}
		}

		public get underConstruction(): boolean { return this._underConstruction; }

		public get lvl(): number { return this._lvl; }
		public get buildTime(): number { return this._data.lvl[this.lvl].buildTime; }
		public get mine(): number { return this._data.lvl[this.lvl].mine; }
		public get energy(): number { return this._data.lvl[this.lvl].energy; }
		public get power(): number { return this._data.lvl[this.lvl].power; }
		public get atk(): number { return this._data.lvl[this.lvl].atk; }
		public get def(): number { return this._data.lvl[this.lvl].def; }

		constructor() {
			super();
			this._occupies = [];
		}

		public OnCreated(owner: Home, param: Shared.Model.EntityParam): void {
			super.OnCreated(owner, param);
			this._lvl = 0;
		}

		public OnUpdateState(context: Shared.UpdateContext): void {
			if (this._underConstruction) {
				this._finishTime -= context.deltaTime;
				this._bGraphic.UpdateBuildInfo(this._finishTime);
				if (this._finishTime <= 0)
					this.FinishBuild();
			}
		}

		protected CreateGraphic(): void {
			this._graphic = this._owner.graphicManager.CreateGraphic(BuildingGraphic);
			this._graphic.Load(this._data.model);
			this._graphic.position = this.position;
			this._bGraphic = <BuildingGraphic>this._graphic;
		}

		public SnapToTile(): void {
			this._tilePoint = this._owner.tile.WorldToLocal(this._position);
			this.position = this._owner.tile.LocalToWorld(this._tilePoint);
		}

		public ContainsPoint(tileSpaceTouchPoint: RC.Numerics.Vec3): boolean {
			let minX = this.tilePoint.x - this._data.footprint.x + 1;
			let maxX = this.tilePoint.x;
			let minZ = this.tilePoint.z;
			let maxZ = minZ + this._data.footprint.z - 1
			if (tileSpaceTouchPoint.x < minX ||
				tileSpaceTouchPoint.z < minZ ||
				tileSpaceTouchPoint.x > maxX ||
				tileSpaceTouchPoint.z > maxZ)
				return false;
			return true;
		}

		public CanPlace(): boolean {
			return this._owner.tile.CanPlace(this);
		}

		public Place(): boolean {
			if (!this._owner.tile.CanPlace(this)) {
				return false
			}
			this._owner.tile.PlaceBuilding(this);
			this._owner.graphicManager.SortGraphics(this._graphic);
			return true;
		}

		public BeginBuild(): void {
			CUser.B_MINE += this.mine;
			CUser.B_ENERGY += this.energy;
			this._bGraphic.BeginBuild(this.buildTime);
			this._underConstruction = true;
			this._finishTime = this.buildTime;
		}

		private FinishBuild(): void {
			CUser.B_POWER += this.power;
			CUser.B_ATK += this.atk;
			CUser.B_DEF += this.def;
			this._bGraphic.FinishBuild();
			this._underConstruction = false;
			this._owner.NotifyUpdateBuilding();
		}
	}
}