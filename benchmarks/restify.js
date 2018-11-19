'use strict'
const http = require('http')
const benchmark = require('../bench')
const runnable = require('runnable')

module.exports = runnable(function () {
  http.IncomingMessage.prototype.now = null

  benchmark({
    name: 'Modify prototype at startup',
    handler: (req, res) => {
      req.now = Date.now()
      res.statusCode = 200
      res.end(`Hello ${req.url} at ${req.now}`)
    }
  })
}, [], module)
