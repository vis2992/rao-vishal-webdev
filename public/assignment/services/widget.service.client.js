(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            findWidgetById: findWidgetById,
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(widget){
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            var result = [];
            for(var wg in widgets) {
                if(widgets[wg].pageId === pageId) {
                    result.push(widgets[wg]);
                }
            }
            return result;
        }

        function updateWidget(widgetId, widget){
            for(var wg in widgets) {
                if (widgets[wg]._id === widgetId) {
                    widgets[wg] = widget;
                }
            }
        }

        function deleteWidget(widgetId) {
            widgets.forEach(function (result, index) {
                if (result["_id"] === widgetId) {
                    widgets.splice(index, 1);
                }
            });
        }

        function findWidgetById(wid) {
            for(var w in widgets) {
                if(widgets[w]._id == wid) {
                    return widgets[w];
                }
            }
            return null;
        }
    }
})();