## server端设计 ##
### 总体设计思路 ###
    以轻巧灵活的koajs为中间件框架，以中间件模式为业务开发的核心模式
    纵向上划分filter、router、controller、models、views，基于中间件模式封装mvc框架
    横向上按module进行划分
    系统级别配备conifg管理、日志处理、异常捕获
### 运行环境 ###
    node 0.12.3
### 进程 ###
    分两组服务：一组用于业务处理（8080）、一组用于静态文件服务器（8081）
    服务通过PM2开启集群模式，集群内进程实例数由CPU数决定，开发模式下不开启集群
### 工作流程图 ###
	![](flow.png)

### bootstrap ###
    启动程序，程序的总入口，负责加载配置文件，公共模块，初始化日志组件、初始化模板引擎、初始化koajs、注册中间件等
### filter ###
    由多个注册到koa上的中间组成，用于在req->res模型中处理公共业务,如cookie签名等，公共业务逻辑也可以考虑
### router ###
    使用koa-router中间件模块，用于url路由配置
### controller ###
    接受到请求后向后请求models获取数据，并调用对应的模板进行渲染
### models ###
    负责请求后端数据和缓存数据，处理业务逻辑
### views ###
    ejs模板存放
### 映射关系 ###
    m-v-c间存在目录映射关系，通过文件命名来约束
### 基类 ###
    提供baseController、baseModels，提供render、getModel等基类方法
### API ###
    考虑到异步请求的情况，baseController提供api方法，API的Controller不需要调用view，直接返回json


