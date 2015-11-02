/**
 * @file bootStrap.js
 * @desc 程序入口
 * @author xiaoguang01
 * @date 2015/9/25
 */
var config = require('../conf');
var koa = require('koa');
var view = require('zeus-template');
var router = require('./router');
var app = koa();
var fs = require('fs');
var runEnv = config.runEnv;
var bodyParser = require('koa-bodyparser');
var session = require('koa-generic-session');
var redisStore = require('koa-redis');
var tclog = require('./libs/tclog.js');
var genLogid = require('./libs/logid').genLogid;
var api = require('./libs/api');

app.keys = ['tiancai', 'xiaoguang'];

app.use(function *(next) {
    if(this.url == '/favicon.ico'){
        //favicon return
    }else{
        yield next;
    }
})



/*
   try{
        var redis = checkRedis;
        console.log(redis);
        app.use(session({
          store: redis
        }));
        app.redisIsOk = true;
   }
   catch(e){
    app.use(session());
    console.log('no');
    app.redisIsOk = false;
   }
*/



/*
app.use(function *(next){
       var checkRedis = new Promise(function (resovel, reject) {
        var redis = redisStore();
        redis.on('disconnect',function (e) {
            app.redisIsOk = false;
            console.log(e);
            reject(e);
        });
        redis.on('connect',function (e) {
            app.redisIsOk = true;
            resovel(redis);
        });
    });
    console.log(checkRedis);
    var redis = yield checkRedis;

    yield next;
})
*/

var redis = redisStore();
app.redisIsOk = true;
redis.on('disconnect',function(){
    app.redisIsOk = false;
})
app.use(session({
    store: redis
}));


//todo，promise对后续操作的保证，后面的注册进一步封装出来
// 这里相当于是注册在所有的use的后面。对于注册顺序需要有保证

// 设置模板
view(app, config.view);

// 设置api
api(app);
app.use(require('koa-static')('client'));
app.use(bodyParser());
tclog.init();
// live-reload代理中间件
if (runEnv === 'dev') {
    app.use(function *(next) {
        yield next;
        if(this.type === 'text/html') {
            this.body += yield this.toHtml('reload');
        }
    });
}

app.use(function *error(next) {
    yield next;
    if (this.status === 404) {
        yield this.render('error/404',{});
    }
});


app.use(function *(next) {
    var logid = genLogid();
    this.req.logid = logid;
    console.log(app.redisIsOk);
    if(app.redisIsOk){
        var tiancainame = this.cookies.get('tiancainame',{ signed: true });
        //console.log(this.session);
        try{
            var userInfo = this.session[tiancainame];
            console.log(userInfo);
            this.userInfo = userInfo;
        }
        catch(e){
            this.userInfo = null;
        }
    }else{
        this.userInfo = null;
    }
    
    tclog.notice({logid:logid,type:'pv',method:this.req.method,url:this.url,userInfo:userInfo})
    yield next;
});


// 设置路由
router(app);

app.listen(8000);
tclog.notice('UI Server已经启动：http://127.0.0.1:8000');
// 启动后通过IO通知watch
if (runEnv === 'dev') {
    fs.writeFile('./pid', new Date().getTime());
}