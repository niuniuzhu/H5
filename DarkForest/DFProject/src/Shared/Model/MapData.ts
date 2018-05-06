namespace Shared.Model {
	export class MapData {
		public id: string;
		public name: string;
		public model: string;
		public size: RC.Numerics.Vec2;
		public restriMin:RC.Numerics.Vec2;
		public restriMax:RC.Numerics.Vec2;

		constructor(id: string) {
			this.id = id;
			let def = Defs.GetMap(this.id);
			this.name = Hashtable.GetString(def, "name");
			this.model = Hashtable.GetString(def, "model");
			this.size = Hashtable.GetVec2(def, "size");
			this.restriMin = Hashtable.GetVec2(def, "restri_min");
			this.restriMax = Hashtable.GetVec2(def, "restri_max");
		}
	}
}