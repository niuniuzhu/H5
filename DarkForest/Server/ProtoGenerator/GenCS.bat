@echo off
protoc --csharp_out=../Protocol --proto_path=./ProtoFile --csharp_opt=file_extension=.g.cs ./ProtoFile/Global.proto
protoc --csharp_out=../Protocol --proto_path=./ProtoFile --csharp_opt=file_extension=.g.cs ./ProtoFile/LSToGC.proto
protoc --csharp_out=../Protocol --proto_path=./ProtoFile --csharp_opt=file_extension=.g.cs ./ProtoFile/GCToLS.proto
dotnet bin/ProtoGenerator.dll csharp ./ProtoFile ../Protocol
@echo Done
pause