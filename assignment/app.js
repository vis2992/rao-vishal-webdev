/**
 * Created by vishalrao on 11/1/16.
 */
module.exports = function(app) {
    var model = require("./models/models.server")();
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};

