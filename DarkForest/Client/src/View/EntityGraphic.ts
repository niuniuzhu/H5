import { GraphicManager } from "./GraphicManager";
import { Graphic } from "./Graphic";

export class EntityGraphic extends Graphic {
	private _sprite: fairygui.GComponent;

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
		this.OnLoadComplete();
	}

	protected OnLoadComplete(): void {
	}
}