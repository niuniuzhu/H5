namespace View.UI {
	export class UIBattle implements IUIModule {
		private _root: fairygui.GComponent;
		private _result: fairygui.GComponent;
		private _mpBar: fairygui.GProgressBar;
		private _mp: fairygui.GTextField;
		private _battle: CBattle;
		private readonly _skillGrids: fairygui.GComponent[];

		constructor() {
			fairygui.UIPackage.addPackage("res/ui/battle");
			this._skillGrids = [];
		}

		public Dispose(): void {
		}

		public Enter(param?: any[]): void {
			this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
			fairygui.GRoot.inst.addChild(this._root);
			this._root.width = fairygui.GRoot.inst.width;
			this._root.height = fairygui.GRoot.inst.height;
			this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);

			this._result = fairygui.UIPackage.createObject("battle", "result").asCom;
			this._result.getChild("n8").onClick(this, () => {
				UIManager.EnterMain();
			})

			this._mpBar = this._root.getChild("n2").asProgress;
			this._mp = this._root.getChild("mp").asTextField;

			let p = <Shared.Model.BattleParams>param[0];
			let n = <string[]>param[1];
			for (let i = 0; i < p.team0[0].skills.length; ++i) {
				let skillGrid = this._root.getChild("c" + i).asCom;
				let skillId = p.team0[0].skills[i];
				let skillData = Shared.Model.ModelFactory.GetSkillData(skillId);
				skillGrid.icon = fairygui.UIPackage.getItemURL("global", n[i]);
				skillGrid.data = skillId;
				skillGrid.getChild("mp").asTextField.text = "" + skillData.cmp;
				skillGrid.onClick(this, this.OnSkillGridClick);
				this._skillGrids.push(skillGrid);
			}

			this._battle = new View.CBattle(p);
			this._battle.winHandler = this.HandleBattleWin.bind(this);
			this._battle.SetGraphicRoot(this._root.getChild("n3").asCom);
		}

		public Leave(): void {
			this._skillGrids.splice(0);
			this._battle.Dispose();
			this._battle = null;
			this._result.dispose();
			this._result = null;
			this._root.dispose();
			this._root = null;
		}

		public Update(deltaTime: number): void {
			this._battle.Update(deltaTime);
			let player = this.GetPlayer();
			if (player == null)
				return;
			this._mpBar.max = player.mmp;
			this._mpBar.value = player.mp;
			this._mp.text = "" + RC.Numerics.MathUtils.Floor(player.mp);

			for (let skillGrid of this._skillGrids) {
				let skillId = <string>skillGrid.data;
				skillGrid.grayed = !player.CanUseSkill(skillId);
				skillGrid.touchable = !skillGrid.grayed;
			}
		}

		public OnResize(e: laya.events.Event): void {
		}

		private HandleBattleWin(winTeam: number): void {
			this._result.getController("c1").selectedIndex = winTeam == 0 ? 0 : 1;
			this._result.getChild("n10").asTextField.text = winTeam == 0 ? "" + Math.floor(Math.random() * 3000 + 1200) : "" + Math.floor(Math.random() * 500 + 800);
			fairygui.GRoot.inst.addChild(this._result);
		}

		private GetPlayer(): CTower {
			let player = <CTower>this._battle.entityManager.GetEntity(CTower.player);
			if (player == null)
				return null;
			return player;
		}

		private OnSkillGridClick(e: laya.events.Event): void {
			let skillGrid = <fairygui.GComponent>fairygui.GObject.cast(e.currentTarget);
			let skillId = <string>skillGrid.data;
			let player = this.GetPlayer();
			if (player == null)
				return;
			player.UseSkill(skillId);
		}
	}
}