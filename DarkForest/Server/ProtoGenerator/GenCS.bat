protoc --csharp_out=../Protocol --proto_path=./ProtoFile ./ProtoFile/Global.proto
protoc --csharp_out=../Protocol --proto_path=./ProtoFile ./ProtoFile/LSToGC.proto
protoc --csharp_out=../Protocol --proto_path=./ProtoFile ./ProtoFile/GCToLS.proto