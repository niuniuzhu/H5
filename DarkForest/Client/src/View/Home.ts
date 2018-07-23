import { EditingBuilding } from "./EditingBuilding";
import { CBuilding } from "./CBuilding";
import { CEntityManager } from "./CEntityManager";
import { GraphicManager } from "./GraphicManager";
import { Camera } from "./Camera";
import { CTile } from "./CTile";
import { Input, InputStateType } from "./Input";
import { MapGraphic } from "./MapGraphic";
import { Utils } from "../Shared/Utils";
import { UpdateContext } from "../Shared/UpdateContext";
import { MapData } from "../Shared/Model/MapData";
import { BattleParams, EntityParam } from "../Shared/Model/EntityParam";
import { ModelFactory } from "../Shared/Model/ModelFactory";
import { UIEvent } from "../Shared/Event/UIEvent";

export class Home {
	private _frame: number = 0;
	private _deltaTime: number = 0;
	private _time: number = 0;

	private readonly _data: MapData;
	private readonly _entityManager: CEntityManager;
	private readonly _graphicManager: GraphicManager;
	private readonly _context: UpdateContext;

	private readonly _camera: Camera;
	private readonly _graphic: MapGraphic;
	private readonly _tile: CTile;
	private readonly _input: Input;

	public get frame(): number { return this._frame; }
	public get deltaTime(): number { return this._deltaTime; }
	public get time(): number { return this._time; }

	public get graphicManager(): GraphicManager { return this._graphicManager };
	public get entityManager(): CEntityManager { return this._entityManager };

	public get camera(): Camera { return this._camera };
	public get graphic(): MapGraphic { return this._graphic };
	public get tile(): CTile { return this._tile };
	public get input(): Input { return this._input; }

	constructor(param: BattleParams) {
		this._data = ModelFactory.GetMapData(Utils.GetIDFromRID(param.id));
		this._entityManager = new CEntityManager(this);
		this._graphicManager = new GraphicManager(this);
		this._context = new UpdateContext();

		this._camera = new Camera();
		this._camera.seekerPos = new RC.Numerics.Vec3((this._data.size.x - fairygui.GRoot.inst.width) * 0.5, 0,
			(this._data.size.y - fairygui.GRoot.inst.height) * -0.5);
		this._camera.position = this._camera.seekerPos;
		this._camera.cameraTRSChangedHandler = this._graphicManager.OnCameraTRSChanged.bind(this._graphicManager);

		this._graphic = this._graphicManager.CreateGraphic(MapGraphic);
		this._graphic.Load(this._data.model);

		this._tile = new CTile(this._data.tileSlope, this._data.tileAspect, this._data.tileRatio);
		this._input = new Input(this);

		this.camera.UpdateRestriction(RC.Numerics.Vec3.zero,
			new RC.Numerics.Vec3(this._graphic.sprite.width - fairygui.GRoot.inst.width,
				this._graphic.sprite.height - fairygui.GRoot.inst.height, 0));
	}

	public Dispose(): void {
		this._graphicManager.Dispose();
		this._entityManager.Dispose();
		this._tile.Dispose();
	}

	public Update(deltaTime: number): void {
		++this._frame;
		this._deltaTime = deltaTime;
		this._time += this.deltaTime;

		this._context.deltaTime = this.deltaTime;
		this._context.time = this.time;
		this._context.frame = this.frame;

		this._entityManager.Update(this._context);
		this._camera.Update(this._context);
		this._input.Update(this._context);
	}

	public OnResize(e: laya.events.Event): any {
		this.camera.UpdateRestriction(RC.Numerics.Vec3.zero,
			new RC.Numerics.Vec3(this._graphic.sprite.width - fairygui.GRoot.inst.width,
				this._graphic.sprite.height - fairygui.GRoot.inst.height, 0));
	}

	public SetGraphicRoot(graphicRoot: fairygui.GComponent): void {
		graphicRoot.addChild(this.graphicManager.root);
	}

	public CreateBuilding(id: string, position: RC.Numerics.Vec3 = RC.Numerics.Vec3.zero): CBuilding {
		let rid = Utils.MakeRIDFromID(id);
		let param = new EntityParam();
		param.rid = rid;
		param.position = position;
		let entity = this._entityManager.Create(CBuilding, param);
		return <CBuilding>entity;
	}

	public CreateEditingBuilding(id: string, position: RC.Numerics.Vec3 = RC.Numerics.Vec3.zero): EditingBuilding {
		let rid = Utils.MakeRIDFromID(id);
		let param = new EntityParam();
		param.rid = rid;
		param.position = position;
		let entity = this._entityManager.Create(EditingBuilding, param);
		return <EditingBuilding>entity;
	}

	public NewBuilding(id: string, position: RC.Numerics.Vec3): boolean {
		let building = this.CreateBuilding(id, position);
		building.SnapToTile();
		if (!building.CanPlace()) {
			this.input.ChangeState(InputStateType.Layout, building, null, true);
			return false;
		}
		building.Place();
		building.BeginBuild();
		this.NotifyEndLayout();
		this.NotifyUpdateBuilding();
		return true;
	}

	public NotifyStartLayout(): void {
		UIEvent.StartLayout();
	}

	public NotifyEndLayout(): void {
		UIEvent.EndLayout();
	}

	public NotifyUpdateBuilding(): void {
		UIEvent.UpdateBuilding();
	}
}