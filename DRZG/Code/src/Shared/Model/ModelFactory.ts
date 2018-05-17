namespace Shared.Model {
	export class ModelFactory {
		private static PLAYER_DATA: PlayerData;
		private static readonly MAP_DATA = new RC.Collections.Dictionary<string, MapData>();
		private static readonly SKILL_DATA = new RC.Collections.Dictionary<string, SkillData>();
		private static readonly EFFECT_DATA = new RC.Collections.Dictionary<string, EffectData>();
		private static readonly ENTITY_DATA = new RC.Collections.Dictionary<string, EntityData>();

		public static GetPlayerData(): PlayerData {
			if (this.PLAYER_DATA != null)
				return this.PLAYER_DATA;

			this.PLAYER_DATA = new PlayerData();
			return this.PLAYER_DATA;
		}

		public static GetSkillData(id: string): SkillData {
			let data = this.SKILL_DATA.getValue(id);
			if (data != null)
				return data;

			data = new SkillData(id);
			this.SKILL_DATA.setValue(id, data);
			return data;
		}

		public static GetEffectData(id: string): EffectData {
			let data = this.EFFECT_DATA.getValue(id);
			if (data != null)
				return data;

			data = new EffectData(id);
			this.EFFECT_DATA.setValue(id, data);
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