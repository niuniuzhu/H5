namespace Core.Net
{
	public interface ITCPListener : IListener
	{
		/// <summary>
		/// 包编码器
		/// </summary>
		PacketEncodeHandler packetEncodeHandler { get; set; }

		/// <summary>
		/// 包解码器
		/// </summary>
		PacketDecodeHandler packetDecodeHandler { get; set; }
	}
}