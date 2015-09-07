/**
 * @file baidu reporter
 * @author chris<wfsr@foxmail.com>
 */
'use strict';

var toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 对象属性拷贝
 *
 * @param {Object} target 目标对象
 * @param {...Object} source 源对象
 * @return {Object} 返回目标对象
 */
exports.extend = function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var src = arguments[i];
        if (src == null) {
            continue;
        }

        for (var key in src) {
            if (hasOwnProperty.call(src, key)) {

                if (toString.call(src[key]) === '[object Object]'
                    && toString.call(target[key]) === '[object Object]'
                ) {
                    extend(target[key], src[key]);
                }
                else {
                    target[key] = src[key];
                }

            }
        }
    }
    return target;
};

/**
 * 混合对象
 *
 * @param {...Object} source 要混合的对象
 * @return {Object} 混合后的对象
 */
exports.mix = function () {
    var o = Object.create(null);
    var src = Array.prototype.slice.call(arguments);
    return exports.extend.apply(this, [o].concat(src));
};

/**
 * get type of target
 *
 * @param {*} target target need to get type
 * @return {string}
 */
exports.typeOf = function (target) {
    return toString.call(target).slice(8, -1).toLowerCase();
};
