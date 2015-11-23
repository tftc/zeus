/**
 * @file user.js
 * @desc 用户模型
 * @author xiaoguang01
 * @date 2015/9/27
 */

var thrift = require('thrift');
var PassportService = require('./service/PassportService');
var ttypes = require('./service/passport_types');
var thriftConf = require('../../conf/index.js').thirft;

module.exports = {
    //登陆
    login: function(longinInfo){
        return new Promise(function (resovel, reject) {
            var user = new ttypes.UserLogin({
                credential: longinInfo.credential,
                password: longinInfo.password,
                source: 2
            });
            var transport = thrift.TFramedTransport;
            var protocol = thrift.TBinaryProtocol;
            var connection = thrift.createConnection(thriftConf.host, thriftConf.port, {
                transport : transport,
                protocol : protocol
            });

            connection.on('error', function(err) {
                reject(err);
            });

            connection.on('connect', function(err) {
                var client = thrift.createClient(PassportService, connection);
                client.login(user, function(err,response){
                    if(err){
                        reject(err);
                    }else{
                        resovel(response);
                    }
                })
            });

            
        });
    },

    //注册
    register: function(registerInfo){
        return new Promise(function (resovel, reject) {
            client.register(registerInfo, function(err, response){
                if(err){
                    reject(err);
                }else{
                    resovel(response);
                }
            })
        });
    },

    getUserInfo: function(userId){
        return new Promise(function (resovel, reject) {
            client.userInfo(userId, function(err, response){
                if(err){
                    reject(err);
                }else{
                    resovel(response);
                }
            })
        });
    },

    checkLogin: function(){

    }
}
