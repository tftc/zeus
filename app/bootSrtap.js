/**
 * @file bootStrap.js
 * @desc 程序入口
 * @author xiaoguang01
 * @date 2015/9/25
 */
var config = require('../conf');
var koa = require('koa');
var view = require('koa-ejs');
var router = require('./router');
var app = koa();
var fs = require('fs');
var runEnv = config.runEnv;
var tclog = require('./libs/tclog.js');
var genLogid = require('./libs/logid').genLogid;

// 设置模板
view(app, config.view);

// live-reload代理中间件
if (runEnv === 'dev') {
    app.use(function *(next) {
        yield next;
        this.body += yield this.toHtml('reload');
    });
}

// 设置路由
router(app);
app.use(function *error(next) {
    if (this.status === '404') {
        yield this.render('error/404');
    }
    else {
        yield next;
    }
});

tclog.init();

tclog.notice('sss');

app.use(function *(next) {
    var logid = genLogid();
    this.req.logid = logid;
    yield next;
});

app.listen(8000);
console.log('UI Server已经启动：http://127.0.0.1:8000');

// 启动后通过IO通知watch
if (runEnv === 'dev') {
    fs.writeFile('./pid', new Date().getTime());
}