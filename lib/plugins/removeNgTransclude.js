module.exports = {
    afterPhantomRequest: function(req, res, next) {
        if (!req.prerender.documentHTML) {
            return next();
        }

        var matches = req.prerender.documentHTML.toString().match(/ng-transclude="(?:.*?)"/gi);
        console.info('matches : ',matches);
        for (var i = 0; matches && i < matches.length; i++) {
            req.prerender.documentHTML = req.prerender.documentHTML.toString().replace(matches[i], '');
        }
        console.log('#################################');
        console.log(req.prerender.documentHTML);
        next();
    }
};
