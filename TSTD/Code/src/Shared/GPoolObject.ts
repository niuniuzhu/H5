namespace Shared {
	export abstract class GPoolObject {
		protected _rid: string;
		protected _disposed: boolean;

		public get rid(): string { return this._rid; }
		public get disposed(): boolean { return this._disposed; }

		public Dispose(): void {
			this.InternalDispose();
			this._disposed = true;
		}

		protected abstract InternalDispose(): void;
	}
}