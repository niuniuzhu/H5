using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace ProtoGenerator
{
	public class Parser
	{
		public enum WriterType
		{
			CSharp,
			JS
		}

		private static readonly Regex REGEX_WHITE_SPACE = new Regex( @"\s" );
		private static readonly Regex REGEX_SEMICOLONS = new Regex( @";" );
		private static readonly Regex REGEX_NAMESPACE = new Regex( @"package\s+([^;]+);" );
		private static readonly Regex REGEX_MSG_ID = new Regex( @"enum\s+MsgID\s*\{([^\}]+)\}" );
		private static readonly Regex REGEX_EXT = new Regex( @"<ext>(.*)<\/ext>", RegexOptions.Singleline );
		//private static readonly Regex REGEX_MESSAGE = new Regex( @"message\s+(\w+)\s*\{[^\}]+\}" );

		private readonly Semaphore _semaphore = new Semaphore( 5, 5 );
		//private readonly List<PMessage> _messages = new List<PMessage>();
		private IWriter _writer;

		public bool Parse( WriterType writerType, string path, string outputPath, ref string error )
		{
			switch ( writerType )
			{
				case WriterType.CSharp:
					this._writer = new CSharpWriter();
					break;

				case WriterType.JS:
					break;
			}

			if ( !this.ParseGlobal( path, outputPath, ref error ) )
				return false;

			if ( !this.ParseProtos( path, ref error ) )
				return false;

			return true;
		}

		private bool ParseGlobal( string path, string outputPath, ref string error )
		{
			string content;
			try
			{
				content = File.ReadAllText( Path.Combine( path, "Global.proto" ), Encoding.UTF8 );
			}
			catch ( Exception e )
			{
				error = e.ToString();
				return false;
			}
			Dictionary<string, int> clsToMsgID = new Dictionary<string, int>();
			Dictionary<string, int> responseToMsgID = new Dictionary<string, int>();

			Match match = REGEX_NAMESPACE.Match( content );
			string ns = match.Groups[1].Value;

			{
				match = REGEX_MSG_ID.Match( content );
				string result = match.Groups[1].Value;
				string[] lines = result.Split( Environment.NewLine );
				int count = lines.Length;
				for ( int i = 0; i < count; i++ )
				{
					string line = lines[i];
					line = REGEX_WHITE_SPACE.Replace( line, string.Empty );
					line = REGEX_SEMICOLONS.Replace( line, string.Empty );
					if ( string.IsNullOrEmpty( line ) )
						continue;
					string[] valueKey = line.Split( '=' );
					int key = Convert.ToInt32( valueKey[1] );
					if ( key > 0 )
						clsToMsgID[valueKey[0]] = key;
				}
			}
			{
				match = REGEX_EXT.Match( content );
				JObject json = JObject.Parse( match.Groups[1].Value );
				JToken token = json["RespID"];
				foreach ( JToken jToken in token )
				{
					JProperty child = ( JProperty )jToken;
					responseToMsgID[child.Name] = ( int )child.Value;
				}
			}

			if ( !this._writer.WriteDesc( ns, clsToMsgID, responseToMsgID, outputPath, ref error ) )
				return false;

			return true;
		}

		private bool ParseProtos( string path, ref string error )
		{
			DirectoryInfo di = new DirectoryInfo( path );
			FileInfo[] fileInfos;
			try
			{
				fileInfos = di.GetFiles( "*.proto" );

			}
			catch ( Exception e )
			{
				error = e.ToString();
				return false;
			}
			List<Task> tasks = new List<Task>();
			foreach ( FileInfo fi in fileInfos )
			{
				this._semaphore.WaitOne();
				Task task = Task.Run( () =>
				{
					try
					{
						using ( StreamReader sr = fi.OpenText() )
						{
							this.HandleReadFileComplete( sr.ReadToEnd() );
						}
					}
					catch ( Exception e )
					{
						Console.WriteLine( e );
					}
					finally
					{
						this._semaphore.Release();
					}
				} );
				tasks.Add( task );
			}
			Task.WaitAll( tasks.ToArray() );
			return true;
		}

		private void HandleReadFileComplete( string content )
		{
		}
	}
}