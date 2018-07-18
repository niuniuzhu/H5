using Core.Misc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace Core.Net
{
	public class WSConnection : TCPConnection
	{
		private const string WebSocketResponseGuid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
		private const string PATTERN = @"^(?<method>[^\s]+)\s(?<path>[^\s]+)\sHTTP\/1\.1\r\n" + // request line
							   @"((?<field_name>[^:\r\n]+):(?([^\r\n])\s)*(?<field_value>[^\r\n]*)\r\n)+" + //headers
							   @"\r\n" + //newline
							   @"(?<body>.+)?";
		private static readonly Regex REGEX = new Regex( PATTERN, RegexOptions.IgnoreCase | RegexOptions.Compiled );
		private const string PolicyResponse =
			"<?xml version=\"1.0\"?>\n" +
			"<cross-domain-policy>\n" +
			"   <allow-access-from domain=\"*\" to-ports=\"*\"/>\n" +
			"   <site-control permitted-cross-domain-policies=\"all\"/>\n" +
			"</cross-domain-policy>\n" +
			"\0";

		internal string scheme;
		internal HashSet<string> subProtocols;

		private bool _handshakeComplete;

		public WSConnection( INetSession session ) : base( session )
		{
		}

		public override void Close()
		{
			this._handshakeComplete = false;
			base.Close();
		}

		protected override void ProcessData( StreamBuffer cache )
		{
			if ( !this._handshakeComplete )
			{
				WSHttpRequest request = ProcessHandShakeData( cache.GetBuffer(), 0, ( int )cache.length, this.scheme );
				if ( request == null )
					return;

				string subProtocol = Negotiate( this.subProtocols, request.subProtocols );

				byte[] responseData = null;
				string version = GetVersion( request );
				switch ( version )
				{
					case "76":
						responseData = ProcessDraft76Handshake( request, subProtocol );
						break;
					case "7":
					case "8":
					case "13":
						responseData = ProcessHybi13Handshake( request, subProtocol );
						break;
					case "policy-file-request":
						responseData = ProcessFlashSocketPolicyRequest();
						break;
				}

				if ( responseData == null )
					return;

				this._handshakeComplete = true;
				this.Send( responseData, 0, responseData.Length );
				cache.Clear();
				return;
			}
			byte[] data = AnalyzeClientData( cache.GetBuffer(), 0, ( int )cache.length );
			if ( data == null )
				return;
			//截断当前缓冲区
			cache.Strip( data.Length, ( int )cache.length - data.Length );

			//todo
			Logger.Log( Encoding.UTF8.GetString( data ) );

			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Recv;
			netEvent.session = this.session;
			netEvent.data = data;
			NetworkMgr.instance.PushEvent( netEvent );

			//缓冲区里可能还有未处理的数据,继续递归处理
			this.ProcessData( cache );
		}

		private static WSHttpRequest ProcessHandShakeData( byte[] bytes, int offset, int size, string scheme )
		{
			string body = Encoding.UTF8.GetString( bytes, offset, size );
			Match match = REGEX.Match( body );

			if ( !match.Success )
				return null;

			WSHttpRequest request = new WSHttpRequest
			{
				method = match.Groups["method"].Value,
				path = match.Groups["path"].Value,
				body = match.Groups["body"].Value,
				bytes = bytes,
				offset = offset,
				size = size,
				scheme = scheme
			};

			CaptureCollection fields = match.Groups["field_name"].Captures;
			CaptureCollection values = match.Groups["field_value"].Captures;
			for ( int i = 0; i < fields.Count; i++ )
			{
				string name = fields[i].ToString();
				string value = values[i].ToString();
				request.headers[name] = value;
			}
			return request;
		}

		private static string GetVersion( WSHttpRequest request )
		{
			if ( request.headers.TryGetValue( "Sec-WebSocket-Version", out string version ) )
				return version;
			if ( request.headers.TryGetValue( "Sec-WebSocket-Draft", out version ) )
				return version;
			if ( request.headers.ContainsKey( "Sec-WebSocket-Key1" ) )
				return "76";
			if ( request.body != null && request.body.ToLower().Contains( "policy-file-request" ) )
				return "policy-file-request";
			return "75";
		}

		private static string Negotiate( HashSet<string> server, string[] client )
		{
			string[] matches = server.Intersect( client ).ToArray();
			return matches.Length == 0 ? string.Empty : matches[0];
		}

		private static byte[] ProcessDraft76Handshake( WSHttpRequest request, string subProtocol )
		{
			Logger.Log( "Building Draft76 Response" );

			StringBuilder builder = new StringBuilder();
			builder.Append( "HTTP/1.1 101 WebSocket Protocol Handshake\r\n" );
			builder.Append( "Upgrade: WebSocket\r\n" );
			builder.Append( "Connection: Upgrade\r\n" );
			builder.AppendFormat( "Sec-WebSocket-Origin: {0}\r\n", request["Origin"] );
			builder.AppendFormat( "Sec-WebSocket-Location: {0}://{1}{2}\r\n", request.scheme, request["Host"], request.path );

			if ( !string.IsNullOrEmpty( subProtocol ) )
				builder.AppendFormat( "Sec-WebSocket-Protocol: {0}\r\n", subProtocol );

			builder.Append( "\r\n" );

			string key1 = request["Sec-WebSocket-Key1"];
			string key2 = request["Sec-WebSocket-Key2"];
			ArraySegment<byte> challenge = new ArraySegment<byte>( request.bytes, request.size - 8 + request.offset, 8 );

			byte[] answerBytes = CalculateAnswerBytes( key1, key2, challenge );
			byte[] byteResponse = Encoding.ASCII.GetBytes( builder.ToString() );

			int byteResponseLength = byteResponse.Length;
			Array.Resize( ref byteResponse, byteResponseLength + answerBytes.Length );
			Array.Copy( answerBytes, 0, byteResponse, byteResponseLength, answerBytes.Length );
			return byteResponse;
		}

		private static byte[] CalculateAnswerBytes( string key1, string key2, ArraySegment<byte> challenge )
		{
			byte[] result1Bytes = ParseKey( key1 );
			byte[] result2Bytes = ParseKey( key2 );

			byte[] rawAnswer = new byte[16];
			Array.Copy( result1Bytes, 0, rawAnswer, 0, 4 );
			Array.Copy( result2Bytes, 0, rawAnswer, 4, 4 );
			Array.Copy( challenge.Array, challenge.Offset, rawAnswer, 8, 8 );

			return MD5.Create().ComputeHash( rawAnswer );
		}

		private static byte[] ParseKey( string key )
		{
			int spaces = key.Count( x => x == ' ' );
			string digits = new string( key.Where( char.IsDigit ).ToArray() );

			int value = ( int )( long.Parse( digits ) / spaces );

			byte[] result = BitConverter.GetBytes( value );
			if ( BitConverter.IsLittleEndian )
				Array.Reverse( result );
			return result;
		}

		private static byte[] ProcessHybi13Handshake( WSHttpRequest request, string subProtocol )
		{
			Logger.Log( "Building Hybi-14 Response" );

			StringBuilder builder = new StringBuilder();

			builder.Append( "HTTP/1.1 101 Switching Protocols\r\n" );
			builder.Append( "Connection: Upgrade\r\n" );
			builder.Append( "Upgrade: websocket\r\n" );
			if ( !string.IsNullOrEmpty( subProtocol ) )
				builder.AppendFormat( "Sec-WebSocket-Protocol: {0}\r\n", subProtocol );

			string responseKey = CreateResponseKey( request["Sec-WebSocket-Key"] );
			builder.AppendFormat( "Sec-WebSocket-Accept: {0}\r\n", responseKey );
			builder.Append( "\r\n" );

			return Encoding.ASCII.GetBytes( builder.ToString() );
		}

		private static string CreateResponseKey( string requestKey )
		{
			string combined = requestKey + WebSocketResponseGuid;
			byte[] bytes = SHA1.Create().ComputeHash( Encoding.ASCII.GetBytes( combined ) );
			return Convert.ToBase64String( bytes );
		}

		private static byte[] ProcessFlashSocketPolicyRequest()
		{
			Logger.Log( "Building Flash Socket Policy Response" );
			return Encoding.UTF8.GetBytes( PolicyResponse );
		}

		/// <summary>
		/// 处理接收的数据
		/// 参考 http://www.cnblogs.com/smark/archive/2012/11/26/2789812.html
		/// </summary>
		private static byte[] AnalyzeClientData( byte[] recBytes, int offset, int length )
		{
			// 如果有数据则至少包括3位
			if ( length < 2 ) return null;
			// 判断是否为结束针
			bool IsEof = ( recBytes[offset] >> 7 ) > 0;
			// 暂不处理超过一帧的数据
			if ( !IsEof ) return null;
			offset++;
			// 是否包含掩码
			bool hasMask = ( recBytes[offset] >> 7 ) > 0;
			// 不包含掩码的暂不处理
			if ( !hasMask ) return null;
			// 获取数据长度
			ulong mPackageLength = ( ulong )recBytes[offset] & 0x7F;
			offset++;
			// 存储4位掩码值
			byte[] Masking_key = new byte[4];
			// 存储数据
			if ( mPackageLength == 126 )
			{
				// 等于126 随后的两个字节16位表示数据长度
				mPackageLength = ( ulong )( recBytes[offset] << 8 | recBytes[offset + 1] );
				offset += 2;
			}
			if ( mPackageLength == 127 )
			{
				// 等于127 随后的八个字节64位表示数据长度
				mPackageLength = ( ulong )( recBytes[offset] << ( 8 * 7 ) | recBytes[offset] << ( 8 * 6 ) | recBytes[offset] << ( 8 * 5 ) | recBytes[offset] << ( 8 * 4 ) | recBytes[offset] << ( 8 * 3 ) | recBytes[offset] << ( 8 * 2 ) | recBytes[offset] << 8 | recBytes[offset + 1] );
				offset += 8;
			}
			byte[] mDataPackage = new byte[mPackageLength];
			for ( ulong i = 0; i < mPackageLength; i++ )
			{
				mDataPackage[i] = recBytes[i + ( ulong )offset + 4];
			}
			Buffer.BlockCopy( recBytes, offset, Masking_key, 0, 4 );
			for ( ulong i = 0; i < mPackageLength; i++ )
				mDataPackage[i] = ( byte )( mDataPackage[i] ^ Masking_key[i % 4] );
			return mDataPackage;
		}
	}
}