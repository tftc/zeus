'use strict';

const homedir = require('node-homedir');
const yargs = require('yargs');
const urllib = require('urllib');
const os = require('os');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('mz-modules/rimraf');
const compressing = require('compressing');
const assert = require('assert');
const inquirer = require('inquirer');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');
const glob = require('glob');

require('colors');

module.exports = class Command {
  constructor(options) {
    options = options || {};
    this.name = 'zeus';
    this.inquirer = inquirer;
  }

  get logo() {
    return [
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
  }

  * run (cwd, args) {
    const argv = this.argv = this.getParser().parse(args || []);
    this.cwd = cwd;
    // this.log('%j', argv);

    // detect registry url
    this.registryUrl = this.getRegistryByType(argv.registry);
    this.log(`use registry: ${this.registryUrl}`);

    if (this.needUpdate) {
      // check update
      yield updater({
        package: this.pkgInfo,
        registry: this.registryUrl,
        level: 'major',
      });
    }

    // ask for target dir
    this.targetDir = yield this.getTargetDirectory();

    // support --type=<npm name>
    const typeName = this.argv.type;
    // download boilerplate
    const templateDir = yield this.downloadBoilerplate(typeName);

    // copy template
    yield this.processFiles(this.targetDir, templateDir);
    // done
    this.printUsage(this.targetDir);
  }

  /**
   * copy boilerplate to target dir with template scope replace
   * @param {String} targetDir - target dir
   * @param {String} templateDir - template dir, must contain a folder which named `boilerplate`
   * @return {Array} file names
   */
  * processFiles(targetDir, templateDir) {
    this.log('targetDir: %s, templateDir: %s', targetDir, templateDir);
    const fsEditor = editor.create(memFs.create());
    const files = glob.sync('**/*', { cwd: templateDir, dot: true, nodir: true });

    files.forEach(file => {
      const from = path.join(templateDir, file);
      const to = path.join(targetDir, file);
      fsEditor.copy(from, to, {
        process: content => {
          this.log('write to %s', to);
          return content;
        },
      });
    });

    // write file to disk
    yield new Promise(resolve => fsEditor.commit(resolve));
    return files;
  }

  /**
   * get argv parser
   * @return {Object} yargs instance
   */
  getParser() {
    return yargs
      .usage(`${this.logo} \ninit project from boilerplate.\nUsage: zeus new [dir] --type=fe-h5`)
      .options(this.getParserOptions())
      .alias('h', 'help')
      .version()
      .help();
  }

  /**
   * get yargs options
   * @return {Object} opts
   */
  getParserOptions() {
    return {
      type: {
        type: 'string',
        description: 'boilerplate type',
        default: 'fe-h5',
      },
      dir: {
        type: 'string',
        description: 'target directory',
      },
      registry: {
        type: 'string',
        description: 'npm registry, support china/npm/custom, default to auto detect',
        alias: 'r',
      }
    };
  }

  /**
   * get registryUrl by short name
   * @param {String} key - short name, support `china / npm / npmrc`, default to read from .npmrc
   * @return {String} registryUrl
   */
  getRegistryByType(key) {
    switch (key) {
      case 'china':
        return 'https://registry.npm.taobao.org';
      case 'npm':
        return 'https://registry.npmjs.org';
      default: {
        if (/^https?:/.test(key)) {
          return key.replace(/\/$/, '');
        } else {
          // support .npmrc
          const home = homedir();
          let url = process.env.npm_registry || process.env.npm_config_registry || 'https://registry.cnpmjs.org';
          if (fs.existsSync(path.join(home, '.cnpmrc')) || fs.existsSync(path.join(home, '.tnpmrc'))) {
            url = 'https://registry.npm.taobao.org';
          }
          url = url.replace(/\/$/, '');
          return url;
        }
      }
    }
  }

  /**
   * ask for target directory, will check if dir is valid.
   * @return {String} Full path of target directory
   */
  * getTargetDirectory() {
    const dir = this.argv._[1] || this.argv.dir || '';
    let targetDir = path.resolve(this.cwd, dir);
    const force = this.argv.force;

    const validate = dir => {
      // create dir if not exist
      if (!fs.existsSync(dir)) {
        mkdirp.sync(dir);
        return true;
      }

      // not a directory
      if (!fs.statSync(dir).isDirectory()) {
        return `${dir} already exists as a file`.red;
      }

      // check if directory empty
      const files = fs.readdirSync(dir).filter(name => name[0] !== '.');
      if (files.length > 0) {
        if (force) {
          this.log(`${dir} already exists and will be override due to --force`.red);
          return true;
        }
        return `${dir} already exists and not empty: ${JSON.stringify(files)}`.red;
      }
      return true;
    };

    // if argv dir is invalid, then ask user
    const isValid = validate(targetDir);
    if (isValid !== true) {
      this.log(isValid);
      const answer = yield this.inquirer.prompt({
        name: 'dir',
        message: 'Please enter target dir: ',
        default: dir || '.',
        filter: dir => path.resolve(this.cwd, dir),
        validate,
      });
      targetDir = answer.dir;
    }
    this.log(`target dir is ${targetDir}`);
    return targetDir;
  }

  /**
   * download boilerplate by pkgName then extract it
   * @param {String} pkgName - boilerplate package name
   * @return {String} extract directory
   */
  * downloadBoilerplate(pkgName) {
    const result = yield this.getPackageInfo(pkgName, false);
    const tgzUrl = result.dist.tarball;
    const saveDir = path.join(os.tmpdir(), 'zeus-init-boilerplate');
    yield rimraf(saveDir);

    this.log(`downloading ${tgzUrl}`);
    const response = yield urllib.request(tgzUrl, { streaming: true, followRedirect: true });
    yield compressing.tgz.uncompress(response.res, saveDir);

    this.log(`extract to ${saveDir}`);
    return path.join(saveDir, '/package');
  }

  /**
   * get package info from registry
   *
   * @param {String} pkgName - package name
   * @param {Boolean} [withFallback] - when http request fail, whethe to require local
   * @return {Object} pkgInfo
   */
  * getPackageInfo(pkgName, withFallback) {
    this.log(`fetching npm info of ${pkgName}`);
    try {
      const result = yield urllib.request(`${this.registryUrl}/${pkgName}/latest`, {
        dataType: 'json',
        followRedirect: true,
      });
      assert(result.status === 200, `npm info ${pkgName} got error: ${result.status}, ${result.data.reason}`);
      return result.data;
    } catch (err) {
      if (withFallback) {
        this.log(`use fallback from ${pkgName}`);
        return require(`${pkgName}/package.json`);
      } else {
        throw err;
      }
    }
  }

  /**
   * print usage guide
   */
  printUsage() {
    this.log(`usage:
      - cd ${this.targetDir}
      - npm install
      - npm start / npm run dev / npm test
    `);
  }

  /**
   * log with prefix
   */
  log() {
    const args = Array.prototype.slice.call(arguments);
    args[0] = `[${this.name}] `.blue + args[0];
    console.log.apply(console, args);
  }

};