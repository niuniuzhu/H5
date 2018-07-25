using Protos;
using Shared;
using System.Collections.Generic;

namespace CentralServer
{
	public partial class CS
	{
		public void NotifyGSInfosToLS( uint sessionID )
		{
			Protos.CS2LS.GSInfos gsInfos = new Protos.CS2LS.GSInfos();
			foreach ( KeyValuePair<uint, GSInfo> kv in this._gsIDToInfos )
			{
				GSInfo mGSInfo = kv.Value;
				Protos.GS2CS.GSInfo gsInfo = new Protos.GS2CS.GSInfo
				{
					Id = mGSInfo.id,
					Name = mGSInfo.name,
					Ip = mGSInfo.ip,
					Port = mGSInfo.port,
					Password = mGSInfo.password,
					State = ( Protos.GS2CS.GSInfo.Types.State )mGSInfo.state
				};
				gsInfos.GsInfo.Add( gsInfo );
			}
			this.netSessionMgr.SendMsgToSession( sessionID, gsInfos, ( int )gsInfos.GetMsgID() );
		}
	}
}