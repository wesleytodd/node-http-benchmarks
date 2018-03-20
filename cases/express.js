'use strict'
const http = require('http')
const benchmark = require('../bench')
const runnable = require('runnable')

module.exports = runnable(function () {
  var proto = Object.create(http.IncomingMessage.prototype)
  proto.now = null

  benchmark('EXPRESS: Replace prototype', (req, res) => {
    Object.setPrototypeOf(req, proto)
    req.now = Date.now()
    res.statusCode = 200
    res.end(`Hello ${req.url} at ${req.now}`)
  })
}, [], module)
