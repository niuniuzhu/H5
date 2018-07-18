﻿using System;

namespace Core.Misc
{
	public class SimpleScheduler
	{
		private long _interval;
		private Action<int> _handler;
		private long _currTime;
		private int _count;

		public void Start( long interval, Action<int> handler, bool triggerAtStart = false )
		{
			this._interval = interval;
			this._handler = handler;
			this._currTime = 0;
			if ( triggerAtStart )
			{
				this._handler?.Invoke( this._count++ );
			}
		}

		public void Stop()
		{
			this._handler = null;
		}

		public void Update( long dt )
		{
			this._currTime += dt;
			if ( this._currTime >= this._interval )
			{
				this._handler?.Invoke( this._count++ );
				this._currTime = 0;
			}
		}
	}
}