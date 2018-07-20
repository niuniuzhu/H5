namespace Shared.Net {
	export class NetworkMgr {
		private static _instance: NetworkMgr;
		public static get instance(): NetworkMgr {
			if (NetworkMgr._instance == null)
				NetworkMgr._instance = new NetworkMgr();
			return NetworkMgr._instance;
		}

		private _socket: WebSocket;

		public get connected(): boolean { return this._socket.readyState == WebSocket.OPEN };

		public Connect(ip: string, port: number): void {
			this._socket = new WebSocket(`ws://${ip}:${port}`);
			this._socket.onopen = this.OnConnected.bind(this);
			this._socket.onclose = this.OnClosed.bind(this);
			this._socket.onerror = this.OnError.bind(this);
			this._socket.onmessage = this.OnReceived.bind(this);
		}

		private OnConnected(ev: Event): any {
			console.log("socket connected");
		}

		private OnClosed(ev: CloseEvent): void {
			console.log("socket closed");
		}

		private OnError(ev: Event): void {
			console.log("socket error");
		}

		private OnReceived(ev: MessageEvent): void {
		}

		public Send(): void {
			this._socket.send("test");
		}
	}
}