## 模板划分与复用 ##
### 划分原则 ###
    职能从大到小分四级划分 site->module->page->block
    site: 整个站点，拥有各个module和站点级别的公共block，如header、footer、nav等
    module: 模块级别，拥有一组类似的页面和这些页面间共用的block
    page: 页面级别，对应一个action，拥有一个页面模板和私有block
    block：最小模板单元，对应页面中一个功能UI区
### 目录示例 ###
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
### 注意事项 ###
	block应为一个完整的业务功能可视区
	block默认位于页面目录中的block目录中
	在一个module内，凡是两以上页面共用的block归到module的block目录中
	一个module中页面不能引用另外一个module中的block
	跨module的block复用需要归类到站点下的block目录中