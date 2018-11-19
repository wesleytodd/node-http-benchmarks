# Benchmark Extending Node HTTP Request object

This is a small set of benchmarks for different approaches to modifying the http request object.  It tests the way different
frameworks approach the problem and also tests the new way to provide your own `IncomingMessage` to the http server.

From what I can tell, there is no real difference in the performance of any of the approaches, but I suspect I am doing something wrong :)

```
$ npm t

> node-http-benchmarks@1.0.0 test ./node-http-benchmarks
> standard && npm start


> node-http-benchmarks@1.0.0 start ./node-http-benchmarks
> node index.js

(BASELINE) Node core http server: 0.03847ms
(Express) Replace prototype: 0.04198ms
Modify prototype at startup: 0.04329ms
Wrap req: 0.04355ms
Provide IncomingMessage to server: 0.03996ms
Modify ~1/3 of incoming requests: 0.03985ms

```
