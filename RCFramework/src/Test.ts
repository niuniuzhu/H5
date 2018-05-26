namespace RC {
	export class Test {
		constructor() {
			let graph = RC.Algorithm.Graph.Graph2D.CreateFullDigraph(10, 10, this.F.bind(this));
			let path = RC.Algorithm.Graph.GraphSearcher.AStarSearch(graph, 0, 99);
			console.log(path);
			let queue = new RC.Collections.PriorityQueue<RC.Algorithm.Graph.NumberPair>(RC.Algorithm.Graph.NumberPair.NumberCompare);
			queue.add(new RC.Algorithm.Graph.NumberPair(1, 4));
			queue.add(new RC.Algorithm.Graph.NumberPair(2, 3));
			queue.add(new RC.Algorithm.Graph.NumberPair(3, 2));
			queue.add(new RC.Algorithm.Graph.NumberPair(4, 1));
			while (!queue.isEmpty())
				console.log(queue.dequeue());
		}

		private _i: number = 0;
		private F(index:number): number {
			return this._i++;
		}
	}
}