namespace View.UI {
	export interface IUIModule{
		Dispose():void;
		Enter(param:any):void;
		Leave():void;
		Update(deltaTime: number):void;
	}
}