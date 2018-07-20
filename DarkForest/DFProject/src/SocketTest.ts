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
		}

		private Update(): void {
			let dt = Laya.timer.delta;
			this._dt += dt;
			if (this._dt >= RC.Numerics.MathUtils.RandomFloor(1500, 3000)) {
				this._dt = 0;
				this.DoConnect();
			}
		}

		private DoConnect(): void {
			for (let i = 0; i < 3; ++i) {
				let socket = new Laya.Socket();
				socket.endian = Laya.Byte.LITTLE_ENDIAN;
				socket.connectByUrl("ws://localhost:49997");
				socket.on(Laya.Event.OPEN, this, this.openHandler);
				socket.on(Laya.Event.MESSAGE, this, this.receiveHandler);
				socket.on(Laya.Event.CLOSE, this, this.closeHandler);
				socket.on(Laya.Event.ERROR, this, this.errorHandler);
			}
		}

		private openHandler(event: any = null): void {
			console.log("正确建立连接");
		}

		private receiveHandler(msg: any = null): void {
			console.log("接收到数据触发函数:" + msg);
		}

		private closeHandler(e: any = null): void {
			console.log("关闭事件");
		}

		private errorHandler(e: any = null): void {
			console.log("连接出错");
		}
	}
}