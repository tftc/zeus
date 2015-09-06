## 浏览器端整体选型考虑 ##

###PC###
    PC采用多页面实现，前端主要的数据相关逻辑放在node端，用MVC来分层，浏览器端主要负责处理UI交互逻辑，数据验证，废弃之前的浏览器端MVC，改用page逻辑的写法，每个页面一个对应的js，负责处理当前页面的交互逻辑。
    整体基于jq+bootstrap+jqui实现。

###H5###
	由于产品业务较多，页面层次较深，为了降低风险和代码维护的难度，整体上采用分tab多页面实现，即一个tab对应一个页面，tab中采用单页面实现，原后续页面采用组件思路实现。整体采用zepto+reactjs+bootstrap+gmu。

###APP###
    APP主要由native实现，H5部分配合native，对于经常会变化的部分页面采用webview的方式嵌入，另外在node层提供API返回json和native对接。整体选型同H5。