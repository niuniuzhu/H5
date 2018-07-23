using Core.Misc;
using Core.Net;

namespace Shared.Net
{
	public class NetSessionBase : NetSession
	{
		public NetSessionMgr owner { get; set; }
		public int logicID { get; set; }
		public SessionType type { get; set; }

		protected readonly MsgCenter _msgCenter;

		protected NetSessionBase(uint id, ProtoType type) : base(id, type)
		{
			this._msgCenter = new MsgCenter();
		}

		protected override void OnHeartBeat(long dt)
		{
		}

		protected override void OnConnError(string error)
		{
		}

		protected override void OnEstablish()
		{
			if (this.isPassive)
				this.owner.AddSession(this);
		}

		protected override void OnClose(string reason)
		{
			if (this.isPassive)
				this.owner.RemoveSession(this);
		}

		protected override void OnRecv(byte[] data, int offset, int size)
		{
			if (this._closed)
				return;

			int len = data.Length;
			if (len - offset < sizeof(int))
			{
				Logger.Warn($"invalid msg.");
				return;
			}

			//剥离第一层消息ID
			int msgID = 0;
			offset += ByteUtils.Decode32i(data, offset, ref msgID);
			size -= offset;
			//检查是否注册了处理函数,否则调用未处理数据的函数
			if (this._msgCenter.TryGetHandler(msgID, out MsgCenter.GeneralHandler msgHandler))
				msgHandler.Invoke(data, offset, size, msgID);
			else if (this._msgCenter.TryGetHandler(msgID, out MsgCenter.TransHandler transHandler))
			{
				if (len - offset < sizeof(int) + sizeof(uint))
				{
					Logger.Warn($"invalid msg.");
					return;
				}
				int transID = msgID;
				uint gcNetID = 0;
				//剥离第二层消息ID
				offset += ByteUtils.Decode32i(data, offset, ref msgID);
				//剥离客户端网络ID
				offset += ByteUtils.Decode32u(data, offset, ref gcNetID);
				size -= sizeof(int) + sizeof(uint);
				transHandler.Invoke(data, offset, size, transID, msgID, gcNetID);
			}
			else
				Logger.Warn($"invalid msg:{msgID}.");
		}

		protected override void OnSend()
		{
		}

		protected override void OnError(string error)
		{
		}
	}
}