/**
 * Created by vishalrao on 11/1/16.
 */
/**
 * Created by vishalrao on 11/1/16.
 */
/**
 * Created by vishalrao on 11/1/16.
 */
module.exports = function(app) {

    var widgets = [
        { _id: "123", widgetType: "HEADER", pageId: "321", size: 2, text: "GIZMODO"},
        { _id: "234", widgetType: "HEADER", pageId: "321", size: 4, text: "Lorem ipsum"},
        { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%", url: "http://lorempixel.com/400/200/"},
        { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
        { _id: "567", widgetType: "HEADER", pageId: "321", size: 4, text: "Lorem ipsum"},
        { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%", url: "https://youtu.be/AM2Ivdi9c4E" },
        { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
    ];

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req, res){
        var widget = req.body;
        widgets.push(widget);
        res.send(widgets);
    }

    function findAllWidgetsForPage(req, res){
        var pid = req.params.pageId;
        var result = [];
        for(var wg in widgets){
            if(widgets[wg]._id == pid){
                result.push(widgets[wg]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req, res){
        var wgid = req.params.wgid;
        for(var wg in widgets){
            if(widgets[wg]._id == wgid){
                res.send(widgets[p]);
            }
        }
    }

    function updateWidget(req, res){
        var widget = req.body;
        var wgid = req.params.wgid;
        for(var wg in widgets){
            if(widgets[wg]._id == wgid){
                widgets[wg] = widget;
            }
        }
        res.send(200);
    }

    function deleteWidget(req, res){
        var wgid = req.params.wgid;
        for(var wg in widgets){
            if(widgets[wg]._id == wgid){
                widgets.splice(wg, 1);
            }
        }
        res.send(200);
    }

};