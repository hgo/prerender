var minify = require('html-minifier').minify;

module.exports = {
    afterPhantomRequest: function (req, res, next) {

        if (req.prerender.statusCode === 200) {
          req.prerender.documentHTML = minify(req.prerender.documentHTML,{
            collapseWhitespace:true,
            conservativeCollapse:true,
            minifyCSS:true,
            removeComments:true
          });
        }
        next();
    }
};
