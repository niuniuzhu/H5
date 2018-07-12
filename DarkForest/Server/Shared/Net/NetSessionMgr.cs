using Core.Misc;
using Core.Net;
using Google.Protobuf;
using System;
using System.Collections.Generic;

namespace Shared.Net
{
	public abstract class NetSessionMgr
	{
		private readonly Dictionary<SessionType, List<INetSession>> _typeToSession = new Dictionary<SessionType, List<INetSession>>();
		private readonly List<SNetSession> _sessionsToRemove = new List<SNetSession>();

		/// <summary>
		/// 创建监听器
		/// </summary>
		/// <param name="id">监听器标识</param>
		/// <param name="port">监听端口</param>
		/// <param name="recvsize">接受缓冲区大小</param>
		/// <param name="protoType">协议类型</param>
		/// <param name="sessionCreateHandler">创建session的委托</param>
		/// <returns></returns>
		public bool CreateListener( uint id, int port, int recvsize, ProtoType protoType, SessionCreater sessionCreateHandler )
		{
			if ( NetworkMgr.instance.ContainsListener( id ) )
				return false;

			IListener listener;
			switch ( protoType )
			{
				case ProtoType.TCP:
					listener = new TCPListener( id );
					( ( TCPListener )listener ).packetEncodeHandler = LengthEncoder.Encode;
					( ( TCPListener )listener ).packetDecodeHandler = LengthEncoder.Decode;
					break;

				case ProtoType.KCP:
					listener = new KCPListener( id );
					break;

				default:
					throw new NotSupportedException();
			}
			listener.sessionCreater = sessionCreateHandler;
			listener.recvBufSize = recvsize;
			NetworkMgr.instance.AddListener( listener );
			return listener.Start( port );
		}

		/// <summary>
		/// 创建连接器
		/// </summary>
		/// <param name="sessionType">session类型</param>
		/// <param name="ip">ip地址</param>
		/// <param name="port">远程端口</param>
		/// <param name="protoType">协议类型</param>
		/// <param name="recvsize">接受缓冲区大小</param>
		/// <param name="logicId">逻辑id(目前仅用于连接场景服务器时记下连接器和逻辑id的映射)</param>
		/// <returns></returns>
		public bool CreateConnector<T>( SessionType sessionType, string ip, int port, ProtoType protoType, int recvsize, int logicId ) where T : CliSession
		{
			CliSession session = NetSessionPool.instance.Pop<T>( protoType );
			session.owner = this;
			session.type = sessionType;
			session.logicID = logicId;
			session.connector.recvBufSize = recvsize;
			session.connector.packetDecodeHandler = LengthEncoder.Decode;
			NetworkMgr.instance.AddSession( session );
			this.AddSession( session );
			return session.Connect( ip, port );
		}

		public void AddSession( SNetSession session )
		{
			if ( !this._typeToSession.TryGetValue( session.type, out List<INetSession> sessions ) )
			{
				sessions = new List<INetSession>();
				this._typeToSession[session.type] = sessions;
			}
			sessions.Add( session );
		}

		public void RemoveSession( SNetSession session )
		{
			if ( !this._sessionsToRemove.Contains( session ) )
				this._sessionsToRemove.Add( session );
		}

		public void Update()
		{
			int count = this._sessionsToRemove.Count;
			for ( int i = 0; i < count; i++ )
			{
				SNetSession session = this._sessionsToRemove[i];
				List<INetSession> sessions = this._typeToSession[session.type];
				sessions.Remove( session );
				NetSessionPool.instance.Push( session );
			}
			this._sessionsToRemove.Clear();
		}

		/// <summary>
		/// 停止监听器
		/// </summary>
		public void StopListener( uint id ) => NetworkMgr.instance.GetListener( id )?.Stop();

		/// <summary>
		/// 发送消息到指定的session
		/// </summary>
		/// <param name="sessionId">session id</param>
		/// <param name="msg">消息</param>
		/// <param name="msgID">消息id</param>
		public void SendMsgToSession( uint sessionId, IMessage msg, int msgID )
		{
			byte[] data = msg.ToByteArray();
			this.SendMsgToSession( sessionId, data, 0, data.Length, msgID );
		}

		/// <summary>
		/// 发送消息到指定的session
		/// </summary>
		/// <param name="sessionId">session id</param>
		/// <param name="data">需要发送的数据</param>
		/// <param name="offset">data的偏移量</param>
		/// <param name="size">data的有用的数据长度</param>
		/// <param name="msgID">中介端需要处理的消息id</param>
		public void SendMsgToSession( uint sessionId, byte[] data, int offset, int size, int msgID )
		{
			StreamBuffer sBuffer = StreamBufferPool.Pop();
			sBuffer.Write( size + 2 * sizeof( int ) );
			sBuffer.Write( msgID );
			sBuffer.Write( data, offset, size );
			byte[] buffer = sBuffer.ToArray();
			StreamBufferPool.Push( sBuffer );
			this.Send( sessionId, buffer );
		}

		public void TranMsgToSession( uint sessionId, IMessage msg, int msgID, int transID, uint gcNet )
		{
			byte[] data = msg.ToByteArray();
			this.TranMsgToSession( sessionId, data, 0, data.Length, msgID, transID, gcNet );
		}

		/// <summary>
		/// 发送消息到指定session,通常该消息是一条转发消息
		/// </summary>
		/// <param name="sessionId">session id</param>
		/// <param name="data">需要发送的数据</param>
		/// <param name="offset">data的偏移量</param>
		/// <param name="size">data的有用的数据长度</param>
		/// <param name="msgID">中介端需要处理的消息id</param>
		/// <param name="transID">目标端需要处理的消息id</param>
		/// <param name="gcNet">目标端的网络id</param>
		public void TranMsgToSession( uint sessionId, byte[] data, int offset, int size, int msgID, int transID, uint gcNet )
		{
			transID = transID == 0 ? msgID : transID;
			StreamBuffer sBuffer = StreamBufferPool.Pop();
			sBuffer.Write( size + 4 * sizeof( int ) );
			sBuffer.Write( transID );
			sBuffer.Write( msgID );
			sBuffer.Write( gcNet );
			sBuffer.Write( data, offset, size );
			byte[] buffer = sBuffer.ToArray();
			StreamBufferPool.Push( sBuffer );
			this.Send( sessionId, buffer );
		}

		/// <summary>
		/// 发送消息到指定的session类型
		/// </summary>
		/// <param name="sessionType">session类型</param>
		/// <param name="msg">消息</param>
		/// <param name="msgID">消息id</param>
		/// <param name="once">在查询消息类型时是否只对第一个结果生效</param>
		public void SendMsgToSession( SessionType sessionType, IMessage msg, int msgID, bool once = true )
		{
			byte[] data = msg.ToByteArray();
			this.SendMsgToSession( sessionType, data, 0, data.Length, msgID, once );
		}

		/// <summary>
		/// 发送消息到指定的session类型
		/// </summary>
		/// <param name="sessionType">session类型</param>
		/// <param name="data">需要发送的数据</param>
		/// <param name="offset">data的偏移量</param>
		/// <param name="size">data的有用的数据长度</param>
		/// <param name="msgID">消息id</param>
		/// <param name="once">在查询消息类型时是否只对第一个结果生效</param>
		public void SendMsgToSession( SessionType sessionType, byte[] data, int offset, int size, int msgID, bool once = true )
		{
			StreamBuffer sBuffer = StreamBufferPool.Pop();
			sBuffer.Write( size + 2 * sizeof( int ) );
			sBuffer.Write( msgID );
			sBuffer.Write( data, offset, size );
			byte[] buffer = sBuffer.ToArray();
			StreamBufferPool.Push( sBuffer );
			this.Send( sessionType, buffer, once );
		}

		/// <summary>
		/// 发送消息到指定session,通常该消息是一条转发消息
		/// </summary>
		/// <param name="sessionType">session类型</param>
		/// <param name="msg">消息</param>
		/// <param name="msgID">中介端需要处理的消息id</param>
		/// <param name="transID">目标端需要处理的消息id</param>
		/// <param name="gcNet">目标端的网络id</param>
		/// <param name="once">在查询消息类型时是否只对第一个结果生效</param>
		public void TranMsgToSession( SessionType sessionType, IMessage msg, int msgID, int transID,
									  uint gcNet, bool once = true )
		{
			byte[] data = msg.ToByteArray();
			this.TranMsgToSession( sessionType, data, 0, data.Length, msgID, transID, gcNet, once );
		}

		/// <summary>
		/// 发送消息到指定session,通常该消息是一条转发消息
		/// </summary>
		/// <param name="sessionType">session类型</param>
		/// <param name="data">需要发送的数据</param>
		/// <param name="offset">data的偏移量</param>
		/// <param name="size">data的有用的数据长度</param>
		/// <param name="msgID">中介端需要处理的消息id</param>
		/// <param name="transID">目标端需要处理的消息id</param>
		/// <param name="gcNet">目标端的网络id</param>
		/// <param name="once">在查询消息类型时是否只对第一个结果生效</param>
		public void TranMsgToSession( SessionType sessionType, byte[] data, int offset, int size, int msgID, int transID, uint gcNet, bool once = true )
		{
			transID = transID == 0 ? msgID : transID;
			StreamBuffer sBuffer = StreamBufferPool.Pop();
			sBuffer.Write( size + 4 * sizeof( int ) );
			sBuffer.Write( transID );
			sBuffer.Write( msgID );
			sBuffer.Write( gcNet );
			sBuffer.Write( data, offset, size );
			byte[] buffer = sBuffer.ToArray();
			StreamBufferPool.Push( sBuffer );
			this.Send( sessionType, buffer, once );
		}

		private void Send( uint sessionId, byte[] buffer )
		{
			INetSession session = NetworkMgr.instance.GetSession( sessionId );
			if ( session == null )
			{
				Logger.Warn( $"invalid sessionID:{sessionId}", 2, 5 );
				return;
			}
			session.connection.Send( buffer, 0, buffer.Length );
		}

		private bool Send( SessionType sessionType, byte[] buffer, bool once )
		{
			if ( !this._typeToSession.TryGetValue( sessionType, out List<INetSession> sessions ) )
				return false;

			if ( once )
				sessions[0].connection.Send( buffer, 0, buffer.Length );
			else
			{
				foreach ( INetSession session in sessions )
					session.connection.Send( buffer, 0, buffer.Length );
			}
			return true;
		}

		public void DisconnectOne( uint sessionId ) => NetworkMgr.instance.GetSession( sessionId )?.Close();
	}
}