Manis
==========

For build system plugins that need to fetch relative config files (like .fecsrc).



[![Build Status](https://img.shields.io/travis/ecomfe/manis.svg?style=flat)](http://travis-ci.org/ecomfe/manis)
[![NPM version](https://img.shields.io/npm/v/manis.svg?style=flat)](https://www.npmjs.com/package/manis)
[![Coverage Status](https://img.shields.io/coveralls/ecomfe/manis.svg?style=flat)](https://coveralls.io/r/ecomfe/manis)
[![DevDependencies](https://img.shields.io/david/dev/ecomfe/manis.svg?style=flat)](https://david-dm.org/ecomfe/manis)

## Install

```sh
npm install manis
```


## Usage

### Using `strip-json-comments`

```javascript
var Manis = require('manis');
var stripJSONComments = require('strip-json-comments');

var manis = new Manis({
    files: [
        '.fecsrc',
        {
            name: 'package.json',
            get: function (json) {
                return json.fecs || {};
            }
        }
    ],
    loader: function (content) {
        return JSON.parse(stripJSONComments(content));
    }
});

var options = manis.from('path/to/file.js');

// do something cool with options
```

### Loading `.yml` with `js-yaml`

```javascript
var yaml = require('js-yaml');

var Manis = require('manis');

var loader = function (text) {
    return yaml.load(text);
};

var manis = new Manis('.travis.yml', {loader: loader});

var options = manis.from('path/to/file.js');

// do something cool with options
```


### With defaults

```javascript
var Manis = require('manis');

var manis = new Manis({
    files: [
        '.fecsrc',
        {
            name: 'package.json',
            get: 'fecs'
        }
    ]
});

manis.setDefault('default/path/to/config/fecs.json');

var options = manis.from('path/to/file.js');

// do something cool with options
```


### Within a gulp plugin

```javascript
var Manis = require('manis');
var map = require('map-stream');

module.exports = function MyGulpPlugin(options) {
  var manis = new Manis('.fecsrc', options);

    return map(function (file, cb) {

        // get the options for this file specifically
        var options = manis.from(file.path);

        // do something cool

        // send the file along
        cb(null, file);

    });
};
```


## API

### new Manis(string fileName[, Object options]);
### new Manis(string[] fileNames[, Object options]);
### new Manis(Object[] finderOptioins[, Object options]);
### new Manis(Object options);

### void Manis#setDefault(Object defaultValue);
### void Manis#setDefault(string filePath[, Object finderOptions]);

### Object Manis#from(string path);

#### options

 - `files`, Array or string, items could be string or Object.

 - `loader`, Function，parser for config content.

 - `lookup`, Boolean, Find all up-level config files. default is true.

 - `merge`, Boolean, Merge all config objects. default is true.

 - `cache`, Boolean, Cache config files. default is true.

#### finderOptions

 - `name`, string, the file name to be searched.

 - `loader`, Funtion, the same as options.loader above;

 - `stopper`, Function, the predicate for stopping search.

 - `get`, string or Function, the field name to retrieve from config object.

 - `cache`, Boolean, Cache config files. default is true.
