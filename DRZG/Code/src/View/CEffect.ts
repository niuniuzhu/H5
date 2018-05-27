namespace View {
	export enum EffectFollowMode {
		None,
		Caster,
		Target,
		FollowCster,
		FollowTarget,
	}

	export class CEffect extends CEntity {
		private _follow: string;
		private _endTime: number;

		public get followMode(): EffectFollowMode { return <EffectFollowMode>this._data.followMode; }

		public Begin(position: RC.Numerics.Vec2): void {
			this.position = position;
			if (this._data.duration <= 0)
				this._graphic.Play(0, -1, 1, -1, new laya.utils.Handler(this, this.OnPlayComplete));
			else {
				this._graphic.Play(0, -1, 0);
				this._endTime = this._owner.time + this._data.duration;
			}
		}

		public Begin2(caster: CTower, target: CTower): void {
			switch (this.followMode) {
				case EffectFollowMode.Caster:
				case EffectFollowMode.FollowCster:
					this.Begin(caster.position);
					break;

				case EffectFollowMode.Target:
				case EffectFollowMode.FollowTarget:
					this.Begin(target.position);
					break;
			}
			switch (this.followMode) {
				case EffectFollowMode.FollowCster:
					this._follow = caster.rid;
					break;
				case EffectFollowMode.FollowTarget:
					this._follow = target.rid;
					break;
			}
		}

		private OnPlayComplete(): void {
			this._graphic.Stop();
			this.MarkToDestroy();
		}

		public OnUpdateState(context: Shared.UpdateContext): void {
			super.OnUpdateState(context);

			if (this._follow != null && this._follow != "") {
				let follow = this.owner.entityManager.GetEntity(this._follow);
				if (follow != null) {
					this.position = follow.position;
				}
			}

			if (this._data.duration <= 0)
				return;
			if (context.time < this._endTime)
				return;
			this.OnPlayComplete();
		}
	}
}