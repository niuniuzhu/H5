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
			this.name = RC.Utils.Hashtable.GetString(def, "name");
			this.model = RC.Utils.Hashtable.GetString(def, "model");
			this.size = RC.Utils.Hashtable.GetVec2(def, "size");
			this.restriMin = RC.Utils.Hashtable.GetVec2(def, "restri_min");
			this.restriMax = RC.Utils.Hashtable.GetVec2(def, "restri_max");
		}
	}
}