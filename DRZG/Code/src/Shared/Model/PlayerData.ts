namespace Shared.Model {
	export class PlayerData {
		public readonly mmp: number;
		public readonly gmp: number;

		constructor() {
			let def = Defs.GetPlayer();
			this.mmp = RC.Utils.Hashtable.GetNumber(def, "mmp");
			this.gmp = RC.Utils.Hashtable.GetNumber(def, "gmp");

		}
	}
}