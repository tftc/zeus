#1 名词解释#
###1.1 工程化###
>前端的工程化就是在前端的项目开发全流程中将成熟的技巧、解决方案、经验模式用工具和约定焊接起来，并形成统一的操作规范，实现工业化生产。
###1.2 多页模式###
>传统的B/S产品适用的前端形态。以同步渲染为主，异步渲染为辅。适合大部分无特殊复杂交互，但页面信息量大的PC端产品。

###1.3 单页模式###
>最近几年开始兴起的一种前端形态，以异步渲染为主，同步渲染为辅。适合大多数重数据交互，重用户体验，总体信息量不大的H5应用。形态比较类似C/S形态。
###1.4 同构###
>用js编写的应用能同时执行于浏览器端和服务器端，实现server和browser的组件与库共享。

>目前追求完全同构的产品比较少，主要还是适当运用部分同构的技巧来增加代码的复用性，和实现服务器组件渲染。

###1.5 组件化###
>将一整块业务或者系统，按照其功能的独立性，而拆分成各个独立的功能模块的过程，和传统的jq ui等组件思想不太一样，更加接近具体业务。

>jqui等组件是尽量做到通用，在不同的场景中使用，而组件化是指将一个具体的页面，如何按照不同的功能划分为单元小块，包含了js、css和html。可以理解为界面的片段化。

###1.6 React###
>起源于Facebook的内部项目，用于解决组件化开发的问题，充当前端的模板引擎。

>特点：组件化开发、虚拟dom，JSX。
###1.7 Flux###
>FB提出的一种全新的前端架构模式，用于取代现有的MVC等架构，和React非常高效地结合。核心思想：单向数据流。
###1.8 ReFlux###
>flux本身是一种模式，而reFlux是这种模式的一种具体实现，同时为了简化开发对于原有模式做了一些调整，仅保留了action、store、component。
###1.9 Generator###
>ES6的一种新特性，异步编程的解决方案，可以理解为一个状态机，使用yield语句来定义不同的内部状态，执行Generator后会返回一个遍历器对象，可以通过该对象的next方法遍历其内部的不同的状态。 使用Generator可以避免异步回调嵌套问题，提高错误的处理效率。
###1.10 KOA###
>一个用于取代express的中间件框架，更加小巧灵活，不绑定任何中间件，由自己根据实际需要做加法，比较适合征地业务的量身定制。

#2 设计原则#
- 从实际需要出发，不做大而全的框架
- 先进性紧跟BAT，但又能确保简单上手
- 重视扩展性，便于随着业务增长做加法
- 重用户体验，性能
- 工程化贯穿，能用工具实现的就用工具实现

#3 总体设计#


#4 PC架构设计#
##4.1 概况##

##4.2 架构##

##4.3 目录结构##

	-root
		{package.json}
		{bower.json}
		{glup.js}
		[bin] 存放可执行文件（二进制可执行文件、shell、bat等）
		[conf] 存放应用程序配置文件
		[node_modules] 三方模块及自己封装的node模块
		[log] 存放日志
		[app] server端
			[libs] 工具库、业务中间件、mvc框架
			[controller] 控制器
			[models] 模型
			[router] 路由配置
			[template] 模板
			[test] 单元测试
		[static] browser端
			[bower] bower管理的外部模块，含js、css等
			[js]
				[libs] 非bower管理的公共库
				[conf] 存放js配置，如映射关系、公共常量、文字宏等
				[ui] UI组件
				[common] 公共业务逻辑
				[page] 页面级js
			[css]
				[libs] 非bower管理的公共库
				[ui] UI组件
				[common] 公共业务逻辑
				[page] 页面级js
			[font] 存放font-icon
			[img]
##4.4 server端##
### 4.4.1 总体设计思路 ###
- 以轻巧灵活的koajs为中间件框架，以中间件模式为业务开发的核心模式
- 纵向上划分filter、router、controller、models、views，基于中间件模式封装mvc框架
- 横向上按module进行划分系统级别配备conifg管理、日志处理、异常捕获
### 4.4.2 运行环境 ###
>node 0.12.3
### 4.4.3 进程 ###
>分两组服务：一组用于业务处理（8080）、一组用于静态文件服务器（8081）
>服务通过PM2开启集群模式，集群内进程实例数由CPU数决定，开发模式下不开启集群
### 4.4.4 工作流程图 ###

![工作流程图](https://raw.githubusercontent.com/tftc/zeus/master/doc/flow.png?token=AM-npnRbmop_akD9Oiz5o9AqCfR41Js_ks5V7W72wA%3D%3D)

### 4.4.5 bootstrap ###
>启动程序，程序的总入口，负责加载配置文件，公共模块，初始化日志组件、初始化模板引擎、初始化koajs、注册中间件等
### 4.4.6 filter ###
>由多个注册到koa上的中间组成，用于在req->res模型中处理公共业务,如cookie签名等，公共业务逻辑也可以考虑
### 4.4.7 router ###
>使用koa-router中间件模块，用于url路由配置
### 4.4.8 controller ###
>接受到请求后向后请求models获取数据，并调用对应的模板进行渲染
### 4.4.9 models ###
>负责请求后端数据和缓存数据，处理业务逻辑
### 4.4.10 views ###
>ejs模板存放
### 4.4.11 映射关系 ###
>m-v-c间存在目录映射关系，通过文件命名来约束
### 4.4.12 基类 ###
>提供baseController、baseModels，提供render、getModel等基类方法
### 4.4.13 API ###
>考虑到异步请求的情况，baseController提供api方法，API的Controller不需要调用view，直接返回json
##4.5 模板层级与复用##
### 4.5.1 划分原则 ###
- 职能从大到小分四级划分 site->module->page->block
- site: 整个站点，拥有各个module和站点级别的公共block，如header、footer、nav等
- module: 模块级别，拥有一组类似的页面和这些页面间共用的block
- page: 页面级别，对应一个action，拥有一个页面模板和私有block
- block：最小模板单元，对应页面中一个功能UI区
### 4.5.2 目录示例 ###
    -[template](站点)
		-[blocks](站点级block)
			-{header.ejs}
			-{footer.ejs}
			-{nav.ejs}
			...
		-[account](模块)
			-[blocks](模块级block)
				-{account-info.ejs}
				-{account-side.ejs}
			-[home](页面)
				-[blocks]
					-{income.ejs}
					-{calendar.ejs}
				-{page.ejs}(页面框架)
			-[invest]
			-[bankcard]
			...
		-[home]
		-[financing]
		-[service]
		-[aboutus]
		...
### 4.5.3 注意事项 ###
- block应为一个完整的业务功能可视区
- block默认位于页面目录中的block目录中
- 在一个module内，凡是两以上页面共用的block归到module的block目录中
- 一个module中页面不能引用另外一个module中的block
- 跨module的block复用需要归类到站点下的block目录中

##4.6 日志设计##

###4.6.1 统一格式###
	NOTICE: 2015-09-02 13:45:08 at recordLog (fileXXX:110:11) logid logmsgXXX

###4.6.2 日志文件###
>日志文件统一打到log目录下

>node.log 服务级别日志，记录服务的启停，相关错误等

>tiancai.log 一般请求的日志(notice)

>tiancai.log.wf 错误类日志(warn、fatal)

>tiancai.log.dev 调试类日志(debug、trace)

###4.6.3 日志分级###
	'debug' : 1,
    'trace' : 2,
    'notice' : 3,
    'warn' : 4,
    'fatal' : 5,
    'error' : 6

###4.6.4 日志打印方式###
>使用node的文件流打印 createWriteStream

###4.6.5 生成logid规则###
	Date.now()*1000+Math.floor(Math.random()*1000)

###4.6.6 配置项设置###
	'bdlog' : {
        'path' : './log/tcwise.log',  //日志打印目录
        'maxLength' : 6000,   //单条最大长度
        'level' : 3,	//输出级别
        'printTty' : false, //是否显示反馈
        'printFile' : true //是否打印日志文件
    }

###4.6.7 其他###
>为了便于调试和定位，系统的console.log 被重写debug日志方法，写入到tiancai.log.dev

##4.7 browser端##

##4.8 注意事项##


#5 H5架构设计#
##5.1 概况##

##5.2 架构##

##5.3 目录结构##

##5.4 server端##

##5.5 browser端##

##5.6 注意事项##

#6 APP架构设计#
##6.1 概况###

##6.2 架构###

##6.3 目录结构###

##6.4 server端###

##6.5 browser端###

##6.6 注意事项###

#工程化设计#
##初始化##
##开发##
##调试##
##联调##
##提测##
##上线##
##运维##

##规范##
- javascript 规范
- Css 规范
- HTML 规范
##资料##
###harmony###
node 0.12.3中harmony的支持情况
![harmony](harmony.png)

harmony 开启方式：node --harmony app.js

###Generator###
阮一峰写的一篇介绍文章，个人认为写的比较容易理解
	
	http://es6.ruanyifeng.com/#docs/generator

###koajs###
项目地址：
	
	https://github.com/koajs/koa

###koa-static###
项目地址：

	https://github.com/koajs/koa

###koa-router###
项目地址：
		
	https://github.com/alexmingoia/koa-router

###co###
项目地址：
	
	https://github.com/tj/co	
	
###ejs###
项目地址

	https://github.com/tj/ejs
	
###supervisor###
项目地址

	https://github.com/petruisfan/node-supervisor
###live-reload###
项目地址
	
	https://github.com/intesso/connect-livereload
###gulp###
项目地址

	https://github.com/gulpjs/gulp

###mocha###
项目地址

	https://github.com/mochajs/mocha

###shouldjs###
项目地址
	
	https://github.com/tj/should.js

###fecs###
项目地址

	https://github.com/ecomfe/fecs

###pm2###
项目地址

	https://github.com/Unitech/PM2
###pm2-web###
项目地址

	https://github.com/achingbrain/pm2-web
###less###
项目地址

	https://github.com/less/less.js

###bootstrap###
项目地址

	http://v3.bootcss.com/

###browserify###
-项目地址
	
	https://github.com/substack/node-browserify
	
###reactjs###
项目地址
	
	https://github.com/facebook/react
学习资料
	
	http://www.ruanyifeng.com/blog/2015/03/react.html?utm_source=tuicool

###reactify###
项目地址

	https://github.com/andreypopp/reactify

###reflux###
项目地址

	https://github.com/reflux/refluxjs

学习资料
	
	http://segmentfault.com/a/1190000002793786?utm_source=tuicool