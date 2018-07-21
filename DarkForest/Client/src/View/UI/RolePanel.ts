namespace View.UI {
	export class RolePanel implements IMainPanel {
		private _owner: UIMain;
		private _root: fairygui.GComponent;
		private _imagePanel: fairygui.GComponent;

		constructor(owner: UIMain) {
			this._owner = owner;
			this._root = owner.root.getChild("c3").asCom;

			let imageCom = this._root.getChild("n9").asCom;
			imageCom.onClick(this, (e) => {
				if (this._imagePanel == null) {
					this._imagePanel = fairygui.UIPackage.createObject("battle", "juese_popup").asCom;
					this._imagePanel.getChild("list").on(fairygui.Events.CLICK_ITEM, this, this.OnImageItemClick);
				}
				fairygui.GRoot.inst.togglePopup(this._imagePanel);
			});

			let changeNameBtn = this._root.getChild("n13").asCom;
			changeNameBtn.onClick(this, (e) => {
				this._owner.homePanel.SetName(this._root.getChild("n12").asTextInput.text);
			});

			let backBtn = this._root.getChild("back_btn");
			backBtn.onClick(this, (e) => { this._owner.panelIndex = 0 });
		}

		public Dispose(): void {
		}

		public Enter(): void {
		}

		public Exit(): void {
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private OnImageItemClick(sender: fairygui.GObject, e: laya.events.Event): void {
			let id = sender.asCom.name;
			let loader = this._root.getChild("n23").asLoader;
			loader.url = fairygui.UIPackage.getItemURL("battle", id);
			this._owner.homePanel.SetImage(id);
			fairygui.GRoot.inst.hidePopup();
		}
	}
}