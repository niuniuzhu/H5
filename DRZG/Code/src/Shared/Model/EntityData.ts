namespace Shared.Model {
	export class EntityData {
		// generice
		public readonly id: string;
		public readonly name: string;
		public readonly model: string;

		// champion
		public readonly mhp: number;
		public readonly skills: string[];

		constructor(id: string) {
			this.id = id;
			let def = Defs.GetEntity(this.id);
			this.name = RC.Utils.Hashtable.GetString(def, "name");
			this.model = RC.Utils.Hashtable.GetString(def, "model");

			this.mhp = RC.Utils.Hashtable.GetNumber(def, "mhp");
			this.skills = RC.Utils.Hashtable.GetStringArray(def, "skills");
		}
	}
}