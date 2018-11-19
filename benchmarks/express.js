'use strict'
const express = require('express')
const benchmark = require('../bench')
const runnable = require('runnable')

module.exports = runnable(function () {
  const app = express()
  app.get('/', (req, res) => {
    req.now = Date.now()
    res.status(200).end(`Hello ${req.url} at ${req.now}`)
  })

  benchmark({
    name: '(Express) Express app',
    handler: (req, res) => {
      app.handle(req, res)
    }
  })
}, [], module)
