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
                    vm.widgets = widgets.widgets;
                })
                .error(function (error) {
                    console.log(error);
                });
        }
        init();

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function checkSafeHtml(html)
        {
            return $sce.trustAsHtml(html);
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
        vm.headerHandler = headerHandler;
        vm.imageHandler = imageHandler;
        vm.youtubeHandler = youtubeHandler;
        vm.deleteWidget = deleteWidget;
        vm.HTMLHandler = HTMLHandler;
        vm.textHandler = textHandler;

        function headerHandler() {
            var widget = {name:vm.widget.name, widgetType: "HEADER", size: vm.widget.size, text: vm.widget.text };
            if(vm.widget.name === "")
            {
                Materialize.toast('Please Enter a Widget Name', 1000,'');
            }
            else {
                widgetUpdate(widget);
            }
        }

        function imageHandler() {
            var widget = {name:vm.widget.name, widgetType: "IMAGE", text: vm.widget.text, width: vm.widget.width, url: vm.widget.url };
            if(vm.widget.name === "")
            {
                Materialize.toast('Please Enter a Widget Name', 1000,'');
            }
            else {
                widgetUpdate(widget);
            }
        }

        function youtubeHandler() {
            var widget = {name:vm.widget.name, widgetType: "YOUTUBE", width: vm.widget.width, url: vm.widget.url };
            if(vm.widget.name === "")
            {
                Materialize.toast('Please Enter a Widget Name', 1000,'');
            }
            else {
                widgetUpdate(widget);
            }
        }

        function HTMLHandler() {
            var widget = {name:vm.widget.name, widgetType: "HTML", size: vm.widget.size, text: vm.widget.text };
            if(vm.widget.name === "")
            {
                Materialize.toast('Please Enter a Widget Name', 1000,'');
            }
            else {
                widgetUpdate(widget);
            }
        }

        function textHandler() {
            var widget = {text:vm.widget.text, type: "TEXT", rows: vm.widget.rows, placeholder: vm.widget.placeholder,
                formatted: vm.widget.formatted };
            if(vm.widget.name === "")
            {
                Materialize.toast('Please Enter a Widget Name', 1000,'');
            }
            else {
                widgetUpdate(widget);
            }
        }

        function widgetUpdate(widget) {
            var promise = WidgetService.updateWidget(vm.wgid, widget);
            promise
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function (error) {
                    console.log("error " + error);
                });
        }

        function deleteWidget() {
            var promise = WidgetService.deleteWidget(vm.wgid);
            promise
                .success(function () {
                    Materialize.toast('Widget Deleted', 1000,'');
                    $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function (error) {
                    console.log("error " + error);
                });
        }

        function init() {
            var promise = WidgetService.findWidgetById(vm.wgid);
            promise
                .success(function (widget) {
                    vm.widget = widget;
                })
                .error(function (error) {
                    console.log("error " + error);
                });
        }
        init();

    }

    function NewWidgetController($routeParams, WidgetService, $location){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        // vm.createWidget = createWidget;

        vm.headerHandler = headerHandler;
        vm.imageHandler = imageHandler;
        vm.youtubeHandler = youtubeHandler;
        vm.HTMLHandler = HTMLHandler;
        vm.textHandler = textHandler;

        function headerHandler() {
            if(vm.widget === undefined || vm.widget.name === "")
            {
                Materialize.toast('Please Enter a Widget Name', 1000,'');
            }
            else {
                var widget = { name:vm.widget.name, widgetType: "HEADER", size: vm.widget.size, text: vm.widget.text };
                widgetCreate(widget);
            }
        }

        function imageHandler() {
            var widget = {name:vm.widget.name, widgetType: "IMAGE", text: vm.widget.text, width: vm.widget.width, url: vm.widget.url };
            if(vm.widget === undefined || vm.widget.name === "")
            {
                Materialize.toast('Please Enter a Widget Name', 1000,'');
            }
            else {
                widgetCreate(widget);
            }
        }

        function youtubeHandler() {
            var widget = {name:vm.widget.name, widgetType: "YOUTUBE", width: vm.widget.width, url: vm.widget.url };
            if(vm.widget === undefined || vm.widget.name === "")
            {
                Materialize.toast('Please Enter a Widget Name', 1000,'');
            }
            else {
                widgetCreate(widget);
            }
        }

        function HTMLHandler() {
            var widget = { name:vm.widget.name, widgetType: "HTML", size: vm.widget.size, text: vm.widget.text };
            widgetCreate(widget);
        }

        function textHandler() {
            var widget = {text:vm.widget.text, widgetType: "TEXT", rows: vm.widget.rows, placeholder: vm.widget.placeholder,
                formatted: vm.widget.formatted };
            widgetCreate(widget);

        }

        function widgetCreate(widget) {
            var promise = WidgetService.createWidget(vm.pageId, widget);
            promise
                .success(function () {
                    Materialize.toast('Widget created!', 1000,'');
                        $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function (error) {
                    console.log("error " + error);
                });
        }
    }

})();