dotnet bin/ProtoGenerator.dll ts ./ProtoFile ../../Client/src/Protos/ProtoHelper.ts
pbts --no-comments -o ..\..\Client\src\libs\protos.d.ts ..\..\Client\bin\libs\protos.js