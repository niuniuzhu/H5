﻿using System;
using System.Net.Sockets;
using Core.Misc;
using Core.Net;

namespace Shared.Net
{
	public abstract class NetSession : INetSession
	{
		public NetSessionMgr owner { get; set; }
		public uint id { get; }
		public int logicID { get; set; }
		public SessionType type { get; set; }
		public IConnection connection { get; }
		public MsgCenter msgCenter { get; }

		/// <summary>
		/// 本地连接是否已经初始化的标记
		/// </summary>
		protected bool _inited;

		/// <summary>
		/// 远端连接是否已经初始化的标记
		/// </summary>
		protected bool _remoteInited;

		/// <summary>
		/// 重连标记
		/// </summary>
		protected bool _reconFlag;

		/// <summary>
		/// 连接关闭标记
		/// </summary>
		protected bool _closed;

		/// <summary>
		/// 建立连接的时间戳
		/// </summary>
		private long _activeTime;

		/// <summary>
		/// 关闭连接的时间戳
		/// </summary>
		private long _deactiveTime;

		protected NetSession( uint id, ProtoType type )
		{
			this.id = id;
			switch ( type )
			{
				case ProtoType.TCP:
					this.connection = new TCPConnection( this );
					break;

				case ProtoType.KCP:
					this.connection = new KCPConnection( this );
					break;

				default:
					throw new NotSupportedException();
			}
			this.msgCenter = new MsgCenter();
			this._closed = true;
		}

		public virtual void Dispose()
		{
		}

		public virtual void Release()
		{
		}

		/// <summary>
		/// 关闭session
		/// </summary>
		public void Close()
		{
			if ( this._closed )
				return;
			this._closed = true;
			this._inited = false;
			this._remoteInited = false;
			this._deactiveTime = TimeUtils.utcTime;
			this._reconFlag = true;
			this.InternalClose();
			this.connection.Close();
			this.OnClose();
			NetSessionPool.instance.Push( this );
		}

		protected virtual void InternalClose()
		{
		}

		/// <summary>
		/// 收到远端的初始化消息后调用
		/// </summary>
		protected void SetInited( bool isInited, bool isTrigger )
		{
			this._inited = isInited;
			if ( !isTrigger )
				return;
			if ( !this._inited )
				return;

			//已经标记远端连接已经初始化则不必再次发送了
			if ( !this._remoteInited )
			{
				//标记远端连接已经初始化
				this._remoteInited = true;
				//向远端发送初始化数据
				this.SendInitData();
			}
			//此时才认为真正建立了可信的连接
			this.OnRealEstablish();
		}

		/// <summary>
		/// 建立连接后调用
		/// </summary>
		public virtual void OnEstablish()
		{
			this._inited = false;
			this._remoteInited = false;
			this._reconFlag = false;
			this._closed = false;
			this._activeTime = TimeUtils.utcTime;
			this._deactiveTime = 0;
		}

		/// <summary>
		/// 通信过程出现错误后调用
		/// </summary>
		public virtual void OnError( string error )
		{
			//Logger.Error( error );
			this.Close();
		}

		/// <summary>
		/// 收到数据后调用
		/// </summary>
		public void OnRecv( byte[] data, int offset, int size )
		{
			if ( this._closed )
				return;

			//剥离第一层消息ID
			int msgID = 0;
			offset += ByteUtils.Decode32i( data, offset, ref msgID );
			size -= offset;
			//检查是否注册了处理函数,否则调用未处理数据的函数
			if ( this.msgCenter.TryGetHandler( msgID, out MsgCenter.GeneralHandler msgHandler ) )
				msgHandler.Invoke( data, offset, size, msgID );
			else if ( this.msgCenter.TryGetHandler( msgID, out MsgCenter.TransHandler transHandler ) )
			{
				int transID = msgID;
				uint gcNetID = 0;
				//剥离第二层消息ID
				offset += ByteUtils.Decode32i( data, offset, ref msgID );
				//剥离客户端网络ID
				offset += ByteUtils.Decode32u( data, offset, ref gcNetID );
				size -= 2 * sizeof( int );
				transHandler.Invoke( data, offset, size, transID, msgID, gcNetID );
			}
			else
				Logger.Warn( $"invalid msg:{msgID}." );
		}

		/// <summary>
		/// 发送数据后调用
		/// </summary>
		public void OnSend()
		{
		}

		public bool Send( byte[] data, int offset, int size ) => this.connection.Send( data, offset, size );

		/// <summary>
		/// 向远端发送初始化消息
		/// </summary>
		protected abstract void SendInitData();

		/// <summary>
		/// 建立可信的连接后调用
		/// </summary>
		protected abstract void OnRealEstablish();

		/// <summary>
		/// 关闭连接后调用
		/// </summary>
		protected abstract void OnClose();

		/// <summary>
		/// 每次心跳调用
		/// </summary>
		public virtual void OnHeartBeat( UpdateContext context )
		{
		}
	}
}