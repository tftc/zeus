#!/usr/bin/env node

'use strict';

var program  = require('commander');
var shell   = require('shelljs');
var path = require('path');
var chalk = require('chalk');

if (!checkNodeVersion()) {
    process.exit();
}

program.on('--help', function () {
    var logo = [
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
    console.log(logo);
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
    if (args.length != 2 || (args[0].toLowerCase() !== 'h5' && args[0].toLowerCase() !== 'pc')) {
        console.log('参数错误');
        console.log('创建应用请输入：zeus new h5 appName| zeus new pc appName');
        console.log('更多帮助请输入：zeus --help');
    }
    else {
        var appType = args[0];
        var appName = args[1];
        var fromPath = '';
        try {
            fromPath = path.dirname(require.resolve('zeusjs')) + '/template/';
        }
        catch (e) {
            console.log('zeusjs 未安装正确, 请重新安装后执行');
        }
        if (fromPath) {
            var toPath = shell.pwd() + '/' + appName;
            console.log('install app start...');
            console.log('makedir' + appName + '...');
            shell.exec('mkdir ' + appName);

            console.log('init app...');
            initComFile(fromPath, toPath, 'app');
            initComFile(fromPath, toPath, 'conf');
            initComFile(fromPath, toPath, 'log');
            initComFile(fromPath, toPath, 'node_modules');
            initComFile(fromPath, toPath, 'public');
            initComFile(fromPath, toPath, 'package.json');
            initComFile(fromPath, toPath, 'gulpfile.js');
            initComFile(fromPath, toPath, 'pid');
            if (appType === 'h5') {
                initSpecFile(fromPath + '/client-h5', toPath + '/client');
            }
            else {
                initSpecFile(fromPath + '/client-pc', toPath + '/client');
            }
            console.log('change dir to' + toPath + '...');
            shell.cd(toPath);
            console.log(shell.pwd());
            installDepd(toPath);
            console.log(chalk.green('安装完毕'));
        }
    }
});

// 文件拷贝操作
function initComFile(fromPath, toPath, fileName) {
    try {
        console.log('doing ' + fromPath + '/' + fileName + ' ->' + toPath + '/' + fileName + '  ...');
        shell.exec('cp -r ' + fromPath + '/' + fileName + ' ' + toPath + '/' + fileName);
        console.log(chalk.green('done!'));
    }
    catch (e) {
        console.log(chalk.red(e));
    }

}

// 个性化文件
function initSpecFile(from, to) {
    try {
        console.log('doing ' + from + ' ->' + to + '  ...');
        shell.exec('cp -r ' + from + ' ' + to);
        console.log('cp -r ' + from + ' ' + to)
        console.log(chalk.green('done'));
    }
    catch (e) {
        console.log(chalk.red(e));
    }

}

// 检查node版本
function checkNodeVersion() {
    var version = process.version;
    if (version !== 'v0.12.3') {
        console.log('当前的nodejs版本为' + version);
        console.log('为了统一规范以及确保您能正常使用zeus各功能，请安装0.12.3版本');
        return false;
    }
    return true;
}

// 安装依赖文件
function installDepd(pwd) {
    console.log('install dependencies start')
    shell.cd(pwd);
    shell.exec('npm install -d --color');
}


// 开发模式
program.on('dev', function () {
    console.log('应用安装完毕后，首次执行会有点慢，请稍等片刻...');
    shell.exec('gulp dev --color');
});

// 提测模式
program.on('test', function () {
    shell.exec('gulp test --color');
});

program.on('deploy', function () {
    shell.exec('pm2 start ./app/bootStrap.js');
})


// 未知命令提示
program
    .command('*')
    .description("未知命令，参考以下帮助信息")
    .action(function () {
        program.outputHelp();
    });



program.parse(process.argv);

