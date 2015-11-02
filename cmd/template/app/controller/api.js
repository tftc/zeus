/**
 * @file api.js
 * @desc api控制器
 * @author xiaoguang01
 * @date 2015/11/2
 */
module.exports = {
    getTestData: function *() {
        var testResult = {
            name: 'XiaoGuang',
            age: '31',
            sex: 'MALE',
            home: 'HUNAN'
        };
        yield this.api(testResult);
    }
};
