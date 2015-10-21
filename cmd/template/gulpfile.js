/**
 * @file gulpfile.js
 * @desc 自动化脚本
 * @author xiaoguang01
 * @date 2015/9/25
 */
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var os = require('os');

var binPath = process.cwd() + '/bin/';

if (os.platform() == 'win32') {
   var nodePath = binPath + 'node.exe';
}
else {
   var nodePath = binPath + 'node';
}



// 监听静态文件修改
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['./pid', './app/template/**/*.*'], ['reload']);

});

// nodemon
gulp.task('start', function () {
    gulp.src('conf/dev/index.js')
        .pipe(gulp.dest('conf'));
    nodemon({
        script: './app/bootSrtap.js',
        ext: 'js',
        execMap: {
            js: nodePath + ' --harmony'
        },
        args: ['--color']
    });
});

// livereload
gulp.task('reload', function () {
    gulp.src('').pipe(livereload());
});

// 运行Gulp时，默认的Task
gulp.task('dev', ['watch', 'start']);
