'use strict'
const benchmark = require('../bench')
const http = require('http')
const runnable = require('runnable')

module.exports = runnable(function () {
  benchmark({
    name: 'Modify ~1/3 of incoming requests',
    handler: (req, res) => {
      const now = Date.now()
      if (now % 3 === 0) req.now = now
      res.statusCode = 200
      res.end(`Hello ${req.url} at ${req.now || now}`)
    }
  })
}, [], module)
