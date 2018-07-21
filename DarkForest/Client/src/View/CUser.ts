namespace View {
	export class CUser {
		public static B_ATK: number = 0;
		public static B_DEF: number = 0;
		public static B_POWER: number = 0;
		public static B_MINE: number = 0;
		public static B_ENERGY: number = 0;

		public static G_MINE: number = 0;
		public static G_ENERGY: number = 0;

		public static get mine(): number {
			return Shared.Model.ModelFactory.GerUserData().mine + CUser.G_MINE + CUser.B_MINE;
		}

		public static get energy(): number {
			return Shared.Model.ModelFactory.GerUserData().energy + CUser.G_ENERGY + CUser.B_ENERGY;
		}

		public static get power(): number {
			return CUser.B_DEF;
		}

		public static get atk(): number {
			return CUser.B_ATK;
		}

		public static get def(): number {
			return CUser.B_DEF;
		}
	}
}