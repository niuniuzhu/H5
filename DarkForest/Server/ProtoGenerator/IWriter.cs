﻿using System.Collections.Generic;

namespace ProtoGenerator
{
	public interface IWriter
	{
		bool WriteDesc( string ns, Dictionary<string, int> clsToMsgID, Dictionary<string, int> responseToMsgID, string outputPath, ref string error );
	}
}