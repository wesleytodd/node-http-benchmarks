'use strict'
const benchmark = require('../bench')
const runnable = require('runnable')
const major = parseInt(process.version.split('.')[0].replace('v', ''), 10)

module.exports = runnable(function () {
  if (major < 6) {
    return
  }

  benchmark({
    name: 'Wrap req in a Proxy',
    handler: (req, res) => {
      const r = new Proxy(req, {
        get: (_req, key) => {
          if (key === 'now') {
            return Date.now()
          }
          return _req[key]
        }
      })

      res.statusCode = 200
      res.end(`Hello ${r.url} at ${r.now}`)
    }
  })
}, [], module)
