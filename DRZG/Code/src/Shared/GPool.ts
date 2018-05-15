namespace Shared {
	export class GPool {
		private readonly _typeToObjects: RC.Collections.Dictionary<string, RC.Collections.Queue<GPoolObject>>;

		constructor() {
			this._typeToObjects = new RC.Collections.Dictionary<string, RC.Collections.Queue<GPoolObject>>();
		}

		public Count<T extends GPoolObject>(c: new () => T): number {
			let n: string = (<any>c).name;
			let objs = this._typeToObjects.getValue(n);
			return objs.size();
		}

		public Pop<T extends GPoolObject>(c: new () => T): GPoolObject {
			let n: string = (<any>c).name;
			let objs = this._typeToObjects.getValue(n);
			if (objs == null) {
				objs = new RC.Collections.Queue<GPoolObject>();
				this._typeToObjects.setValue(n, objs);
			}
			let obj = objs.size() == 0 ? new c() : objs.dequeue();
			return obj;
		}

		public Push<T extends GPoolObject>(obj: T): void {
			let n: string = (<any>obj).constructor.name;
			let q = this._typeToObjects.getValue(n);
			q.enqueue(obj);
		}

		public Dispose(): void {
			this._typeToObjects.forEach((k, v) => {
				while (v.size() > 0) {
					let obj = v.dequeue();
					obj.Dispose();
				}
			});
			this._typeToObjects.clear();
		}
	}
}