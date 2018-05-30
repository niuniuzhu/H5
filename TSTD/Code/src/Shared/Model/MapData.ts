namespace Shared.Model {
	export class MapData {
		public readonly id: string;
		public readonly name: string;
		public readonly model: string;
		public readonly size: RC.Numerics.Vec2;
		public readonly tileSize: number;
		public readonly towerPos: any[];

		constructor(id: string) {
			this.id = id;
			let def = Defs.GetMap(this.id);
			this.name = RC.Utils.Hashtable.GetString(def, "name");
			this.model = RC.Utils.Hashtable.GetString(def, "model");
			this.size = RC.Utils.Hashtable.GetVec2(def, "size");
			this.tileSize = RC.Utils.Hashtable.GetNumber(def, "tile_size");
			this.towerPos = RC.Utils.Hashtable.GetArray(def, "tower_pos");
		}
	}
}