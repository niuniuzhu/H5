﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ProtoGenerator
{
	public class TSWritter : IWriter
	{
		public bool WriteDesc( string ns, Dictionary<string, int> clsToMsgID, Dictionary<string, string> responseToMsgID, string outputPath, ref string error )
		{
			StringBuilder sb = new StringBuilder();

			sb.AppendLine( "//<auto-generated>\r\n//\tGenerated by proto generator.  DO NOT EDIT!\r\n//</auto-generated>" );
			sb.AppendLine( "//ReSharper disable CheckNamespace" );
			sb.AppendLine( $"import {{ {ns} }} from \"../libs/protos\";" );
			sb.AppendLine();
			sb.AppendLine( "export class ProtoDesc {" );

			//type to id
			sb.AppendLine( $"\tprivate static readonly _TYPE2ID = new Map<new () => any, {ns}.MsgID>([" );
			foreach ( KeyValuePair<string, int> kv in clsToMsgID )
				sb.AppendLine( $"\t\t[{ns}.{kv.Key.Replace( '_', '.' )}, <{ns}.MsgID>{kv.Value}]," );
			sb.AppendLine( "\t]);" );
			sb.AppendLine();

			//id to type
			sb.AppendLine( $"\tprivate static readonly _ID2TYPE = new Map<{ns}.MsgID, new () => any>([" );
			foreach ( KeyValuePair<string, int> kv in clsToMsgID )
				sb.AppendLine( $"\t\t[<{ns}.MsgID>{kv.Value}, {ns}.{kv.Key.Replace( '_', '.' )}]," );
			sb.AppendLine( "\t]);" );
			sb.AppendLine();

			//CreateMessageByID
			sb.AppendLine( $"\tpublic static CreateMsgByID(msgID: {ns}.MsgID): any {{" );
			sb.AppendLine( "\t\tlet c = ProtoDesc._ID2TYPE.get(msgID);" );
			sb.AppendLine( "\t\treturn c == null ? null : new c();" );
			sb.AppendLine( "\t}" );
			sb.AppendLine();
			//end CreateMessageByID

			sb.AppendLine( $"\tpublic static GetMsgIDByType(type: new () => any): {ns}.MsgID {{ return ProtoDesc._TYPE2ID.get(type); }}" );
			sb.AppendLine();

			sb.AppendLine( $"\tpublic static GetMsgID(message: any): {ns}.MsgID {{ return ProtoDesc._TYPE2ID.get(message.constructor); }}" );
			sb.AppendLine();

			//CreateRespMessageByID
			foreach ( KeyValuePair<string, string> kv in responseToMsgID )
			{
				string dest = kv.Value.Replace( '_', '.' );
				sb.AppendLine( $"\tpublic static R_{kv.Key}(): {ns}.{dest} {{ return new {ns}.{dest}(); }}" );
				sb.AppendLine();
			}
			//end CreateRespMessageByID

			sb.AppendLine( "} //end class" );
			try
			{
				File.WriteAllText( Path.Combine( outputPath, "ProtoDesc.ts" ), sb.ToString(), Encoding.UTF8 );
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