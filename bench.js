'use strict'
const http = require('http')
const assert = require('assert')
const perfnow = require('@streammedev/perfnow')
const series = require('run-series')
const parallel = require('run-parallel')
const onFinished = require('on-finished')
const major = parseInt(process.version.split('.')[0].replace('v', ''), 10)

module.exports = function (opts) {
  const name = opts.name
  const handler = opts.handler
  const results = []
  const runs = []
  let port
  let server

  if (major < 9) {
    server = http.createServer((req, res) => {
      const start = perfnow()
      onFinished(res, () => {
        results.push(perfnow() - start)
      })

      handler(req, res)
    })
  } else {
    server = http.createServer({
      IncomingMessage: opts.IncomingMessage,
      ServerResponse: opts.ServerResponse
    }, (req, res) => {
      const start = perfnow()
      onFinished(res, () => {
        results.push(perfnow() - start)
      })

      handler(req, res)
    })
  }

  for (let i = 0; i < 1000; i++) {
    runs.push((done) => {
      const reqs = []
      for (let ii = 0; ii < 10; ii++) {
        reqs.push((cb) => {
          http.get(`http://127.0.0.1:${port}`, (res) => {
            assert(res)
            assert.strictEqual(res.statusCode, 200)
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
