var thrift = require('thrift');

var PassportService = require('./PassportService');
var ttypes = require('./passport_types');

var users = {};


var rs = ttypes.PassportResult;

var server = thrift.createServer(PassportService, {
  login: function(user, result) {
    console.log(user);
    console.log("server stored:");
    
    result(null,result(rs));
  },
  getUserInfo: function(uid, result) {
    console.log("server retrieved:", uid);
    result(null, users[uid]);
  },
});

server.listen(9090);