/**
 * Created by vishalrao on 11/8/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetModel = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref:"PageModel"},
        type:  {type: String, enum: ['heading', 'image', 'youtube', 'html', 'text']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    });
    return WidgetModel;
};