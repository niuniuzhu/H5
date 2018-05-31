namespace View {
	export class CTileMap {
		private _mapData: number[];
		private _graph: RC.Algorithm.Graph.Graph2D;

		constructor(id: string) {
			id = id + "_data";
			this._mapData = [];
			let image = <fairygui.GImage>fairygui.UIPackage.createObject("global", id);
			let texture = image.image.tex;
			let pixels = texture.getPixels(0, 0, texture.width, texture.height);
			for (let i = 0; i < pixels.length; i += 4) {
				this._mapData.push(pixels[i]);
			}
			image.dispose();
			this._graph = RC.Algorithm.Graph.Graph2D.CreateHVDigraph(texture.height, texture.width, this.GetCost.bind(this));
			// let path = RC.Algorithm.Graph.GraphSearcher.AStarSearch(this._graph, this.CoordToIndex(3, 8), this.CoordToIndex(3, 26));
			// console.log(path);
			// for(let p of path){
			// 	console.log(this.IndexToCoord(p));
			// }
			// path = RC.Algorithm.Graph.GraphSearcher.AStarSearch(this._graph, this.CoordToIndex(17, 22), this.CoordToIndex(17, 5));
			// console.log(path);
			// for(let p of path){
			// 	console.log(this.IndexToCoord(p));
			// }
		}

		private GetCost(index: number): number {
			return this._mapData[index];
		}

		public AStarSearch(from: number, to: number): number[] {
			return RC.Algorithm.Graph.GraphSearcher.AStarSearch(this._graph, from, to);
		}

		public CoordToIndex(x: number, y: number): number {
			return this._graph.CoordToIndex(RC.Numerics.MathUtils.Floor(x), RC.Numerics.MathUtils.Floor(y));
		}

		public IndexToCoord(index: number): RC.Numerics.Vec2 {
			let arr = this._graph.IndexToCoord(index);
			return new RC.Numerics.Vec2(arr[0], arr[1]);
		}
	}
}