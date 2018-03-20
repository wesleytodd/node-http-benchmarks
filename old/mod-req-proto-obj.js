'use strict'
const http = require('http')
const benchmark = require('./bench')
const runnable = require('runnable')

module.exports = runnable(function () {
  var proto = Object.create(http.IncomingMessage.prototype)
  proto.__customProperty = Object.create(null)

  benchmark('Modify req prototype and add prop', (req, res) => {
    var now = Date.now()
    if (now % 3 === 0)  {
      // do nothing
    }
    Object.setPrototypeOf(req, proto)
    req.__customProperty.now = now
    req.now = now
    res.statusCode = 200
    res.end('Hello World')
  })
}, [], module)
