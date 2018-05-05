namespace Shared.Model {
	export class ModelFactory {
		private static readonly MAP_DATA = new RC.Collections.Dictionary<string, MapData>();
		private static readonly ENTITY_DATA = new RC.Collections.Dictionary<string, EntityData>();

		public static GetMapData(id: string): MapData {
			let data = this.MAP_DATA.getValue(id);
			if (data != null && data != undefined)
				return data;

			data = new MapData(id);
			this.MAP_DATA.setValue(id, data);
			return data;
		}

		public static GetEntityData(id: string): EntityData {
			let data = this.ENTITY_DATA.getValue(id);
			if (data != null && data != undefined)
				return data;

			data = new EntityData(id);
			this.ENTITY_DATA.setValue(id, data);
			return data;
		}
	}
}