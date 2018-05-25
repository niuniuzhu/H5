namespace Shared.Model {
	export class SkillData {
		public readonly id:string;
		public readonly cmp:number;
		public readonly damage:number;
		public readonly fx:string;
		public readonly missile:string;

		constructor(id:string){
			let def = Defs.GetSkill(id);
			this.id = id;
			this.cmp = RC.Utils.Hashtable.GetNumber(def, "cmp");
			this.damage = RC.Utils.Hashtable.GetNumber(def, "damage");
			this.fx = RC.Utils.Hashtable.GetString(def, "fx");
			this.missile = RC.Utils.Hashtable.GetString(def, "missile");
		}
	}
}