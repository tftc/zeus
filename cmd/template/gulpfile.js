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
var minifyCss = require('gulp-minify-css');
var fecs = require('fecs-gulp');
var fs = require('fs');
var opn = require('opn');
var gulpSequence = require('gulp-sequence')

// 监听静态文件和模板以及pid修改，并刷新页面
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch([
        './pid',
        'app/template/**/*.*',
        'client/src/**/*.*'
    ], function (event) {
        gulp.src('').pipe(livereload());
    })
});

gulp.task('open', function () {
	opn('http://127.0.0.1:8000', {app: ['google chrome']})
})

gulp.task('start', function () {
    gulp.src('conf/dev/index.js')
        .pipe(gulp.dest('conf'));
    nodemon({
        script: './app/bootSrtap.js',
        ext: 'js',
        execMap: {
            js: 'node --harmony'
        },
        args: [
            '--color'
        ],
        ignore: [
            'conf/index.js'
        ]
    });
});
gulp.task('startTest', function () {
    gulp.src('conf/test/index.js')
        .pipe(gulp.dest('conf'));
    nodemon({
        script: './app/bootSrtap.js',
        ext: 'js',
        execMap: {
            js: 'node --harmony'
        },
        args: [
            '--color'
        ],
        ignore: [
            'conf/index.js'
        ]
    });
});

gulp.task('build', function () {
    // 单元测试
    // common代码合并压缩
    var jsArr = [];
    var data = fs.readFileSync('client/src/js/common.js', 'utf8');
    var arr = data.split('\n');
    for (var i = 0, len = arr.length; i < len; i++) {
        var regx = /src=\"(.+)\"/;
        if (regx.test(arr[i])) {
            var jsItem = arr[i].match(regx)[1];
            if (jsItem !== '') {
                jsArr.push('client/src' + jsItem);
            }
        }
    }

    gulp.src(jsArr).pipe(concat('common.js'))
        .pipe(uglify())
        .pipe(gulp.dest('client/build/js/'));


    // page部分的压缩合并
    gulp.src('client/src/js/page/**/*.js')
        .pipe(fecs.format())
        .pipe(gulp.dest('client/src/js/page'))
        .pipe(fecs.check())
        .pipe(fecs.reporter('baidu', {
            color: true,
            rule: true,
            sort: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest('client/build/js/page'));

    // 拷贝bower_components
    gulp.src('client/bower_components/*')
        .pipe(gulp.dest('client/build/bower_components'));

    // //压缩编译less
    gulp.src(['client/src/less/page/**/*.less'])
    	.pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest('client/build/css/page'));

    // //压缩编译less
    gulp.src(['client/src/less/common.less'])
    	.pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest('client/build/css'));

    // 拷贝图片
    gulp.src('client/src/img/*.{png,jpg,jpeg}')
        .pipe(gulp.dest('client/build/img'));

    // 拷贝iconfont文件
    gulp.src('client/src/font/*.{ttf,woff,eot,svg}')
        .pipe(gulp.dest('client/build/font'));
});

// livereload
gulp.task('reload', function () {
    gulp.src('')
        .pipe(livereload());
});

// 运行Gulp时，默认的Task
gulp.task('dev', gulpSequence(
    'start',
    'watch',
    'open'
));
gulp.task('test', gulpSequence(
    'build',
    'startTest',
    'watch',
    'open'
));