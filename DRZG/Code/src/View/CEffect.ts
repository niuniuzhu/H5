namespace View {
	export class CEffect extends CEntity {
		private _endTime: number;

		public Begin(position: RC.Numerics.Vec2): void {
			this.position = position;
			if (this._data.duration <= 0)
				this._graphic.Play(0, -1, 1, -1, new laya.utils.Handler(this, this.OnPlayComplete));
			else {
				this._graphic.Play(0, -1, 0);
				this._endTime = this._owner.time + this._data.duration;
			}
		}

		private OnPlayComplete(): void {
			this._graphic.Stop();
			this.MarkToDestroy();
		}

		public OnUpdateState(context: Shared.UpdateContext): void {
			super.OnUpdateState(context);
			if (this._data.duration <= 0)
				return;
			if (context.time < this._endTime)
				return;
			this.OnPlayComplete();
		}
	}
}