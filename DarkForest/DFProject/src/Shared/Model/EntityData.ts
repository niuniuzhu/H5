namespace Shared.Model {
	export class EntityData {
		// generice
		public id: string;
		public name: string;
		public model: string;

		// building
		public icon:string;
		public footprint:number;

		constructor(id: string) {
			this.id = id;
			let def = Defs.GetEntity(this.id);
			this.name = RC.Utils.Hashtable.GetString(def, "name");
			this.model = RC.Utils.Hashtable.GetString(def, "model");

			this.icon = RC.Utils.Hashtable.GetString(def, "icon");
			this.footprint = RC.Utils.Hashtable.GetNumber(def, "footprint");
		}
	}
}