using Protos;
using Shared.Net;

namespace GateServer
{
	public partial class GS
	{
		public void ReportStateToCS()
		{
			Protos.GS2CS.ReportState reportState = new Protos.GS2CS.ReportState
			{
				GsInfo = new Protos.GS2CS.GSInfo
				{
					Id =  this.config.gsID,
					Name = this.config.name,
					Ip = this.config.externalIP,
					Port = this.config.externalPort,
					Password = this.config.password,
					State = ( Protos.GS2CS.GSInfo.Types.State )this.state
				}
			};
			this.netSessionMgr.SendMsgToSession( SessionType.ServerG2CS, reportState, ( int )reportState.GetMsgID() );
		}
	}
}