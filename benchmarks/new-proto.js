'use strict'
const http = require('http')
const benchmark = require('../bench')
const runnable = require('runnable')
const inherits = require('util').inherits
const major = parseInt(process.version.split('.')[0].replace('v', ''), 10)

module.exports = runnable(function () {
  if (major < 9) {
    return
  }

  function Req (socket) {
    http.IncomingMessage.call(this, socket)
    this.now = null
  }
  inherits(Req, http.IncomingMessage)

  benchmark({
    name: 'Provide IncomingMessage to server',
    IncomingMessage: Req,
    handler: (req, res) => {
      req.now = Date.now()
      res.statusCode = 200
      res.end(`Hello ${req.url} at ${req.now}`)
    }
  })
}, [], module)
