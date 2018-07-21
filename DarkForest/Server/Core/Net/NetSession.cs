using System;
using Core.Misc;

namespace Core.Net
{
	public abstract class NetSession : INetSession
	{
		public uint id { get; }
		public IConnection connection { get; }
		public bool isPassive { get; set; }

		protected bool _closed;

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

				case ProtoType.WebSocket:
					this.connection = new WSConnection( this );
					break;

				default:
					throw new NotSupportedException();
			}
		}

		public virtual void Dispose() => this.connection.Dispose();

		public void Close( string reason )
		{
			if ( this._closed )
				return;
			this.connection.Close();
			if ( this.isPassive )
				NetworkMgr.instance.RemoveSession( this );
			this.OnClose( reason );
			this._closed = true;
			this.isPassive = false;
		}

		public void _OnConnError( string error )
		{
			Logger.Error( error );
			this.OnConnError( error );
		}

		public void _OnEstablish()
		{
			if ( this.isPassive )
				NetworkMgr.instance.AddSession( this );
			this._closed = false;
			this.OnEstablish();
		}

		public void _OnRecv( byte[] data, int offset, int size ) => this.OnRecv( data, offset, size );

		public void _OnSend() => this.OnSend();

		public void _OnError( string error )
		{
			this.OnError( error );
			this.Close( error );
		}

		public virtual void Update( UpdateContext updateContext ) => this.connection.Update( updateContext );

		public void HeartBeat( long dt )
		{
			this.connection.OnHeartBeat( dt );
			this.OnHeartBeat( dt );
		}

		/// <summary>
		/// 系统心跳调用
		/// </summary>
		/// <param name="dt"></param>
		protected abstract void OnHeartBeat( long dt );

		/// <summary>
		/// 连接失败后调用
		/// </summary>
		protected abstract void OnConnError( string error );

		/// <summary>
		/// 建立连接后调用
		/// </summary>
		protected abstract void OnEstablish();

		/// <summary>
		/// 关闭连接后调用
		/// </summary>
		protected abstract void OnClose( string reason );

		/// <summary>
		/// 收到数据后调用
		/// </summary>
		protected abstract void OnRecv( byte[] data, int offset, int size );

		/// <summary>
		/// 发送数据后调用
		/// </summary>
		protected abstract void OnSend();

		/// <summary>
		/// 通信过程出现错误后调用
		/// </summary>
		protected abstract void OnError( string error );
	}
}