using System.Net.Sockets;

namespace Core.Net
{
	public interface IConnector
	{
		Socket socket { get; set; }
		INetSession session { get; }
		bool connected { get; }
		void Dispose();
		void Close();
		bool Connect( string ip, int port );
		bool ReConnect();
	}
}