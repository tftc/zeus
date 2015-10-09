/**
 * @file index.js
 * @desc 控制器
 * @author xiaoguang01
 * @date 2015/9/25
 */
module.exports = {
    test: function *() {
        //yield this.render('user', {
        //    users: [
        //        {name: 'xiaoguangxiaoguan'}
        //    ]
        //});
        yield this.api({
            aaa: 1,
            bbb: 2
        });
    }
};
