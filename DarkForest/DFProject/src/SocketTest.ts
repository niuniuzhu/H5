namespace SocketTest {
	export class Main {
		private _dt: number;

		constructor() {
			// 初始化引擎
			Laya.init(600, 400, Laya.WebGL);
			Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
			Laya.stage.alignH = Laya.Stage.ALIGN_LEFT;
			Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
			Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
			this.Start();
		}

		private Start(): void {
			this._dt = 0;
			Laya.timer.frameLoop(1, this, this.Update);
			Shared.Net.NetworkMgr.instance.Connect("localhost", 49997);
		}

		private Update(): void {
		}
	}
}