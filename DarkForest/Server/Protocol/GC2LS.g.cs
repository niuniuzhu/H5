// <auto-generated>
//     Generated by the protocol buffer compiler.  DO NOT EDIT!
//     source: GC2LS.proto
// </auto-generated>
#pragma warning disable 1591, 0612, 3021
#region Designer generated code

using pb = global::Google.Protobuf;
using pbc = global::Google.Protobuf.Collections;
using pbr = global::Google.Protobuf.Reflection;
using scg = global::System.Collections.Generic;
namespace Protos {

  /// <summary>Holder for reflection information generated from GC2LS.proto</summary>
  public static partial class GC2LSReflection {

    #region Descriptor
    /// <summary>File descriptor for GC2LS.proto</summary>
    public static pbr::FileDescriptor Descriptor {
      get { return descriptor; }
    }
    private static pbr::FileDescriptor descriptor;

    static GC2LSReflection() {
      byte[] descriptorData = global::System.Convert.FromBase64String(
          string.Concat(
            "CgtHQzJMUy5wcm90bxIGUHJvdG9zGgxHbG9iYWwucHJvdG8ibwoRR0MyTFNf",
            "QXNrUmVnaXN0ZXISHQoEb3B0cxgBIAEoCzIPLlByb3Rvcy5Nc2dPcHRzEgsK",
            "A3NkaxgCIAEoBRIMCgRuYW1lGAMgASgJEg4KBnBhc3N3ZBgEIAEoCRIQCghw",
            "bGF0Zm9ybRgFIAEoDSJNCg5HQzJMU19Bc2tMb2dpbhIdCgRvcHRzGAEgASgL",
            "Mg8uUHJvdG9zLk1zZ09wdHMSDAoEbmFtZRgCIAEoCRIOCgZwYXNzd2QYAyAB",
            "KAliBnByb3RvMw=="));
      descriptor = pbr::FileDescriptor.FromGeneratedCode(descriptorData,
          new pbr::FileDescriptor[] { global::Protos.GlobalReflection.Descriptor, },
          new pbr::GeneratedClrTypeInfo(null, new pbr::GeneratedClrTypeInfo[] {
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.GC2LS_AskRegister), global::Protos.GC2LS_AskRegister.Parser, new[]{ "Opts", "Sdk", "Name", "Passwd", "Platform" }, null, null, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.GC2LS_AskLogin), global::Protos.GC2LS_AskLogin.Parser, new[]{ "Opts", "Name", "Passwd" }, null, null, null)
          }));
    }
    #endregion

  }
  #region Messages
  public sealed partial class GC2LS_AskRegister : pb::IMessage<GC2LS_AskRegister> {
    private static readonly pb::MessageParser<GC2LS_AskRegister> _parser = new pb::MessageParser<GC2LS_AskRegister>(() => new GC2LS_AskRegister());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<GC2LS_AskRegister> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.GC2LSReflection.Descriptor.MessageTypes[0]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GC2LS_AskRegister() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GC2LS_AskRegister(GC2LS_AskRegister other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      sdk_ = other.sdk_;
      name_ = other.name_;
      passwd_ = other.passwd_;
      platform_ = other.platform_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GC2LS_AskRegister Clone() {
      return new GC2LS_AskRegister(this);
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

    /// <summary>Field number for the "sdk" field.</summary>
    public const int SdkFieldNumber = 2;
    private int sdk_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int Sdk {
      get { return sdk_; }
      set {
        sdk_ = value;
      }
    }

    /// <summary>Field number for the "name" field.</summary>
    public const int NameFieldNumber = 3;
    private string name_ = "";
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string Name {
      get { return name_; }
      set {
        name_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    /// <summary>Field number for the "passwd" field.</summary>
    public const int PasswdFieldNumber = 4;
    private string passwd_ = "";
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string Passwd {
      get { return passwd_; }
      set {
        passwd_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    /// <summary>Field number for the "platform" field.</summary>
    public const int PlatformFieldNumber = 5;
    private uint platform_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public uint Platform {
      get { return platform_; }
      set {
        platform_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as GC2LS_AskRegister);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(GC2LS_AskRegister other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (Sdk != other.Sdk) return false;
      if (Name != other.Name) return false;
      if (Passwd != other.Passwd) return false;
      if (Platform != other.Platform) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (Sdk != 0) hash ^= Sdk.GetHashCode();
      if (Name.Length != 0) hash ^= Name.GetHashCode();
      if (Passwd.Length != 0) hash ^= Passwd.GetHashCode();
      if (Platform != 0) hash ^= Platform.GetHashCode();
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
      if (Sdk != 0) {
        output.WriteRawTag(16);
        output.WriteInt32(Sdk);
      }
      if (Name.Length != 0) {
        output.WriteRawTag(26);
        output.WriteString(Name);
      }
      if (Passwd.Length != 0) {
        output.WriteRawTag(34);
        output.WriteString(Passwd);
      }
      if (Platform != 0) {
        output.WriteRawTag(40);
        output.WriteUInt32(Platform);
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
      if (Sdk != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(Sdk);
      }
      if (Name.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(Name);
      }
      if (Passwd.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(Passwd);
      }
      if (Platform != 0) {
        size += 1 + pb::CodedOutputStream.ComputeUInt32Size(Platform);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(GC2LS_AskRegister other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
      }
      if (other.Sdk != 0) {
        Sdk = other.Sdk;
      }
      if (other.Name.Length != 0) {
        Name = other.Name;
      }
      if (other.Passwd.Length != 0) {
        Passwd = other.Passwd;
      }
      if (other.Platform != 0) {
        Platform = other.Platform;
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
            Sdk = input.ReadInt32();
            break;
          }
          case 26: {
            Name = input.ReadString();
            break;
          }
          case 34: {
            Passwd = input.ReadString();
            break;
          }
          case 40: {
            Platform = input.ReadUInt32();
            break;
          }
        }
      }
    }

  }

  public sealed partial class GC2LS_AskLogin : pb::IMessage<GC2LS_AskLogin> {
    private static readonly pb::MessageParser<GC2LS_AskLogin> _parser = new pb::MessageParser<GC2LS_AskLogin>(() => new GC2LS_AskLogin());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<GC2LS_AskLogin> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.GC2LSReflection.Descriptor.MessageTypes[1]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GC2LS_AskLogin() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GC2LS_AskLogin(GC2LS_AskLogin other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      name_ = other.name_;
      passwd_ = other.passwd_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GC2LS_AskLogin Clone() {
      return new GC2LS_AskLogin(this);
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

    /// <summary>Field number for the "name" field.</summary>
    public const int NameFieldNumber = 2;
    private string name_ = "";
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string Name {
      get { return name_; }
      set {
        name_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    /// <summary>Field number for the "passwd" field.</summary>
    public const int PasswdFieldNumber = 3;
    private string passwd_ = "";
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string Passwd {
      get { return passwd_; }
      set {
        passwd_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as GC2LS_AskLogin);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(GC2LS_AskLogin other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (Name != other.Name) return false;
      if (Passwd != other.Passwd) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (Name.Length != 0) hash ^= Name.GetHashCode();
      if (Passwd.Length != 0) hash ^= Passwd.GetHashCode();
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
      if (Name.Length != 0) {
        output.WriteRawTag(18);
        output.WriteString(Name);
      }
      if (Passwd.Length != 0) {
        output.WriteRawTag(26);
        output.WriteString(Passwd);
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
      if (Name.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(Name);
      }
      if (Passwd.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(Passwd);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(GC2LS_AskLogin other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
      }
      if (other.Name.Length != 0) {
        Name = other.Name;
      }
      if (other.Passwd.Length != 0) {
        Passwd = other.Passwd;
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
          case 18: {
            Name = input.ReadString();
            break;
          }
          case 26: {
            Passwd = input.ReadString();
            break;
          }
        }
      }
    }

  }

  #endregion

}

#endregion Designer generated code
