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
        var vm  = this;
        vm.pageId = parseInt($routeParams['pid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.userId = parseInt($routeParams['uid']);
        vm.wgid = $routeParams.wgid;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.checkSafeImage = checkSafeImage;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId+"");
        }
        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeImage (url){
            return $sce.trustAsResourceUrl(url);
        }
    }

    function EditWidgetController($routeParams, WidgetService, $sce, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }
        init();

        vm.HeaderWidget = HeaderWidget;
        vm.ImageWidget = ImageWidget;
        vm.YoutubeWidget = YoutubeWidget;
        vm.deleteWidget = deleteWidget;

        function HeaderWidget() {
            WidgetService.updateWidget(vm.wgid, vm.widget);
            $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
        }

        function ImageWidget() {
            WidgetService.updateWidget(vm.wgid+"", vm.widget);
            $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
        }

        function YoutubeWidget() {
            WidgetService.updateWidget(vm.wgid+"", vm.widget);
            $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.wgid+"");
            $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
        }

    }

    function NewWidgetController($routeParams, WidgetService, $location){
        var vm = this;
        vm.pid = parseInt($routeParams['pid']);
        vm.wid = parseInt($routeParams['wid']);
        vm.uid = parseInt($routeParams['uid']);
        vm.HeaderWidget = HeaderWidget;
        vm.ImageWidget = ImageWidget;
        vm.YoutubeWidget = YoutubeWidget;
        vm.uniqueWidgetId = uniqueWidgetId;

        function uniqueWidgetId() {
            var id = Math.floor((Math.random() * 1000) + 1).toString();
            while(true){
                if(WidgetService.findWidgetById(id) === null)
                    break;
                else
                    id = Math.floor((Math.random() * 1000) + 1).toString();
            }
            return id;
        }


        function HeaderWidget() {

            var widget = {_id:uniqueWidgetId(), name:vm.widget.name, widgetType: "HEADER", size: vm.widget.size, text: vm.widget.text };
            WidgetService.createWidget(vm.pid+"", widget);
            $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
        }

        function ImageWidget() {

            var widget = {_id:uniqueWidgetId(), name:vm.widget.name, widgetType: "IMAGE", text: vm.widget.text, width: vm.widget.width, url: vm.widget.url };
            WidgetService.createWidget(vm.pid+"", widget);
            $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
        }

        function YoutubeWidget() {

            var widget = {_id:uniqueWidgetId(), name:vm.widget.name, widgetType: "YOUTUBE", width: vm.widget.width, url: vm.widget.url };
            WidgetService.createWidget(vm.pid+"", widget);
            $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
        }


    }

})();