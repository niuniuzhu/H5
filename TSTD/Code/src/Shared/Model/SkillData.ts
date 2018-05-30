namespace Shared.Model {
	export class SkillData {
		public readonly id: string;
		public readonly cmp: number;
		public readonly damage: number;
		public readonly duration: number;
		public readonly hit: number;
		public readonly targetMode: number;
		public readonly targetFilter: number;
		public readonly fx: string;
		public readonly missile: string;
		public readonly summon: string;
		public readonly summonPos: RC.Numerics.Vec2[];
		public readonly summonFx: string;

		constructor(id: string) {
			let def = Defs.GetSkill(id);
			this.id = id;
			this.cmp = RC.Utils.Hashtable.GetNumber(def, "cmp");
			this.damage = RC.Utils.Hashtable.GetNumber(def, "damage");
			this.duration = RC.Utils.Hashtable.GetNumber(def, "duration");
			this.hit = RC.Utils.Hashtable.GetNumber(def, "hit");
			this.targetMode = RC.Utils.Hashtable.GetNumber(def, "target_mode");
			this.targetFilter = RC.Utils.Hashtable.GetNumber(def, "target_filter");
			this.fx = RC.Utils.Hashtable.GetString(def, "fx");
			this.missile = RC.Utils.Hashtable.GetString(def, "missile");
			this.summon = RC.Utils.Hashtable.GetString(def, "summon");
			this.summonPos = RC.Utils.Hashtable.GetVec2Array(def, "summon_pos");
			this.summonFx = RC.Utils.Hashtable.GetString(def, "summon_fx");
		}
	}
}