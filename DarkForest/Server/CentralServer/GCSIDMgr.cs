using Core.Misc;
using System.Collections.Generic;

namespace CentralServer
{
	public class GCSIDMgr
	{
		private readonly HashSet<ulong> _gcNIDToLogin = new HashSet<ulong>();
		private readonly List<ulong> _gcNIDs = new List<ulong>();
		private readonly List<long> _loginTime = new List<long>();

		public bool Contains( ulong gcNID ) => this._gcNIDToLogin.Contains( gcNID );

		public bool Add( ulong gcNID )
		{
			if ( !this._gcNIDToLogin.Add( gcNID ) )
				return false;
			this._gcNIDs.Add( gcNID );
			this._loginTime.Add( TimeUtils.utcTime );
			return true;
		}

		public bool Remove( ulong gcNID )
		{
			if ( !this._gcNIDToLogin.Remove( gcNID ) )
				return false;
			int pos = this._gcNIDs.IndexOf( gcNID );
			this._gcNIDs.RemoveAt( pos );
			this._loginTime.RemoveAt( pos );
			return true;
		}

		public void Update()
		{
			//移除超时的session
			long currTime = TimeUtils.utcTime;
			long expTime = CS.instance.config.sessionExpTime;
			int count = this._loginTime.Count;
			for ( int i = 0; i < count; i++ )
			{
				if ( currTime < this._loginTime[i] + expTime )
					continue;
				this._gcNIDToLogin.Remove( this._gcNIDs[i] );
				this._gcNIDs.RemoveAt( i );
				this._loginTime.RemoveAt( i );
				--i;
				--count;
			}
		}
	}
}