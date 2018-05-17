namespace Shared.Model {
	export class BattleParams {
		public frameRate: number;
		public framesPerKeyFrame: number;
		public uid: string;
		public id: string;
		public rndSeed: number;
		public team0: TeamParam;
		public team1: TeamParam;
	}

	export class TeamParam {
		public mp: number;
		public skills: string[];
		public towers: EntityParam[];
	}

	export class EntityParam {
		public uid: string;
		public id: string;
		public rid: string;
		public team: number;
	}
}