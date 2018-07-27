using Core.Misc;
using Core.Net;
using Google.Protobuf;
using System.Collections.Generic;

namespace Shared.Net
{
	public class NetSessionBase : NetSession
	{
		public NetSessionMgr owner { get; set; }
		public uint logicID { get; set; }
		public SessionType type { get; set; }

		protected readonly MsgCenter _msgCenter;

		private uint _pid;
		private readonly Dictionary<uint, System.Action<IMessage>> _rpcHandlers = new Dictionary<uint, System.Action<IMessage>>();//可能是异步写入,但必定是同步读取,所以不用加锁

		protected NetSessionBase( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter = new MsgCenter();
		}

		public void Send( IMessage message, System.Action<IMessage> rpcHandler = null, bool trans = false, uint nsid = 0 )
		{
			StreamBuffer buffer = new StreamBuffer();
			buffer.Write( ( int )message.GetMsgID() );

			//检查第一个字段是否Protos.Packet类型
			Protos.MsgOpts opts = message.GetMsgOpts();
			System.Diagnostics.Debug.Assert( opts != null, "invalid msg options" );
			//为消息写入序号
			opts.Pid = this._pid++;
			if ( trans )
			{
				opts.Trans = true;
				opts.Nsid = nsid;
			}
			if ( opts.Rpc && rpcHandler != null ) //如果是rpc消息,记下消息序号等待回调
			{
				if ( this._rpcHandlers.ContainsKey( opts.Pid ) )
					Logger.Warn( "packet id collision!!" );
				this._rpcHandlers[opts.Pid] = rpcHandler;
			}

			message.WriteTo( buffer.ms );
			this.Send( buffer.GetBuffer(), 0, buffer.length );
			buffer.Close();
		}

		protected override void OnHeartBeat( long dt )
		{
		}

		protected override void OnConnError( string error )
		{
		}

		protected override void OnEstablish()
		{
			if ( this.isPassive )
				this.owner.AddSession( this );
		}

		protected override void OnClose( string reason )
		{
			this._pid = 0;
			if ( this.isPassive )
				this.owner.RemoveSession( this );
		}

		protected override void OnRecv( byte[] data, int offset, int size )
		{
			int len = data.Length;
			if ( len - offset < sizeof( int ) )
			{
				Logger.Warn( "invalid msg." );
				return;
			}

			ErrorCode errorCode = ErrorCode.Success;
			//剥离消息ID
			Protos.MsgID msgID = ( Protos.MsgID )ByteUtils.Decode32i( data, offset );
			offset += sizeof( int );
			size -= offset;

			//解码消息
			IMessage message = ProtoCreator.DecodeMsg( msgID, data, offset, size );
			//检查第一个字段是否Protos.Packet类型
			Protos.MsgOpts opts = message.GetMsgOpts();
			System.Diagnostics.Debug.Assert( opts != null, "invalid msg options" );

			if ( opts.Rpc )//这是一条rpc消息
			{
				bool find = this._rpcHandlers.TryGetValue( opts.Rpid, out System.Action<IMessage> rcpHandler );
				System.Diagnostics.Debug.Assert( find, "RPC handler not found" );
				this._rpcHandlers.Remove( opts.Rpid );
				rcpHandler( message );//调用回调函数
			}
			else if ( this._msgCenter.TryGetHandler( msgID, out MsgCenter.GeneralHandler msgHandler ) )
				errorCode = msgHandler.Invoke( message );
			else
			{
				if ( opts.Trans ) //这是一条转发消息
				{
					//todo
				}
				else
					Logger.Warn( $"invalid msg:{msgID}." );
			}

			if ( errorCode != ErrorCode.Success )
				Logger.Warn( errorCode );
		}

		protected override void OnSend()
		{
		}

		protected override void OnError( string error )
		{
		}
	}
}