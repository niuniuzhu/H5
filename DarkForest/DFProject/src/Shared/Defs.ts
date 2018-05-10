namespace Shared {
	type pair = { [k: string]: any };

	export class Defs {
		private static _defs: pair;

		public static Init(json: JSON) {
			Defs._defs = json;
		}

		public static GetUser(): pair {
			let ht = RC.Utils.Hashtable.GetMap(Defs._defs, "user");
			return ht;
		}

		public static GetMap(id: string): pair {
			let ht = RC.Utils.Hashtable.GetMap(Defs._defs, "maps");
			let defaultHt = RC.Utils.Hashtable.GetMap(ht, "default");
			let result = RC.Utils.Hashtable.GetMap(ht, id);
			if (result == null)
				result = {};
			RC.Utils.Hashtable.Concat(result, defaultHt);
			return result;
		}

		public static GetEntity(id: string): pair {
			let ht = RC.Utils.Hashtable.GetMap(Defs._defs, "entities");
			let defaultHt = RC.Utils.Hashtable.GetMap(ht, "default");
			let result = RC.Utils.Hashtable.GetMap(ht, id);
			if (result == null)
				result = {};
			RC.Utils.Hashtable.Concat(result, defaultHt);
			return result;
		}
	}
}