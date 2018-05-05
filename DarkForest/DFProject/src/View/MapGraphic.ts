/// <reference path="./Graphic" />

namespace View {
	export class MapGraphic extends Graphic {
		private _startPos: RC.Numerics.Vec3;

		constructor(manager: GraphicManager) {
			super(manager);
		}

		public OnCreate(id: string): void {
			this.Load(id);
			this._root.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
		}

		private OnTouchBegin(evt: laya.events.Event): any {
			this._root.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
			this._root.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
			this._root.displayObject.on(Laya.Event.MOUSE_OUT, this, this.OnTouchEnd);
			let camera = this._manager.battle.camera;
			this._startPos = camera.LocalToWorld(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
		}

		private OnTouchMove(evt: laya.events.Event): any {
			let camera = this._manager.battle.camera;
			let currPos = camera.LocalToWorld(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
			let delta = RC.Numerics.Vec3.Sub(currPos, this._startPos);
			this._startPos = camera.LocalToWorld(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
			camera.position = RC.Numerics.Vec3.Add(camera.position, delta);
			console.log(camera.position.ToString());
		}

		private OnTouchEnd(evt: laya.events.Event): any {
			this._root.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
			this._root.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
			this._root.displayObject.off(Laya.Event.MOUSE_OUT, this, this.OnTouchEnd);
		}
	}
}