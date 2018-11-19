'use strict'
const http = require('http')
const assert = require('assert')
const series = require('run-series')
const parallel = require('run-parallel')
const onFinished = require('on-finished')
const convertHrTime = require('convert-hrtime')
const major = parseInt(process.version.split('.')[0].replace('v', ''), 10)

module.exports = function (opts) {
  const name = opts.name
  const handler = opts.handler
  const results = []
  const runs = []
  let server
  let port

  if (major < 9) {
    server = http.createServer((req, res) => {
      const start = process.hrtime()
      onFinished(res, () => {
        results.push(convertHrTime(process.hrtime(start)).milliseconds)
      })

      handler(req, res)
    })
  } else {
    server = http.createServer({
      IncomingMessage: opts.IncomingMessage,
      ServerResponse: opts.ServerResponse
    }, (req, res) => {
      const start = process.hrtime()
      onFinished(res, () => {
        results.push(convertHrTime(process.hrtime(start)).milliseconds)
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
      const mean = (results.reduce((p, v) => p + v) / results.length).toFixed(5)
      const max = (results.reduce((p, v) => p > v ? p : v)).toFixed(5)
      const min = (results.reduce((p, v) => p < v ? p : v)).toFixed(5)
      console.log(`${name}: ${mean}ms (min: ${min}ms max: ${max}ms)`)
    })
  })
}
