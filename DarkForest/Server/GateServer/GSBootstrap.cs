using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Threading;
using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace GateServer
{
	static class GSBootstrap
	{
		private static bool _disposed;
		private static InputHandler _inputHandler;

		static int Main( string[] args )
		{
			Console.Title = "GS";

			AssemblyName[] assemblies = Assembly.GetEntryAssembly().GetReferencedAssemblies();
			foreach ( AssemblyName assembly in assemblies )
				Assembly.Load( assembly );

			Logger.Init( File.ReadAllText( @".\Config\GSLogCfg.xml" ), "GS" );

			_inputHandler = new InputHandler { cmdHandler = HandleInput };
			_inputHandler.Start();

			ErrorCode eResult = GS.instance.Initialize();

			if ( ErrorCode.Success != eResult )
			{
				Logger.Error( $"Initialize GS fail, error code is {eResult}" );
				return 0;
			}

			eResult = GS.instance.Start();
			if ( ErrorCode.Success != eResult )
			{
				Logger.Error( $"Start GS fail, error code is {eResult}" );
				return 0;
			}

			MainLoop();
			_inputHandler.Stop();

			return 0;
		}

		private static void Dispose()
		{
			_disposed = true;
			GS.instance.Dispose();
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
				GS.instance.Update( elapsed, elapsed - lastElapsed );
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
