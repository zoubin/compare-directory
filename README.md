# compare-directory
Compare contents of two directories

[![version](https://img.shields.io/npm/v/compare-directory.svg)](https://www.npmjs.org/package/compare-directory)
[![status](https://travis-ci.org/zoubin/compare-directory.svg?branch=master)](https://travis-ci.org/zoubin/compare-directory)
[![dependencies](https://david-dm.org/zoubin/compare-directory.svg)](https://david-dm.org/zoubin/compare-directory)
[![devDependencies](https://david-dm.org/zoubin/compare-directory/dev-status.svg)](https://david-dm.org/zoubin/compare-directory#info=devDependencies)


## Usage

```javascript
var test = require('tape')
var compare = require('compare-directory')
var path = require('path')
var fixtures = path.resolve.bind(path, __dirname, 'fixtures')

test('compare directories', function(t) {
  compare(t, ['**/*.css', '**/*.png'], fixtures('actual'), fixtures('expected'))
  t.end()
})

test('normalize', function(t) {
  compare(t, ['**/*.css', '**/*.scss', '**/*.png'], fixtures('normalize'), fixtures('expected'), function (file) {
    if (path.extname(file) !== '.scss') {
      return file
    }
    return path.join(
      path.dirname(file), path.basename(file, '.scss') + '.css'
    )
  })
  t.end()
})

```

