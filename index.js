'use strict'
const spawn = require('child_process').spawn
const series = require('run-series')

series([
  './cases/baseline.js',
  './cases/express.js',
  './cases/restify.js',
  './cases/wrap.js'
  // './cases/new-proto.js'
].map((file) => {
  return function (done) {
    var c = spawn('node', ['--inspect', '--inspect-brk', file], {stdio: 'inherit'})
    c.on('close', () => {
      done()
    })
  }
}))
