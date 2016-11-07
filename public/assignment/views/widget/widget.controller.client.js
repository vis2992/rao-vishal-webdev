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

        vm.createHeader = createHeader;
        vm.createImage = createImage;
        vm.createYoutube = createYoutube;

        function createHeader() {
            var widget = { name:vm.widget.name, widgetType: "HEADER", size: vm.widget.size, text: vm.widget.text };
            widgetCreate(widget);
        }

        function createImage() {

            var widget = {name:vm.widget.name, widgetType: "IMAGE", text: vm.widget.text, width: vm.widget.width, url: vm.widget.url };
            widgetCreate(widget);
        }

        function createYoutube() {

            var widget = {name:vm.widget.name, widgetType: "YOUTUBE", width: vm.widget.width, url: vm.widget.url };
            widgetCreate(widget);
        }

        function widgetCreate(widget) {

            var promise = WidgetService.createWidget(vm.pageId+"", widget);
            promise
                .success(function (result) {
                    if(result === '1') {
                        $location.url("/user/" + vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }
                })
                .error(function (error) {
                    console.log("error " + error);
                });
        }


    }

})();