import { Protos } from "./libs/protos";

export class Main {
	constructor() {
		console.log("start");
		let login = Protos.GCToLS.AskLogin.create();
		login.uin = "test";
		let data = Protos.GCToLS.AskLogin.encode(login).finish();
		let login2 = Protos.GCToLS.AskLogin.decode(data);
		console.log(login2);
	}
}