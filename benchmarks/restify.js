'use strict'
const restify = require('restify')
const benchmark = require('../bench')
const runnable = require('runnable')

module.exports = runnable(function () {
  const server = restify.createServer()
  server.get('/', (req, res, next) => {
    req.now = Date.now()
    res.sendRaw(200, `Hello ${req.url} at ${req.now}`)
    next()
  })

  benchmark({
    name: '(Restify) Restify app',
    server: server,
    handler: (req, res) => {
      server._onRequest(req, res)
    }
  })
}, [], module)
