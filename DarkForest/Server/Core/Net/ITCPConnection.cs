namespace Core.Net
{
	public interface ITCPConnection : IConnection
	{
		/// <summary>
		/// 包编码器
		/// </summary>
		PacketEncodeHandler packetEncodeHandler { set; get; }

		/// <summary>
		/// 包解码器
		/// </summary>
		PacketDecodeHandler packetDecodeHandler { set; }

		/// <summary>
		/// 同步发送数据
		/// </summary>
		int SendSync( byte[] data, int offset, int size );

	}
}