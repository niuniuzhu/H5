using Core.Misc;
using Core.Net;
using System;

namespace Shared.Net
{
	/// <summary>
	/// 作为客户端的session,通常是主动发起连接后创建的session
	/// </summary>
	public abstract class CliSession : NetSession
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

		protected override void InternalClose()
		{
			base.InternalClose();
			this._reconFlag = true;
			this._reconnTime = TimeUtils.utcTime + Consts.RECONN_INTERVAL;
		}

		public override void OnConnError( string error )
		{
			Logger.Error( error );
			this._reconFlag = true;
			this._reconnTime = TimeUtils.utcTime + Consts.RECONN_INTERVAL;
		}

		public override void OnEstablish()
		{
			base.OnEstablish();
			//标记远端连接已经初始化,那么在往后收到的远端初始化消息后,不会重复发送初始化消息,否则会进入死循环
			//参考NetSession.SetInited
			this._remoteInited = true;
			this._reconFlag = false;
			//向远端发送初始化数据
			this.SendInitData();
		}

		public override void OnHeartBeat( long dt )
		{
			base.OnHeartBeat( dt );
			this.Reconnect();
		}
	}
}