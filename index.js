var glob = require('globby')
var fs = require('fs')
var path = require('path')

function readFile(file) {
  return fs.readFileSync(file, 'utf8').trim()
}

module.exports = function (t, pattern, actual, expected, normalize) {
  var actualFiles = glob.sync(pattern, { cwd: actual })
  var expectedFiles = glob.sync(pattern, { cwd: expected })

  normalize = normalize || function (f) {
    return f
  }
  var normalized = actualFiles.map(normalize).sort()
  expectedFiles.sort()

  var assertions = 1
  t.same(normalized, expectedFiles, 'filenames should match')

  var files = actualFiles
  files.forEach(function (f) {
    ++assertions
    t.equal(
      readFile(path.resolve(actual, f)),
      readFile(path.resolve(expected, normalize(f))),
      f
    )
  })
  return assertions
}

