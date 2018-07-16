// <auto-generated>
//     Generated by the protocol buffer compiler.  DO NOT EDIT!
//     source: LSToGC.proto
// </auto-generated>
#pragma warning disable 1591, 0612, 3021
#region Designer generated code

using pb = global::Google.Protobuf;
using pbc = global::Google.Protobuf.Collections;
using pbr = global::Google.Protobuf.Reflection;
using scg = global::System.Collections.Generic;
namespace Protos.LSToGC {

  /// <summary>Holder for reflection information generated from LSToGC.proto</summary>
  public static partial class LSToGCReflection {

    #region Descriptor
    /// <summary>File descriptor for LSToGC.proto</summary>
    public static pbr::FileDescriptor Descriptor {
      get { return descriptor; }
    }
    private static pbr::FileDescriptor descriptor;

    static LSToGCReflection() {
      byte[] descriptorData = global::System.Convert.FromBase64String(
          string.Concat(
            "CgxMU1RvR0MucHJvdG8SDVByb3Rvcy5MU1RvR0MaDEdsb2JhbC5wcm90byI9",
            "CgtMb2dpblJlc3VsdBIeCgZwYWNrZXQYASABKAsyDi5Qcm90b3MuUGFja2V0",
            "Eg4KBnJlc3VsdBgCIAEoBSJ9CgpTZXJ2ZXJJbmZvEh4KBnBhY2tldBgBIAEo",
            "CzIOLlByb3Rvcy5QYWNrZXQSEgoKc2VydmVyTmFtZRgCIAEoCRISCgpzZXJ2",
            "ZXJBZGRyGAMgASgJEhIKCnNlcnZlclBvcnQYBCABKAUSEwoLc2VydmVyU3Rh",
            "dGUYBSABKAUiVwoGQlNBZGRyEh4KBnBhY2tldBgBIAEoCzIOLlByb3Rvcy5Q",
            "YWNrZXQSLQoKc2VydmVyaW5mbxgCIAMoCzIZLlByb3Rvcy5MU1RvR0MuU2Vy",
            "dmVySW5mb2IGcHJvdG8z"));
      descriptor = pbr::FileDescriptor.FromGeneratedCode(descriptorData,
          new pbr::FileDescriptor[] { global::Protos.GlobalReflection.Descriptor, },
          new pbr::GeneratedClrTypeInfo(null, new pbr::GeneratedClrTypeInfo[] {
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.LSToGC.LoginResult), global::Protos.LSToGC.LoginResult.Parser, new[]{ "Packet", "Result" }, null, null, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.LSToGC.ServerInfo), global::Protos.LSToGC.ServerInfo.Parser, new[]{ "Packet", "ServerName", "ServerAddr", "ServerPort", "ServerState" }, null, null, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.LSToGC.BSAddr), global::Protos.LSToGC.BSAddr.Parser, new[]{ "Packet", "Serverinfo" }, null, null, null)
          }));
    }
    #endregion

  }
  #region Messages
  public sealed partial class LoginResult : pb::IMessage<LoginResult> {
    private static readonly pb::MessageParser<LoginResult> _parser = new pb::MessageParser<LoginResult>(() => new LoginResult());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<LoginResult> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.LSToGC.LSToGCReflection.Descriptor.MessageTypes[0]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public LoginResult() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public LoginResult(LoginResult other) : this() {
      packet_ = other.packet_ != null ? other.packet_.Clone() : null;
      result_ = other.result_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public LoginResult Clone() {
      return new LoginResult(this);
    }

    /// <summary>Field number for the "packet" field.</summary>
    public const int PacketFieldNumber = 1;
    private global::Protos.Packet packet_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.Packet Packet {
      get { return packet_; }
      set {
        packet_ = value;
      }
    }

    /// <summary>Field number for the "result" field.</summary>
    public const int ResultFieldNumber = 2;
    private int result_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int Result {
      get { return result_; }
      set {
        result_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as LoginResult);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(LoginResult other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Packet, other.Packet)) return false;
      if (Result != other.Result) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (packet_ != null) hash ^= Packet.GetHashCode();
      if (Result != 0) hash ^= Result.GetHashCode();
      if (_unknownFields != null) {
        hash ^= _unknownFields.GetHashCode();
      }
      return hash;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override string ToString() {
      return pb::JsonFormatter.ToDiagnosticString(this);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void WriteTo(pb::CodedOutputStream output) {
      if (packet_ != null) {
        output.WriteRawTag(10);
        output.WriteMessage(Packet);
      }
      if (Result != 0) {
        output.WriteRawTag(16);
        output.WriteInt32(Result);
      }
      if (_unknownFields != null) {
        _unknownFields.WriteTo(output);
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int CalculateSize() {
      int size = 0;
      if (packet_ != null) {
        size += 1 + pb::CodedOutputStream.ComputeMessageSize(Packet);
      }
      if (Result != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(Result);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(LoginResult other) {
      if (other == null) {
        return;
      }
      if (other.packet_ != null) {
        if (packet_ == null) {
          packet_ = new global::Protos.Packet();
        }
        Packet.MergeFrom(other.Packet);
      }
      if (other.Result != 0) {
        Result = other.Result;
      }
      _unknownFields = pb::UnknownFieldSet.MergeFrom(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(pb::CodedInputStream input) {
      uint tag;
      while ((tag = input.ReadTag()) != 0) {
        switch(tag) {
          default:
            _unknownFields = pb::UnknownFieldSet.MergeFieldFrom(_unknownFields, input);
            break;
          case 10: {
            if (packet_ == null) {
              packet_ = new global::Protos.Packet();
            }
            input.ReadMessage(packet_);
            break;
          }
          case 16: {
            Result = input.ReadInt32();
            break;
          }
        }
      }
    }

  }

  public sealed partial class ServerInfo : pb::IMessage<ServerInfo> {
    private static readonly pb::MessageParser<ServerInfo> _parser = new pb::MessageParser<ServerInfo>(() => new ServerInfo());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<ServerInfo> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.LSToGC.LSToGCReflection.Descriptor.MessageTypes[1]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public ServerInfo() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public ServerInfo(ServerInfo other) : this() {
      packet_ = other.packet_ != null ? other.packet_.Clone() : null;
      serverName_ = other.serverName_;
      serverAddr_ = other.serverAddr_;
      serverPort_ = other.serverPort_;
      serverState_ = other.serverState_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public ServerInfo Clone() {
      return new ServerInfo(this);
    }

    /// <summary>Field number for the "packet" field.</summary>
    public const int PacketFieldNumber = 1;
    private global::Protos.Packet packet_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.Packet Packet {
      get { return packet_; }
      set {
        packet_ = value;
      }
    }

    /// <summary>Field number for the "serverName" field.</summary>
    public const int ServerNameFieldNumber = 2;
    private string serverName_ = "";
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string ServerName {
      get { return serverName_; }
      set {
        serverName_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    /// <summary>Field number for the "serverAddr" field.</summary>
    public const int ServerAddrFieldNumber = 3;
    private string serverAddr_ = "";
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string ServerAddr {
      get { return serverAddr_; }
      set {
        serverAddr_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    /// <summary>Field number for the "serverPort" field.</summary>
    public const int ServerPortFieldNumber = 4;
    private int serverPort_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int ServerPort {
      get { return serverPort_; }
      set {
        serverPort_ = value;
      }
    }

    /// <summary>Field number for the "serverState" field.</summary>
    public const int ServerStateFieldNumber = 5;
    private int serverState_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int ServerState {
      get { return serverState_; }
      set {
        serverState_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as ServerInfo);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(ServerInfo other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Packet, other.Packet)) return false;
      if (ServerName != other.ServerName) return false;
      if (ServerAddr != other.ServerAddr) return false;
      if (ServerPort != other.ServerPort) return false;
      if (ServerState != other.ServerState) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (packet_ != null) hash ^= Packet.GetHashCode();
      if (ServerName.Length != 0) hash ^= ServerName.GetHashCode();
      if (ServerAddr.Length != 0) hash ^= ServerAddr.GetHashCode();
      if (ServerPort != 0) hash ^= ServerPort.GetHashCode();
      if (ServerState != 0) hash ^= ServerState.GetHashCode();
      if (_unknownFields != null) {
        hash ^= _unknownFields.GetHashCode();
      }
      return hash;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override string ToString() {
      return pb::JsonFormatter.ToDiagnosticString(this);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void WriteTo(pb::CodedOutputStream output) {
      if (packet_ != null) {
        output.WriteRawTag(10);
        output.WriteMessage(Packet);
      }
      if (ServerName.Length != 0) {
        output.WriteRawTag(18);
        output.WriteString(ServerName);
      }
      if (ServerAddr.Length != 0) {
        output.WriteRawTag(26);
        output.WriteString(ServerAddr);
      }
      if (ServerPort != 0) {
        output.WriteRawTag(32);
        output.WriteInt32(ServerPort);
      }
      if (ServerState != 0) {
        output.WriteRawTag(40);
        output.WriteInt32(ServerState);
      }
      if (_unknownFields != null) {
        _unknownFields.WriteTo(output);
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int CalculateSize() {
      int size = 0;
      if (packet_ != null) {
        size += 1 + pb::CodedOutputStream.ComputeMessageSize(Packet);
      }
      if (ServerName.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(ServerName);
      }
      if (ServerAddr.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(ServerAddr);
      }
      if (ServerPort != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(ServerPort);
      }
      if (ServerState != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(ServerState);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(ServerInfo other) {
      if (other == null) {
        return;
      }
      if (other.packet_ != null) {
        if (packet_ == null) {
          packet_ = new global::Protos.Packet();
        }
        Packet.MergeFrom(other.Packet);
      }
      if (other.ServerName.Length != 0) {
        ServerName = other.ServerName;
      }
      if (other.ServerAddr.Length != 0) {
        ServerAddr = other.ServerAddr;
      }
      if (other.ServerPort != 0) {
        ServerPort = other.ServerPort;
      }
      if (other.ServerState != 0) {
        ServerState = other.ServerState;
      }
      _unknownFields = pb::UnknownFieldSet.MergeFrom(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(pb::CodedInputStream input) {
      uint tag;
      while ((tag = input.ReadTag()) != 0) {
        switch(tag) {
          default:
            _unknownFields = pb::UnknownFieldSet.MergeFieldFrom(_unknownFields, input);
            break;
          case 10: {
            if (packet_ == null) {
              packet_ = new global::Protos.Packet();
            }
            input.ReadMessage(packet_);
            break;
          }
          case 18: {
            ServerName = input.ReadString();
            break;
          }
          case 26: {
            ServerAddr = input.ReadString();
            break;
          }
          case 32: {
            ServerPort = input.ReadInt32();
            break;
          }
          case 40: {
            ServerState = input.ReadInt32();
            break;
          }
        }
      }
    }

  }

  public sealed partial class BSAddr : pb::IMessage<BSAddr> {
    private static readonly pb::MessageParser<BSAddr> _parser = new pb::MessageParser<BSAddr>(() => new BSAddr());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<BSAddr> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.LSToGC.LSToGCReflection.Descriptor.MessageTypes[2]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BSAddr() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BSAddr(BSAddr other) : this() {
      packet_ = other.packet_ != null ? other.packet_.Clone() : null;
      serverinfo_ = other.serverinfo_.Clone();
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BSAddr Clone() {
      return new BSAddr(this);
    }

    /// <summary>Field number for the "packet" field.</summary>
    public const int PacketFieldNumber = 1;
    private global::Protos.Packet packet_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.Packet Packet {
      get { return packet_; }
      set {
        packet_ = value;
      }
    }

    /// <summary>Field number for the "serverinfo" field.</summary>
    public const int ServerinfoFieldNumber = 2;
    private static readonly pb::FieldCodec<global::Protos.LSToGC.ServerInfo> _repeated_serverinfo_codec
        = pb::FieldCodec.ForMessage(18, global::Protos.LSToGC.ServerInfo.Parser);
    private readonly pbc::RepeatedField<global::Protos.LSToGC.ServerInfo> serverinfo_ = new pbc::RepeatedField<global::Protos.LSToGC.ServerInfo>();
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public pbc::RepeatedField<global::Protos.LSToGC.ServerInfo> Serverinfo {
      get { return serverinfo_; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as BSAddr);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(BSAddr other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Packet, other.Packet)) return false;
      if(!serverinfo_.Equals(other.serverinfo_)) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (packet_ != null) hash ^= Packet.GetHashCode();
      hash ^= serverinfo_.GetHashCode();
      if (_unknownFields != null) {
        hash ^= _unknownFields.GetHashCode();
      }
      return hash;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override string ToString() {
      return pb::JsonFormatter.ToDiagnosticString(this);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void WriteTo(pb::CodedOutputStream output) {
      if (packet_ != null) {
        output.WriteRawTag(10);
        output.WriteMessage(Packet);
      }
      serverinfo_.WriteTo(output, _repeated_serverinfo_codec);
      if (_unknownFields != null) {
        _unknownFields.WriteTo(output);
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int CalculateSize() {
      int size = 0;
      if (packet_ != null) {
        size += 1 + pb::CodedOutputStream.ComputeMessageSize(Packet);
      }
      size += serverinfo_.CalculateSize(_repeated_serverinfo_codec);
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(BSAddr other) {
      if (other == null) {
        return;
      }
      if (other.packet_ != null) {
        if (packet_ == null) {
          packet_ = new global::Protos.Packet();
        }
        Packet.MergeFrom(other.Packet);
      }
      serverinfo_.Add(other.serverinfo_);
      _unknownFields = pb::UnknownFieldSet.MergeFrom(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(pb::CodedInputStream input) {
      uint tag;
      while ((tag = input.ReadTag()) != 0) {
        switch(tag) {
          default:
            _unknownFields = pb::UnknownFieldSet.MergeFieldFrom(_unknownFields, input);
            break;
          case 10: {
            if (packet_ == null) {
              packet_ = new global::Protos.Packet();
            }
            input.ReadMessage(packet_);
            break;
          }
          case 18: {
            serverinfo_.AddEntriesFrom(input, _repeated_serverinfo_codec);
            break;
          }
        }
      }
    }

  }

  #endregion

}

#endregion Designer generated code
