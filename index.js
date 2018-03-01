'use strict'
const spawn = require('child_process').spawn
const series = require('run-series')

series([
  './no-mod-req.js',
  './mod-req.js',
  './mod-req-sometimes.js'
].map((file) => {
  return function (done) {
    var c = spawn('node', [file], {stdio: 'inherit'})
    c.on('close', () => {
      done()
    })
  }
}))
