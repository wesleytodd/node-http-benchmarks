'use strict'
const spawn = require('child_process').spawn
const assert = require('assert')
const series = require('run-series')

series([
  './benchmarks/baseline.js',
  './benchmarks/replace-proto.js',
  './benchmarks/modify-proto.js',
  './benchmarks/wrap.js',
  './benchmarks/new-proto.js',
  './benchmarks/proxy.js',
  './benchmarks/modify-some.js',
  './benchmarks/express.js',
  './benchmarks/restify.js'
].map((file) => {
  return function (done) {
    spawn('node', [file], { stdio: 'inherit' })
      .on('close', (code) => {
        assert.strictEqual(code, 0)
        setTimeout(() => done(), 5000)
      })
  }
}))
