/// <reference path="../Shared/TileBase.ts"/>

namespace View {
	export class CTile extends Shared.TileBase {
		public Test(point: RC.Numerics.Vec3): void {
			let localPoint = this.WorldToTile(point);
		}
	}
}