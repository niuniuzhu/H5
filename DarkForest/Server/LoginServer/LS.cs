using Core.Misc;
using Core.Net;
using LoginServer.Net;
using Shared;
using Shared.Net;

namespace LoginServer
{
	public class LS
	{
		private static LS _instance;
		public static LS instance => _instance ?? ( _instance = new LS() );

		public LSNetSessionMgr netSessionMgr { get; }
		public LSConfig lsConfig { get; }

		private readonly UpdateContext _context;
		private long _timestamp;

		private LS()
		{
			this.lsConfig = new LSConfig();
			this._context = new UpdateContext();
			this.netSessionMgr = new LSNetSessionMgr();
		}

		public void Dispose()
		{
			this.netSessionMgr.Dispose();
			NetSessionPool.instance.Dispose();
		}

		public ErrorCode Initialize()
		{
			ErrorCode errorCode = this.lsConfig.Load();
			if ( ErrorCode.Success == errorCode )
				Logger.Info( "LS Initialize success" );
			return errorCode;
		}

		public ErrorCode Start()
		{
			this.netSessionMgr.CreateListener( this.lsConfig.bs_listen_port, 102400, Consts.PROTOCOL_TYPE,
			                                   0, this.netSessionMgr.CreateBlanceSession );
			this.netSessionMgr.CreateListener( this.lsConfig.client_listen_port, 102400, Consts.PROTOCOL_TYPE,
			                                   1, this.netSessionMgr.CreateClientSession );
			return ErrorCode.Success;
		}

		public void Update( long elapsed, long dt )
		{
			this._timestamp += dt;
			while ( this._timestamp >= Consts.HEART_PACK )
			{
				++this._context.ticks;
				this._context.utcTime = TimeUtils.utcTime;
				this._context.time = elapsed;
				this._context.deltaTime = Consts.HEART_PACK;
				this._timestamp -= Consts.HEART_PACK;
				ErrorCode eResult = this.OnHeartBeat( this._context );
				if ( ErrorCode.Success != eResult )
				{
					Logger.Error( $"fail with error code {eResult}!, please amend the error and try again!" );
					return;
				}
			}
			this.netSessionMgr.Update();
		}

		private ErrorCode OnHeartBeat( UpdateContext context )
		{
			this.netSessionMgr.OnHeartBeat( context );
			return ErrorCode.Success;
		}
	}
}