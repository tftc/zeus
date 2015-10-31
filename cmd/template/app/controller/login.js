/**
 * @file index.js
 * @desc 控制器
 * @author xiaoguang01
 * @date 2015/9/25
 */
var passportModel = require('../model/passport.js');
var tclog = require('../libs/tclog.js');
var co = require('co');

module.exports = {
    show: function *() {
        yield this.render('login',{
            userInfo : this.userInfo
        });
    },

    login: function *() {
        var postBody = this.request.body;
        var loginData = {
            credential: postBody.loginName,
            password: postBody.password,
            source: 1
        } 
       var data = yield passportModel.login(loginData);
       var loginName = data.user.loginName;
       if(this.app.redisIsOk){
            this.cookies.set('tiancainame', loginName , { signed: true });
            console.log(this.session);
            this.session['hallo'] = data.user; 
       }
       this.response.redirect('index');
    }
};
