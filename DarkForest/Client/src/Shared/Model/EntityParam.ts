export class BattleParams {
	public frameRate: number = 0;
	public framesPerKeyFrame: number = 0;
	public uid: string = "";
	public id: string = "";
	public rndSeed: number = 0;
	public buildings: Building[] = null;
}

export class Building {
	public id: string = "";
	public uid: string = "";
}

export class EntityParam {
	public rid: string;
	public position: RC.Numerics.Vec3;
}