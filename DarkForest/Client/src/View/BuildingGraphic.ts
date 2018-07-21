/// <reference path="./EntityGraphic.ts" />

namespace View {
	export class BuildingGraphic extends EntityGraphic {
		private _hud: fairygui.GComponent;
		private _progressBar: fairygui.GProgressBar;
		private _time: fairygui.GTextField;

		constructor(manager: GraphicManager) {
			super(manager);
		}

		protected OnLoadComplete(): void {
		}

		public BeginBuild(buildTime: number): void {
			if (this._hud == null) {
				this._hud = fairygui.UIPackage.createObject("battle", "building_hud").asCom;
				this._hud.touchable = false;
				this._hud.y = -300;
				this._time = this._hud.getChild("n1").asTextField;
				this._progressBar = this._hud.getChild("n0").asProgress;
				this._root.addChild(this._hud);
			}
			this._hud.visible = true;
			this._progressBar.max = buildTime;
			this.UpdateBuildInfo(buildTime);
		}

		public FinishBuild(): void {
			this._hud.visible = false;
		}

		public UpdateBuildInfo(buildTime: number): void {
			this._progressBar.value = buildTime;
			let hour = RC.Numerics.MathUtils.Floor(buildTime * 0.001)
			this._time.text = BuildingGraphic.FormatMillisecond(buildTime);
		}

		private static FormatMillisecond(msd: number): string {
			let time = msd / 1000;
			if (time > 60 && time < 60 * 60) {
				return RC.Numerics.MathUtils.Floor(time / 60.0) + "分钟" + RC.Numerics.MathUtils.Floor(((time / 60.0) -
					RC.Numerics.MathUtils.Floor(time / 60.0)) * 60) + "秒";
			}
			return RC.Numerics.MathUtils.Floor(time / 3600.0) + "小时" + RC.Numerics.MathUtils.Floor(((time / 3600.0) -
				RC.Numerics.MathUtils.Floor(time / 3600.0)) * 60) + "分钟" +
				RC.Numerics.MathUtils.Floor(((((time / 3600.0) - RC.Numerics.MathUtils.Floor(time / 3600.0)) * 60) -
					RC.Numerics.MathUtils.Floor(((time / 3600.0) - RC.Numerics.MathUtils.Floor(time / 3600.0)) * 60)) * 60) + "秒";
		}
	}
}