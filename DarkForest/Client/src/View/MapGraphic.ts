import { Graphic } from "./Graphic";
import { GraphicManager } from "./GraphicManager";

export class MapGraphic extends Graphic {
	private _sprite: fairygui.GComponent;

	public get sprite(): fairygui.GComponent { return this._sprite; }

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
	}
}