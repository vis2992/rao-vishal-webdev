/**
 * Created by vishalrao on 11/8/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/WebAppMaker');

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    websiteModel.setModel(model);
    userModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};