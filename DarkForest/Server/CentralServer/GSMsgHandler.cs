using Shared;
using Shared.Net;

namespace CentralServer
{
	public partial class CS
	{
		public ErrorCode GCStateReportHandler( Protos.GSInfo gsInfoRecv )
		{
			bool hasRecord = this._gsIDToInfos.TryGetValue( gsInfoRecv.Id, out GSInfo gsInfo );
			if ( !hasRecord )
			{
				gsInfo = new GSInfo();
				this._gsIDToInfos[gsInfoRecv.Id] = gsInfo;
			}
			//更新GS信息
			gsInfo.id = gsInfoRecv.Id;
			gsInfo.name = gsInfoRecv.Name;
			gsInfo.ip = gsInfoRecv.Ip;
			gsInfo.port = gsInfoRecv.Port;
			gsInfo.password = gsInfoRecv.Password;
			gsInfo.state = ( GSInfo.State )gsInfoRecv.State;
			Core.Misc.Logger.Log( $"report from GS:{gsInfo}" );

			//转发到LS
			Protos.CS2LS_GSInfo nGSInfo = ProtoCreator.Q_CS2LS_GSInfo();
			nGSInfo.GsInfo = new Protos.GSInfo()
			{
				Id = gsInfo.id,
				Name = gsInfo.name,
				Ip = gsInfo.ip,
				Port = gsInfo.port,
				Password = gsInfo.password,
				State = ( Protos.GSInfo.Types.State )gsInfo.state
			};
			this.netSessionMgr.Send( SessionType.ServerLS, nGSInfo );
			return ErrorCode.Success;
		}


		public ErrorCode GSDisconnectHandler( uint gsID )
		{
			bool result = this._gsIDToInfos.Remove( gsID );
			System.Diagnostics.Debug.Assert( result, $"gsID:{gsID} not found" );
			if ( result )
			{
				//通知LS有GS断开连接了
				Protos.CS2LS_GSLost gsLost = ProtoCreator.Q_CS2LS_GSLost();
				gsLost.Gsid = gsID;
				this.netSessionMgr.Send( SessionType.ServerLS, gsLost );
			}
			return ErrorCode.Success;
		}
	}
}