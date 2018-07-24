using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Threading;
using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace CentralServer
{
	static class CSBootstrap
	{
		private static bool _disposed;
		private static InputHandler _inputHandler;

		static int Main()
		{
			Console.Title = "CS";

			AssemblyName[] assemblies = Assembly.GetEntryAssembly().GetReferencedAssemblies();
			foreach ( AssemblyName assembly in assemblies )
				Assembly.Load( assembly );

			Logger.Init( File.ReadAllText( @".\Config\CSLogCfg.xml" ), "CS" );

			_inputHandler = new InputHandler { cmdHandler = HandleInput };
			_inputHandler.Start();

			ErrorCode eResult = CS.instance.Initialize();

			if ( ErrorCode.Success != eResult )
			{
				Logger.Error( $"Initialize CS fail, error code is {eResult}" );
				return 0;
			}

			eResult = CS.instance.Start();
			if ( ErrorCode.Success != eResult )
			{
				Logger.Error( $"Start CS fail, error code is {eResult}" );
				return 0;
			}

			MainLoop();
			_inputHandler.Stop();

			return 0;
		}

		private static void Dispose()
		{
			_disposed = true;
			NetworkMgr.instance.Dispose();
			NetSessionPool.instance.Dispose();
		}

		private static void MainLoop()
		{
			Stopwatch sw = new Stopwatch();
			sw.Start();
			long lastElapsed = 0;
			while ( !_disposed )
			{
				long elapsed = sw.ElapsedMilliseconds;
				CS.instance.Update( elapsed, elapsed - lastElapsed );
				_inputHandler.ProcessInput();
				lastElapsed = elapsed;
				Thread.Sleep( Consts.HEART_BEAT_CD_TICK );
			}
		}

		private static void HandleInput( string cmd )
		{
			switch ( cmd )
			{
				case "exit":
					Dispose();

					break;
				case "cls":
					Console.Clear();
					break;
			}
		}
	}
}
