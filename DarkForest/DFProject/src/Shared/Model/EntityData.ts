namespace Shared.Model {
	export class EntityData {
		// generice
		public id: string;
		public name: string;
		public model: string;

		// building
		public footprint:RC.Numerics.Vec3;

		constructor(id: string) {
			this.id = id;
			let def = Defs.GetEntity(this.id);
			this.name = RC.Utils.Hashtable.GetString(def, "name");
			this.model = RC.Utils.Hashtable.GetString(def, "model");

			this.footprint = RC.Utils.Hashtable.GetVec3(def, "footprint");
		}
	}
}