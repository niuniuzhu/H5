namespace RC.Algorithm.Graph {
	export class GraphSearcher {
		public static PrimSearch(graph: GraphBase, start: number): GraphEdge[] {
			let shortestPathPredecessors: GraphEdge[] = [];
			let visitedNodes = new Set<number>();
			let nodeQueue = new RC.Collections.PriorityQueue<GraphEdge>(GraphEdge.Compare);

			let node = graph.GetNodeAt(start);
			// 把该节点的作为父节点标记为已访问
			while (node != null) {
				// 把该节点标记为已访问
				visitedNodes.add(node.index);

				// 插入所有连接该节点的边
				for (let edge of node.edges)
					nodeQueue.enqueue(edge);

				let edage = nodeQueue.dequeue();// 获取消费最小的边
				while (edage != null && visitedNodes.has(edage.to))// 是否和访问过的节点形成闭合回路
				{
					edage = nodeQueue.dequeue();// 是的话跳过该边
				}

				// 当剩下的边和访问过的边能组合成闭合回路时搜索完成
				if (edage == null)
					break;

				// 此时该边已是有效的最小消费边
				shortestPathPredecessors.push(edage);
				node = graph.GetNodeAt(edage.to);
			}
			return shortestPathPredecessors;
		}

		public static AStarSearch(graph: GraphBase, start: number, end: number): number[] {
			let shortestPathPredecessors = new RC.Collections.Dictionary<number, GraphEdge>();
			let frontierPredecessors = new RC.Collections.Dictionary<number, GraphEdge>();
			let nodeQueue = new RC.Collections.PriorityQueue<NumberPair>(NumberPair.NumberCompare);
			let costToNode = new RC.Collections.Dictionary<number, number>();

			costToNode.setValue(start, 0);
			frontierPredecessors.setValue(start, null);

			// Create an indexed priority queue of nodes. The nodes with the
			// lowest estimated total cost to target via the node are positioned at the front.
			// Put the source node on the queue.
			nodeQueue.enqueue(new NumberPair(start, 0));

			// if the queue is not empty..
			while (nodeQueue.size() > 0) {
				// get lowest cost node from the queue
				let nextClosestNode = nodeQueue.dequeue();

				// move this node from the frontier to the spanning tree
				let predecessor: GraphEdge = frontierPredecessors.getValue(nextClosestNode.first);
				shortestPathPredecessors.setValue(nextClosestNode.first, predecessor);

				// If the target has been found, return
				if (end == nextClosestNode.first)
					break;

				// Now to test all the edges attached to this node
				let edages = graph.GetNodeAt(nextClosestNode.first).edges;
				for (let edge of edages) {
					let totalCost = costToNode.getValue(nextClosestNode.first) + edge.cost;
					let estimatedTotalCostViaNode = totalCost + 0;// todo

					// if the node has not been added to the frontier, add it and update the costs
					if (!frontierPredecessors.containsKey(edge.to)) {
						costToNode.setValue(edge.to, totalCost);
						frontierPredecessors.setValue(edge.to, edge);
						nodeQueue.enqueue(new NumberPair(edge.to, estimatedTotalCostViaNode));
					}

					// if this node is already on the frontier but the cost to get here
					// is cheaper than has been found previously, update the node
					// costs and frontier accordingly.
					else if (totalCost < costToNode.getValue(edge.to) &&
						!shortestPathPredecessors.containsKey(edge.to)) {
						costToNode.setValue(edge.to, totalCost);
						frontierPredecessors.setValue(edge.to, edge);
						nodeQueue.forEach((element) => {
							if (element.first == edge.to) {
								element.second = estimatedTotalCostViaNode;
								return;
							}
						});
						nodeQueue.update();
					}
				}
			}

			let pathList: number[] = [];
			for (let node = end;
				shortestPathPredecessors.getValue(node) != null;
				node = shortestPathPredecessors.getValue(node).from)
				pathList.push(node);
			pathList.push(start);
			pathList.reverse();
			return pathList;
		}
	}

	export class NumberPair {
		public first: number;
		public second: number;

		constructor(first: number, second: number) {
			this.first = first;
			this.second = second;
		}

		public static NumberCompare(a: NumberPair, b: NumberPair): number {
			if (a.second > b.second) {
				return -1;
			} if (a.second < b.second) {
				return 1;
			}
			return 0;
		}
	}
}