/**
 * @file json.js
 * @desc 程序入口
 * @author xiaoguang01
 * @date 2015/10/09
 */

function api(app, settings) {
    app.context.api = function *(obj) {
        this.type = 'json';
        this.body = JSON.stringify(obj);
    };
}

module.exports = api;
