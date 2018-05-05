namespace Shared.Model {
	export class MapData {
		public id: string;
		public name: string;
		public model: string;

		constructor(id: string) {
			this.id = id;
			let def = Defs.GetMap(this.id);
			this.name = Hashtable.GetString(def, "name");
			this.model = Hashtable.GetString(def, "model");
		}
	}
}