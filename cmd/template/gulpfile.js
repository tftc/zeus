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
            js: 'node --harmony'
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
