'use strict'
const http = require('http')
const assert = require('assert')
const perfnow = require('@streammedev/perfnow')
const series = require('run-series')
const parallel = require('run-parallel')
const onFinished = require('on-finished')
const runnable = require('runnable')

module.exports = function (opts) {
  const {name, handler} = opts 
  const results = []
  const runs = []
  let port

  const server = http.Server({
    IncomingMessage: opts.IncomingMessage,
    ServerResponse: opts.ServerResponse
  }, (req, res) => {
    const start = perfnow()
    onFinished(res, () => {
      results.push(perfnow() - start)
    })

    handler(req, res)
  })

  for (let i = 0; i < 1000; i++) {
    runs.push((done) => {
      const reqs = []
      for (let ii = 0; ii < 10; ii++) {
        reqs.push((cb) => {
          http.get(`http://127.0.0.1:${port}`, (res) => {
            assert(res)
            assert.equal(res.statusCode, 200)
            cb()
          })
        })
      }

      parallel(reqs, done)
    })
  }
  
  server.listen(0, '127.0.0.1', () => {
    port = server.address().port
    series(runs, (err) => {
      server.close()
      if (err) {
        return console.log(err)
      }
      const mean = results.reduce((p, v) => p + v) / results.length
      console.log(`${name}: ${mean.toFixed(5)}ms`)
    })
  })
}
