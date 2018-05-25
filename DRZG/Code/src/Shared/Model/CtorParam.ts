namespace Shared.Model {
	export class BattleParams {
		public frameRate: number;
		public framesPerKeyFrame: number;
		public uid: string;
		public id: string;
		public rndSeed: number;
		public team0: EntityParam[];
		public team1: EntityParam[];
	}

	export class EntityParam {
		public id: string;
		public rid: string;
		public team: number = -1;
		public skills: string[];
	}
}