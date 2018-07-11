using System;

namespace Core.Net
{
	public abstract class BaseNetSession : INetSession
	{
		public uint id { get; }
		public IConnection connection { get; }

		/// <summary>
		/// 连接关闭标记
		/// </summary>
		protected bool _closed;

		protected BaseNetSession( uint id, ProtoType type )
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
		}

		public virtual void Dispose() => this.connection.Dispose();

		public virtual void Release() => this.connection.Release();

		public void Close()
		{
			if ( this._closed )
				return;
			this._closed = true;
			this.InternalClose();
			this.connection.Close();
			this.OnClose();
		}

		protected virtual void InternalClose()
		{
		}

		public abstract void OnConnError( string error );

		public abstract void OnEstablish();

		protected abstract void OnClose();

		public abstract void OnRecv( byte[] data, int offset, int size );

		public abstract void OnSend();

		public abstract void OnError( string error );

		public virtual void Update( UpdateContext updateContext ) => this.connection.Update( updateContext );

		public virtual void OnHeartBeat( long dt ) => this.connection.OnHeartBeat( dt );
	}
}