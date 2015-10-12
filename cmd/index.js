#!/usr/bin/env node

'use strict';

var program  = require('commander');
var shell   = require('shelljs');
var path = require('path');

program.on('--help', function () {
    var fallback = [
        '            ====                ',
        '           -_  _-           ',
        '           - __ -           ====================',
        '    ___====-_  _-====___                      //',
        '   _--^^^#/      \\#^^^--_                   //',
        '          ((    ))                        //',
        '           |\\^^\/|                       //',
        '           (@::@)                     //',
        '            \\\\//                    //',
        '            (oo)                  //',
        '          // vv \\\\              //',
        '        //        \\\\          //',
        '      //            \\\\      ======================'
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
program.on('new', function (args) {
    if (args.length !== 1 || (args[0].toLowerCase() !== 'h5' && args[0].toLowerCase() !== 'pc')) {
        console.log('参数错误');
        console.log('创建应用请输入：zeus new h5 | zeus new pc');
        console.log('更多帮助请输入：zeus --help');
    }
    else {
        try {
            var from = path.dirname(require.resolve('zeus')) + '/template/*';
            var to = shell.pwd();
            console.log('clean dir...');
            shell.exec('rm * -rf');
            console.log('install app...');
            shell.exec('cp ' + from + ' ' + to + ' -r');
            console.log('init app...');
            if (args[0].toLowerCase() === 'h5') {
                shell.exec('rm client-pc -r');
                // 这部分时间较长，待优化
                shell.exec('mv client-h5 client');
            }
            else {
                shell.exec('rm client-h5 -r');
                shell.exec('mv client-pc client');
            }
            console.log('安装完毕');
        }
        catch(e) {
            console.log('未安装zues模块');
        }
    }
});

// 开发模式
program.on('dev', function () {
    shell.cd('../');
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


