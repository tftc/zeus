var browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    open = require('gulp-open'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload');
 
gulp
  .task('browserify', function(){
    gulp.src(['src/js/main.js'])
      .pipe(plumber())
      .pipe(
        browserify({ 
          transform: 'reactify', 
          debug: false
        })
      )
      //.pipe(uglify())
      .pipe(concat('main.js'))
      .pipe(plumber.stop())
      .pipe(gulp.dest('dist/js'))
         .pipe(livereload());
  })


  .task('copy', function(){
    gulp
      .src('src/index.html')
      .pipe(gulp.dest('dist'));
   
     gulp
      .src('src/assets/**/*.*')
      .pipe(gulp.dest('dist/assets'));
   
     gulp
      .src('src/img/**/*.*')
      .pipe(gulp.dest('dist/img'));
  })
 
  .task('connect', function(){
    connect.server({
      root: ['dist'],
      port: '8080',
      base: 'http://localhost',
      livereload: true
    });
  })  
 
  .task('default', ['browserify', 'copy', 'connect'])
  .task('default2', ['browserify', 'copy'])
  
  .task('watch', ['default'], function(){
    livereload.listen();
    gulp.watch('src/**/*.*', ['default2']);
  });