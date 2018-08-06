import { Home } from "./Home";
import { CEntity } from "./CEntity";
import { CBuilding } from "./CBuilding";
import { EditingBuilding } from "./EditingBuilding";
import { UpdateContext } from "./UpdateContext";
import { EntityParam } from "../Shared/Model/EntityParam";
import { GPoolObject } from "./GPoolObject";
import { GPool } from "./GPool";

export class CEntityManager {
	private readonly _owner: Home;
	private readonly _gPool: GPool;
	private readonly _entities: CEntity[];
	private readonly _idToEntity: RC.Collections.Dictionary<string, CEntity>;
	private readonly _typeToEntity: RC.Collections.Dictionary<new () => CEntity, CEntity[]>;

	constructor(owner: Home) {
		this._owner = owner;
		this._gPool = new GPool();
		this._entities = [];
		this._idToEntity = new RC.Collections.Dictionary<string, CEntity>();
		this._typeToEntity = new RC.Collections.Dictionary<new () => CEntity, CEntity[]>();
		this._typeToEntity.setValue(CBuilding, []);
		this._typeToEntity.setValue(EditingBuilding, []);
	}

	public Dispose(): void {
		this._entities.forEach((entity) => {
			entity.MarkToDestroy();
		});
		this.DestroyEnties();
		this._gPool.Dispose();
	}

	private DestroyEnties(): void {
		let count = this._entities.length;
		for (let i = 0; i < count; i++) {
			let entity = this._entities[i];
			if (!entity.markToDestroy)
				continue;
			entity.OnRemoveFromBattle();
			this._entities.splice(i, 1);
			this._idToEntity.remove(entity.rid);
			let entities = this._typeToEntity.getValue(<any>entity.constructor);
			entities.splice(entities.indexOf(entity), 1);
			this._gPool.Push(entity);
			--i;
			--count;
		}
	}

	public Create<T extends CEntity>(c: new () => T, param: EntityParam): GPoolObject {
		let entity = <CEntity>this._gPool.Pop(c);
		this._idToEntity.setValue(param.rid, entity);
		this._typeToEntity.getValue(c).push(entity);
		this._entities.push(entity);
		entity.OnCreated(this._owner, param);
		return entity;
	}

	public GetBuildings(): CBuilding[] {
		let result: CBuilding[] = [];
		let buildings = <CBuilding[]>this._typeToEntity.getValue(CBuilding);
		for (let building of buildings) {
			if (building.markToDestroy || building.underConstruction)
				continue;
			result.push(building);
		}
		return result;
	}

	public GetEntity(rid: string): CEntity {
		if (rid == null || rid == undefined)
			return null;
		let entity = this._idToEntity.getValue(rid);
		return entity;
	}

	public GetEntityAt(index: number): CEntity {
		if (index < 0 ||
			index > this._entities.length - 1)
			return null;
		return this._entities[index];
	}

	public Update(context: UpdateContext): void {
		// 更新状态
		this.UpdateState(context);
		// 清理实体
		this.DestroyEnties();
	}

	private UpdateState(context: UpdateContext): void {
		this._entities.forEach((entity) => {
			entity.OnUpdateState(context);
		});
	}
}