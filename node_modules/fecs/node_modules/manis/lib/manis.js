/**
 * @file baidu reporter
 * @author chris<wfsr@foxmail.com>
 */
'use strict';
var fs = require('fs');
var path = require('path');

var util = require('./util');
var Finder = require('./finder');

/**
 * Manis
 *
 * @constructor
 * @param {Object} options 配置项
 * @param {(string | string[])} options.files 搜索的文件
 * @param {?Function} options.loader 自定义的加载、解释配置文件方法
 * @param {boolean} options.cache 是否缓存结果
 * @param {boolean} options.merge 搜索多个文件时是否合并配置
 * @param {boolean} options.lookup  是否向上查找所有配置文件
 */
function Manis(options) {
    if (typeof options === 'string') {
        options = [options];
    }

    if (Array.isArray(options)) {
        options = util.extend(arguments[1] || {}, {files: options});
    }

    this.options = util.mix({
        files: 'package.json',
        loader: null,
        cache: true,
        merge: true,
        lookup: true
    }, options);

    this.init(this.options);
}

util.extend(
    Manis.prototype,

    /** @lends Manis.prototype */
    {

        /**
         * 初始化
         *
         * @private
         * @param {Object} options 配置项
         */
        init: function (options) {
            if (!Array.isArray(options.files)) {
                options.files = [options.files];
            }

            var files = options.files;
            delete options.files;

            this.finders = files.map(function (file) {
                return Finder.create(file, options.cache, options.loader);
            });

            this.cached = options.cache && Object.create(null);
            this.defaultValue = Object.create(null);

        },

        /**
         * 设置默认值
         *
         * @public
         * @param {(string | Object)} pathOrValue 默认的配置文件路径或默认值
         * @param {Object=} finderOptions 用于查找默认配置的 finder 的配置
         */
        setDefault: function (pathOrValue, finderOptions) {
            var type = util.typeOf(pathOrValue);
            if (type === 'object') {
                this.defaultValue = pathOrValue;
                return;
            }

            if (type !== 'string') {
                throw new Error('invalid argument');
            }

            var match = pathOrValue.match(/^(.*\/)([^\/]+)$/);
            if (!match) {
                throw new Error('Invalid path.');
            }


            // no look up
            var stopper = function (start, root, paths) {
                return paths.length > 0 || start === root;
            };

            var finder;
            var name = match[2];

            if (finderOptions && util.typeOf(finderOptions) === 'object') {
                finderOptions = util.extend({name: name, stopper: stopper}, finderOptions);
                finder = new Finder(finderOptions);
            }
            else {
                finder = this.finders.filter(function (finder) {
                    return finder.name.toLowerCase() === name;
                })[0];

                if (finder) {
                    finder = Object.create(finder);
                    finder.stopper = stopper;
                }
                else {
                    finder = new Finder({name: name, stopper: stopper});
                }

            }

            this.defaultValue = finder.from(match[1]);
        },

        /**
         * 从指定文件开始查找
         *
         * @publish
         * @param {string} from 开始查找的文件
         * @return {Object} 读到的配置对象
         */
        from: function (from) {
            from = path.resolve(from);

            var stat = {
                isFile: function () {
                    return true;
                }
            };

            try {
                stat = fs.statSync(from);
            }
            catch (e) {}

            // 文件不存在，不管是文件还是目录都可以再向上一级
            /* istanbul ignore else */
            if (stat.isFile()) {
                from = path.dirname(from);
            }

            var config = Object.create(null);

            if (!this.options.lookup || this.cached && (config = this.cached[from])) {
                return config;
            }

            var configs = this.finders.map(
                    function (finder) {
                        return finder.from(from);
                    }
                );

            if (this.options.merge) {
                config = configs.reduceRight(
                    function (mixed, current) {
                        return util.extend(mixed, current);
                    },
                    Object.create(null)
                );
            }
            else {
                config = configs[0];
            }

            config = util.mix(this.defaultValue, config);

            if (this.cached) {
                this.cached[from] = config;
            }

            return config;
        }
    }
);

module.exports = Manis;
