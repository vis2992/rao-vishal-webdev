/**
 * Created by vishalrao on 10/18/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("EditWidgetController", EditWidgetController)
        .controller("NewWidgetController", NewWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm =  this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
                .error(function (error) {
                    console.log(error);
                });
        }
        init();

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function checkSafeHtml(widget)
        {
            return $sce.trustAsHtml(widget.text);
        }

        function checkSafeYouTubeUrl(url) {
            if(url === undefined)
                return;
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function EditWidgetController($routeParams, WidgetService, $sce, $location) {
        var vm =  this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.updateCurrentWidget = updateCurrentWidget;
        vm.deleteCurrentWidget = deleteCurrentWidget;

        function updateCurrentWidget() {
            WidgetService
                .updateWidget(vm.wgid, vm.widget)
                .success(function (status) {
                    if(status == '0') {
                        vm.error = "widget update error";
                    }
                    else {
                        $location.url("/user/"+vm.userId + "/website/" + vm.websiteId + "/page/"+vm.pageId+"/widget");
                    }

                })
                .error(function (error) {
                    console.log(error);

                });
        }

        function deleteCurrentWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .success(function () {
                    $location.url("/user/"+vm.userId + "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error(function (error) {
                    console.log(error);
                });
        }

        function init() {
            WidgetService
                .findWidgetById(vm.wgid)
                .success(function (widget) {
                    vm.widget = widget;
                })
                .error(function (error) {
                    console.log(error);
                });
        }
        init();

    }

    function NewWidgetController($routeParams, WidgetService, $location){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            if(widgetType === "HEADER" || widgetType === "IMAGE" || widgetType === "HTML" || widgetType === "YOUTUBE") {
                var widget = {};
                widget.widgetType = widgetType;
                WidgetService
                    .createWidget(vm.pageId, widget)
                    .success(function (newWgid) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWgid);
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            }
            else {
                vm.error = "incompatible widget type";
            }
        }


    }

})();