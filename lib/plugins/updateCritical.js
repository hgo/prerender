var jsonfile = require('jsonfile');
var critical = require('critical');
var jsonfile = require('jsonfile');
var fs = require('fs');
//
// var json = jsonfile.readFileSync(file);
// console.log(json.content);
//
function gen(json,uuid) {
    critical.generate({
        // Inline the generated critical-path CSS
        // - true generates HTML
        // - false generates CSS
        // extract: true,
        inline: true,
        base: './critical_css',
        // HTML source file
        // src: ['index.html','blog/index.html','typography/index.html'],
        // src: 'index.html',
        html: json.content,
        // styleTarget: 'styles/main.css',
        // Your CSS Files (optional)
        // htmlTarget: 'index.html',
        // Viewport width
        width: 320,
        // Viewport height
        height: 640,
        // Target for final HTML output.
        // use some css file when the inline option is not set
        dest: '../before-critical/'+uuid+'.html'
        // ,
        // ignore css rules
        // ignore: ['@font-face'],
        // timeout: 30000,
        // extract:true
    });
}

module.exports = {
    afterPhantomRequest: function (req, res, next) {
        console.log(req.uuid);
        fs.writeFileSync('/Users/guvenozyurt/Desktop/asd/before.html',req.prerender.documentHTML,'utf-8');
        var json = jsonfile.readFileSync('./before-critical/'+req.uuid+'.json');

        gen(json,req.uuid);

        function checkFlag() {
          if (!fs.existsSync('./before-critical/'+req.uuid+'.html')) {
                 setTimeout(checkFlag, 100);
          } else {
              req.prerender.documentHTML = fs.readFileSync('./before-critical/'+req.uuid+'.html', "utf8");
              fs.writeFileSync('/Users/guvenozyurt/Desktop/asd/after.html',req.prerender.documentHTML,'utf-8');
              // req.prerender.documentHTML = json.content;
              next();
            }
        }
        checkFlag();
    }
};
