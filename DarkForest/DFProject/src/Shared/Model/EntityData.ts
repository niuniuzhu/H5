namespace Shared.Model {
	export class EntityData {
		public id: string;
		public name: string;
		public model: string;

		constructor(id: string) {
			this.id = id;
			let def = Defs.GetEntity(this.id);
			this.name = def["name"];
			this.model = def["model"];
		}
	}
}