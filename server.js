#!/usr/bin/env node

var prerender = require('./lib');
var fs = require('fs');

var server = prerender({
    workers: process.env.PRERENDER_NUM_WORKERS,
    iterations: process.env.PRERENDER_NUM_ITERATIONS
});


// var rmDir = function(dirPath, removeSelf) {
//     var files = [];
//     if (removeSelf === undefined)
//         removeSelf = true;
//     try {
//         files = fs.readdirSync(dirPath);
//     } catch (e) {
//         return;
//     }
//     if (files.length > 0)
//         for (var i = 0; i < files.length; i++) {
//             var filePath = dirPath + '/' + files[i];
//             if (fs.statSync(filePath).isFile())
//                 fs.unlinkSync(filePath);
//             else
//                 rmDir(filePath);
//         }
//     if (removeSelf)
//         fs.rmdirSync(dirPath);
// };
// rmDir('./before-critical', false);

// server.use(prerender.mobileUserAgent());
server.use(prerender.sendPrerenderHeader());
server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
server.use(prerender.logger());
//server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
server.use(prerender.removeNgTransclude());
// server.use(prerender.saveForFile());
// server.use(prerender.updateCritical());
server.use(prerender.minify());
server.use(require('prerender-redis-cache'));


// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());

server.start();
