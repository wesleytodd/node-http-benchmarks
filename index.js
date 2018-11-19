'use strict'
const spawn = require('child_process').spawn
const assert = require('assert')
const series = require('run-series')

series([
  './benchmarks/baseline.js',
  './benchmarks/express.js',
  './benchmarks/restify.js',
  './benchmarks/wrap.js',
  './benchmarks/new-proto.js',
  './benchmarks/modify-some.js',
].map((file) => {
  return function (done) {
    var c = spawn('node', [file], {stdio: 'inherit'})
    c.on('close', (code) => {
      assert.equal(code, 0)
      setTimeout(() => {
        done()
      }, 5000)
    })
  }
}))
