using System;
using System.Net.WebSockets;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;

namespace WSTest
{
	class Program
	{
		static byte[] _buffer = new byte[1024];

		static void Main( string[] args )
		{
			StartClient();
			Console.ReadLine();
		}

		static async void StartClient()
		{
			ClientWebSocket client = new ClientWebSocket();
			//client.Options.KeepAliveInterval = TimeSpan.FromSeconds( 20 );
			await client.ConnectAsync( new Uri( "ws://localhost:49997" ), CancellationToken.None );
			//await client.ConnectAsync( new Uri( "ws://121.40.165.18:8800" ), CancellationToken.None );
			Console.WriteLine( "connected" );
			await client.ReceiveAsync( _buffer, CancellationToken.None );
			//byte[] data = Encoding.UTF8.GetBytes( "hello" );
			//await client.SendAsync( data, WebSocketMessageType.Binary, true, CancellationToken.None );
		}
	}
}
