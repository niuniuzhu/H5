using Core.Net;

namespace Shared.Net
{
	/// <summary>
	/// 作为服务端的session,通常是监听器接受连接后创建的session
	/// </summary>
	public abstract class SrvCliSession : NetSession
	{
		protected SrvCliSession( uint id, ProtoType type ) : base( id, type )
		{
		}

		protected override void OnClose()
		{
			base.OnClose();
			//由于此session是被动创建的
			this.owner.RemoveSession( this );
			NetSessionPool.instance.Push( this );
		}

		public override void OnConnError( string error )
		{
		}

		public override void OnEstablish()
		{
			//由于此session是被动创建的
			this.owner.AddSession( this );
			base.OnEstablish();
		}
	}
}