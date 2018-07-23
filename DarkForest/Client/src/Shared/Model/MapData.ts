import { Defs } from "../Defs";

export class MapData {
	public readonly id: string;
	public readonly name: string;
	public readonly model: string;
	public readonly tileSlope: number;
	public readonly tileAspect: number;
	public readonly tileRatio: number;
	public readonly size: RC.Numerics.Vec2;

	constructor(id: string) {
		this.id = id;
		let def = Defs.GetMap(this.id);
		this.name = RC.Utils.Hashtable.GetString(def, "name");
		this.model = RC.Utils.Hashtable.GetString(def, "model");
		this.tileSlope = RC.Utils.Hashtable.GetNumber(def, "tile_slope");
		this.tileAspect = RC.Utils.Hashtable.GetNumber(def, "tile_aspect");
		this.tileRatio = RC.Utils.Hashtable.GetNumber(def, "tile_ratio");
		this.size = RC.Utils.Hashtable.GetVec2(def, "size");
	}
}