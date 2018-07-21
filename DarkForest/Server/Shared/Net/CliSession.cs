using Core.Misc;
using Core.Net;
using System;

namespace Shared.Net
{
	/// <summary>
	/// 作为客户端的session,通常是主动发起连接后创建的session
	/// </summary>
	public abstract class CliSession : NetSessionBase
	{
		public IConnector connector { get; }
		public bool reconnectTag { get; set; }

		/// <summary>
		/// 重连标记
		/// </summary>
		private bool _reconFlag;

		private long _reconnTime;

		protected CliSession( uint id, ProtoType type ) : base( id, type )
		{
			switch ( type )
			{
				case ProtoType.TCP:
					this.connector = new TCPConnector( this );
					break;

				case ProtoType.KCP:
					this.connector = new KCPConnector( this );
					break;

				default:
					throw new NotSupportedException();
			}
			this.reconnectTag = true;
		}

		public bool Connect( string ip, int port )
		{
			return this.Reconnect( ip, port );
		}

		private void Reconnect()
		{
			if ( !this._reconFlag || !this.reconnectTag )
				return;

			if ( TimeUtils.utcTime < this._reconnTime )
				return;

			if ( !this.connector.ReConnect() )
				return;

			this._reconFlag = false;
		}

		private bool Reconnect( string ip, int port )
		{
			return this.connector.Connect( ip, port );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			this._reconFlag = true;
			this._reconnTime = TimeUtils.utcTime + Consts.RECONN_INTERVAL;
		}

		protected override void OnConnError( string error )
		{
			base.OnConnError( error );
			Logger.Error( error );
			this._reconFlag = true;
			this._reconnTime = TimeUtils.utcTime + Consts.RECONN_INTERVAL;
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			this._reconFlag = false;
		}

		protected override void OnHeartBeat( long dt )
		{
			this.Reconnect();
		}
	}
}