/**
 * @file gulpfile.js
 * @desc 自动化脚本
 * @author xiaoguang01
 * @date 2015/9/25
 */
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCss = require("gulp-minify-css");
var watch = require('gulp-watch');
var fecs = require('fecs-gulp');
var os = require('os');
var fs = require('fs');


/*gulp.task('build', function() {
    var evr = argv.p || !argv.d; //生产环境为true，开发环境为false，默认为true

})*/

// 监听静态文件修改
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['./pid', 'app/template/**/*.*', 'client/src/**/*.!(less)'], function(event) {
        gulp.src('').pipe(livereload());
    });
});

gulp.task('nodemon', function() {
    nodemon({
        script: './app/bootSrtap.js',
        ext: 'js',
        execMap: {
            js: 'node --harmony'
        },
        args: ['--color'],
        ignore: ['conf/index.js']
    });
});
gulp.task('start', function() {
    gulp.src('conf/dev/index.js')
        .pipe(gulp.dest('conf'));
    nodemon({
        script: './app/bootSrtap.js',
        ext: 'js',
        execMap: {
            js: 'node --harmony'
        },
        args: ['--color'],
        ignore: ['conf/index.js']
    });
});
gulp.task('startTest', function() {
    gulp.src('conf/test/index.js')
        .pipe(gulp.dest('conf'));
    nodemon({
        script: './app/bootSrtap.js',
        ext: 'js',
        execMap: {
            js: 'node --harmony'
        },
        args: ['--color'],
        ignore: ['conf/index.js']
    });
});

gulp.task('build', function() {
    var jsArr = [];
    fs.readFile('client/src/js/common/index.js', 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var arr = data.split('\n');
        for (var i = 0, len = arr.length; i < len; i++) {
            var regx = /src=\"(.+)\"/;
            if (regx.test(arr[i])) {
                var jsItem = arr[i].match(regx)[1];
                console.log(regx.test(arr[i]), jsItem);
                if (jsItem != '') {
                    jsArr.push('client/src' + jsItem);
                }
            }
        }
        gulp.src(jsArr)
            .pipe(concat('index.js'))
            .pipe(uglify())
            .pipe(gulp.dest('client/build/js/common'))
    });
    gulp.src('client/src/js/**/*.js')
        .pipe(fecs.check())
        .pipe(
            fecs.reporter('baidu', {
                color: true,
                rule: true,
                sort: true
            })
        )
        .pipe(uglify())
        .pipe(gulp.dest('client/build/js'));

    //拷贝bower_components
    gulp.src('client/bower_components/*')
        .pipe(gulp.dest('client/build/bower_components'));

    //压缩css
    gulp.src(['client/src/css/**/*.css'])
        .pipe(minifyCss())
        .pipe(gulp.dest('client/build/css'));
    // //压缩编译less
    gulp.src(['client/src/less/**/*.less'])
        .pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest('client/build/css'));
    //拷贝图片
    gulp.src('client/src/img/*.{png,jpg,jpeg}')
        .pipe(gulp.dest('client/build/img'));
    //拷贝iconfont文件
    gulp.src('client/src/font/*.{ttf,woff,eot,svg}')
        .pipe(gulp.dest('client/build/font'));
})

// livereload
gulp.task('reload', function() {
    gulp.src('').pipe(livereload());
});

gulp.task('watchLess', function() {
    gulp.src('client/src/less/**/*.less')
        .pipe(watch('client/src/less/**/*.less'))
        .pipe(less())
        .pipe(gulp.dest('client/src/css'))
        .pipe(livereload());
});

// 运行Gulp时，默认的Task
gulp.task('dev', ['start', 'watch', 'watchLess']);
gulp.task('test', ['build', 'startTest']);