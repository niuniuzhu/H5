namespace Shared.Model {
	export class EntityData {
		// generice
		public readonly id: string;
		public readonly name: string;
		public readonly model: string;

		// champion
		public readonly mhp: number;
		public readonly mmp: number;
		public readonly mp: number;
		public readonly gmp: number;
		public readonly skills: string[];
		public readonly ai: string;

		// missile
		public readonly speed: number;
		public readonly dfx: string;

		// effect
		public readonly duration: number;
		public readonly followMode: number;

		constructor(id: string) {
			this.id = id;
			let def = Defs.GetEntity(this.id);
			this.name = RC.Utils.Hashtable.GetString(def, "name");
			this.model = RC.Utils.Hashtable.GetString(def, "model");

			this.mhp = RC.Utils.Hashtable.GetNumber(def, "mhp");
			this.mmp = RC.Utils.Hashtable.GetNumber(def, "mmp");
			this.mp = RC.Utils.Hashtable.GetNumber(def, "mp");
			this.gmp = RC.Utils.Hashtable.GetNumber(def, "gmp");
			this.skills = RC.Utils.Hashtable.GetStringArray(def, "skills");
			this.ai = RC.Utils.Hashtable.GetString(def, "ai");
			this.speed = RC.Utils.Hashtable.GetNumber(def, "speed");
			this.dfx = RC.Utils.Hashtable.GetString(def, "dfx");
			this.duration = RC.Utils.Hashtable.GetNumber(def, "duration");
			this.followMode = RC.Utils.Hashtable.GetNumber(def, "follow_mode");
		}
	}
}