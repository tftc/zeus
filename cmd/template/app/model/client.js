/**
 * @file user.js
 * @desc 用户模型
 * @author xiaoguang01
 * @date 2015/9/27
 */

var thrift = require('thrift');
var PassportService = require('./service/PassportService');
var ttypes = require('./service/passport_types');
var connection = thrift.createConnection('localhost', 9090);
connection.on('error', function(err) {
    console.error(err);
});
var client = thrift.createClient(PassportService, connection);
var user = new ttypes.UserLogin({
    credential:'xiaoguang',
    passowrd: "Mark Slee",
    source: 2});


client.login(user, function(err,response){
    console.log(response)


})