using Core.Misc;
using Core.Net;

namespace Shared.Net
{
	/// <summary>
	/// 作为服务端的session,通常是监听器接受连接后创建的session
	/// </summary>
	public abstract class SrvCliSession : SNetSession
	{
		protected SrvCliSession( uint id, ProtoType type ) : base( id, type )
		{
		}

		public override void Update( UpdateContext updateContext )
		{
			base.Update( updateContext );
			this.CheckActive();
		}

		private void CheckActive()
		{
			if ( TimeUtils.utcTime > this.connection.activeTime + KCPConfig.PING_TIMEOUT )
			{
				this.connection.NotifyClose();
				this.Close();
			}
		}
	}
}