namespace Shared {
	type pair = { [k: string]: any };

	export class Defs {
		private static _defs: pair;

		public static Init(json: JSON) {
			Defs._defs = json;
		}

		public static GetMap(id: string): pair {
			let ht = Hashtable.GetMap(Defs._defs, "maps");
			let defaultHt = Hashtable.GetMap(ht, "default");
			let result = Hashtable.GetMap(ht, id);
			if (result == null)
				result = {};
			Hashtable.Concat(result, defaultHt);
			return result;
		}

		public static GetEntity(id: string): pair {
			let ht = Hashtable.GetMap(Defs._defs, "entities");
			let defaultHt = Hashtable.GetMap(ht, "default");
			let result = Hashtable.GetMap(ht, id);
			if (result == null)
				result = {};
			Hashtable.Concat(result, defaultHt);
			return result;
		}
	}
}