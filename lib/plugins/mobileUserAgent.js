var useragent = require('express-useragent');

module.exports = {
    init: function() {
        this.mobileUserAgent = (process.env.MOBILE_USER_AGENT) || 'iPhone';
    },

    beforePhantomRequest: function(req, res, next) {
        source = req.headers['user-agent'];
        this.ua = useragent.parse(source);
        next();
    },

    onPhantomPageCreate: function(phantom, req, res, next) {
        console.info('isMobile: ', this.ua,this.ua.isMobile);
        if (this.ua.isMobile) {
            var _this = this;
            req.prerender.page.run(_this.mobileUserAgent, function(mobileUserAgent, resolve) {
                this.settings.userAgent = this.settings.userAgent + ' ' + mobileUserAgent;
                resolve();
            }).then(function() {
                next();
            }).catch(function() {
                next();
            });
        } else {
            next();
        }
    }

}
