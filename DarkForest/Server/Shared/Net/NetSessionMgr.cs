﻿using Core.Misc;
using Core.Net;
using Google.Protobuf;
using System.Collections.Generic;

namespace Shared.Net
{
	public abstract class NetSessionMgr
	{
		private readonly Dictionary<SessionType, List<NetSessionBase>> _typeToSession = new Dictionary<SessionType, List<NetSessionBase>>();
		private readonly List<NetSessionBase> _sessionsToRemove = new List<NetSessionBase>();

		/// <summary>
		/// 创建监听器
		/// </summary>
		/// <param name="id">监听器标识</param>
		/// <param name="recvsize">接受缓冲区大小</param>
		/// <param name="protoType">协议类型</param>
		/// <param name="sessionCreateHandler">创建session的委托</param>
		/// <returns></returns>
		public IListener CreateListener( uint id, int recvsize, ProtoType protoType, SessionCreater sessionCreateHandler )
		{
			if ( NetworkMgr.instance.ContainsListener( id ) )
				throw new System.Exception( "session id already exists" );

			IListener listener = null;
			switch ( protoType )
			{
				case ProtoType.TCP:
					listener = new TCPListener( id );
					break;

				case ProtoType.KCP:
					listener = new KCPListener( id );
					break;

				case ProtoType.WebSocket:
					listener = new WSListener( id );
					break;
			}
			if ( listener == null )
				return null;
			listener.sessionCreater = sessionCreateHandler;
			listener.recvBufSize = recvsize;
			NetworkMgr.instance.AddListener( listener );
			return listener;
		}

		/// <summary>
		/// 创建连接器
		/// </summary>
		/// <param name="sessionType">session类型</param>
		/// <param name="ip">ip地址</param>
		/// <param name="port">远程端口</param>
		/// <param name="protoType">协议类型</param>
		/// <param name="recvsize">接受缓冲区大小</param>
		/// <param name="logicId">逻辑id</param>
		/// <returns></returns>
		public bool CreateConnector<T>( SessionType sessionType, string ip, int port, ProtoType protoType, int recvsize, uint logicId ) where T : CliSession
		{
			CliSession session = NetSessionPool.instance.Pop<T>( protoType );
			session.owner = this;
			session.type = sessionType;
			session.logicID = logicId;
			session.connector.recvBufSize = recvsize;
			NetworkMgr.instance.AddSession( session );
			this.AddSession( session );
			return session.Connect( ip, port );
		}

		/// <summary>
		/// 把session添加到管理器
		/// </summary>
		public void AddSession( NetSessionBase session )
		{
			if ( !this._typeToSession.TryGetValue( session.type, out List<NetSessionBase> sessions ) )
			{
				sessions = new List<NetSessionBase>();
				this._typeToSession[session.type] = sessions;
			}
			sessions.Add( session );
		}

		/// <summary>
		/// 从管理器移除session
		/// </summary>
		public void RemoveSession( NetSessionBase session )
		{
			if ( !this._sessionsToRemove.Contains( session ) )
				this._sessionsToRemove.Add( session );
		}

		public void Update()
		{
			int count = this._sessionsToRemove.Count;
			for ( int i = 0; i < count; i++ )
			{
				NetSessionBase session = this._sessionsToRemove[i];
				List<NetSessionBase> sessions = this._typeToSession[session.type];
				sessions.Remove( session );
				if ( sessions.Count == 0 )
					this._typeToSession.Remove( session.type );
				NetSessionPool.instance.Push( session );
			}
			this._sessionsToRemove.Clear();
		}

		/// <summary>
		/// 停止监听器
		/// </summary>
		public void StopListener( uint id ) => NetworkMgr.instance.GetListener( id )?.Stop();

		private bool GetSession( uint sessionId, out INetSession session )
		{
			session = NetworkMgr.instance.GetSession( sessionId );
			if ( session != null )
				return true;
			Logger.Warn( $"invalid sessionID:{sessionId}" );
			return false;
		}

		/// <summary>
		/// 发送消息到指定的session
		/// </summary>
		/// <param name="sessionId">session id</param>
		/// <param name="msg">消息</param>
		/// <param name="rpcHandler">rcp回调函数</param>
		/// <param name="trans">是否转发消息</param>
		/// <param name="nsid">转发的网络id</param>
		public void Send( uint sessionId, IMessage msg, System.Action<IMessage> rpcHandler = null, bool trans = false, uint nsid = 0u )
		{
			if ( !this.GetSession( sessionId, out INetSession session ) )
				return;
			( ( NetSessionBase )session ).Send( msg, rpcHandler, trans, nsid );
		}

		/// <summary>
		/// 发送消息到指定的session类型
		/// </summary>
		/// <param name="sessionType">session类型</param>
		/// <param name="msg">消息</param>
		/// <param name="rpcHandler">rcp回调函数</param>
		/// <param name="trans">是否转发消息</param>
		/// <param name="nsid">转发的网络id</param>
		/// <param name="all">是否在查询消息类型时对所有结果生效</param>
		public void Send( SessionType sessionType, IMessage msg, System.Action<IMessage> rpcHandler = null, bool trans = false, uint nsid = 0u, bool all = true )
		{
			if ( !this._typeToSession.TryGetValue( sessionType, out List<NetSessionBase> sessions ) )
				return;
			if ( !all )
				sessions[0].Send( msg, rpcHandler, trans, nsid );
			else
				foreach ( NetSessionBase session in sessions )
					session.Send( msg, rpcHandler, trans, nsid );
		}

		/// <summary>
		/// 发送数据到指定sesion
		/// </summary>
		/// <param name="sessionId">session id</param>
		/// <param name="data">数据</param>
		/// <param name="offset">数据偏移量</param>
		/// <param name="size">数据长度</param>
		public void Send( uint sessionId, byte[] data, int offset, int size )
		{
			if ( !this.GetSession( sessionId, out INetSession session ) )
				return;
			session.Send( data, offset, size );
		}

		/// <summary>
		/// 发送数据到指定session类型
		/// </summary>
		/// <param name="sessionType">session类型</param>
		/// <param name="data">数据</param>
		/// <param name="offset">数据偏移量</param>
		/// <param name="size">数据长度</param>
		/// <param name="once">在查询消息类型时是否只对第一个结果生效</param>
		public void Send( SessionType sessionType, byte[] data, int offset, int size, bool once )
		{
			if ( !this._typeToSession.TryGetValue( sessionType, out List<NetSessionBase> sessions ) )
				return;
			if ( once )
				sessions[0].Send( data, offset, size );
			else
				foreach ( NetSessionBase session in sessions )
					session.Send( data, offset, size );
		}
	}
}