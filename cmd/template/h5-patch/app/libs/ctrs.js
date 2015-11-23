/**
 * @file ctrs.js
 * @desc 将所有的ctraller做为对象在启动时载入内存中
 * @author xiaoguang01
 * @date 2015/9/25
 */
var fs = require('fs');
var path = require('path');
var files = fs.readdirSync(__dirname + '/../controller/');
var ctrs = [];

function getCtrs(app) {
    files.forEach(function(file) {
        var stat  = fs.statSync(__dirname + '/../controller/' + file);
        if (!stat.isDirectory() && path.extname(file) === '.js') {
            var fileName = path.basename(file, '.js');
            var ctr = require(__dirname + '/../controller/' + file);
            ctrs[fileName] = ctr;
        }
    });
    return ctrs;
}

module.exports = {
    getCtrs: getCtrs

};
