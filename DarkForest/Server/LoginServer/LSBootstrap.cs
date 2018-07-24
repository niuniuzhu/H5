using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;
using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Threading;

namespace LoginServer
{
	static class LSBootstrap
	{
		private static bool _disposed;
		private static InputHandler _inputHandler;

		static int Main()
		{
			Console.Title = "LS";

			AssemblyName[] assemblies = Assembly.GetEntryAssembly().GetReferencedAssemblies();
			foreach ( AssemblyName assembly in assemblies )
				Assembly.Load( assembly );

			Logger.Init( File.ReadAllText( @".\Config\LSLogCfg.xml" ), "LS" );

			_inputHandler = new InputHandler { cmdHandler = HandleInput };
			_inputHandler.Start();

			ErrorCode eResult = LS.instance.Initialize();

			if ( ErrorCode.Success != eResult )
			{
				Logger.Error( $"Initialize LS fail, error code is {eResult}" );
				return 0;
			}

			eResult = LS.instance.Start();
			if ( ErrorCode.Success != eResult )
			{
				Logger.Error( $"Start LS fail, error code is {eResult}" );
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
				LS.instance.Update( elapsed, elapsed - lastElapsed );
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
