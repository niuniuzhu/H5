namespace Core.Net
{
	public interface ITCPConnector: IConnector
	{
		int recvBufSize { get; set; }
		PacketEncodeHandler packetEncodeHandler { set; get; }
		PacketDecodeHandler packetDecodeHandler { get; set; }
	}
}