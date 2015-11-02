/**
 * @file index.js
 * @desc router配置
 * @author xiaoguang01
 * @date 2015/9/25
 */
var router = require('koa-router')();
var ctrs = [];
function getC(app) {
    return new Promise(function (resovel, reject) {
        try {
            ctrs = require('../libs/ctrs.js').getCtrs();
            resovel(ctrs);
        }
        catch (e) {
            reject(e);
        }
    });
}

function set(app) {
    app.use(router.routes());
    getC(app).then(function (ctrs) {
        setMap(ctrs);
    }).catch(function (e) {
        console.log(e);
    });
}

function setMap(ctrs) {
    router.get('/', ctrs.index.show);
    router.get('/index', ctrs.index.show);
    router.get('/login', ctrs.login.show);
    router.get('/logout', ctrs.login.logout);
    router.get('/api/getTestData', ctrs.api.getTestData);
    router.post('/login', ctrs.login.login);
}
module.exports = set;
