#!/usr/bin/env node

'use strict';


var program  = require('commander');
var shell   = require('shelljs');
var path = require('path');
var chalk = require('chalk');
var os = require('os');
var open = require('opn');
var child_process = require('child_process');
var spawnSync = child_process.spawnSync;
var spawn = child_process.spawn;
var logo = [
            '            ====                ',
            '           -_  _-           ',
            '           - __ -            ====================',
            '    ___====-_  _-====___                      //',
            '   _--^^^#/      \\#^^^--_                   //',
            '          ((    ))                        //',
            '           |\\^^\/|                       //',
            '           (@::@)                     //',
            '            \\\\//                    //',
            '            (oo)                  //',
            '          // vv \\\\              //',
            '        //        \\\\          //',
            '      //            \\\\      ====================='
        ].join('\n');

program.on('--help', function () {
    console.log(logo);
    console.log('');
    console.log('  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --');
    console.log('|             [创建] : zeus new (pc/h5)          |');
    console.log('|             [开发] : zeus dev                  |');
    console.log('|             [调试] : zeus debug                 |');
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
            console.log(logo);
            //checkGlb();
            var toPath = shell.pwd() + '/' + appName;
            console.log('install app start...');
            console.log('makedir' + appName + '...');
            shell.exec('mkdir ' + appName);
            console.log('init app...');
            var copyList = ['app','conf','log','client','public','package.json','gulpfile.js','pid'];
            var h5Patch = ['app', 'conf', 'package.json','client','gulpfile.js'];
            copyList.forEach(function (fileName){
                var formFile = fileName;
                if(appType === 'h5' && h5Patch.indexOf(fileName) !== -1){
                    formFile = 'h5-patch/'+fileName;
                }
                initComFile(fromPath, toPath, formFile, fileName);
            })
            console.log('change dir to' + toPath + '...');
            shell.cd(toPath);
            console.log(shell.pwd());
            installDepd(toPath);
            
        }
    }
});

// 文件拷贝操作
function initComFile(fromPath, toPath, formFile, toFile) {
    try {
        console.log('doing ' + fromPath + '/' + formFile + ' ->' + toPath + '/' + toFile);
        shell.exec('cp -r "' + fromPath + '/"' + formFile + ' ' + toPath + '/' + toFile);
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
        shell.exec('cp -r "' + from + '" ' + to);
        console.log('cp -r ' + from + ' ' + to)
        console.log(chalk.green('done'));
    }
    catch (e) {
        console.log(chalk.red(e));
    }

}

//全局依赖检查
function checkGlb() {
    var glbList = ['pm2', 'gulp'];
    glbList.forEach(function (glb) {
        console.log('install global module ' + glb);
        spawnSync('npm', ['install',glb,'-g','-d','--registry=https://registry.npm.taobao.org','--disturl=https://npm.taobao.org/dist'], {
          stdio: 'inherit'
        });
    });
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
    var install = spawnSync('npm', ['install','-d','--registry=https://registry.npm.taobao.org','--disturl=https://npm.taobao.org/dist'], {
        stdio: 'inherit'
    });
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

//node debug 模式
program.on('debug', function () {
    spawn('node', ['--debug', '--harmony', './app/bootSrtap.js']);
    open('http://127.0.0.1:8080/?port=5858', {app: ['google chrome']})
    console.log('Node调试模式已经开启，请在新打开的页面完成js加载后进行调试');
    shell.exec('node-inspector');
});

program.on('deploy', function () {
   
})

// 未知命令提示
program
    .command('*')
    .description("未知命令，参考以下帮助信息")
    .action(function () {
        program.outputHelp();
    });

program.parse(process.argv);


