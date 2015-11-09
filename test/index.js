var test = require('tape')
var compare = require('..')
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
