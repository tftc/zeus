var child = require('child_process');
  console.log((escape('gulp dev'))
//var childProcess = child.exec(escape('gulp dev'), {env: process.env, maxBuffer: 20*1024*1024});
//childProcess.stdout.pipe(process.stdout);

function escape(str) {
    return (str+'').replace(/([\\"'])/g, "\\$1").replace(/\0/g, "\\0");
  }

