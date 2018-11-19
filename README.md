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
(BASELINE) Node core http server: 0.10881ms
(Express) Replace prototype: 0.11183ms
(Restify) Modify prototype at startup: 0.11254ms
Wrap whole request: 0.11616ms
Modify ~1/3 of incoming requests: 0.11355ms

> node-http-benchmarks@1.0.0 node6 ./node-http-benchmarks
> docker run -it --rm -v $(PWD):/usr/src/app -w /usr/src/app node:6 npm t


> node-http-benchmarks@1.0.0 test /usr/src/app
> standard && node --version && node index.js

v6.14.4
(BASELINE) Node core http server: 0.10234ms
(Express) Replace prototype: 0.10729ms
(Restify) Modify prototype at startup: 0.10125ms
Wrap whole request: 0.10580ms
Modify ~1/3 of incoming requests: 0.10323ms

> node-http-benchmarks@1.0.0 node9 ./node-http-benchmarks
> docker run -it --rm -v $(PWD):/usr/src/app -w /usr/src/app node:9 npm t


> node-http-benchmarks@1.0.0 test /usr/src/app
> standard && node --version && node index.js

v9.11.2
(BASELINE) Node core http server: 0.09574ms
(Express) Replace prototype: 0.10025ms
(Restify) Modify prototype at startup: 0.09850ms
Wrap whole request: 0.09838ms
Provide IncomingMessage to server: 0.09763ms
Modify ~1/3 of incoming requests: 0.10016ms

> node-http-benchmarks@1.0.0 node11 ./node-http-benchmarks
> docker run -it --rm -v $(PWD):/usr/src/app -w /usr/src/app node:11 npm t


> node-http-benchmarks@1.0.0 test /usr/src/app
> standard && node --version && node index.js

v11.2.0
(BASELINE) Node core http server: 0.09022ms
(Express) Replace prototype: 0.08919ms
(Restify) Modify prototype at startup: 0.09181ms
Wrap whole request: 0.09188ms
Provide IncomingMessage to server: 0.09063ms
Modify ~1/3 of incoming requests: 0.09061ms
```

## Why?

I was hoping to find a "best way" for some upcoming changes we need to make in Express.  I think in the
past there was a larger difference in the performance of these approaches, which is why I originally
wrote this.  So I guess unless I am doing something very wrong here we can choose any of these approaches
without serious performance degradations.
