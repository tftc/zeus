var koa = require('koa');
var render = require('koa-ejs');
var path = require('path');
var app = koa();
render(app, {
    root: path.join(__dirname, 'template'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: true
});
app.use(function *() {
    var users = [{name: 'Dead Horse'}, {name: 'Jack'}, {name: 'Tom'}];
    yield this.render('user', {
        users : users
    });
});
app.listen(8080);