var koa = require('koa');
var render = require('koa-ejs');
var router = require('koa-router')();
var path = require('path');
var app = koa();

render(app, {
    root: path.join(__dirname, 'template'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: true
});

router.get('/all', function *(next) {
    var data = {name:'xiaoguang',email:'xiaoguang@baidu.com'};
    this.body = JSON.stringify(data);
});


router.get('/add', function *(next) {
    var data = {name:'xiaoguang',email:'xiaoguang@baidu.com'};
    this.body = JSON.stringify(data);
});

router.get('/del', function *(next) {
    var data = {name:'xiaoguang',email:'xiaoguang@baidu.com'};
    this.body = JSON.stringify(data);
});

router.get('/update', function *(next) {
    var data = {name:'xiaoguang',email:'xiaoguang@baidu.com'};
    this.body = JSON.stringify(data);
});


app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(8888);