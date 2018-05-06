/// <reference path="./Graphic" />

namespace View {
	export class MapGraphic extends Graphic {
		private _startPos: RC.Numerics.Vec3;

		constructor(manager: GraphicManager) {
			super(manager);
			this._startPos = RC.Numerics.Vec3.zero;
		}

		public OnCreate(id: string): void {
			this.Load(id);
			this._root.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
		}

		private OnTouchBegin(evt: laya.events.Event): any {
			fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
			fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
			let camera = this._manager.battle.camera;
			this._startPos.CopyFrom(new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0));
		}

		private OnTouchMove(evt: laya.events.Event): any {
			let camera = this._manager.battle.camera;
			let currPos = new RC.Numerics.Vec3(evt.stageX, evt.stageY, 0);
			let delta = RC.Numerics.Vec3.Sub(currPos, this._startPos);
			this._startPos.CopyFrom(currPos);
			camera.seekerPos = RC.Numerics.Vec3.Sub(camera.seekerPos, new RC.Numerics.Vec3(delta.x, 0, -delta.y));
		}

		private OnTouchEnd(evt: laya.events.Event): any {
			fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
			fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
		}
	}
}