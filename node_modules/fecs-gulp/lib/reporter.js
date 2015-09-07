/**
 * @file reporter 入口文件
 * @author Fental<fengeeker@gmail.com>
 */

'use strict';

var fecs = require('fecs');

var merge = require('merge');

var PluginError = require('gulp-util').PluginError;

/**
 * reporter
 *
 * @param {(string|Object)} reporter reporter名称或者自定义reporter
 * @param {Object} options gulp参数
 * @return {Transform} 转换流
 */
module.exports = function (reporter, options) {
    options = options || {};
    options.reporter = reporter;

    var opt = merge(
        fecs.getOptions(),
        options
    );
    var log = require('fecs/lib/log')(opt.color);

    try {
        return require('fecs/lib/reporter').get(log, opt);
    }
    catch (e) {
        throw new PluginError('fecs-gulp', 'Please check the configuration of fecs.reporter().');
    }
};
