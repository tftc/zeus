/**
 * @file index.js
 * @desc 控制器
 * @author xiaoguang01
 * @date 2015/9/25
 */
module.exports = {
    test: function *() {
        var self = this;
        yield self.render('user', {
            userInfo : self.userInfo||{}
        });
    }
};
