namespace Shared.Model {
	export class EntityData {
		// generice
		public readonly id: string;
		public readonly name: string;
		public readonly type: string;
		public readonly model: string;
		public readonly icon: string;
		public readonly dup: RC.Collections.Dictionary<string, EAction>;
		public readonly ddown: RC.Collections.Dictionary<string, EAction>;

		constructor(id: string) {
			this.id = id;
			let def = Defs.GetEntity(this.id);
			this.name = RC.Utils.Hashtable.GetString(def, "name");
			this.type = RC.Utils.Hashtable.GetString(def, "type");
			this.model = RC.Utils.Hashtable.GetString(def, "model");
			this.icon = RC.Utils.Hashtable.GetString(def, "icon");
			let map = RC.Utils.Hashtable.GetMap(def, "actions");
			this.dup = new RC.Collections.Dictionary<string, EAction>();
			this.ddown = new RC.Collections.Dictionary<string, EAction>();
			for (let key in map) {
				let arr: number[] = map[key];

				let eaction = new EAction();
				eaction.name = key;
				eaction.start = arr[0] - 1;
				eaction.end = arr[1] - 1;
				this.dup.setValue(key, eaction);

				eaction = new EAction();
				eaction.name = key;
				eaction.start = arr[2] - 1;
				eaction.end = arr[3] - 1;
				this.ddown.setValue(key, eaction);
			}
		}
	}

	export class EAction {
		public name: string;
		public start: number;
		public end: number;
	}
}