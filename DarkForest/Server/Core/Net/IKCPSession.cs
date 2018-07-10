namespace Core.Net
{
	public interface IKCPSession : INetSession
	{
		/// <summary>
		/// 此实例持有的连接实例
		/// </summary>
		IKCPConnection connection { get; }
	}
}