## 整体步骤 ##

安装前准备 -> 安装zeus命令 -> 生成项目 -> 启动项目 -> 开发


## 安装前准备 ##

- 将本地的nodejs升级到0.12.0以上

		建议使用彻底重新安装、或者使用nvm的方式
                node -v 命令后显示版本超过0.12.0以上，再往下面的步骤继续
- 快速全局安装PM2模块

		sudo npm install -g -d pm2 --registry=https://registry.npm.taobao.org
  
- 快速全局安装gulp模块
		
		sudo npm install -g -d gulp --registry=https://registry.npm.taobao.org 

## 安装zeus命令 ##
- 安装zeusjs模块 

		sudo npm install -g -d zeusjs --registry=https://registry.npm.taobao.org 
- 安装成功后，查看是否已经安装就绪
		
		zeus --help 

## 生成项目 ##
- 切换到需要生成项目的文件夹下
- 执行生成PC方案项目命令（假设想生成的项目名为demo）

		zeus new pc demo
- 安装时间有点长，稍等片刻

## 启动项目 ##

- 成功安装后，切换到生成的项目根目录

		cd ./demo
- 根据自己的需要修改dev模式下的配置（可跳过）

		vim ./config/dev/index.js

- 执行开发模式的启动命令

		zeus dev

- 等待片刻，看见启动成功的提示后, 可以访问http://127.0.0.1:8000 进行访问（服务器上请参考服务器ip或机器名访问）

		NOTICE: pid::29152 2015-11-03 11:29:58     at Object.<anonymous> (/home/ubuntu/test/demo/app/bootSrtap.js:96:7) UI Server已经启动：http://127.0.0.1:8000

## 开发 ##
- 在app/controller/ 下新建一个test.js文件，文件内容如下：

		module.exports = {
	    	show: function *() {
		        var self = this;
		        yield self.render('test', {
		            userInfo : self.userInfo||null,
		            noWrap: false
		        });
		    }
		};

- 在app/router/index.js 中的setMap中增加一条路由规则,指向该controller

		router.get('/test', ctrs.test.show);
		其中ctrs.test.show 表示的是controller中的login模块的show方法

- 在app/template 下创建一个test.html文件，可以直接copy user.html
- 在浏览器中访问http://127.0.0.1:8000/test 即可访问刚才开发的页面。

## 其他注意事项 ##
- 如果安装步骤完全按照上述执行，安装过程中发生的错误，一般为网络错误或文件读写错误，如果卡主了，可以重试，或者df -h 看看所剩空间是否足够
- http://ip:8000/login  是一个走完全流程的demo，在写相关代码时可以参考
- http://ip:8000/api/getTestData 是一个给前端吐json数据用于ajax的demo，请在需要异步接口时参考
- controller并不是一个可以被直接调用的模块，而是一个生成器函数的集合，router中间件会在子逻辑中将处理权限交给对应的生成器执行。 
- controller的编写一定要切记：1，每个方法都是 带*的函数   2，方法内部的this指向的是koa的上下文，所需要取的参数和方法都参考koa的api开发  3，需要yiled执行this.render(渲染页面)和this.api(输出json)的方法
- model的相关操作可以参考demo中的login部分。
- 页面中的js统一按照zeus.page 的写法。参考app/template/login.html。 在zeus.page中，函数中可以直接用self，不再需要self=this，指向的是当前的page对象。
- 一个页面中只允许有一个zeus.page，跟着当前页面走
- 页面中的全局js和css已经在layout中引用。页面自身的js和css暂时以行内的方式放在页面内，这部分会在zeus build完善后解决。在这之前的做法请先参考app/template/login.html 中的写法。

## 问题收集 ##
相关问题，可以整理收集，在统一沟通后进行迭代修复。
