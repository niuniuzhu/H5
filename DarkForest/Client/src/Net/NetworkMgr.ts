import { ByteUtils } from "./ByteUtils";
import { MsgCenter } from "./MsgCenter";
import { Protos } from "../libs/protos";

export class NetworkMgr {
	private static _instance: NetworkMgr;
	public static get instance(): NetworkMgr {
		if (NetworkMgr._instance == null)
			NetworkMgr._instance = new NetworkMgr();
		return NetworkMgr._instance;
	}

	private _socket: WebSocket;
	private _msgCenter: MsgCenter;

	public get connected(): boolean { return this._socket.readyState == WebSocket.OPEN };

	public get OnConnected(): (this: WebSocket, ev: Event) => any { return this._socket.onopen; }
	public set OnConnected(handler: (this: WebSocket, ev: Event) => any) { this._socket.onopen = handler; }

	public get OnClosed(): (this: WebSocket, ev: Event) => any { return this._socket.onclose; }
	public set OnClosed(handler: (this: WebSocket, ev: Event) => any) { this._socket.onclose = handler; }

	public get OnError(): (this: WebSocket, ev: Event) => any { return this._socket.onerror; }
	public set OnError(handler: (this: WebSocket, ev: Event) => any) { this._socket.onerror = handler; }

	constructor() {
		this._msgCenter = new MsgCenter();
	}

	public Connect(ip: string, port: number): void {
		this._socket = new WebSocket(`ws://${ip}:${port}`);
		this._socket.onmessage = this.OnReceived.bind(this);
	}

	private OnReceived(ev: MessageEvent): void {
		let data: Uint8Array = ev.data;
		let offset = 0;
		let size = data.length;
		//剥离第一层消息ID
		let msgID = ByteUtils.Decode32u(data, offset);
		offset += 4;
		size -= 4;
		//检查是否注册了处理函数,否则调用未处理数据的函数
		let handler = this._msgCenter.GetHandler(msgID);
		if (handler != null)
			handler(data, offset, size, msgID);
		else
			RC.Logger.Warn(`"invalid msg:${msgID}.`);
	}

	public Send(msgID: Protos.MsgID, data: Uint8Array): void {
		let newData = new Uint8Array(data.length + 4);
		ByteUtils.Encode32u(newData, 0, <number>msgID);
		newData.set(data, 4);
		this._socket.send(newData);
	}

	public Close(): void {
		this._socket.close();
	}

	public RegisterMsg(msgID: number, handler: (data: Uint8Array, offset: number, size: number, msgID: number) => void): void {
		this._msgCenter.Register(msgID, handler);
	}

	public UnregisterMsg(msgID: number, handler: (data: Uint8Array, offset: number, size: number, msgID: number) => void): boolean {
		return this._msgCenter.Unregister(msgID, handler);
	}
}