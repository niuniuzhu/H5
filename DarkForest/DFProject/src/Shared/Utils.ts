namespace Shared {
	export class Utils {
		public static GetIDFromRID(rid: string): string {
			let pos = rid.indexOf("@");
			let id = pos != -1 ? rid.substring(0, pos) : rid;
			return id;
		}
	}
}