namespace Shared.Model {
	export class SkillData {
		public readonly cmp:number;
		public readonly damage:number;
		public readonly fx:string;

		constructor(id:string){
			let def = Defs.GetSkill(id);
			this.cmp = RC.Utils.Hashtable.GetNumber(def, "mmp");
			this.damage = RC.Utils.Hashtable.GetNumber(def, "gmp");
			this.fx = RC.Utils.Hashtable.GetString(def, "fx");
		}
	}
}