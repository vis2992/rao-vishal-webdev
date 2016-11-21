/**
 * Created by vishalrao on 11/8/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteModel = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref:'PageModel'}],
        dateCreated: {type: Date, default: Date.now}
    });
    return WebsiteModel;
};