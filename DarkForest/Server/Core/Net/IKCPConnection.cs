namespace Core.Net
{
	public enum KCPConnectionState
	{
		Disconnect,
		Connecting,
		Connected
	}

	public interface IKCPConnection : IConnection
	{
		/// <summary>
		/// 此连接的状态
		/// </summary>
		KCPConnectionState state { get; set; }

		/// <summary>
		/// 开始ping远程连接,通常由监听者调用
		/// </summary>
		void StartPing();

		/// <summary>
		/// 不通过KCP层直接发送
		/// </summary>
		void SendDirect( byte[] data, int offset, int size );

		/// <summary>
		/// 处理接收的数据
		/// </summary>
		void ProcessData( byte[] data, int offset, int size );

		/// <summary>
		/// 发送握手消息
		/// </summary>
		void SendHandShake();
	}
}