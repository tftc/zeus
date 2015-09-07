/**
 * @file check 入口文件
 * @author Fental<fengeeker@gmail.com>
 */

'use strict';

var path = require('path');

var fecs = require('fecs');

var jschecker = require('fecs/lib/js/checker');
var csschecker = require('fecs/lib/css/checker');
var lesschecker = require('fecs/lib/less/checker');
var htmlchecker = require('fecs/lib/html/checker');

var fecsUtil = require('fecs/lib/util');
var merge = require('merge');

/**
 * check API
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

    if (opt.silent && (opt.format || !opt.stream)) {
        /* eslint-disable no-console */
        console.log = function () {};
    }

    function transform(file, cb) {

        /**
         * 根据各checker是否返回Promise采取相应操作
         *
         * @param {(Array|Promise)} promise checker.check返回的对象
         * @param {Function} done 回调函数
         */
        function then(promise, done) {
            promise instanceof Array
                ? done(promise)
                : promise.then(done, done);
        }

        /**
         * 执行checker
         *
         * @param {Checker} checker 不同的语言checker子类
         * @param {Object} opt gulp任务配置参数
         */
        function exec(checker, opt) {
            checker.register();
            if (!checker.isValid(file) || file.stat.size > opt.maxsize) {
                cb(null, file);
                return;
            }

            var contents = file.contents.toString();
            var done = function (errors) {
                file.errors = errors;
                cb(null, file);
                return;
            };

            then(checker.check(contents, file.path, opt), done);
        }


        switch (path.extname(file.path)) {
            case '.js':
                exec(jschecker, opt);
                break;
            case '.css':
                exec(csschecker, opt);
                break;
            case '.less':
                exec(lesschecker, opt);
                break;
            case '.html':
            case '.htm':
                exec(htmlchecker, opt);
                break;
            default:
                break;
        }
    }
    return fecsUtil.mapStream(transform);
};
