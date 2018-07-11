using Core.Net;
using Shared.Net;

namespace LoginServer.Net
{
	public class TestSession : CliSession
	{
		private TestSession( uint id, ProtoType type ) : base( id, type )
		{
		}
	}
}