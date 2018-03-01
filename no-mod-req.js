'use strict'
const benchmark = require('./bench')
const runnable = require('runnable')

module.exports = runnable(function () {
  benchmark('Dont modify req', (req, res) => {
    var now = Date.now()
    if (now % 3 === 0)  {
        // do nothing
    }
    res.statusCode = 200
    res.end('Hello World')
  })
}, [], module)
