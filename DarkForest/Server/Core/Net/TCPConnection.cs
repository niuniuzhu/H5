﻿using Core.Misc;
using Core.Structure;
using System.Net;
using System.Net.Sockets;
using System.Threading;

namespace Core.Net
{
	public class TCPConnection : IConnection
	{
		public SocketWrapper socket { get; set; }
		public EndPoint remoteEndPoint { get; set; }
		public EndPoint localEndPoint { get; set; }
		public INetSession session { get; }
		public int recvBufSize { set => this._recvEventArgs.SetBuffer( new byte[value], 0, value ); }
		/// <summary>
		/// 包编码器
		/// </summary>
		public PacketEncodeHandler packetEncodeHandler { get; set; }
		/// <summary>
		/// 包解码器
		/// </summary>
		public PacketDecodeHandler packetDecodeHandler { get; set; }
		public bool connected => this.socket != null && this.socket.Connected;
		public long activeTime { get; set; }

		private readonly SocketAsyncEventArgs _sendEventArgs;
		private readonly SocketAsyncEventArgs _recvEventArgs;
		private readonly StreamBuffer _cache = new StreamBuffer();
		protected readonly SwitchQueue<StreamBuffer> _sendQueue = new SwitchQueue<StreamBuffer>();
		protected readonly ThreadSafeObejctPool<StreamBuffer> _bufferPool = new ThreadSafeObejctPool<StreamBuffer>();
		protected bool _reading;
		protected readonly object _lockObj = new object();

		public TCPConnection( INetSession session )
		{
			this.session = session;
			this._sendEventArgs = new SocketAsyncEventArgs { UserToken = this };
			this._recvEventArgs = new SocketAsyncEventArgs { UserToken = this };
			this._sendEventArgs.Completed += this.OnIOComplete;
			this._recvEventArgs.Completed += this.OnIOComplete;
		}

		public void Dispose()
		{
			this._sendEventArgs.Completed -= this.OnIOComplete;
			this._recvEventArgs.Completed -= this.OnIOComplete;
			this._sendEventArgs.Dispose();
			this._recvEventArgs.Dispose();
		}

		public virtual void Close()
		{
			lock ( this._lockObj )
			{
				if ( this.socket == null )
					return;
				if ( this.connected )
					this.socket.Shutdown( SocketShutdown.Both );
				this.socket.Close();
				this.socket = null;
				this.localEndPoint = null;
				this.remoteEndPoint = null;
				this.packetEncodeHandler = null;
				this.packetDecodeHandler = null;
				this._cache.Clear();
				this._sendQueue.Clear();
				this.activeTime = 0;
				this._reading = false;
			}
		}

		public bool StartReceive()
		{
			if ( this.socket == null )
				return false;
			bool asyncResult;
			try
			{
				asyncResult = this.socket.ReceiveAsync( this._recvEventArgs );
			}
			catch ( SocketException e )
			{
				this.OnError( $"socket receive error, code:{e.SocketErrorCode} " );
				return false;
			}
			if ( !asyncResult )//有一个挂起的IO操作需要马上处理
				this.ProcessReceive( this._recvEventArgs );
			return true;
		}

		public virtual bool Send( byte[] data, int offset, int size )
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( data, offset, size );
			this._sendQueue.Push( buffer );
			return true;
		}

		public virtual void NotifyClose()
		{
		}

		private void OnIOComplete( object sender, SocketAsyncEventArgs asyncEventArgs )
		{
			//这是一个异步调用,过程中可能在其他线程关闭了连接,必须加锁
			lock ( this._lockObj )
			{
				switch ( asyncEventArgs.LastOperation )
				{
					case SocketAsyncOperation.Receive:
						this.ProcessReceive( asyncEventArgs );
						break;

					case SocketAsyncOperation.Send:
						this.ProcessSend( asyncEventArgs );
						break;
				}
			}
		}

		private void ProcessSend( SocketAsyncEventArgs sendEventArgs )
		{
			if ( sendEventArgs.SocketError != SocketError.Success )
			{
				//网络错误
				this.OnError( $"socket send error, code:{sendEventArgs.SocketError}" );
				return;
			}

			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Send;
			netEvent.session = this.session;
			NetworkMgr.instance.PushEvent( netEvent );
		}

		private void ProcessReceive( SocketAsyncEventArgs recvEventArgs )
		{
			if ( recvEventArgs.SocketError != SocketError.Success )
			{
				//网络错误
				this.OnError( $"receive error, remote endpoint:{this.remoteEndPoint}, code:{recvEventArgs.SocketError}" );
				return;
			}
			int size = recvEventArgs.BytesTransferred;
			if ( size == 0 )
			{
				//远端可能已经关闭连接
				this.OnError( $"remote:{this.remoteEndPoint} connection shutdown, code:{SocketError.NoData}" );
				return;
			}
			//写入缓冲区
			this._cache.Write( recvEventArgs.Buffer, recvEventArgs.Offset, recvEventArgs.BytesTransferred );
			Logger.Debug( $"write:{recvEventArgs.BytesTransferred},t:{Thread.CurrentThread.ManagedThreadId}" );
			//处理数据
			if ( !this._reading )
			{
				this._reading = true;
				this.ProcessData( this._cache );
			}
			//重新开始接收
			this.StartReceive();
		}

		protected virtual void ProcessData( StreamBuffer cache )
		{
			do
			{
				if ( cache.length == 0 )
					break;

				byte[] data;
				if ( this.packetDecodeHandler != null )
				{
					//解码数据,返回解码后的数据长度
					//完成解码后数据的包头(整个数据的长度)已经被剥离
					int len = this.packetDecodeHandler( cache.GetBuffer(), 0, cache.position, out data );
					if ( data == null )
						break;

					//截断当前缓冲区
					cache.Strip( len, cache.length - len );
				}
				else
					data = cache.ToArray();

				NetEvent netEvent = NetworkMgr.instance.PopEvent();
				netEvent.type = NetEvent.Type.Recv;
				netEvent.session = this.session;
				netEvent.data = data;
				NetworkMgr.instance.PushEvent( netEvent );

				//缓冲区里可能还有未处理的数据,递归处理
				this.ProcessData( cache );
			} while ( false );
			this._reading = false;
		}

		private void OnError( string error )
		{
			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Error;
			netEvent.session = this.session;
			netEvent.error = error;
			NetworkMgr.instance.PushEvent( netEvent );
		}

		public void Update( UpdateContext updateContext )
		{
			this._sendQueue.Switch();
			while ( !this._sendQueue.isEmpty )
			{
				StreamBuffer buffer = this._sendQueue.Pop();
				if ( !this.connected )
					continue;

				this._sendEventArgs.SetBuffer( buffer.GetBuffer(), 0, buffer.length );
				bool asyncResult;
				try
				{
					asyncResult = this.socket.SendAsync( this._sendEventArgs );
				}
				catch ( SocketException e )
				{
					this.OnError( $"socket send error, code:{e.SocketErrorCode}" );
					continue;
				}
				if ( !asyncResult )
					this.ProcessSend( this._sendEventArgs );

				buffer.Clear();
				this._bufferPool.Push( buffer );
			}
		}

		public void OnHeartBeat( long dt )
		{
		}
	}
}