// <auto-generated>
//     Generated by the protocol buffer compiler.  DO NOT EDIT!
//     source: Global.proto
// </auto-generated>
#pragma warning disable 1591, 0612, 3021
#region Designer generated code

using pb = global::Google.Protobuf;
using pbc = global::Google.Protobuf.Collections;
using pbr = global::Google.Protobuf.Reflection;
using scg = global::System.Collections.Generic;
namespace Protos {

  /// <summary>Holder for reflection information generated from Global.proto</summary>
  public static partial class GlobalReflection {

    #region Descriptor
    /// <summary>File descriptor for Global.proto</summary>
    public static pbr::FileDescriptor Descriptor {
      get { return descriptor; }
    }
    private static pbr::FileDescriptor descriptor;

    static GlobalReflection() {
      byte[] descriptorData = global::System.Convert.FromBase64String(
          string.Concat(
            "CgxHbG9iYWwucHJvdG8SBlByb3RvcyJyCgdNc2dPcHRzEgwKBGZsYWcYASAB",
            "KA0SCwoDcGlkGAIgASgNEgwKBHJwaWQYAyABKA0SDAoEbnNpZBgEIAEoDSIw",
            "CgRGbGFnEgoKBlVudXNlZBAAEgcKA1JQQxABEggKBFJFU1AQAhIJCgVUUkFO",
            "UxAEIjgKCUdfQXNrUGluZxIdCgRvcHRzGAEgASgLMg8uUHJvdG9zLk1zZ09w",
            "dHMSDAoEdGltZRgCIAEoAyJKCgxHX0Fza1BpbmdSZXQSHQoEb3B0cxgBIAEo",
            "CzIPLlByb3Rvcy5Nc2dPcHRzEg0KBXN0aW1lGAIgASgDEgwKBHRpbWUYAyAB",
            "KAMqiwMKBU1zZ0lEEgwKCFVuZGVmaW5lEAASDgoKZUdfQXNrUGluZxAKEhEK",
            "DWVHX0Fza1BpbmdSZXQQCxIWChJlR0MyTFNfQXNrUmVnaXN0ZXIQZBITCg9l",
            "R0MyTFNfQXNrTG9naW4QZRIUCg9lR0MyR1NfQXNrTG9naW4QyAESFQoQZUxT",
            "MkdDX1JlZ1Jlc3VsdBCsAhIXChJlTFMyR0NfTG9naW5SZXN1bHQQrQISEgoN",
            "ZUxTMkdDX0dTSW5mbxCuAhITCg5lTFMyQ1NfR0NMb2dpbhCQAxIXChJlR1My",
            "Q1NfUmVwb3J0U3RhdGUQ9AMSFgoRZUdTMkNTX0dDQXNrTG9naW4Q9QMSFwoS",
            "ZUdTMkdDX0xvZ2luUmVzdWx0ENgEEhMKDmVDUzJMU19HU0luZm9zELwFEhIK",
            "DWVDUzJMU19HU0luZm8QvQUSEgoNZUNTMkxTX0dTTG9zdBC+BRIWChFlQ1My",
            "TFNfR0NMb2dpblJldBC/BRIWChFlQ1MyR1NfR0NMb2dpblJldBCgBmIGcHJv",
            "dG8z"));
      descriptor = pbr::FileDescriptor.FromGeneratedCode(descriptorData,
          new pbr::FileDescriptor[] { },
          new pbr::GeneratedClrTypeInfo(new[] {typeof(global::Protos.MsgID), }, new pbr::GeneratedClrTypeInfo[] {
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.MsgOpts), global::Protos.MsgOpts.Parser, new[]{ "Flag", "Pid", "Rpid", "Nsid" }, null, new[]{ typeof(global::Protos.MsgOpts.Types.Flag) }, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.G_AskPing), global::Protos.G_AskPing.Parser, new[]{ "Opts", "Time" }, null, null, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.G_AskPingRet), global::Protos.G_AskPingRet.Parser, new[]{ "Opts", "Stime", "Time" }, null, null, null)
          }));
    }
    #endregion

  }
  #region Enums
  public enum MsgID {
    [pbr::OriginalName("Undefine")] Undefine = 0,
    [pbr::OriginalName("eG_AskPing")] EGAskPing = 10,
    [pbr::OriginalName("eG_AskPingRet")] EGAskPingRet = 11,
    [pbr::OriginalName("eGC2LS_AskRegister")] EGc2LsAskRegister = 100,
    [pbr::OriginalName("eGC2LS_AskLogin")] EGc2LsAskLogin = 101,
    [pbr::OriginalName("eGC2GS_AskLogin")] EGc2GsAskLogin = 200,
    [pbr::OriginalName("eLS2GC_RegResult")] ELs2GcRegResult = 300,
    [pbr::OriginalName("eLS2GC_LoginResult")] ELs2GcLoginResult = 301,
    [pbr::OriginalName("eLS2GC_GSInfo")] ELs2GcGsinfo = 302,
    [pbr::OriginalName("eLS2CS_GCLogin")] ELs2CsGclogin = 400,
    [pbr::OriginalName("eGS2CS_ReportState")] EGs2CsReportState = 500,
    [pbr::OriginalName("eGS2CS_GCAskLogin")] EGs2CsGcaskLogin = 501,
    [pbr::OriginalName("eGS2GC_LoginResult")] EGs2GcLoginResult = 600,
    [pbr::OriginalName("eCS2LS_GSInfos")] ECs2LsGsinfos = 700,
    [pbr::OriginalName("eCS2LS_GSInfo")] ECs2LsGsinfo = 701,
    [pbr::OriginalName("eCS2LS_GSLost")] ECs2LsGslost = 702,
    [pbr::OriginalName("eCS2LS_GCLoginRet")] ECs2LsGcloginRet = 703,
    [pbr::OriginalName("eCS2GS_GCLoginRet")] ECs2GsGcloginRet = 800,
  }

  #endregion

  #region Messages
  public sealed partial class MsgOpts : pb::IMessage<MsgOpts> {
    private static readonly pb::MessageParser<MsgOpts> _parser = new pb::MessageParser<MsgOpts>(() => new MsgOpts());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<MsgOpts> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.GlobalReflection.Descriptor.MessageTypes[0]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public MsgOpts() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public MsgOpts(MsgOpts other) : this() {
      flag_ = other.flag_;
      pid_ = other.pid_;
      rpid_ = other.rpid_;
      nsid_ = other.nsid_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public MsgOpts Clone() {
      return new MsgOpts(this);
    }

    /// <summary>Field number for the "flag" field.</summary>
    public const int FlagFieldNumber = 1;
    private uint flag_;
    /// <summary>
    ///protobuf是变长编码的,数值在0-127就只会用花费一个byte
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public uint Flag {
      get { return flag_; }
      set {
        flag_ = value;
      }
    }

    /// <summary>Field number for the "pid" field.</summary>
    public const int PidFieldNumber = 2;
    private uint pid_;
    /// <summary>
    ///运行时消息pid
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public uint Pid {
      get { return pid_; }
      set {
        pid_ = value;
      }
    }

    /// <summary>Field number for the "rpid" field.</summary>
    public const int RpidFieldNumber = 3;
    private uint rpid_;
    /// <summary>
    ///回应对应请求的消息的pid
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public uint Rpid {
      get { return rpid_; }
      set {
        rpid_ = value;
      }
    }

    /// <summary>Field number for the "nsid" field.</summary>
    public const int NsidFieldNumber = 4;
    private uint nsid_;
    /// <summary>
    ///转发的网络id(暂时只会转发到客户端)
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public uint Nsid {
      get { return nsid_; }
      set {
        nsid_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as MsgOpts);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(MsgOpts other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (Flag != other.Flag) return false;
      if (Pid != other.Pid) return false;
      if (Rpid != other.Rpid) return false;
      if (Nsid != other.Nsid) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (Flag != 0) hash ^= Flag.GetHashCode();
      if (Pid != 0) hash ^= Pid.GetHashCode();
      if (Rpid != 0) hash ^= Rpid.GetHashCode();
      if (Nsid != 0) hash ^= Nsid.GetHashCode();
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
      if (Flag != 0) {
        output.WriteRawTag(8);
        output.WriteUInt32(Flag);
      }
      if (Pid != 0) {
        output.WriteRawTag(16);
        output.WriteUInt32(Pid);
      }
      if (Rpid != 0) {
        output.WriteRawTag(24);
        output.WriteUInt32(Rpid);
      }
      if (Nsid != 0) {
        output.WriteRawTag(32);
        output.WriteUInt32(Nsid);
      }
      if (_unknownFields != null) {
        _unknownFields.WriteTo(output);
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int CalculateSize() {
      int size = 0;
      if (Flag != 0) {
        size += 1 + pb::CodedOutputStream.ComputeUInt32Size(Flag);
      }
      if (Pid != 0) {
        size += 1 + pb::CodedOutputStream.ComputeUInt32Size(Pid);
      }
      if (Rpid != 0) {
        size += 1 + pb::CodedOutputStream.ComputeUInt32Size(Rpid);
      }
      if (Nsid != 0) {
        size += 1 + pb::CodedOutputStream.ComputeUInt32Size(Nsid);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(MsgOpts other) {
      if (other == null) {
        return;
      }
      if (other.Flag != 0) {
        Flag = other.Flag;
      }
      if (other.Pid != 0) {
        Pid = other.Pid;
      }
      if (other.Rpid != 0) {
        Rpid = other.Rpid;
      }
      if (other.Nsid != 0) {
        Nsid = other.Nsid;
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
          case 8: {
            Flag = input.ReadUInt32();
            break;
          }
          case 16: {
            Pid = input.ReadUInt32();
            break;
          }
          case 24: {
            Rpid = input.ReadUInt32();
            break;
          }
          case 32: {
            Nsid = input.ReadUInt32();
            break;
          }
        }
      }
    }

    #region Nested types
    /// <summary>Container for nested types declared in the MsgOpts message type.</summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static partial class Types {
      public enum Flag {
        [pbr::OriginalName("Unused")] Unused = 0,
        [pbr::OriginalName("RPC")] Rpc = 1,
        [pbr::OriginalName("RESP")] Resp = 2,
        [pbr::OriginalName("TRANS")] Trans = 4,
      }

    }
    #endregion

  }

  public sealed partial class G_AskPing : pb::IMessage<G_AskPing> {
    private static readonly pb::MessageParser<G_AskPing> _parser = new pb::MessageParser<G_AskPing>(() => new G_AskPing());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<G_AskPing> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.GlobalReflection.Descriptor.MessageTypes[1]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public G_AskPing() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public G_AskPing(G_AskPing other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      time_ = other.time_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public G_AskPing Clone() {
      return new G_AskPing(this);
    }

    /// <summary>Field number for the "opts" field.</summary>
    public const int OptsFieldNumber = 1;
    private global::Protos.MsgOpts opts_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.MsgOpts Opts {
      get { return opts_; }
      set {
        opts_ = value;
      }
    }

    /// <summary>Field number for the "time" field.</summary>
    public const int TimeFieldNumber = 2;
    private long time_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public long Time {
      get { return time_; }
      set {
        time_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as G_AskPing);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(G_AskPing other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (Time != other.Time) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (Time != 0L) hash ^= Time.GetHashCode();
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
      if (opts_ != null) {
        output.WriteRawTag(10);
        output.WriteMessage(Opts);
      }
      if (Time != 0L) {
        output.WriteRawTag(16);
        output.WriteInt64(Time);
      }
      if (_unknownFields != null) {
        _unknownFields.WriteTo(output);
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int CalculateSize() {
      int size = 0;
      if (opts_ != null) {
        size += 1 + pb::CodedOutputStream.ComputeMessageSize(Opts);
      }
      if (Time != 0L) {
        size += 1 + pb::CodedOutputStream.ComputeInt64Size(Time);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(G_AskPing other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
      }
      if (other.Time != 0L) {
        Time = other.Time;
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
            if (opts_ == null) {
              opts_ = new global::Protos.MsgOpts();
            }
            input.ReadMessage(opts_);
            break;
          }
          case 16: {
            Time = input.ReadInt64();
            break;
          }
        }
      }
    }

  }

  public sealed partial class G_AskPingRet : pb::IMessage<G_AskPingRet> {
    private static readonly pb::MessageParser<G_AskPingRet> _parser = new pb::MessageParser<G_AskPingRet>(() => new G_AskPingRet());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<G_AskPingRet> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.GlobalReflection.Descriptor.MessageTypes[2]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public G_AskPingRet() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public G_AskPingRet(G_AskPingRet other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      stime_ = other.stime_;
      time_ = other.time_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public G_AskPingRet Clone() {
      return new G_AskPingRet(this);
    }

    /// <summary>Field number for the "opts" field.</summary>
    public const int OptsFieldNumber = 1;
    private global::Protos.MsgOpts opts_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.MsgOpts Opts {
      get { return opts_; }
      set {
        opts_ = value;
      }
    }

    /// <summary>Field number for the "stime" field.</summary>
    public const int StimeFieldNumber = 2;
    private long stime_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public long Stime {
      get { return stime_; }
      set {
        stime_ = value;
      }
    }

    /// <summary>Field number for the "time" field.</summary>
    public const int TimeFieldNumber = 3;
    private long time_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public long Time {
      get { return time_; }
      set {
        time_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as G_AskPingRet);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(G_AskPingRet other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (Stime != other.Stime) return false;
      if (Time != other.Time) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (Stime != 0L) hash ^= Stime.GetHashCode();
      if (Time != 0L) hash ^= Time.GetHashCode();
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
      if (opts_ != null) {
        output.WriteRawTag(10);
        output.WriteMessage(Opts);
      }
      if (Stime != 0L) {
        output.WriteRawTag(16);
        output.WriteInt64(Stime);
      }
      if (Time != 0L) {
        output.WriteRawTag(24);
        output.WriteInt64(Time);
      }
      if (_unknownFields != null) {
        _unknownFields.WriteTo(output);
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int CalculateSize() {
      int size = 0;
      if (opts_ != null) {
        size += 1 + pb::CodedOutputStream.ComputeMessageSize(Opts);
      }
      if (Stime != 0L) {
        size += 1 + pb::CodedOutputStream.ComputeInt64Size(Stime);
      }
      if (Time != 0L) {
        size += 1 + pb::CodedOutputStream.ComputeInt64Size(Time);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(G_AskPingRet other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
      }
      if (other.Stime != 0L) {
        Stime = other.Stime;
      }
      if (other.Time != 0L) {
        Time = other.Time;
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
            if (opts_ == null) {
              opts_ = new global::Protos.MsgOpts();
            }
            input.ReadMessage(opts_);
            break;
          }
          case 16: {
            Stime = input.ReadInt64();
            break;
          }
          case 24: {
            Time = input.ReadInt64();
            break;
          }
        }
      }
    }

  }

  #endregion

}

#endregion Designer generated code
