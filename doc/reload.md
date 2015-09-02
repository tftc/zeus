## 自动重启刷新设计 ##

###业界问题###
	gulp-livereload 本身能解决静态文件的监听和刷新页面，不需要重启
	但是我们有较多的node逻辑开发，node的修改可以通过runjs、supervisor等进行自动重启，但不能刷新页面

###解决思路###
	我们需要解决的就是node修改之后先重启再刷新。runjs执行完成之后，bootstrap写入一个文件做为通信中介，livereload监听静态文件的同时还监听这个文件，从而达到重启后刷新的目的

	另外，在调试模式下，我们为所有的页面做一层代理，在这层代理上为页面加入reloadjs，负责和watch这边的status进行全双工对接

###设计示意图###
![工作流程图](https://raw.githubusercontent.com/tftc/zeus/master/doc/reload.png?token=AM-npmpTEXyvpviDWbCqJjOg3yX5Q1l_ks5V8APKwA%3D%3D)