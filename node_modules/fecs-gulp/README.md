# fecs-gulp

> fecs for gulp

## Getting Started
Install this plugin with this command:

```shell
npm install fecs-gulp --save-dev
```

## Usage

### Overview
In your project's gulpfile.js.

```js
var gulp = require('gulp');
var fecs = require('fecs-gulp');

gulp.task('test', function () {
    return gulp.src(['./test/css/*', './test/html/*', './test/js/*'])
        .pipe(fecs.check(
            // 可以没有options参数，默认效果和命令行的默认效果一致
            // {
                // 支持的cli属性
                // maxerr: 1,
                // maxsize: 1,

                // 不支持的属性
                // ignore
                // type
            // }
        ))
        .pipe(
            // 这么写reporter的配置都是默认的
            // fecs.reporter()

            // fecs.reporter('')
            // fecs.reporter('default');

            // fecs.reporter('baidu')

            // fecs.reporter(require('fecs/lib/reporter/baidu'))

            // fecs.reporter('default', {
            //     color: true,
            //     rule: true,
            //     sort: true
            // })

            fecs.reporter('baidu', {
                color: true,
                rule: true,
                sort: true
            })

        )
        .pipe(fecs.format(
            // 可以没有options参数
            // {
                // 不支持replace
                // 不支持type
                // 不支持output
            // }
        ))
        .pipe(gulp.dest('./test/output'));
});
```

### Options

[fecs-options](https://github.com/ecomfe/fecs/wiki/CLI)

## Contributing

## Release History
_(Nothing yet)_
