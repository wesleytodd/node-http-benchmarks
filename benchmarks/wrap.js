'use strict'
const http = require('http')
const benchmark = require('../bench')
const runnable = require('runnable')

module.exports = runnable(function () {
  let proto = Object.create(http.IncomingMessage.prototype)
  let Req = function (req) {
    this.__req__ = req
    this.now = null
  }
  Object.keys(proto).forEach((key) => {
    Object.defineProperty(Req.prototype, key, {
      get: function () {
        return this.__req__[key]
      },
      set: function (val) {
        this.__req__[key] = val
      }
    })
  })

  benchmark({
    name: 'Wrap whole request',
    handler: (req, res) => {
      var r = new Req(req)
      r.now = Date.now()
      res.statusCode = 200
      res.end(`Hello ${req.url} at ${r.now}`)
    }
  })
}, [], module)
