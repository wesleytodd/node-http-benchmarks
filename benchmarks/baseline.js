'use strict'
const benchmark = require('../bench')
const http = require('http')
const runnable = require('runnable')

module.exports = runnable(function () {
  benchmark({
    name: '(BASELINE) Node core http server',
    handler: (req, res) => {
      const now = Date.now()
      res.statusCode = 200
      res.end(`Hello ${req.url} at ${req.now}`)
    }
  })
}, [], module)
