namespace View {
	export class Graphic {

		public get position(): RC.Numerics.Vec3 { return null; }
		public set position(value: RC.Numerics.Vec3) { }

		public get rotation(): RC.Numerics.Quat { return null; }
		public set rotation(value: RC.Numerics.Quat) { }

		constructor() {

		}

		protected OnCreateInternal(battle: View.CBattle, id: string): void {
		}

		protected OnDestroyInternal(battle: View.CBattle): void {
		}
	}
}