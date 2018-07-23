import { Defs } from "../Defs";

export class EntityData {
	// generice
	public readonly id: string;
	public readonly name: string;
	public readonly model: string;

	// building
	public readonly footprint: RC.Numerics.Vec3;
	public readonly lvl: Level[];

	constructor(id: string) {
		this.id = id;
		let def = Defs.GetEntity(this.id);
		this.name = RC.Utils.Hashtable.GetString(def, "name");
		this.model = RC.Utils.Hashtable.GetString(def, "model");

		this.footprint = RC.Utils.Hashtable.GetVec3(def, "footprint");
		this.lvl = [];
		let lvlDefs: [{ [k: string]: any }] = <[{ [k: string]: any }]>RC.Utils.Hashtable.GetArray(def, "lvl");
		for (let lvlDef of lvlDefs) {
			this.lvl.push(new Level(lvlDef));
		}
	}
}

export class Level {
	public readonly buildTime: number;
	public readonly mine: number;
	public readonly energy: number;
	public readonly power: number;
	public readonly atk: number;
	public readonly def: number;

	constructor(lvl: { [k: string]: any }) {
		this.buildTime = lvl["build_time"];
		this.mine = lvl["mine"];
		this.energy = lvl["energy"];
		this.power = lvl["power"];
		this.atk = lvl["atk"];
		this.def = lvl["def"];
	}
}