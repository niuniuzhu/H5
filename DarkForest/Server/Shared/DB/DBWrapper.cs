using Core.Misc;
using Core.Net;
using Google.Protobuf;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace Shared.DB
{
	public delegate ErrorCode SqlExecQueryHandler( MySqlDataReader dataReader );

	public class DBWrapper
	{
		/// <summary>
		/// Native MySQL connection
		/// </summary>
		private MySqlConnection _db;

		private readonly ThreadSafeObejctPool<StreamBuffer> _pool = new ThreadSafeObejctPool<StreamBuffer>();
		private readonly BufferBlock<StreamBuffer> _buffer = new BufferBlock<StreamBuffer>();
		private bool _running;
		private Action<StreamBuffer> _callback;
		private Action _beginCallback;

		/// <summary>
		/// 连接数据库
		/// </summary>
		/// <param name="callback">消息消费后的回调函数(通常和生产者不在同一个线程上)</param>
		/// <param name="dbname"></param>
		/// <param name="beginCallback">开始处理消息的回调函数</param>
		/// <param name="ip"></param>
		/// <param name="port"></param>
		/// <param name="pwd"></param>
		/// <param name="uname"></param>
		public void Start( Action<StreamBuffer> callback, Action beginCallback, string ip, int port, string pwd, string uname, string dbname )
		{
			this._running = true;
			this._callback = callback;
			this._beginCallback = beginCallback;
			this._db = new MySqlConnection( $"server={ip};user id={uname};password={pwd};port={port};database={dbname}" );
			Task.Run( () =>
			{
				this._beginCallback?.Invoke();
				this.ConsumeAsync();
			} );
		}

		/// <summary>
		/// 断开数据库的连接
		/// </summary>
		public void Stop()
		{
			if ( this._buffer.TryReceiveAll( out IList<StreamBuffer> buffers ) )
			{
				foreach ( StreamBuffer buffer in buffers )
				{
					this._callback?.Invoke( buffer );
					buffer.Clear();
					this._pool.Push( buffer );
				}
			}
			this._running = false;
		}

		/// <summary>
		/// 把消息编码到缓冲区
		/// </summary>
		private static ErrorCode EncodeMsgToBuffer( IMessage msg, int msgID, StreamBuffer buffer )
		{
			buffer.Write( msgID );
			buffer.Write( msg.ToByteArray() );
			buffer.position = 0;
			return ErrorCode.Success;
		}

		/// <summary>
		/// 把消息编码到缓冲区并投递到消息处理器
		/// </summary>
		public ErrorCode EncodeAndSendToDBThread( IMessage msg, int msgID )
		{
			StreamBuffer buffer = this._pool.Pop();
			ErrorCode errCode = EncodeMsgToBuffer( msg, msgID, buffer );
			if ( errCode != ErrorCode.Success )
			{
				buffer.Clear();
				this._pool.Push( buffer );
				return ErrorCode.EncodeMsgToBufferFailed;
			}
			this._buffer.Post( buffer );
			return ErrorCode.Success;
		}

		/// <summary>
		/// 消费线程
		/// </summary>
		private async void ConsumeAsync()
		{
			while ( this._running )
			{
				StreamBuffer buffer = await this._buffer.ReceiveAsync();
				this._callback?.Invoke( buffer );
				buffer.Clear();
				this._pool.Push( buffer );
			}
		}

		/// <summary>
		/// 执行查询指令
		/// </summary>
		/// <param name="command">sql指令</param>
		/// <param name="handler">查询结果的回调函数</param>
		/// <returns>错误信息</returns>
		public ErrorCode SqlExecQuery( string command, SqlExecQueryHandler handler )
		{
			if ( null == this._db )
			{
				Logger.Warn( "invalid db" );
				return ErrorCode.InvalidDatabase;
			}

			MySqlCommand sqlCmd = this._db.CreateCommand();
			MySqlDataReader dataReader = null;
			try
			{
				this._db.Open();
				sqlCmd.CommandText = command;
				sqlCmd.ExecuteNonQuery();
				dataReader = sqlCmd.ExecuteReader();
			}
			catch ( Exception e )
			{
				Logger.Warn( $"sql:{sqlCmd.CommandText} execute error:{e}" );
				dataReader?.Close();
				this._db.Close();
				return ErrorCode.SqlExecError;
			}

			ErrorCode errorCode = ErrorCode.Success;
			if ( handler != null )
				errorCode = handler.Invoke( dataReader );

			dataReader?.Close();
			this._db.Close();
			return errorCode;
		}

		/// <summary>
		/// 执行查询指令
		/// </summary>
		/// <param name="command">sql指令</param>
		/// <param name="rows">影响的行数</param>
		/// <returns>错误信息</returns>
		public ErrorCode SqlExecNonQuery( string command, out int rows )
		{
			rows = 0;
			if ( null == this._db )
			{
				Logger.Warn( "invalid db" );
				return ErrorCode.InvalidDatabase;
			}

			MySqlCommand sqlCmd = this._db.CreateCommand();
			try
			{
				this._db.Open();
				sqlCmd.CommandText = command;
				rows = sqlCmd.ExecuteNonQuery();
			}
			catch ( Exception e )
			{
				Logger.Warn( $"sql:{sqlCmd.CommandText} execute error:{e}" );
				return ErrorCode.SqlExecError;
			}
			finally
			{
				this._db.Close();
			}
			return ErrorCode.Success;
		}

		/// <summary>
		/// 执行连串查询指令
		/// </summary>
		/// <param name="commands">sql指令集合</param>
		/// <returns>错误信息</returns>
		public ErrorCode SqlExecNonQuery( string[] commands )
		{
			if ( null == this._db )
			{
				Logger.Warn( "invalid db" );
				return ErrorCode.InvalidDatabase;
			}

			MySqlCommand sqlCmd = this._db.CreateCommand();
			try
			{
				this._db.Open();
				foreach ( string command in commands )
				{
					sqlCmd.CommandText = command;
					sqlCmd.ExecuteNonQuery();
				}
			}
			catch ( Exception e )
			{
				Logger.Warn( $"sql:{sqlCmd.CommandText} execute error:{e}" );
				return ErrorCode.SqlExecError;
			}
			finally
			{
				this._db.Close();
			}
			return ErrorCode.Success;
		}
	}
}