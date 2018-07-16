using System;

namespace ProtoGenerator
{
	class Program
	{
		static int Main( string[] args )
		{
			Parser parser = new Parser();
			string error = string.Empty;
			string wt = args[0];
			Parser.WriterType writerType;
			if ( wt == "csharp" )
				writerType = Parser.WriterType.CSharp;
			else if ( wt == "js" )
				writerType = Parser.WriterType.JS;
			else
			{
				Console.WriteLine( "invalid output type" );
				return -1;
			}
			parser.Parse( writerType, args[1], args[2], ref error );
			Console.WriteLine( !string.IsNullOrEmpty( error ) ? error : "done" );
			Console.ReadLine();
			return 0;
		}
	}
}
