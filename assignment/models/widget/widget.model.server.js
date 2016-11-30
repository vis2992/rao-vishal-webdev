/**
 * Created by vishalrao on 11/8/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel : setModel

    };


    return api;

    function setModel(_model) {
        model = _model;

    }

    function createWidget(pageId, widget) {
        console.log("widget:"+widget.widgetType);
        return WidgetModel.create(widget)
            .then(function (widgetObj) {
                return model.pageModel
                    .findPageById(pageId)
                    .then(function (pageObj) {
                        return findAllWidgetsForPage(pageId)
                            .then(function () {
                                pageObj.widgets.push(widgetObj._id);
                                pageObj.save();
                                widgetObj._page = pageObj._id;
                                widgetObj.type = widget.widgetType;
                                return widgetObj.save();
                            })

                    })

            })

    }

    function findAllWidgetsForPage(pageId) {
        return model.pageModel.findAllWidgetsForPage(pageId);

    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {

        var widgetType = widget.widgetType;
        if(widgetType === "HEADER")
        {
            return WidgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        size: widget.size
                    }
                )
        }
        else if(widgetType === "HTML")
        {
            return WidgetModel.update(
                {
                    _id: widgetId
                },
                {
                    text: widget.text
                }
            )
        }
        else if(widgetType === "IMAGE")
        {
            return WidgetModel.update(
                {
                    _id: widgetId
                },
                {
                    name: widget.name,
                    text: widget.text,
                    url: widget.url,
                    width: widget.width
                }
            )
        }
        else
        {
            return WidgetModel.update(
                {
                    _id: widgetId
                },
                {
                    name: widget.name,
                    text: widget.text,
                    url: widget.url,
                    width: widget.width
                }
            )
        }
    }

    function deleteWidget(widgetId) {
        return WidgetModel.findById(widgetId)
            .then(function (widgetObj) {
                var pageId = widgetObj._page;
                return model
                    .pageModel
                    .removeWidgetFromPage(pageId, widgetId)
                    .then(function () {
                        return WidgetModel.remove({_id: widgetId});
                    })
            })
    }

    function reorderWidget(start, end, pageId) {
        return WidgetModel.find({_page: pageId},
            function (err, widgets) {

                widgets.forEach(function (widget) {

                    if(start < end)
                    {
                        if (widget.order == start)
                            widget.order = end;
                        else if (widget.order > start && widget.order <= end)
                            widget.order = widget.order - 1;

                        widget.save();
                    }
                    else
                    {
                        if(widget.order < start && widget.order >= end)
                            widget. order = widget.order + 1;
                        else if(widget.order == start)
                        {
                            widget.order = end;
                        }
                        widget.save();
                    }

                });
            });

    }


};