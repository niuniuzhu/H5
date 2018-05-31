namespace RC {
	export class Test {
		constructor() {
			let v = RC.Numerics.Vec2.right;
			console.log(v.Rotate(RC.Numerics.MathUtils.DegToRad(90)));
			let graph = RC.Algorithm.Graph.Graph2D.CreateFullDigraph(3, 3, this.F.bind(this));
			let path = RC.Algorithm.Graph.GraphSearcher.MazeSearch(graph, 0, -1, RC.Numerics.MathUtils.Random);
			console.log(path);
		}

		private _i: number = 0;
		private F(index: number): number {
			return this._i++;
		}
	}
}