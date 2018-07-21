namespace View.UI {
	export class FightPanel implements IMainPanel {
		private static readonly MAX_HP = 300;
		private static readonly MAX_ROUND = 20;
		private static readonly REPLAY_INTERVAL = 300;

		private _owner: UIMain;
		private _root: fairygui.GComponent;
		private _p1hpCom: fairygui.GProgressBar;
		private _p2hpCom: fairygui.GProgressBar;
		private _p1FightAni: fairygui.GMovieClip;
		private _p2FightAni: fairygui.GMovieClip;
		private _resultPanel: fairygui.GComponent;

		private _p1hp: number;
		private _p2hp: number;
		private _opAtk: number;
		private _opDef: number;

		private readonly _p1Records: RC.Collections.Queue<number>;
		private readonly _p2Records: RC.Collections.Queue<number>;
		private _currRecord: FightRecord;
		private _timer: laya.utils.Timer;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c2").asCom;

			this._p1hpCom = this._root.getChild("p1hp").asProgress;
			this._p2hpCom = this._root.getChild("p2hp").asProgress;
			this._p1FightAni = this._root.getChild("n14").asMovieClip;
			this._p2FightAni = this._root.getChild("n15").asMovieClip;
			this._resultPanel = fairygui.UIPackage.createObject("battle", "fight_result").asCom;
			this._resultPanel.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
			this._resultPanel.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
			this._resultPanel.getChild("back_btn").onClick(this, (e) => {
				fairygui.GRoot.inst.removeChild(this._resultPanel);
				this._owner.panelIndex = 0;
			});
			let skipBtn = this._root.getChild("skip_btn").asCom;
			skipBtn.onClick(this, this.Skip);

			this._p1Records = new RC.Collections.Queue<number>();
			this._p2Records = new RC.Collections.Queue<number>();
		}

		public Dispose(): void {
			this._resultPanel.dispose();
		}

		public Enter(): void {
			this._p1hpCom.max = FightPanel.MAX_HP;
			this._p1hpCom.value = FightPanel.MAX_HP;
			this._p2hpCom.max = FightPanel.MAX_HP;
			this._p2hpCom.value = FightPanel.MAX_HP;
			this._p1hp = FightPanel.MAX_HP;
			this._p2hp = FightPanel.MAX_HP;
			this.CreateOpponent();
			this.PerformFight();
			this._root.getChild("atk0").text = View.CUser.atk.toString();
			this._root.getChild("def0").text = View.CUser.def.toString();
			this._root.getChild("atk1").text = this._opAtk.toString();
			this._root.getChild("def1").text = this._opDef.toString();
			this.PlayRecord();
		}

		public Exit(): void {
			if (this._timer != null) {
				this._timer.clear(this, this.PlayAni);
				this._timer = null;
			}
			this._p1Records.clear();
			this._p2Records.clear();
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private CreateOpponent(): void {
			this._opAtk = RC.Numerics.MathUtils.Round(RC.Numerics.MathUtils.Max(Math.random() * 20 + 10, View.CUser.atk + (Math.random() * 40 - 20)));
			this._opDef = RC.Numerics.MathUtils.Round(RC.Numerics.MathUtils.Max(Math.random() * 20 + 10, View.CUser.def + (Math.random() * 40 - 20)));
		}

		private PerformFight(): void {
			let userHp = FightPanel.MAX_HP;
			let opHp = FightPanel.MAX_HP;
			let result = 0;
			for (let i = 0; i < FightPanel.MAX_ROUND; ++i) {
				let hurt0 = RC.Numerics.MathUtils.Max(0, View.CUser.atk - this._opDef);
				hurt0 += Math.random() * hurt0 * 0.4 - hurt0 * 0.2;
				let hurt1 = RC.Numerics.MathUtils.Max(0, this._opAtk - View.CUser.def);
				hurt1 += Math.random() * hurt1 * 0.4 - hurt1 * 0.2;
				hurt0 = RC.Numerics.MathUtils.Round(hurt0);
				hurt1 = RC.Numerics.MathUtils.Round(hurt1);
				this._p1Records.enqueue(hurt1);
				this._p2Records.enqueue(hurt0);
				userHp -= hurt1;
				opHp -= hurt0;
				if (opHp <= 0 || userHp <= 0) {
					break;
				}
			}
		}

		private Skip(): void {
			while (this._p1Records.size() > 0) {
				this.PreformP1();
			}
			while (this._p2Records.size() > 0) {
				this.PreformP2();
			}
			this.Settlement();
		}

		private PlayRecord(): void {
			if (this._p1Records.size() == 0 && this._p2Records.size() == 0) {
				this.Settlement();
			}
			else {
				this._timer = new laya.utils.Timer();
				this._timer.once(FightPanel.REPLAY_INTERVAL, this, this.PlayAni);
			}
		}

		private PlayAni(): void {
			if (this._p1Records.size() > 0) {
				this._p1FightAni.setPlaySettings(0, -1, 1, 0, new laya.utils.Handler(this, this.OnP1AniComplete));
				this._p1FightAni.playing = true;
			}
			if (this._p2Records.size() > 0) {
				this._p2FightAni.setPlaySettings(0, -1, 1, 0, new laya.utils.Handler(this, this.OnP2AniComplete));
				this._p2FightAni.playing = true;
			}
		}

		private OnP1AniComplete(): any {
			if (this._p1Records.size() == 0)
				return;
			this.PreformP1();
			this._p1FightAni.playing = false;
			if (!this._p2FightAni.playing)
				this.PlayRecord();
		}

		private OnP2AniComplete(): any {
			if (this._p2Records.size() == 0)
				return;
			this.PreformP2();
			this._p2FightAni.playing = false;
			if (!this._p1FightAni.playing)
				this.PlayRecord();
		}

		private PreformP1(): void {
			let hurt = this._p1Records.dequeue();
			this._p1hp -= hurt;
			this._p1hpCom.value = this._p1hp;
		}

		private PreformP2(): void {
			let hurt = this._p2Records.dequeue();
			this._p2hp -= hurt;
			this._p2hpCom.value = this._p2hp;
		}

		private Settlement(): void {
			fairygui.GRoot.inst.addChild(this._resultPanel);
			this._resultPanel.center();
			let mine;
			let energy;
			if (this._p1hp >= this._p2hp) {
				mine = (Math.random() * 80 + 80);
				energy = (Math.random() * 50 + 50);
				this._resultPanel.getController("c1").selectedIndex = 0;
			}
			else {
				mine = (Math.random() * 30 + 30);
				energy = (Math.random() * 10 + 10);
				this._resultPanel.getController("c1").selectedIndex = 1;
			}
			mine = RC.Numerics.MathUtils.Round(mine);
			energy = RC.Numerics.MathUtils.Round(energy);
			View.CUser.G_MINE += mine;
			View.CUser.G_ENERGY += energy;
			this._resultPanel.getChild("mine").asTextField.text = mine.toString();
			this._resultPanel.getChild("energy").asTextField.text = energy.toString();
		}
	}

	export class FightRecord {
		public hurt0: number;
		public hurt1: number;
	}
}