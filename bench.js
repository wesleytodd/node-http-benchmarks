'use strict'
const http = require('http')
const assert = require('assert')
const benchmark = require('benchmark')
const runnable = require('runnable')

module.exports = function (name, handler, opts) {
  var port
  debugger;
  var server = http.createServer(opts || handler, opts && handler)

  const suite = new benchmark.Suite()

  suite.add('bench', {
    defer: true,
    fn: (defer) => {
      http.get(`http://127.0.0.1:${port}`, (res) => {
        assert(res)
        assert.equal(res.statusCode, 200)
        defer.resolve()
      })
    }
  })

  suite.on('complete', function () {
    console.log(`${name}: ${suite[0].stats.mean * 1000}`)
    server.close()
  })

  server.listen(0, '127.0.0.1', () => {
    port = server.address().port
    suite.run({
      async: true
    })
  })
}
