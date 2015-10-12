#!/usr/bin/env node

'use strict';

var program  = require('commander');
var shell   = require('shelljs');

program.on('--help', function () {
    var fallback = [
        '            ====',
        '           -_  _-',
        '           - __ -',
        '    ___====-_  _-====___',
        '   _--^^^#/      \\#^^^--_',
        '          ((    )) ',
        '           |\\^^\/|   ',
        '           (@::@)   ',
        '            \\\\//   ',
        '            (oo)    ',
        '          // vv \\\\  ',
        '        //        \\\\',
        '      //            \\\\'
    ].join('\n');
    console.log(fallback);
    console.log('');
    console.log('  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --');
    console.log('|             [创建] : zeus new (pc/h5)          |');
    console.log('|             [开发] : zeus dev                  |');
    console.log('|             [调试] : zeus test                 |');
    console.log('|             [提测] : zeus test                 |');
    console.log('|             [部署] : zeus deploy               |');
    console.log('  ----------------------------------------------');
});


// new 创新应用
program.on('new', function (x) {
    if (x.length > 1) {
        console.log('只允许一个参数');
    }
});

// new 创新应用
program.on('dev', function () {
    shell.cd('../')
    shell.exec('gulp dev --color');
});

// 未知命令提示
program
    .command("*")
    .description("未知命令，参考以下帮助信息")
    .action(function () {
        program.outputHelp();
    });



program.parse(process.argv);


