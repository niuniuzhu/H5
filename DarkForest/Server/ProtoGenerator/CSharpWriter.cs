﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ProtoGenerator
{
	public class CSharpWriter : IWriter
	{
		public bool WriteDesc( string ns, Dictionary<string, int> clsToMsgID, Dictionary<string, int> responseToMsgID, string outputPath, ref string error )
		{
			Dictionary<int, string> msgIDToCls = new Dictionary<int, string>();
			foreach ( KeyValuePair<string, int> kv in clsToMsgID )
				msgIDToCls[kv.Value] = kv.Key;

			StringBuilder sb = new StringBuilder();

			sb.AppendLine( "//ReSharper disable CheckNamespace" );
			sb.AppendLine( "using System.Collections.Generic;" );
			sb.AppendLine();
			sb.AppendLine( $"namespace {ns} {{" );
			sb.AppendLine( "\tpublic static class ProtoDesc {" );

			//type to id
			sb.AppendLine( $"\t\tprivate static Dictionary<System.Type, {ns}.MsgID> _TYPE2ID = new Dictionary<System.Type, {ns}.MsgID> {{" );
			foreach ( KeyValuePair<string, int> kv in clsToMsgID )
				sb.AppendLine( $"\t\t\t{{typeof({ns}.{kv.Key.Replace( '_', '.' )}), ({ns}.MsgID){kv.Value}}}," );
			sb.AppendLine( "\t\t};" );
			sb.AppendLine();

			//id to type
			sb.AppendLine( $"\t\tprivate static Dictionary<{ns}.MsgID, System.Type> _ID2TYPE = new Dictionary<{ns}.MsgID, System.Type> {{" );
			foreach ( KeyValuePair<string, int> kv in clsToMsgID )
				sb.AppendLine( $"\t\t\t{{({ns}.MsgID){kv.Value}, typeof({ns}.{kv.Key.Replace( '_', '.' )})}}," );
			sb.AppendLine( "\t\t};" );
			sb.AppendLine();

			//处理请求/回应包
			sb.AppendLine( $"\t\tprivate static Dictionary<System.Type, {ns}.Response.Types.RespID> _TYPE2REPSID = new Dictionary<System.Type, {ns}.Response.Types.RespID> {{" );
			foreach ( KeyValuePair<string, int> kv in responseToMsgID )
				sb.AppendLine( $"\t\t\t{{typeof({ns}.{kv.Key.Replace( '_', '.' )}), ({ns}.Response.Types.RespID){kv.Value}}}," );
			sb.AppendLine( "\t\t};" );
			sb.AppendLine();

			//CreateMessageByID
			sb.AppendLine( $"\t\tpublic static Google.Protobuf.IMessage CreateMessageByID({ns}.MsgID msgID) => CreateMessageByID((int)msgID);" );
			sb.AppendLine();

			sb.AppendLine( "\t\tpublic static Google.Protobuf.IMessage CreateMessageByID(int msgID) {" );
			foreach ( KeyValuePair<string, int> kv in clsToMsgID )
			{
				sb.AppendLine( $"\t\t\tif (msgID == {kv.Value})" );
				sb.AppendLine( $"\t\t\t\treturn new {ns}.{kv.Key.Replace( '_', '.' )}();" );
			}
			sb.AppendLine( "\t\t\treturn null;" );
			sb.AppendLine( "\t\t}" );
			sb.AppendLine();
			//end CreateMessageByID

			//CreateRespMessageByID
			sb.AppendLine( $"\t\tpublic static Google.Protobuf.IMessage CreateRespMessageByID(int msgID) => CreateMessageByID(({ns}.MsgID)msgID);" );
			sb.AppendLine();

			sb.AppendLine( $"\t\tpublic static Google.Protobuf.IMessage CreateRespMessageByID({ns}.MsgID msgID) {{" );
			sb.AppendLine( "\t\t\tif (! _TYPE2REPSID.TryGetValue(_ID2TYPE[msgID], out Protos.Response.Types.RespID respID ))" );
			sb.AppendLine( "\t\t\t\treturn null;" );
			sb.AppendLine( "\t\t\tint iRespID = ( int ) respID;" );
			foreach ( KeyValuePair<string, int> kv in responseToMsgID )
			{
				sb.AppendLine( $"\t\t\tif (iRespID == {kv.Value})" );
				string clsName = msgIDToCls[kv.Value];
				sb.AppendLine( $"\t\t\t\treturn new {ns}.{clsName.Replace( '_', '.' )}();" );
			}
			sb.AppendLine( "\t\t\treturn null;" );
			sb.AppendLine( "\t\t}" );
			//end CreateRespMessageByID

			sb.AppendLine( "\t} //end class" );
			sb.AppendLine( "} //end namespace" );
			try
			{
				File.WriteAllText( Path.Combine( outputPath, "ProtoDesc.cs" ), sb.ToString(), Encoding.UTF8 );
			}
			catch ( Exception e )
			{
				error = e.ToString();
				return false;
			}
			return true;
		}
	}
}