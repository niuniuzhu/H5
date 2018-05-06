namespace RC.Utils {
	export class Hashtable {
		public static Concat(map: { [k: string]: any }, map2: { [k: string]: any }) {
			for (let k in map2) {
				if (map[k] == undefined) {
					map[k] = map2[k]
				}
			}
		}

		public static GetArray(map: { [k: string]: any }, key: string): any[] {
			return <any[]>map[key];
		}

		public static GetMap(map: { [k: string]: any }, key: string): { [k: string]: any } {
			return map[key];
		}

		public static GetString(map: { [k: string]: any }, key: string): string {
			return <string>map[key];
		}

		public static GetNumber(map: { [k: string]: any }, key: string): number {
			return <number>map[key];
		}

		public static GetBool(map: { [k: string]: any }, key: string): boolean {
			return <boolean>map[key];
		}

		public static GetStringArray(map: { [k: string]: any }, key: string): string[] {
			return <string[]>this.GetArray(map, key);
		}

		public static GetNumberArray(map: { [k: string]: any }, key: string): number[] {
			return <number[]>this.GetArray(map, key);
		}

		public static GetBoolArray(map: { [k: string]: any }, key: string): boolean[] {
			return this.GetArray(map, key) as boolean[];
		}

		public static GetVec2(map: { [k: string]: any }, key: string): RC.Numerics.Vec2 {
			let arr: any[] = this.GetArray(map, key);
			return new RC.Numerics.Vec2(arr[0], arr[1]);
		}

		public static GetVec3(map: { [k: string]: any }, key: string): RC.Numerics.Vec3 {
			let arr: any[] = this.GetArray(map, key);
			return new RC.Numerics.Vec3(arr[0], arr[1], arr[2]);
		}

		public static GetVec4(map: { [k: string]: any }, key: string): RC.Numerics.Vec4 {
			let arr: any[] = this.GetArray(map, key);
			return new RC.Numerics.Vec4(arr[0], arr[1], arr[2], arr[3]);
		}
	}
}