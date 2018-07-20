﻿using Core.Misc;
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
		private enum FrameType : byte
		{
			Continuation,
			Text,
			Binary,
			Close = 8,
			Ping = 9,
			Pong = 10,
		}

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
			lock ( this._lockObj )
			{
				this._handshakeComplete = false;
				base.Close();
			}
		}

		public override bool Send( byte[] data, int offset, int size )
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			Hybi13FrameData( buffer, data, offset, size, FrameType.Binary );
			this._sendQueue.Push( buffer );
			return true;
		}

		public override void NotifyClose()
		{
			StreamBuffer inBuffer = this._bufferPool.Pop();
			const int fin = 1, rsv1 = 0, rsv2 = 0, rsv3 = 0;
			const int op = ( int )FrameType.Close;
			const int ctrlFrame = op | rsv3 << 4 | rsv2 << 5 | rsv1 << 6 | fin << 7;
			inBuffer.Write( ( byte )ctrlFrame );
			inBuffer.Write( ( byte )0 );
			base.Send( inBuffer.GetBuffer(), 0, inBuffer.length );
			inBuffer.Clear();
			this._bufferPool.Push( inBuffer );
		}

		protected override void ProcessData( StreamBuffer cache )
		{
			do
			{
				if ( cache.length == 0 )
					break;

				if ( !this._handshakeComplete )
				{
					WSHttpRequest request = ProcessHandShakeData( cache.GetBuffer(), 0, cache.length, this.scheme );
					if ( request == null )
						break;

					string subProtocol = Negotiate( this.subProtocols, request.subProtocols );
					byte[] responseData = ProcessHybi13Handshake( request, subProtocol );
					if ( responseData == null )
						break;

					this._handshakeComplete = true;
					this.Send( responseData, 0, responseData.Length );
					cache.Clear();

					NetEvent netEvent = NetworkMgr.instance.PopEvent();
					netEvent.type = NetEvent.Type.Establish;
					netEvent.session = this.session;
					NetworkMgr.instance.PushEvent( netEvent );
					break;
				}

				byte[] data = AnalyzeClientData( cache.GetBuffer(), 0, cache.length );
				if ( data == null )
					break;

				//截断当前缓冲区
				cache.Strip();

				//todo
				if ( data.Length > 0 )
				{
					Logger.Debug( Encoding.UTF8.GetString( data ) + ":" + data.Length );
					this.Send( data, 0, data.Length );
				}

				//NetEvent netEvent = NetworkMgr.instance.PopEvent();
				//netEvent.type = NetEvent.Type.Recv;
				//netEvent.session = this.session;
				//netEvent.data = data;
				//NetworkMgr.instance.PushEvent( netEvent );

				//缓冲区里可能还有未处理的数据,递归处理
				this.ProcessData( cache );
			} while ( false );
			this._reading = false;
		}

		private static WSHttpRequest ProcessHandShakeData( byte[] data, int offset, int size, string scheme )
		{
			string body = Encoding.UTF8.GetString( data, offset, size );
			Match match = REGEX.Match( body );

			if ( !match.Success )
				return null;

			WSHttpRequest request = new WSHttpRequest
			{
				method = match.Groups["method"].Value,
				path = match.Groups["path"].Value,
				body = match.Groups["body"].Value,
				bytes = data,
				offset = offset,
				size = size,
				scheme = scheme
			};

			CaptureCollection fields = match.Groups["field_name"].Captures;
			CaptureCollection values = match.Groups["field_value"].Captures;
			int count = fields.Count;
			for ( int i = 0; i < count; i++ )
			{
				string name = fields[i].ToString();
				string value = values[i].ToString();
				request.headers[name] = value;
			}
			return request;
		}

		private static string Negotiate( IEnumerable<string> server, IEnumerable<string> client )
		{
			string[] matches = server.Intersect( client ).ToArray();
			return matches.Length == 0 ? string.Empty : matches[0];
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
			StringBuilder builder = new StringBuilder();
			builder.AppendLine( "HTTP/1.1 101 Switching Protocols" );
			builder.AppendLine( "Upgrade: websocket" );
			builder.AppendLine( "Connection: Upgrade" );
			string responseKey =
				Convert.ToBase64String(
					SHA1.Create().ComputeHash( Encoding.UTF8.GetBytes( request["Sec-WebSocket-Key"] + WebSocketResponseGuid ) ) );
			builder.AppendLine( $"Sec-WebSocket-Accept: {responseKey}" );
			if ( !string.IsNullOrEmpty( subProtocol ) )
				builder.AppendLine( $"Sec-WebSocket-Protocol: {subProtocol}" );
			builder.AppendLine();
			Logger.Info( builder.ToString() );
			return Encoding.UTF8.GetBytes( builder.ToString() );
		}

		/// <summary>
		/// 处理接收的数据
		/// 参考 http://www.cnblogs.com/smark/archive/2012/11/26/2789812.html
		/// </summary>
		private static byte[] AnalyzeClientData( byte[] data, int offset, int size )
		{
			// 如果有数据则至少包括3位
			if ( size < 2 ) return null;
			// 判断是否为结束针
			byte value = data[offset];
			int IsEof = value >> 7;
			Logger.Log( "eof:" + IsEof );
			FrameType op = ( FrameType )( value & 0xf );
			Logger.Log( "op:" + op );
			offset++;

			value = data[offset];
			// 是否包含掩码
			bool hasMask = value >> 7 > 0;
			Logger.Log( "hasMask:" + hasMask );
			// 获取数据长度
			ulong packageLength = ( ulong )value & 0x7F;
			offset++;
			// 存储数据
			if ( packageLength == 126 )
			{
				// 等于126 随后的两个字节16位表示数据长度
				packageLength = BitConverter.ToUInt16( data, offset );
				offset += 2;
			}
			if ( packageLength == 127 )
			{
				// 等于127 随后的八个字节64位表示数据长度
				packageLength = BitConverter.ToUInt64( data, offset );
				offset += 8;
			}
			// 存储4位掩码值
			byte[] maskingKey = null;
			if ( hasMask )
			{
				maskingKey = new byte[4];
				Buffer.BlockCopy( data, offset, maskingKey, 0, 4 );
				offset += 4;
			}

			byte[] outData = new byte[packageLength];
			if ( packageLength > int.MaxValue )
				for ( ulong i = 0; i < packageLength; i++ )
					outData[i] = data[i + ( ulong )offset];
			else
				Buffer.BlockCopy( data, offset, outData, 0, ( int )packageLength );

			if ( maskingKey != null )
			{
				for ( ulong i = 0; i < packageLength; i++ )
					outData[i] = ( byte )( outData[i] ^ maskingKey[i % 4] );
			}
			return outData;
		}

		private static void Hybi13FrameData( StreamBuffer inBuffer, byte[] data, int offset, int size, FrameType frameType )
		{
			const int fin = 1, rsv1 = 0, rsv2 = 0, rsv3 = 0;
			int op = ( int )frameType;
			int ctrlFrame = op | rsv3 << 4 | rsv2 << 5 | rsv1 << 6 | fin << 7;
			inBuffer.Write( ( byte )ctrlFrame );

			//服务端不需要mask
			if ( size > ushort.MaxValue )
			{
				inBuffer.Write( ( byte )127 );
				byte[] lengthBytes = ( ( ulong )size ).ToBigEndianBytes();
				inBuffer.Write( lengthBytes, 0, lengthBytes.Length );
			}
			else if ( size > 125 )
			{
				inBuffer.Write( ( byte )126 );
				byte[] lengthBytes = ( ( ushort )size ).ToBigEndianBytes();
				inBuffer.Write( lengthBytes, 0, lengthBytes.Length );
			}
			else
				inBuffer.Write( ( byte )size );

			inBuffer.Write( data, offset, size );
		}
	}
}