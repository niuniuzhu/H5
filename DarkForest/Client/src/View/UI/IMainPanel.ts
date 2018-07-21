namespace View.UI {
	export interface IMainPanel {
		Dispose(): void;
		Enter(): void;
		Exit(): void;
		Update(deltaTime: number): void
		OnResize(e: laya.events.Event): void
	}
}