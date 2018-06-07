namespace View.UI {
	export class GestureComponent {
		private _root: fairygui.GComponent;
		private readonly _line: fairygui.GComponent;
		private readonly _keypad: fairygui.GComponent;
		private readonly _keys: KeyComponent[];
		private readonly _keyRadius: number;
		private readonly _keyLine: KeyLineComponent;
		private readonly _touched: KeyComponent[];
		private readonly _lines: fairygui.GComponent[];
		private readonly _successtHandler: () => void;
		private readonly _errorHandler: () => void;
		private _path: number[];

		constructor(root: fairygui.GComponent, successtHandler: () => void, errorHandler: () => void) {
			this._root = root;
			this._keypad = this._root.getChild("keypad").asCom;
			this._line = this._keypad.getChild("line").asCom;
			this._keys = [];
			for (let i = 0; i < 9; ++i) {
				this._keys.push(new KeyComponent(this._keypad.getChild("n" + i).asCom, i));
			}
			this._keyRadius = this._keys[0].width * 0.5;
			this._keyLine = new KeyLineComponent();
			this._touched = [];
			this._lines = [];
			this._successtHandler = successtHandler;
			this._errorHandler = errorHandler;
		}

		public Dispose(): void {
			this._keyLine.Dispose();
		}

		public Update(deltaTime: number): void {
		}

		public OnResize(e: laya.events.Event): void {
		}

		private OnTouchBegin(e: laya.events.Event): void {
			fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
			fairygui.GRoot.inst.displayObject.on(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
		}

		private OnTouchMove(e: laya.events.Event): void {
			let p = this._keypad.globalToLocal(e.stageX, e.stageY);
			let v = new RC.Numerics.Vec2(p.x, p.y)
			let key = this.PointOverKey(v, this._keyRadius);
			if (key != null) {
				if (this._touched.indexOf(key) < 0) {
					key.state = 2;
					if (this._touched.length > 0)
						this.UpdateVisual(key, this._touched[this._touched.length - 1]);
					this._touched.push(key);
					this._keyLine.AttachTo(key);
					if (this._touched.length == this._path.length) {
						this.HandleTouchEnd();
					}
				}
				this._keyLine.UpdateVisual(new RC.Numerics.Vec2(key.x, key.y));
			}
			else
				this._keyLine.UpdateVisual(v);
		}

		private OnTouchEnd(e: laya.events.Event): void {
			if (this._touched.length == 0) {
				fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
				fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
				return;
			}
			this.HandleTouchEnd();
		}

		private HandleTouchEnd(): void {
			fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_MOVE, this, this.OnTouchMove);
			fairygui.GRoot.inst.displayObject.off(Laya.Event.MOUSE_UP, this, this.OnTouchEnd);
			if (this._touched.length != this._path.length)
				this.HandleIncorrectGesture();
			else {
				let pass = true;
				for (let i = 0; i < this._path.length; ++i) {
					if (this._path[i] != this._touched[i].id) {
						pass = false;
						break;
					}
				}
				if (pass)
					this.HandleCorrectGesture();
				else
					this.HandleIncorrectGesture();
			}
		}

		private HandleCorrectGesture(): void {
			this._successtHandler();
		}

		private HandleIncorrectGesture(): void {
			this._errorHandler();
		}

		private UpdateVisual(key: KeyComponent, lastKey: KeyComponent): void {
			let line = fairygui.UIPackage.createObject("main", "key_line").asCom;
			this._lines.push(line);
			line.setXY(lastKey.x, lastKey.y);
			this._line.addChild(line);
			let orgiPos = new RC.Numerics.Vec2(lastKey.x, lastKey.y);
			let curPos = new RC.Numerics.Vec2(key.x, key.y);
			let vec = RC.Numerics.Vec2.Sub(curPos, orgiPos);
			let dist = vec.Magnitude();
			line.height = dist;
			if (dist == 0)
				return;
			let dir = RC.Numerics.Vec2.DivN(vec, dist);
			let angle = RC.Numerics.Vec2.Dot(RC.Numerics.Vec2.up, dir);
			angle = RC.Numerics.MathUtils.Clamp(angle, -1, 1);
			angle = RC.Numerics.MathUtils.RadToDeg(RC.Numerics.MathUtils.Acos(angle));
			let sign = dir.x > 0 ? -1 : 1;
			line.rotation = angle * sign;
		}

		private PointOverKey(v: RC.Numerics.Vec2, radius: number): KeyComponent {
			let r2 = radius * radius;
			for (let key of this._keys) {
				let dx = v.x - key.x;
				let dy = v.y - key.y;
				if (dx * dx + dy * dy < r2) {
					return key;
				}
			}
			return null;
		}

		public TouchEnd(): void {
			this.HandleTouchEnd();
		}

		public Show(): void {
			let graph = RC.Algorithm.Graph.Graph2D.CreateFullDigraph(3, 3);
			let start = RC.Numerics.MathUtils.Floor(RC.Numerics.MathUtils.Random(0, 9));
			let path = RC.Algorithm.Graph.GraphSearcher.MazeSearch(graph, start, 7, RC.Numerics.MathUtils.Random);
			for (let p of path)
				this._keys[p].selectedIndex = 1;
			this._keys[path[0]].state = 2;
			for (let i = 0; i < path.length - 1; ++i) {
				let curPoint = graph.IndexToCoord(path[i]);
				let nextPoint = graph.IndexToCoord(path[i + 1]);
				let curPos = new RC.Numerics.Vec2(curPoint[0], curPoint[1]);
				let nextPos = new RC.Numerics.Vec2(nextPoint[0], nextPoint[1]);
				let dir = RC.Numerics.Vec2.Sub(nextPos, curPos);
				dir.Normalize();
				let angle = RC.Numerics.Vec2.Dot(RC.Numerics.Vec2.up, dir);
				angle = RC.Numerics.MathUtils.Clamp(angle, -1, 1);
				angle = RC.Numerics.MathUtils.RadToDeg(RC.Numerics.MathUtils.Acos(angle));
				let sign = dir.x > 0 ? -1 : 1;
				this._keys[path[i]].rotation = angle * sign;
			}
			this._path = path;
			this._keypad.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
			this._root.getTransition("t0").play();
		}

		public Hide(completeHandler: () => void): void {
			this._keypad.displayObject.off(Laya.Event.MOUSE_DOWN, this, this.OnTouchBegin);
			this._root.getTransition("t1").play(new laya.utils.Handler(this, () => {
				this._keyLine.Detach();
				for (let key of this._keys) {
					key.state = 0;
					key.selectedIndex = 0;
				}
				this._touched.splice(0);
				for (let line of this._lines)
					line.dispose();
				this._lines.splice(0);
				completeHandler();
			}));
		}
	}
}