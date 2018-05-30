namespace Shared.Model {
	export class ModelFactory {
		private static readonly MAP_DATA = new RC.Collections.Dictionary<string, MapData>();
		private static readonly SKILL_DATA = new RC.Collections.Dictionary<string, SkillData>();
		private static readonly ENTITY_DATA = new RC.Collections.Dictionary<string, EntityData>();

		public static GetSkillData(id: string): SkillData {
			let data = this.SKILL_DATA.getValue(id);
			if (data != null)
				return data;

			data = new SkillData(id);
			this.SKILL_DATA.setValue(id, data);
			return data;
		}

		public static GetMapData(id: string): MapData {
			let data = this.MAP_DATA.getValue(id);
			if (data != null)
				return data;

			data = new MapData(id);
			this.MAP_DATA.setValue(id, data);
			return data;
		}

		public static GetEntityData(id: string): EntityData {
			let data = this.ENTITY_DATA.getValue(id);
			if (data != null)
				return data;

			data = new EntityData(id);
			this.ENTITY_DATA.setValue(id, data);
			return data;
		}
	}
}