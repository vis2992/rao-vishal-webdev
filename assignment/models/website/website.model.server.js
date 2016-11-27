/**
 * Created by vishalrao on 11/8/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    var model = {};

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        setModel: setModel,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        findAllPagesForWebsite : findAllPagesForWebsite,
        removePageFromWebsite : removePageFromWebsite
    };
    return api;

    function createWebsite(userId ,website) {
        return WebsiteModel.create(website)
            .then(function (websiteObj) {
                return model.userModel
                    .findUserById(userId)
                    .then(function (userObj) {
                            userObj.websites.push(websiteObj);
                            websiteObj._user = userObj._id;
                            websiteObj.save();
                            return userObj.save();
                        },
                        function (error) {
                            console.log(error);
                        }
                    );
            });
    }

    function findAllWebsitesForUser(userId) {
        return model.userModel.findAllWebsitesForUser(userId);

    }

    function setModel(_model) {
        model = _model;
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel.update(
            {
                _id: websiteId
            },
            {
                name: website.name,
                description: website.description
            }
        );

    }

    function deleteWebsite(websiteId) {
        return WebsiteModel
            .findById(websiteId)
            .then(function (websiteObj) {
                var userId = websiteObj._user;
                return model.userModel
                    .removeWebsiteFromUser(userId, websiteId)
                    .then(function () {
                        return WebsiteModel.remove({
                            _id: websiteId
                        });
                    });
            });

    }

    function findAllPagesForWebsite(websiteId){
        return WebsiteModel.findById(websiteId)
            .populate("pages")
            .exec();
    }

    function removePageFromWebsite(websiteId, pageId) {
        return WebsiteModel.findById(websiteId)
            .then(function (websiteObj) {
                var pages = websiteObj.pages;
                var pagesLength = pages.length;
                for(var i = 0; i < pagesLength; i++)
                {
                    if(pages[i] == pageId)
                        pages.splice(i,1);
                }
                websiteObj.pages = pages;
                return websiteObj.save();
            });

    }
};