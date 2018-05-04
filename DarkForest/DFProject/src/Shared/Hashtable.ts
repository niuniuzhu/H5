namespace Shared {
	type pair = { [k: string]: any };

	export class Hashtable {
		public static Concat(map: pair, map2: pair) {
			for (let k in map2) {
				if (map[k] == undefined) {
					map[k] = map2[k]
				}
			}
		}

		public static GetArray(map: pair, key: string): any[] {
			return <any[]>map[key];
		}

		public static GetMap(map: pair, key: string): pair {
			return map[key];
		}

		public static GetString(map: pair, key: string): string {
			return <string>map[key];
		}

		public static GetNumber(map: pair, key: string): number {
			return <number>map[key];
		}

		public static GetBool(map: pair, key: string): boolean {
			return <boolean>map[key];
		}

		public static GetStringArray(map: pair, key: string): string[] {
			return <string[]>this.GetArray(map, key);
		}

		public static GetNumberArray(map: pair, key: string): number[] {
			return <number[]>this.GetArray(map, key);
		}

		public static GetBoolArray(map: pair, key: string): boolean[] {
			return this.GetArray(map, key) as boolean[];
		}

		public static GetVec2(map: pair, key: string): RC.Numerics.Vec2 {
			let arr: any[] = this.GetArray(map, key);
			return new RC.Numerics.Vec2(arr[0], arr[1]);
		}

		public static GetVec3(map: pair, key: string): RC.Numerics.Vec3 {
			let arr: any[] = this.GetArray(map, key);
			return new RC.Numerics.Vec3(arr[0], arr[1], arr[2]);
		}

		public static GetVec4(map: pair, key: string): RC.Numerics.Vec4 {
			let arr: any[] = this.GetArray(map, key);
			return new RC.Numerics.Vec4(arr[0], arr[1], arr[2], arr[3]);
		}
	}
}