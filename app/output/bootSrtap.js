var koa = require('koa');
var app = koa();
app.use(function * () {
    this.body = '11111';
});
app.listen(8080);
