namespace Shared {
	export class ConsistentRandom {
		private seed: number;

		constructor(seed: number) {
			this.seed = seed;
		}

		private next(min: number, max: number): number {
			max = max || 0;
			min = min || 0;

			this.seed = (this.seed * 9301 + 49297) % 233280;
			let rnd = this.seed / 233280;

			return min + rnd * (max - min);
		}

		public nextInt(min: number, max: number): number {
			return Math.round(this.next(min, max));
		}

		public nextDouble(): number {
			return this.next(0, 1);
		}

		public pick(collection: any[]): any {
			return collection[this.nextInt(0, collection.length - 1)];
		}
	}
}