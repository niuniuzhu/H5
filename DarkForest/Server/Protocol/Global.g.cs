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
            "CgxHbG9iYWwucHJvdG8SBlByb3RvcyI5CgZQYWNrZXQSCwoDcGlkGAEgASgN",
            "EhEKCWlzUmVxdWVzdBgCIAEoCBIPCgdyZXBzUGlkGAMgASgNKrgBCgVNc2dJ",
            "RBIMCghVbmRlZmluZRAAEhUKEUdDMkxTX0Fza1JlZ2lzdGVyEGQSEgoOR0My",
            "TFNfQXNrTG9naW4QZRIRCgxMUzJHQ19SZXN1bHQQyAESEQoMTFMyR0NfR1NJ",
            "bmZvEMkBEhYKEUdTMkNTX1JlcG9ydFN0YXRlEKwCEhIKDUNTMkxTX0dTSW5m",
            "b3MQkAMSEQoMQ1MyTFNfR1NJbmZvEJEDEhEKDENTMkxTX0dTTG9zdBCSA2IG",
            "cHJvdG8z"));
      descriptor = pbr::FileDescriptor.FromGeneratedCode(descriptorData,
          new pbr::FileDescriptor[] { },
          new pbr::GeneratedClrTypeInfo(new[] {typeof(global::Protos.MsgID), }, new pbr::GeneratedClrTypeInfo[] {
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.Packet), global::Protos.Packet.Parser, new[]{ "Pid", "IsRequest", "RepsPid" }, null, null, null)
          }));
    }
    #endregion

  }
  #region Enums
  public enum MsgID {
    [pbr::OriginalName("Undefine")] Undefine = 0,
    [pbr::OriginalName("GC2LS_AskRegister")] Gc2LsAskRegister = 100,
    [pbr::OriginalName("GC2LS_AskLogin")] Gc2LsAskLogin = 101,
    [pbr::OriginalName("LS2GC_Result")] Ls2GcResult = 200,
    [pbr::OriginalName("LS2GC_GSInfo")] Ls2GcGsinfo = 201,
    [pbr::OriginalName("GS2CS_ReportState")] Gs2CsReportState = 300,
    [pbr::OriginalName("CS2LS_GSInfos")] Cs2LsGsinfos = 400,
    [pbr::OriginalName("CS2LS_GSInfo")] Cs2LsGsinfo = 401,
    [pbr::OriginalName("CS2LS_GSLost")] Cs2LsGslost = 402,
  }

  #endregion

  #region Messages
  public sealed partial class Packet : pb::IMessage<Packet> {
    private static readonly pb::MessageParser<Packet> _parser = new pb::MessageParser<Packet>(() => new Packet());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<Packet> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.GlobalReflection.Descriptor.MessageTypes[0]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public Packet() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public Packet(Packet other) : this() {
      pid_ = other.pid_;
      isRequest_ = other.isRequest_;
      repsPid_ = other.repsPid_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public Packet Clone() {
      return new Packet(this);
    }

    /// <summary>Field number for the "pid" field.</summary>
    public const int PidFieldNumber = 1;
    private uint pid_;
    /// <summary>
    ///运行时包id
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public uint Pid {
      get { return pid_; }
      set {
        pid_ = value;
      }
    }

    /// <summary>Field number for the "isRequest" field.</summary>
    public const int IsRequestFieldNumber = 2;
    private bool isRequest_;
    /// <summary>
    ///是否一个请求包
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool IsRequest {
      get { return isRequest_; }
      set {
        isRequest_ = value;
      }
    }

    /// <summary>Field number for the "repsPid" field.</summary>
    public const int RepsPidFieldNumber = 3;
    private uint repsPid_;
    /// <summary>
    ///回应对应请求的包id
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public uint RepsPid {
      get { return repsPid_; }
      set {
        repsPid_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as Packet);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(Packet other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (Pid != other.Pid) return false;
      if (IsRequest != other.IsRequest) return false;
      if (RepsPid != other.RepsPid) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (Pid != 0) hash ^= Pid.GetHashCode();
      if (IsRequest != false) hash ^= IsRequest.GetHashCode();
      if (RepsPid != 0) hash ^= RepsPid.GetHashCode();
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
      if (Pid != 0) {
        output.WriteRawTag(8);
        output.WriteUInt32(Pid);
      }
      if (IsRequest != false) {
        output.WriteRawTag(16);
        output.WriteBool(IsRequest);
      }
      if (RepsPid != 0) {
        output.WriteRawTag(24);
        output.WriteUInt32(RepsPid);
      }
      if (_unknownFields != null) {
        _unknownFields.WriteTo(output);
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int CalculateSize() {
      int size = 0;
      if (Pid != 0) {
        size += 1 + pb::CodedOutputStream.ComputeUInt32Size(Pid);
      }
      if (IsRequest != false) {
        size += 1 + 1;
      }
      if (RepsPid != 0) {
        size += 1 + pb::CodedOutputStream.ComputeUInt32Size(RepsPid);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(Packet other) {
      if (other == null) {
        return;
      }
      if (other.Pid != 0) {
        Pid = other.Pid;
      }
      if (other.IsRequest != false) {
        IsRequest = other.IsRequest;
      }
      if (other.RepsPid != 0) {
        RepsPid = other.RepsPid;
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
            Pid = input.ReadUInt32();
            break;
          }
          case 16: {
            IsRequest = input.ReadBool();
            break;
          }
          case 24: {
            RepsPid = input.ReadUInt32();
            break;
          }
        }
      }
    }

  }

  #endregion

}

#endregion Designer generated code
