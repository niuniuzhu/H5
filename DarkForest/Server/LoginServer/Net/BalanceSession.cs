using Core.Misc;
using Shared;
using Shared.Net;
using System.Collections.Generic;

namespace LoginServer.Net
{
	public class BalanceSession : SrvCliSession
	{
		private readonly List<OneBsInfo> m_BS_List = new List<OneBsInfo>();

		protected BalanceSession( uint id ) : base( id )
		{
		}

		protected override void SendInitData()
		{
		}

		protected override void OnRealEstablish()
		{
			Logger.Info( $"BS({this.logicID}) Connected." );
		}

		protected override void OnClose()
		{
			Logger.Info( $"BS({this.logicID}) DisConnected." );
		}

		private ErrorCode MsgInitHandler( byte[] data, int offset, int size, int msgID )
		{
			this.SetInited( true, true );
			return ErrorCode.Success;
		}
	}
}