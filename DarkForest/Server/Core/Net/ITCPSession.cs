namespace Core.Net
{
	public interface ITCPSession : INetSession
	{
		/// <summary>
		/// 此实例持有的连接实例
		/// </summary>
		ITCPConnection connection { get; }
	}
}