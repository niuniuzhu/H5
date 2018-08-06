export class Utils {
	public static MakeRIDFromID(id: string): string {
		return `${id}@${btoa(RC.Utils.GUID.Generate().ToString(RC.Utils.GuidFormat.DASHES))}`;
	}

	public static GetIDFromRID(rid: string): string {
		let pos = rid.indexOf("@");
		let id = pos != -1 ? rid.substring(0, pos) : rid;
		return id;
	}
}