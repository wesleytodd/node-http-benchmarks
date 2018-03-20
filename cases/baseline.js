'use strict'
const benchmark = require('../bench')
const runnable = require('runnable')

module.exports = runnable(function () {
  benchmark('BASELINE: Dont modify req', (req, res) => {
    var now = Date.now()
    res.statusCode = 200
    res.end(`Hello ${req.url} at ${now}`)
  })
}, [], module)
