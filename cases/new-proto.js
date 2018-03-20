'use strict'
const http = require('http')
const benchmark = require('../bench')
const runnable = require('runnable')
const {inherits} = require('util')

module.exports = runnable(function () {
  function Req (socket) {
    http.IncomingMessage.call(this, socket)
  }
  inherits(Req, http.IncomingMessage)
  Req.prototype.now = null

  benchmark('NEW PROTO: Provided req', (req, res) => {
    req.now = Date.now()
    res.statusCode = 200
    res.end(`Hello ${req.url} at ${req.now}`)
  }, {
    IncomingMessage: Req
  })
}, [], module)
