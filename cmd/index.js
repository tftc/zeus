#!/usr/bin/env node

'use strict';

var program  = require('commander');
var shell   = require('shelljs');
var path = require('path');
var chalk = require('chalk');

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
            var fromPath = path.dirname(require.resolve('zeusjs')) + '/template/';
            var toPath = shell.pwd();
            shell.exec('cd '+toPath);
            console.log('clean dir...');
            //shell.exec('rm * -rf');
            console.log('install app...');
            console.log('init app...');
            //initComFile(fromPath, toPath, 'app');
            //initComFile(fromPath, toPath, 'conf');
            //initComFile(fromPath, toPath, 'log');
            //initComFile(fromPath, toPath, 'node_modules');
            //initComFile(fromPath, toPath, 'gulpfiles.js');
            //initComFile(fromPath, toPath, 'public');
            initComFile(fromPath, toPath, 'package.json');
            //initComFile(fromPath, toPath, 'zesh.sh');
            //initComFile(fromPath, toPath, 'public');
            if (args[0].toLowerCase() === 'h5') {
                initSpecFile(formPath + '/client-h5', toPath + 'client');
            }
            else {
                initSpecFile(fromPath + '/client-pc', toPath + 'client');
            }
            console.log(chalk.green('安装完毕'));
        }
        catch(e) {
            console.log(chalk.red('安装出错' + e));
        }
    }
});

// 文件拷贝操作
function initComFile(fromPath, toPath, fileName) {
    try {
        console.log('doing' + fromPath + '/' + fileName + ' ->' + toPath + '/' + fileName + '...');
        shell.exec('cp ' + fromPath + '/' + fileName + ' ' + toPath + '/' + fileName + ' -r');
        console.log(chalk.green('done'));
    }
    catch (e) {
        console.log(chalk.red(e));
    }

}

// 个性化文件
function initSpecFile(from, to) {
    try {
        console.log('doing' + from + ' ->' + to + '...');
        shell.exec('mv ' + from + ' ' + to);
        console.log('done');
    }
    catch (e) {
        console.log(chalk.red(e));
    }

}

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


