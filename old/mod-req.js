'use strict'
const benchmark = require('./bench')
const runnable = require('runnable')

module.exports = runnable(function () {
  benchmark('Modify req', (req, res) => {
    req.now = Date.now()
    res.statusCode = 200
    res.end(`Hello ${req.url} at ${req.now}`)
  })
}, [], module)
