/**
 * @file tclog.js
 * @desc log日志打印
 * @author xiaoguang01
 * @date 2015/10/1
 */

var tclog = {};
var logConf = require('../../conf/index.js').log;
var fs = require('fs');
var chalk = require('chalk');
var inspect = require('util').inspect;

tclog.logTemplate = '%s: pid::%s %d-%d-%d %d:%d:%d %s\n';
tclog.conf = logConf;
tclog.prefix = {
    debug: 'DEBUG',
    trace: 'TRACE',
    notice: 'NOTICE',
    warning: 'WARNING',
    fatal: 'FATAL',
    error: 'ERROR'
};

tclog.logLevel = {
    debug: 1,
    trace: 2,
    notice: 3,
    warning: 4,
    fatal: 5,
    error: 6
};

tclog.init = function () {
    tclog.loginfo = {
        path: tclog.conf.path
    };
    tclog.wfloginfo = {
        path: tclog.conf.path + '.wf'
    };
    tclog.devloginfo = {
        path: tclog.conf.path + '.dev'
    };
    tclog._watch = [];
    openLogStream(tclog.loginfo);
    openLogStream(tclog.wfloginfo);
    openLogStream(tclog.devloginfo);
    if (tclog.conf.redictConsole) {
        // redictConsole();
    }
};

function openLogStream(loginfo) {
    var option = {
        flags: 'a',
        encoding: 'utf-8',
        mode: '0666'
    };
    loginfo.logStream = fs.createWriteStream(loginfo.path, option);
    loginfo.logStream.on('open', function (fd) {
        loginfo.logFd = fd;
        fs.fstat(loginfo.logFd, function (err, stat) {
            if (err != null) {
                console.log('tclog unexpected err : ', err, new Date());
                process.exit(1);
                return;
            }
            loginfo.logIno = stat.ino;
            loginfo.watch = setInterval(watchLogFile(loginfo), 30000);
        });
    });
    loginfo.logStream.on('close', function () {
    });
    loginfo.logStream.on('error', function (err) {
        console.log(process.pid, ' ', loginfo.path, ' tclog error : ', err, new Date());
        process.exit(1);
    });
}

function watchLogFile(loginfo){
    return function () {
        fs.stat(loginfo.path, function (err, stat) {
            if ((err != null && err.code === 'ENOENT') || (err == null && stat.ino !== loginfo.logIno)) {
                clearInterval(loginfo.watch);
                loginfo.logStream.destroySoon();
                openLogStream(loginfo);
            }
        });
    };
}

tclog.debug = function () {
    if (tclog.conf.level > tclog.logLevel.debug) {
        return;
    }
    var args = [tclog.devloginfo.logStream, 'DEBUG'].concat(arguments);
    tclog.log.apply(null, args);
};

tclog.trace = function () {
    if (tclog.conf.level > tclog.logLevel.trace) {
        return;
    }
    var args = [tclog.devloginfo.logStream, 'TRACE'].concat(arguments);
    tclog.log.apply(null, args);
};

tclog.notice = function () {
    if (tclog.conf.level > tclog.logLevel.notice) {
        return;
    }
    var args = [tclog.loginfo.logStream, 'NOTICE'].concat(arguments);
    tclog.log.apply(null, args);
};

tclog.warn = function () {
    if (tclog.conf.level > tclog.logLevel.warning) {
        return;
    }
    var args = [tclog.wfloginfo.logStream, 'WARNING'].concat(arguments);
    tclog.log.apply(null, args);
};

tclog.fatal = function () {
    if (tclog.conf.level > tclog.logLevel.fatal) {
        return;
    }
    var args = [tclog.wfloginfo.logStream, 'FATAL'].concat(arguments);
    tclog.log.apply(null, args);
};
tclog.error = function () {
    if (tclog.conf.level > tclog.logLevel.error) {
        return;
    }
    var args = [tclog.wfloginfo.logStream, 'ERROR'].concat(arguments);
    tclog.log.apply(null, args);
};

tclog.log = function (stream, method, loginfos) {
    var logArgs;
    var logStr;
    if (tclog.conf.printTty) {
        logArgs = tclog.prepare(method, loginfos, true);
        logStr = tclog.genLog.apply(null, logArgs);
        console.log(logStr);
    }

    if (tclog.conf.printFile) {
        logArgs = tclog.prepare(method, loginfos);
        logStr = tclog.genLog.apply(null, logArgs);
        if (stream.writable) {
            stream.write(logStr);
        }
        else {
            console.log('unable to write log file', new Date());
        }
    }
};

tclog.prepare = function (method, logInfos, ifTtf) {

    var now = new Date();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    month < 10 ? month = '0' + month : null;
    date < 10 ? date = '0' + date : null;
    hour < 10 ? hour = '0' + hour : null;
    min < 10 ? min = '0' + min : null;
    sec < 10 ? sec = '0' + sec : null;
    var logArgs;
    if (ifTtf) {
        var methedChalk = chalk.green;
        if (tclog.logLevel[method.toLowerCase()] === 4) {
            methedChalk = chalk.yellow;
        }
        else if (tclog.logLevel[method.toLowerCase()] > 4){
            methedChalk = chalk.red;
        }
        logArgs = [methedChalk(method), process.pid, now.getFullYear(), month, date, hour, min, sec];
    }
    else {
        logArgs = [method, process.pid, now.getFullYear(), month, date, hour, min, sec];
    }
    var errPos = (new Error()).stack.split('\n').slice(4)[0];
    var messages = [];
    messages.push(errPos);
    for (var i in logInfos) {
        if (typeof logInfos[i] === 'object') {
            var inspectStr = inspect(logInfos[i], false, 1);
            inspectStr = inspectStr.replace(/\n/g, '');
            messages.push(inspectStr);
        }
        else if (typeof logInfos[i] === 'string' || typeof logInfos[i] === 'number') {
            messages.push(logInfos[i]);
        }
        else {


        }
    }
    var logInfoMessage = messages.join(' ');
    if (logInfoMessage.length > tclog.conf.maxLength) {
        logInfoMessage = logInfoMessage.substr(0, tclog.conf.maxLength);
    }

    logArgs.push(logInfoMessage);
    return logArgs;
};


tclog.genLog = function () {
    var args = arguments;
    var i = 0;
    return tclog.logTemplate.replace(/(%[sd])/gm, function (match) {
        return args[i++];
    });
};

function redictConsole() {
    console.log(new Date(), '重写console输出');
    if (global) {
        global.console.error = tclog.fatal;
        global.console.log = tclog.trace;
        global.console.info = tclog.debug;
    }
}

module.exports = tclog;
