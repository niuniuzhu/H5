namespace Shared.Model {
	export class UserData {
		public readonly energy: number;
		public readonly mine: number;

		constructor() {
			let def = Defs.GetUser();
			this.mine = RC.Utils.Hashtable.GetNumber(def, "mine");
			this.energy = RC.Utils.Hashtable.GetNumber(def, "energy");
		}
	}
}