var gulp = require('gulp');
var fecs = require('fecs-gulp');
var connect = require('gulp-connect');

gulp.task('test', function () {
    return gulp.src(['./test/css/*', './test/html/*', './test/js/*'])
        .pipe(fecs.check())
        .pipe(
            fecs.reporter('baidu', {
                color: true,
                rule: true,
                sort: true
            })
        )
        .pipe(fecs.format())
        .pipe(gulp.dest('./test/output'));
});

//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
    gulp.watch(['./www/*.html'], ['html']);
});

//使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server({
        root: 'www',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./www/*.html')
        .pipe(connect.reload());
});

//运行Gulp时，默认的Task
gulp.task('default', ['connect', 'watch']);