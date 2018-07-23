export abstract class GPoolObject {
	protected _rid: string;

	public get rid(): string { return this._rid; }

	public Dispose(): void {
		this.InternalDispose();
	}

	protected abstract InternalDispose(): void;
}