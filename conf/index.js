/**
 * @file config.js
 * @desc 开发环境配置
 * @author xiaoguang01
 * @date 2015/9/25
 */
var path = require('path');
module.exports = {
    // 当前运行模式
    runEnv: 'dev',

    // 应用全局配置
    app: {
        port: 8000,
        httpAgentMaxSocks: 30000
    },

    statics: {
        basePath: 'http://127.0.0.1/client/'
    },


    // 文本宏
    consts: {
        siteName: '甜菜金融'
    },

    // 模板引擎相关配置
    view: {
        root: path.join(__dirname, '../app/template'),
        layout: 'layout',
        viewExt: 'html',
        cache: false,
        debug: true
    },

    // 日志相关配置
    log: {
        path: './log/tiancai.log',
        maxLength: 3000,
        level: 1, // [ 1-debug, 2-trace, 3-notice, 4-warn, 5-fatal ]
        printTty: false,
        printFile: true
    },


    // 后端连接相关配置
    thirft: {
        backend: '10.42.83.16',
        port: 3000,
        timeout: 3000
    },

    // redis连接相关配置
    redis: {
        backend: '10.42.83.16',
        port: 3000,
        timeout: 3000
    }

}