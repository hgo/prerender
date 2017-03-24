#!/usr/bin/env node

var critical = require('critical');
var jsonfile = require('jsonfile');
var file = require('fs').readFileSync('/Users/guvenozyurt/Desktop/asd/before.html','utf-8');
// var json = jsonfile.readFileSync(file);
// console.log(json.content);

function gen(cb) {
    critical.generate({
        // Inline the generated critical-path CSS
        // - true generates HTML
        // - false generates CSS
        // extract: true,
        inline: true,
        // base: './critical_css',
        // HTML source file
        // src: ['index.html','blog/index.html','typography/index.html'],
        // src: 'index.html',
        src: '/Users/guvenozyurt/Desktop/asd/before.html',
        // styleTarget: 'styles/main.css',
        // Your CSS Files (optional)
        // css: 'app.css',
        // htmlTarget: 'index.html',
        // Viewport width
        width: 414,
        // Viewport height
        height: 736,
        // Target for final HTML output.
        // use some css file when the inline option is not set
        dest: '../before-critical/custom.critical.html',
        // ignore css rules
        ignore: ['@font-face']
    }, cb);
}

gen();
