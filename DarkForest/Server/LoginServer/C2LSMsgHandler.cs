using Shared;

namespace LoginServer
{
	public partial class LS
	{
		public ErrorCode GCStateReportHandler( uint sessionID, Protos.GS2CS.GSInfo newGSInfo )
		{
			if ( !this._gsInfos.TryGetValue( newGSInfo.Id, out GSInfo gsInfo ) )
			{
				gsInfo = new GSInfo();
				this._gsInfos[newGSInfo.Id] = gsInfo;
			}
			gsInfo.id = newGSInfo.Id;
			gsInfo.name = newGSInfo.Name;
			gsInfo.ip = newGSInfo.Ip;
			gsInfo.port = newGSInfo.Port;
			gsInfo.password = newGSInfo.Password;
			gsInfo.state = ( GSInfo.State )newGSInfo.State;
			return ErrorCode.Success;
		}
	}
}