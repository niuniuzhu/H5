namespace Core.Net
{
	/*kcp协议
	 uint connKey
	 uint connID
	 byte 是否通过kcp传输
	 如果是通过kcp传输(不通过kcp传输的一定是内部协议)
		byte 是否内部协议
	 ...	内容
	 */
	public static class KCPConfig
	{
		public const ushort HANDSHAKE_SIGNATURE = 0;
		public const ushort ACK_HANDSHAKE_SIGNATURE = 1;
		public const ushort PING_SIGNATURE = 2;
		public const ushort PONG_SIGNATURE = 3;
		public const ushort TIMEOUT_SIGNATURE = 4;

		public const int SIZE_OF_INTERNAL_FLAG = sizeof( byte );
		public const int SIZE_OF_SIGNATURE = sizeof( ushort );
		public const int SIZE_OF_CONN_KEY = sizeof( uint );
		public const int SIZE_OF_SESSION_ID = sizeof( uint );
		public const int SIZE_OF_HEAD = sizeof( byte ) + SIZE_OF_CONN_KEY + SIZE_OF_SESSION_ID;

		public const uint CONN_KEY = 0x11223344;
		public const byte INTERNAL_MODULE = 0x63;//外部协议模块id从100开始
		public const byte INVALID_SESSION_ID = 0;

		public static int KCP_NO_DELAY = 1;
		public static int KCP_INTERVAL = 20;
		public static int KCP_RESEND = 2;
		public static int KCP_NC = 1;
		public static int KCP_SND_WIN = 128;
		public static int KCP_REV_WIN = 128;
		public static int KCP_MTU = 512;

		public static bool USE_KCP_NATIVE;
		public static int BUFFER_SIZE = 512;
		public static int CONNECTION_TIMEOUT = 5000;
		public static int HANDSHAKE_INTERVAL = 1000;
		public static int PING_INTERVAL = 5000;
		public static int PING_TIMEOUT = 3000;
	}
}