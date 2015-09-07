/**
 * @file format 入口文件
 * @author Fental<fengeeker@gmail.com>
 */

'use strict';

var path = require('path');

var fecs = require('fecs');

var jsformatter = require('fecs/lib/js/formatter');
var cssformatter = require('fecs/lib/css/formatter');
var htmlformatter = require('fecs/lib/html/formatter');

var fecsUtil = require('fecs/lib/util');
var merge = require('merge');

/**
 * format API
 *
 * @param {Object} options gulp任务参数
 * @return {Transform} 转换流
 */
module.exports = function (options) {
    options = options || {};
    var opt = merge(
        fecs.getOptions(),
        options
    );

    function transform(file, cb) {

        /**
         * 根据各formatter是否返回Promise采取相应操作
         *
         * @param {(string|Promise)} promise checker.check返回的对象
         * @param {Function} done 回调函数
         */
        function then(promise, done) {
            typeof promise === 'string'
                ? done(promise)
                : promise.then(done, done);
        }

        /**
         * 执行formatter
         *
         * @param {Formatter} formatter 不同的语言formatter子类
         * @param {Object} opt gulp任务配置参数
         */
        function exec(formatter, opt) {

            formatter.register();
            if (!formatter.isValid(file) || file.stat.size > opt.maxsize) {
                cb(null, file);
                return;
            }

            var contents = file.contents.toString();
            var done = function (contents) {
                file.contents = new Buffer(contents);
                cb(null, file);
                return;
            };

            then(formatter.format(contents, file.path, opt), done);
        }

        switch (path.extname(file.path)) {
            case '.js':
                exec(jsformatter, opt);
                break;
            case '.css':
                exec(cssformatter, opt);
                break;
            case '.html':
            case '.htm':
                exec(htmlformatter, opt);
                break;
            default:
                break;
        }
    }
    return fecsUtil.mapStream(transform);
};
