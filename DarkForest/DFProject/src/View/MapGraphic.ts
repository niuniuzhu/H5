/// <reference path="./Graphic" />

namespace View {
	export class MapGraphic extends Graphic {

		constructor(manager: GraphicManager) {
			super(manager);
		}

		public OnCreate(id: string): void {
			this.Load(id);
			this._root.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
		}

		private OnTouchBegin(evt: laya.events.Event): any {
			fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
			fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
			this._manager.battle.camera.BeginMove(new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY));
		}

		private OnTouchMove(evt: laya.events.Event): any {
			this._manager.battle.camera.Move(new RC.Numerics.Vec3(evt.stageX, 0, -evt.stageY));
		}

		private OnTouchEnd(evt: laya.events.Event): any {
			fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
			fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
		}
	}
}