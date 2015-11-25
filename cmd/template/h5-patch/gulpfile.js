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
var gulpSequence = require('gulp-sequence');
var webpack = require('webpack-stream');
var wp = require('webpack-stream/node_modules/webpack');
var rename = require('gulp-rename');

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
            'conf/index.js',
            'client/**/**',
            'gulpfile.js'
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
            'conf/index.js',
            'client/**/**',
            'gulpfile.js'
        ]
    });
});


// 监听静态文件和模板以及pid修改，并刷新页面
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch([
        'client/src/**/*.*'
    ], ['react']);
});

gulp.task('open', function () {
	opn('http://127.0.0.1:8000', {app: ['google chrome']});
})

gulp.task('react', function () {
	return gulp.src('client/src/js/app.js')
	.pipe(webpack(
		{
		    output: {
		        filename: 'bundle.js',
		    },
		    module: {
		      loaders: [
		        {test: /\.js$/, loader: "jsx-loader"},
                {test: /\.css$/, loader: "style-loader!css-loader"},
                {test: /\.woff$/, loader: "url?limit=10000&minetype=application/font-woff"},
                {test: /\.ttf$/, loader: "file"},
                {test: /\.eot$/, loader: "file"},
                {test: /\.svg$/, loader: "file"},
                {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8111192'}
		      ],
		    },
		}
	))
	.pipe(gulp.dest('client/build'))
	.pipe(livereload());
})


gulp.task('build', function () {
	return gulp.src('client/src/js/app.js')
	.pipe(webpack(
		{
		    output: {
		        filename: 'bundle.js',
		    },
		    plugins: [
    			new wp.optimize.UglifyJsPlugin({minimize: true})
    		],
		    module: {
		      loaders: [
		        {test: /\.js$/, loader: "jsx-loader"},
                {test: /\.css$/, loader: "style-loader!css-loader"},
                {test: /\.woff$/, loader: "url?limit=10000&minetype=application/font-woff"},
                {test: /\.ttf$/, loader: "file"},
                {test: /\.eot$/, loader: "file"},
                {test: /\.svg$/, loader: "file"},
                {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8111192'}
		      ],
		    },
		}
	))
	.pipe(gulp.dest('client/build'))
	.pipe(livereload());
})


// 运行Gulp时，默认的Task
gulp.task('dev', gulpSequence(
    'start',
    'watch',
    'open',
    'react'
));

gulp.task('test', gulpSequence(
    'startTest',
    'watch',
    'open',
    'build'
));
