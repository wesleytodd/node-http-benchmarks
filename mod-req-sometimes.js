'use strict'
const benchmark = require('./bench')
const runnable = require('runnable')

module.exports = runnable(function () {
  benchmark('Modify req sometimes', (req, res) => {
    var now = Date.now()
    if (now % 3 === 0)  {
      req.__customProperty = now
    }
    res.statusCode = 200
    res.end('Hello World')
  })
}, [], module)
