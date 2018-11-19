# Benchmark Extending Node HTTP Request object

This is a small set of micro benchmarks for different approaches to modifying the http request object.  It tests the way different
frameworks approach the problem and also tests the new way to provide your own `IncomingMessage` to the http server.

From what I can tell, there is no real difference in the performance of any of the approaches, but I suspect I am doing something wrong :)

```
$ npm start

> node-http-benchmarks@1.0.0 start ./node-http-benchmarks
> npm run node4 && npm run node6 && npm run node9 && npm run node11


> node-http-benchmarks@1.0.0 node4 ./node-http-benchmarks
> docker run -it --rm -v $(PWD):/usr/src/app -w /usr/src/app node:4 npm t


> node-http-benchmarks@1.0.0 test /usr/src/app
> standard && node --version && node index.js

standard: Node 6 or greater is required. `standard` did not run.
v4.9.1
(BASELINE) Node core http server: 0.11511ms (min: 0.06790ms max: 7.53200ms)
(Express like) Replace prototype: 0.10881ms (min: 0.05610ms max: 6.94120ms)
(Restify like) Modify prototype at startup: 0.11258ms (min: 0.05840ms max: 10.03310ms)
Wrap whole request: 0.11731ms (min: 0.07730ms max: 19.26420ms)
Modify ~1/3 of incoming requests: 0.11545ms (min: 0.07030ms max: 14.43150ms)
(Express) Actual express app: 0.16609ms (min: 0.10270ms max: 6.99740ms)
(Restify) Restify app: 2.93434ms (min: 1.35420ms max: 25.79160ms)

> node-http-benchmarks@1.0.0 node6 ./node-http-benchmarks
> docker run -it --rm -v $(PWD):/usr/src/app -w /usr/src/app node:6 npm t


> node-http-benchmarks@1.0.0 test /usr/src/app
> standard && node --version && node index.js

v6.14.4
(BASELINE) Node core http server: 0.10923ms (min: 0.05450ms max: 13.11060ms)
(Express like) Replace prototype: 0.10355ms (min: 0.05100ms max: 10.47210ms)
(Restify like) Modify prototype at startup: 0.10503ms (min: 0.05430ms max: 7.31350ms)
Wrap whole request: 0.10342ms (min: 0.05310ms max: 10.78640ms)
Wrap req in a Proxy: 0.10140ms (min: 0.06000ms max: 13.83890ms)
Modify ~1/3 of incoming requests: 0.10522ms (min: 0.06030ms max: 8.29340ms)
(Express) Actual express app: 0.15043ms (min: 0.08610ms max: 14.10170ms)
(Restify) Restify app: 2.50622ms (min: 1.69050ms max: 17.90760ms)

> node-http-benchmarks@1.0.0 node9 ./node-http-benchmarks
> docker run -it --rm -v $(PWD):/usr/src/app -w /usr/src/app node:9 npm t


> node-http-benchmarks@1.0.0 test /usr/src/app
> standard && node --version && node index.js

v9.11.2
(BASELINE) Node core http server: 0.09635ms (min: 0.05480ms max: 4.88390ms)
(Express like) Replace prototype: 0.10180ms (min: 0.05510ms max: 4.34210ms)
(Restify like) Modify prototype at startup: 0.09677ms (min: 0.05580ms max: 4.74730ms)
Wrap whole request: 0.10123ms (min: 0.05400ms max: 7.45150ms)
Provide IncomingMessage to server: 0.09941ms (min: 0.05630ms max: 4.54390ms)
Wrap req in a Proxy: 0.09806ms (min: 0.05300ms max: 4.85250ms)
Modify ~1/3 of incoming requests: 0.09572ms (min: 0.04830ms max: 5.10550ms)
(Express) Actual express app: 0.12680ms (min: 0.06060ms max: 9.85180ms)
(Restify) Restify app: 2.03600ms (min: 1.27950ms max: 13.47500ms)

> node-http-benchmarks@1.0.0 node11 ./node-http-benchmarks
> docker run -it --rm -v $(PWD):/usr/src/app -w /usr/src/app node:11 npm t


> node-http-benchmarks@1.0.0 test /usr/src/app
> standard && node --version && node index.js

v11.2.0
(BASELINE) Node core http server: 0.09004ms (min: 0.04770ms max: 5.02600ms)
(Express like) Replace prototype: 0.09083ms (min: 0.04550ms max: 4.16540ms)
(Restify like) Modify prototype at startup: 0.08954ms (min: 0.04620ms max: 6.16260ms)
Wrap whole request: 0.09199ms (min: 0.04390ms max: 6.11110ms)
Provide IncomingMessage to server: 0.08779ms (min: 0.04750ms max: 5.56100ms)
Wrap req in a Proxy: 0.09072ms (min: 0.04520ms max: 5.18960ms)
Modify ~1/3 of incoming requests: 0.09428ms (min: 0.05140ms max: 5.22490ms)
(Express) Actual express app: 0.11238ms (min: 0.05540ms max: 8.95920ms)
(Restify) Restify app: 1.44596ms (min: 0.80190ms max: 11.16940ms)
```

## Why?

I was hoping to find a "best way" for some upcoming changes we need to make in Express.  I think in the
past there was a larger difference in the performance of these approaches, which is why I originally
wrote this.  So I guess unless I am doing something very wrong here we can choose any of these approaches
without serious performance degradations.
