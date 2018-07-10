using System.Net;
using System.Net.Sockets;

namespace Core.Net
{
	public interface IConnection
	{
		/// <summary>
		/// 此连接持有的Socket实例
		/// </summary>
		Socket socket { get; set; }

		/// <summary>
		/// 远程终端
		/// </summary>
		EndPoint remoteEndPoint { get; set; }

		/// <summary>
		/// 本地终端
		/// </summary>
		EndPoint localEndPoint { get; set; }

		/// <summary>
		/// 此连接关联的session
		/// </summary>
		INetSession session { get; }

		/// <summary>
		/// 接收缓冲区大小
		/// </summary>
		int recvBufSize { set; }

		/// <summary>
		/// 是否已连接
		/// </summary>
		bool connected { get; }

		/// <summary>
		/// 销毁此实例
		/// </summary>
		void Dispose();

		/// <summary>
		/// 释放内存
		/// </summary>
		void Release();

		/// <summary>
		/// 关闭此连接
		/// </summary>
		void Close();

		/// <summary>
		/// 设置套接字参数
		/// </summary>
		void SetOpt( SocketOptionName optionName, object opt );

		/// <summary>
		/// 异步发送数据
		/// </summary>
		/// <returns></returns>
		bool Send( byte[] data, int offset, int size );

		/// <summary>
		/// 开始接收数据
		/// </summary>
		/// <returns></returns>
		bool StartReceive();
	}
}