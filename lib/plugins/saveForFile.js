var uuid = require('node-uuid');
var jsonfile = require('jsonfile');
module.exports = {
    afterPhantomRequest: function (req, res, next) {

        if (req.prerender.statusCode === 200) {
          var id = uuid.v4();
          var name = id + '.json';
          jsonfile.writeFileSync('./before-critical/'+name, {url:req.prerender.url, content:req.prerender.documentHTML});
          req.uuid = id;
        }
        next();
    }
};
