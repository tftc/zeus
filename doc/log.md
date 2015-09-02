##日志设计##

###统一格式###
	NOTICE: 2015-09-02 13:45:08 at recordLog (fileXXX:110:11) logid logmsgXXX

###日志文件###
	日志文件统一打到log目录下
	node.log 服务级别日志，记录服务的启停，相关错误等
	tiancai.log 一般请求的日志(notice)
	tiancai.log.wf 错误类日志(warn、fatal)
	tiancai.log.dev 调试类日志(debug、trace)

###日志分级###
	'debug' : 1,
    'trace' : 2,
    'notice' : 3,
    'warn' : 4,
    'fatal' : 5,
    'error' : 6

###日志打印方式###
	使用node的文件流打印 createWriteStream

###生成logid规则###
	Date.now()*1000+Math.floor(Math.random()*1000)

###配置项设置###
	'bdlog' : {
        'path' : './log/tcwise.log',  //日志打印目录
        'maxLength' : 6000,   //单条最大长度
        'level' : 3,	//输出级别
        'printTty' : false, //是否显示反馈
        'printFile' : true //是否打印日志文件
    }

###其他###
	为了便于调试和定位，系统的console.log 被重写debug日志方法，写入到tiancai.log.dev