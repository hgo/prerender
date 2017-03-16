#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
    workers: process.env.PRERENDER_NUM_WORKERS,
    iterations: process.env.PRERENDER_NUM_ITERATIONS
});



// server.use(prerender.mobileUserAgent());
server.use(prerender.sendPrerenderHeader());
// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
 server.use(prerender.logger());
//server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
server.use(prerender.removeNgTransclude());
server.use(require('prerender-redis-cache'));


// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());

server.start();
