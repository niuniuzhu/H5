/// <reference path="./Graphic" />

namespace View {
	export class EntityGraphic extends Graphic {
		private _sprite: fairygui.GComponent;
		private _mc: fairygui.GMovieClip;

		constructor(manager: GraphicManager) {
			super(manager);
		}

		public Dispose(): void {
			this._sprite.dispose();
			super.Dispose();
		}

		public Load(id: string): void {
			this._sprite = fairygui.UIPackage.createObject("global", id).asCom;
			this._root.addChild(this._sprite);
			this._sprite.touchable = false;
			this._mc = this._sprite.asMovieClip;
			this.OnLoadComplete();
		}

		protected OnLoadComplete(): void {
		}

		public Play(start?: number, end?: number, times?: number, endAt?: number, endHandler?: laya.utils.Handler): void {
			this._mc.setPlaySettings(start, end, times, endAt, endHandler);
		}
	}
}