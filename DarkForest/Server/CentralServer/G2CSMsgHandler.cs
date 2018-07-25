using Protos;
using Shared;
using Shared.Net;

namespace CentralServer
{
	public partial class CS
	{
		public ErrorCode GCStateReportHandler( uint sessionID, Protos.GS2CS.GSInfo gsInfoRecv )
		{
			if ( !this._gsInfos.TryGetValue( gsInfoRecv.Id, out GSInfo gsInfo ) )
			{
				gsInfo = new GSInfo();
				this._gsInfos[gsInfoRecv.Id] = gsInfo;

				Protos.CS2LS.NewGSInfo newGSInfo = new Protos.CS2LS.NewGSInfo
				{
					GsInfo = new Protos.GS2CS.GSInfo
					{
						Id = gsInfoRecv.Id,
						Name = gsInfoRecv.Name,
						Ip = gsInfoRecv.Ip,
						Port = gsInfoRecv.Port,
						Password = gsInfoRecv.Password,
						State = gsInfoRecv.State
					}
				};
				//通知所有LS有新的GS加入
				this.netSessionMgr.SendMsgToSession( SessionType.ServerLS, newGSInfo, ( int )newGSInfo.GetMsgID(), false );
			}
			gsInfo.id = gsInfoRecv.Id;
			gsInfo.name = gsInfoRecv.Name;
			gsInfo.ip = gsInfoRecv.Ip;
			gsInfo.port = gsInfoRecv.Port;
			gsInfo.password = gsInfoRecv.Password;
			gsInfo.state = ( GSInfo.State )gsInfoRecv.State;
			Core.Misc.Logger.Log( $"report from GS,info:{gsInfo}" );
			return ErrorCode.Success;
		}
	}
}