## 目录结构设计 ##
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