/**
 * Created by vishalrao on 11/1/16.
 */
/**
 * Created by vishalrao on 11/1/16.
 */
module.exports = function(app, model) {

    // var pages = [
    //     { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
    //     { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
    //     { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }
    // ];

    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res){
        var websiteId = req.params.websiteId;
        var page = req.body;
        model
            .pageModel
            .createPage(websiteId, page)
            .then(
                function (page) {
                    if(page) {
                        res.send(page);
                    }
                    else {
                        res.send('0');
                    }

                },
                function (error) {
                    res.sendStatus(400).send(error);

                }

            );
    }

    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;
        model
            .pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    if(pages) {
                        res.send(pages);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findPageById(req, res){
        var pageId = req.params.pageId;
        model
            .pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    if(page) {
                        res.send(page);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updatePage(req, res){
        var pageId = req.params.pageId;
        var page = req.body;
        model
            .pageModel
            .updatePage(pageId, page)
            .then(
                function (page) {
                    if(page) {
                        res.send(page);
                    }
                    else {
                        res.send('0');
                    }

                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deletePage(req, res){
        var pageId = req.params.pageId;
        model
            .pageModel
            .deletePage(pageId)
            .then(
                function (status) {
                    res.send(200);

                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

};