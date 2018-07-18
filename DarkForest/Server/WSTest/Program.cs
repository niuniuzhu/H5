using System;
using System.Net.WebSockets;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;

namespace WSTest
{
	class Program
	{
		static void Main( string[] args )
		{
			StartClient();
			Console.ReadLine();
		}

		static async void StartClient()
		{
			ClientWebSocket client = new ClientWebSocket();
			//client.Options.KeepAliveInterval = TimeSpan.FromSeconds( 20 );
			await client.ConnectAsync( new Uri( "ws://127.0.0.1:49997" ), CancellationToken.None );
			//byte[] data = Encoding.UTF8.GetBytes( "hello" );
			//await client.SendAsync( data, WebSocketMessageType.Binary, true, CancellationToken.None );
		}
	}
}
