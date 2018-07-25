using System;
using System.Collections.Generic;
using System.Net;
using Core.Misc;
using StackExchange.Redis;
using System.Threading;
using System.Threading.Tasks;

namespace Shared.DB
{
	public class RedisWrapper
	{
		public enum State
		{
			Close,
			Connecting,
			Connected
		}

		public bool reconnectTag = true;

		private State _state;
		private ConnectionMultiplexer _userDBredisAsyncContext;
		private long _reconnectTime;
		private string _ip;
		private int _port;
		private string _password;
		private IDatabase _database;

		public ErrorCode Connect( string ip, int port, string password )
		{
			this._ip = ip;
			this._port = port;
			this._password = password;
			return this.Reconnect();
		}

		private ErrorCode Reconnect()
		{
			this._state = State.Connecting;
			ConfigurationOptions redisConfig = new ConfigurationOptions
			{
				EndPoints = { { this._ip, this._port } },
				Password = this._password,
				KeepAlive = 180,
				AbortOnConnectFail = false
			};
			ConnectionMultiplexer.ConnectAsync( redisConfig )
								 .ContinueWith( ( task, _ ) =>
								 {
									 this._userDBredisAsyncContext = task.Result;
									 this._database = this._userDBredisAsyncContext.GetDatabase(); //redis集群只有一个db
									 if ( !this._userDBredisAsyncContext.IsConnected )
									 {
										 Logger.Log( $"redis connect error, address:{this._ip}:{this._port}" );
										 this._state = State.Close;
										 this._reconnectTime = TimeUtils.utcTime + Consts.RECONN_INTERVAL;
										 return;
									 }
									 Logger.Info( $"redis connect success, address:{this._ip}:{this._port}" );
									 this._state = State.Connected;
								 }, null, CancellationToken.None );
			return ErrorCode.Success;
		}

		public void OnHeartBeat( long dt )
		{
			if ( this._state != State.Close ||
				 !this.reconnectTag ||
				 TimeUtils.utcTime < this._reconnectTime )
				return;
			this.Reconnect();
		}

		public Task<RedisResult> ExecuteAsync( string command, ICollection<object> args,
											   CommandFlags flags = CommandFlags.None ) =>
			this._database.ExecuteAsync( command, args, flags );

		public Task<RedisResult> ExecuteAsync( string command, params object[] args ) =>
			this._database.ExecuteAsync( command, args );

		public Task<long> HashDecrementAsync( RedisKey key, RedisValue hashField, long value = 1,
											  CommandFlags flags = CommandFlags.None ) =>
			this._database.HashDecrementAsync( key, hashField, value, flags );

		public Task<double> HashDecrementAsync( RedisKey key, RedisValue hashField, double value,
												CommandFlags flags = CommandFlags.None ) =>
			this._database.HashDecrementAsync( key, hashField, value, flags );

		public Task<bool> HashDeleteAsync( RedisKey key, RedisValue hashField, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashDeleteAsync( key, hashField, flags );

		public Task<long> HashDeleteAsync( RedisKey key, RedisValue[] hashFields, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashDeleteAsync( key, hashFields, flags );

		public Task<bool> HashExistsAsync( RedisKey key, RedisValue hashField, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashExistsAsync( key, hashField, flags );

		public Task<HashEntry[]> HashGetAllAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashGetAllAsync( key, flags );

		public Task<RedisValue> HashGetAsync( RedisKey key, RedisValue hashField, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashGetAsync( key, hashField, flags );

		public Task<RedisValue[]> HashGetAsync( RedisKey key, RedisValue[] hashFields,
												CommandFlags flags = CommandFlags.None ) =>
			this._database.HashGetAsync( key, hashFields, flags );

		public Task<double> HashIncrementAsync( RedisKey key, RedisValue hashField, double value,
												CommandFlags flags = CommandFlags.None ) =>
			this._database.HashIncrementAsync( key, hashField, value, flags );

		public Task<long> HashIncrementAsync( RedisKey key, RedisValue hashField, long value = 1,
											  CommandFlags flags = CommandFlags.None ) =>
			this._database.HashIncrementAsync( key, hashField, value, flags );

		public Task<RedisValue[]> HashKeysAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashKeysAsync( key, flags );

		public Task<long> HashLengthAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashLengthAsync( key, flags );

		public Task HashSetAsync( RedisKey key, HashEntry[] hashFields, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashSetAsync( key, hashFields, flags );

		public Task<bool> HashSetAsync( RedisKey key, RedisValue hashField, RedisValue value, When when = When.Always,
										CommandFlags flags = CommandFlags.None ) =>
			this._database.HashSetAsync( key, hashField, value, when, flags );

		public Task<RedisValue[]> HashValuesAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashValuesAsync( key, flags );

		public Task<long> KeyDeleteAsync( RedisKey[] keys, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyDeleteAsync( keys, flags );

		public Task<bool> KeyDeleteAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyDeleteAsync( key, flags );

		public Task<byte[]> KeyDumpAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyDumpAsync( key, flags );

		public Task<bool> KeyExistsAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyExistsAsync( key, flags );

		public Task<bool> KeyExpireAsync( RedisKey key, TimeSpan? expiry, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyExpireAsync( key, expiry, flags );

		public Task<bool> KeyExpireAsync( RedisKey key, DateTime? expiry, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyExpireAsync( key, expiry, flags );

		public Task KeyMigrateAsync( RedisKey key, EndPoint toServer, int toDatabase = 0, int timeoutMilliseconds = 0,
									 MigrateOptions migrateOptions = MigrateOptions.None,
									 CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyMigrateAsync( key, toServer, toDatabase, timeoutMilliseconds, migrateOptions, flags );

		public Task<bool> KeyMoveAsync( RedisKey key, int database, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyMoveAsync( key, database, flags );

		public Task<bool> KeyPersistAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyPersistAsync( key, flags );

		public Task<RedisKey> KeyRandomAsync( CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyRandomAsync( flags );

		public Task<bool> KeyRenameAsync( RedisKey key, RedisKey newKey, When when = When.Always,
										  CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyRenameAsync( key, newKey, when, flags );

		public Task KeyRestoreAsync( RedisKey key, byte[] value, TimeSpan? expiry = null,
									 CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyRestoreAsync( key, value, expiry, flags );

		public Task<TimeSpan?> KeyTimeToLiveAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyTimeToLiveAsync( key, flags );

		public Task<RedisType> KeyTypeAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyTypeAsync( key, flags );

		public Task<bool> SetAddAsync( RedisKey key, RedisValue value, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetAddAsync( key, value, flags );

		public Task<long> SetAddAsync( RedisKey key, RedisValue[] values, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetAddAsync( key, values, flags );

		public Task<long> SetCombineAndStoreAsync( SetOperation operation, RedisKey destination, RedisKey first,
												   RedisKey second, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetCombineAndStoreAsync( operation, destination, first, second, flags );

		public Task<long> SetCombineAndStoreAsync( SetOperation operation, RedisKey destination, RedisKey[] keys,
												   CommandFlags flags = CommandFlags.None ) =>
			this._database.SetCombineAndStoreAsync( operation, destination, keys, flags );

		public Task<RedisValue[]> SetCombineAsync( SetOperation operation, RedisKey first, RedisKey second,
												   CommandFlags flags = CommandFlags.None ) =>
			this._database.SetCombineAsync( operation, first, second, flags );

		public Task<RedisValue[]> SetCombineAsync( SetOperation operation, RedisKey[] keys,
												   CommandFlags flags = CommandFlags.None ) =>
			this._database.SetCombineAsync( operation, keys, flags );

		public Task<bool> SetContainsAsync( RedisKey key, RedisValue value, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetContainsAsync( key, value, flags );

		public Task<long> SetLengthAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetLengthAsync( key, flags );

		public Task<RedisValue[]> SetMembersAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetMembersAsync( key, flags );

		public Task<bool> SetMoveAsync( RedisKey source, RedisKey destination, RedisValue value,
										CommandFlags flags = CommandFlags.None ) =>
			this._database.SetMoveAsync( source, destination, value, flags );

		public Task<RedisValue> SetPopAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetPopAsync( key, flags );

		public Task<RedisValue> SetRandomMemberAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetRandomMemberAsync( key, flags );

		public Task<RedisValue[]> SetRandomMembersAsync( RedisKey key, long count, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetRandomMembersAsync( key, count, flags );

		public Task<bool> SetRemoveAsync( RedisKey key, RedisValue value, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetRemoveAsync( key, value, flags );

		public Task<long> SetRemoveAsync( RedisKey key, RedisValue[] values, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetRemoveAsync( key, values, flags );

		public Task<long> StringAppendAsync( RedisKey key, RedisValue value, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringAppendAsync( key, value, flags );

		public Task<long> StringBitCountAsync( RedisKey key, long start = 0, long end = -1,
											   CommandFlags flags = CommandFlags.None ) =>
			this._database.StringBitCountAsync( key, start, end, flags );

		public Task<long> StringBitOperationAsync( Bitwise operation, RedisKey destination, RedisKey[] keys,
												   CommandFlags flags = CommandFlags.None ) =>
			this._database.StringBitOperationAsync( operation, destination, keys, flags );

		public Task<long> StringBitOperationAsync( Bitwise operation, RedisKey destination, RedisKey first,
												   RedisKey second = default( RedisKey ),
												   CommandFlags flags = CommandFlags.None ) =>
			this._database.StringBitOperationAsync( operation, destination, first, second, flags );

		public Task<long> StringBitPositionAsync( RedisKey key, bool bit, long start = 0, long end = -1,
												  CommandFlags flags = CommandFlags.None ) =>
			this._database.StringBitPositionAsync( key, bit, start, end, flags );

		public Task<long> StringDecrementAsync( RedisKey key, long value = 1, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringDecrementAsync( key, value, flags );

		public Task<double> StringDecrementAsync( RedisKey key, double value, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringDecrementAsync( key, value, flags );

		public Task StringGetAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringGetAsync( key, flags );

		public Task<RedisValue[]> StringGetAsync( RedisKey[] keys, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringGetAsync( keys, flags );

		public Task<long> StringIncrementAsync( RedisKey key, long value = 1, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringIncrementAsync( key, value, flags );

		public Task<double> StringIncrementAsync( RedisKey key, double value, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringIncrementAsync( key, value, flags );

		public Task<long> StringLengthAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringLengthAsync( key, flags );

		public Task<bool> StringSetAsync( RedisKey key, RedisValue value, TimeSpan? expiry = null, When when = When.Always,
										  CommandFlags flags = CommandFlags.None ) =>
			this._database.StringSetAsync( key, value, expiry, when, flags );

		public Task<bool> StringSetAsync( KeyValuePair<RedisKey, RedisValue>[] values, When when = When.Always,
										  CommandFlags flags = CommandFlags.None ) =>
			this._database.StringSetAsync( values, when, flags );

		public Task<bool> StringSetBitAsync( RedisKey key, long offset, bool bit, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringSetBitAsync( key, offset, bit, flags );

		public Task<RedisValue> StringSetRangeAsync( RedisKey key, long offset, RedisValue value,
													 CommandFlags flags = CommandFlags.None ) =>
			this._database.StringSetRangeAsync( key, offset, value, flags );
	}
}