//
// Autogenerated by Thrift Compiler (0.9.3)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = require('./passport_types');
//HELPER FUNCTIONS AND STRUCTURES

PassportService_registerValidate_args = function(args) {
  this.name = null;
  this.value = null;
  if (args) {
    if (args.name !== undefined && args.name !== null) {
      this.name = args.name;
    }
    if (args.value !== undefined && args.value !== null) {
      this.value = args.value;
    }
  }
};
PassportService_registerValidate_args.prototype = {};
PassportService_registerValidate_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.value = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

PassportService_registerValidate_args.prototype.write = function(output) {
  output.writeStructBegin('PassportService_registerValidate_args');
  if (this.name !== null && this.name !== undefined) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 1);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  if (this.value !== null && this.value !== undefined) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2);
    output.writeString(this.value);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

PassportService_registerValidate_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new ttypes.PassportResult(args.success);
    }
  }
};
PassportService_registerValidate_result.prototype = {};
PassportService_registerValidate_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.PassportResult();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

PassportService_registerValidate_result.prototype.write = function(output) {
  output.writeStructBegin('PassportService_registerValidate_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

PassportService_regist_args = function(args) {
  this.user = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = new ttypes.User(args.user);
    }
  }
};
PassportService_regist_args.prototype = {};
PassportService_regist_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.user = new ttypes.User();
        this.user.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

PassportService_regist_args.prototype.write = function(output) {
  output.writeStructBegin('PassportService_regist_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.STRUCT, 1);
    this.user.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

PassportService_regist_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new ttypes.PassportResult(args.success);
    }
  }
};
PassportService_regist_result.prototype = {};
PassportService_regist_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.PassportResult();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

PassportService_regist_result.prototype.write = function(output) {
  output.writeStructBegin('PassportService_regist_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

PassportService_login_args = function(args) {
  this.user = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = new ttypes.UserLogin(args.user);
    }
  }
};
PassportService_login_args.prototype = {};
PassportService_login_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.user = new ttypes.UserLogin();
        this.user.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

PassportService_login_args.prototype.write = function(output) {
  output.writeStructBegin('PassportService_login_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.STRUCT, 1);
    this.user.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

PassportService_login_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new ttypes.PassportResult(args.success);
    }
  }
};
PassportService_login_result.prototype = {};
PassportService_login_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.PassportResult();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

PassportService_login_result.prototype.write = function(output) {
  output.writeStructBegin('PassportService_login_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

PassportService_userInfo_args = function(args) {
  this.userId = null;
  if (args) {
    if (args.userId !== undefined && args.userId !== null) {
      this.userId = args.userId;
    }
  }
};
PassportService_userInfo_args.prototype = {};
PassportService_userInfo_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I64) {
        this.userId = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

PassportService_userInfo_args.prototype.write = function(output) {
  output.writeStructBegin('PassportService_userInfo_args');
  if (this.userId !== null && this.userId !== undefined) {
    output.writeFieldBegin('userId', Thrift.Type.I64, 1);
    output.writeI64(this.userId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

PassportService_userInfo_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new ttypes.PassportResult(args.success);
    }
  }
};
PassportService_userInfo_result.prototype = {};
PassportService_userInfo_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.PassportResult();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

PassportService_userInfo_result.prototype.write = function(output) {
  output.writeStructBegin('PassportService_userInfo_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

PassportServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
PassportServiceClient.prototype = {};
PassportServiceClient.prototype.seqid = function() { return this._seqid; }
PassportServiceClient.prototype.new_seqid = function() { return this._seqid += 1; }
PassportServiceClient.prototype.registerValidate = function(name, value, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_registerValidate(name, value);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_registerValidate(name, value);
  }
};

PassportServiceClient.prototype.send_registerValidate = function(name, value) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('registerValidate', Thrift.MessageType.CALL, this.seqid());
  var args = new PassportService_registerValidate_args();
  args.name = name;
  args.value = value;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

PassportServiceClient.prototype.recv_registerValidate = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new PassportService_registerValidate_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('registerValidate failed: unknown result');
};
PassportServiceClient.prototype.regist = function(user, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_regist(user);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_regist(user);
  }
};

PassportServiceClient.prototype.send_regist = function(user) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('regist', Thrift.MessageType.CALL, this.seqid());
  var args = new PassportService_regist_args();
  args.user = user;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

PassportServiceClient.prototype.recv_regist = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new PassportService_regist_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('regist failed: unknown result');
};
PassportServiceClient.prototype.login = function(user, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_login(user);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_login(user);
  }
};

PassportServiceClient.prototype.send_login = function(user) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('login', Thrift.MessageType.CALL, this.seqid());
  var args = new PassportService_login_args();
  args.user = user;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

PassportServiceClient.prototype.recv_login = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new PassportService_login_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('login failed: unknown result');
};
PassportServiceClient.prototype.userInfo = function(userId, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_userInfo(userId);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_userInfo(userId);
  }
};

PassportServiceClient.prototype.send_userInfo = function(userId) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('userInfo', Thrift.MessageType.CALL, this.seqid());
  var args = new PassportService_userInfo_args();
  args.userId = userId;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

PassportServiceClient.prototype.recv_userInfo = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new PassportService_userInfo_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('userInfo failed: unknown result');
};
PassportServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
PassportServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

PassportServiceProcessor.prototype.process_registerValidate = function(seqid, input, output) {
  var args = new PassportService_registerValidate_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.registerValidate.length === 2) {
    Q.fcall(this._handler.registerValidate, args.name, args.value)
      .then(function(result) {
        var result = new PassportService_registerValidate_result({success: result});
        output.writeMessageBegin("registerValidate", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("registerValidate", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.registerValidate(args.name, args.value, function (err, result) {
      if (err == null) {
        var result = new PassportService_registerValidate_result((err != null ? err : {success: result}));
        output.writeMessageBegin("registerValidate", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("registerValidate", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

PassportServiceProcessor.prototype.process_regist = function(seqid, input, output) {
  var args = new PassportService_regist_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.regist.length === 1) {
    Q.fcall(this._handler.regist, args.user)
      .then(function(result) {
        var result = new PassportService_regist_result({success: result});
        output.writeMessageBegin("regist", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("regist", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.regist(args.user, function (err, result) {
      if (err == null) {
        var result = new PassportService_regist_result((err != null ? err : {success: result}));
        output.writeMessageBegin("regist", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("regist", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

PassportServiceProcessor.prototype.process_login = function(seqid, input, output) {
  var args = new PassportService_login_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.login.length === 1) {
    Q.fcall(this._handler.login, args.user)
      .then(function(result) {
        var result = new PassportService_login_result({success: result});
        output.writeMessageBegin("login", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("login", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.login(args.user, function (err, result) {
      if (err == null) {
        var result = new PassportService_login_result((err != null ? err : {success: result}));
        output.writeMessageBegin("login", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("login", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

PassportServiceProcessor.prototype.process_userInfo = function(seqid, input, output) {
  var args = new PassportService_userInfo_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.userInfo.length === 1) {
    Q.fcall(this._handler.userInfo, args.userId)
      .then(function(result) {
        var result = new PassportService_userInfo_result({success: result});
        output.writeMessageBegin("userInfo", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("userInfo", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.userInfo(args.userId, function (err, result) {
      if (err == null) {
        var result = new PassportService_userInfo_result((err != null ? err : {success: result}));
        output.writeMessageBegin("userInfo", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("userInfo", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}
