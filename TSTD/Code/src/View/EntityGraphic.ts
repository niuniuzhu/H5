/// <reference path="./Graphic" />

namespace View {
	export class EntityGraphic extends Graphic {
		private _sprite: fairygui.GComponent;
		private _mc: fairygui.GMovieClip;
		private readonly _hud: fairygui.GProgressBar;

		constructor(manager: GraphicManager) {
			super(manager);
			this._hud = fairygui.UIPackage.createObject("global", "hud").asProgress;
			this._hud.visible = false;
			this._hud.setPivot(0.5, 0.5, true);
			this._root.addChild(this._hud);
		}

		public Dispose(): void {
			this._sprite.dispose();
			this._hud.dispose();
			super.Dispose();
		}

		public Load(id: string): void {
			if (id == null || id == "")
				return;
			this._sprite = fairygui.UIPackage.createObject("global", id).asCom;
			this._modelContainer.addChild(this._sprite);
			this._sprite.setPivot(0.5, 0.5, true);
			this._mc = this._sprite.asMovieClip;
			this._hud.y = -this._sprite.height * 0.5 - this._sprite.height * 0.25;
			this.OnLoadComplete();
		}

		protected OnLoadComplete(): void {
		}

		public Play(start?: number, end?: number, times?: number, endAt?: number, endHandler?: laya.utils.Handler): void {
			this._mc.setPlaySettings(start, end, times, endAt, endHandler);
			this._mc.playing = true;
		}

		public Stop() {
			this._mc.playing = false;
		}

		public ShowHUD(): void {
			this._hud.visible = true;
		}

		public HideHUD(): void {
			this._hud.visible = false;
		}

		public SetHP(mhp:number, hp:number):void{
			this._hud.max = mhp;
			this._hud.value = hp;
		}
	}
}