using Core.Misc;
using Core.Structure;
using System.Collections.Generic;

namespace Core.Net
{
	public class NetworkMgr
	{
		private static NetworkMgr _instance;
		public static NetworkMgr instance => _instance ?? ( _instance = new NetworkMgr() );

		public int heartBeatInterval = 100;

		private readonly SwitchQueue<NetEvent> _eventQueue = new SwitchQueue<NetEvent>();
		private readonly ThreadSafeObejctPool<NetEvent> _eventPool = new ThreadSafeObejctPool<NetEvent>();
		private readonly Dictionary<uint, IListener> _idToListeners = new Dictionary<uint, IListener>();
		private readonly Dictionary<uint, INetSession> _idToSession = new Dictionary<uint, INetSession>();
		private readonly UpdateContext _updateContext = new UpdateContext();
		private long _lastHeartBeatTime;

		private NetworkMgr()
		{
		}

		public void Dispose()
		{
			foreach ( KeyValuePair<uint, IListener> kv in this._idToListeners )
				kv.Value.Dispose();
			foreach ( KeyValuePair<uint, INetSession> kv in this._idToSession )
				kv.Value.Close();
			this._idToListeners.Clear();
			this._idToSession.Clear();
			this._eventQueue.Clear();
		}

		public NetEvent PopEvent() => this._eventPool.Pop();

		public void PushEvent( NetEvent netEvent ) => this._eventQueue.Push( netEvent );

		public bool AddSession( INetSession session ) => this._idToSession.TryAdd( session.id, session );

		public bool RemoveSession( INetSession session ) => this._idToSession.Remove( session.id );

		public bool ContainsSession( uint id ) => this._idToSession.ContainsKey( id );

		public bool AddListener( IListener listener ) => this._idToListeners.TryAdd( listener.id, listener );

		public bool RemoveListener( IListener listener ) => this._idToListeners.Remove( listener.id );

		public bool ContainsListener( uint id ) => this._idToListeners.ContainsKey( id );

		/// <summary>
		/// 获取指定id的session
		/// </summary>
		public INetSession GetSession( uint sessionID )
		{
			this._idToSession.TryGetValue( sessionID, out INetSession session );
			return session;
		}

		/// <summary>
		/// 获取指定id的listener
		/// </summary>
		public IListener GetListener( uint listenerID )
		{
			this._idToListeners.TryGetValue( listenerID, out IListener listener );
			return listener;
		}

		public void Update( long elapsed, long dt )
		{
			this._updateContext.utcTime = TimeUtils.utcTime;
			this._updateContext.time = elapsed;
			this._updateContext.deltaTime = dt;

			this._lastHeartBeatTime += dt;
			while ( this._lastHeartBeatTime >= this.heartBeatInterval )
			{
				this.OnHeartBeat( this.heartBeatInterval );
				this._lastHeartBeatTime -= this.heartBeatInterval;
			}
			this.FireEvents();
			this.UpdateSessions( this._updateContext );
		}

		private void UpdateSessions( UpdateContext updateContext )
		{
			foreach ( KeyValuePair<uint, INetSession> kv in this._idToSession )
				kv.Value.Update( updateContext );
		}

		private void OnHeartBeat( long dt )
		{
			foreach ( KeyValuePair<uint, INetSession> kv in this._idToSession )
				kv.Value.OnHeartBeat( dt );
		}

		private void FireEvents()
		{
			this._eventQueue.Switch();
			while ( !this._eventQueue.isEmpty )
			{
				NetEvent netEvent = this._eventQueue.Pop();
				switch ( netEvent.type )
				{
					case NetEvent.Type.Invalid:
						break;
					case NetEvent.Type.Establish:
						netEvent.session.OnEstablish();
						break;
					case NetEvent.Type.ConnErr:
						netEvent.session.OnConnError( netEvent.error );
						break;
					case NetEvent.Type.Error:
						netEvent.session.OnError( netEvent.error );
						break;
					case NetEvent.Type.Recv:
						netEvent.session.OnRecv( netEvent.data, 0, netEvent.data.Length );
						break;
					case NetEvent.Type.Send:
						netEvent.session.OnSend();
						break;
				}
				this._eventPool.Push( netEvent );
			}
		}
	}
}