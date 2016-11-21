/**
 * Created by vishalrao on 11/8/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var PageModel = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref:'WidgetModel'}],
        dateCreated: {type: Date, default: Date.now}
    });
    return PageModel;
};