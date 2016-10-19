/**
 * Created by vishalrao on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("EditPageController", EditPageController)
        .controller("NewPageController", NewPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.websiteId = parseInt($routeParams['wid']);
        vm.userId = parseInt($routeParams['uid']);

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId.toString());
        }
        init();
    }

    function EditPageController($routeParams, WebsiteService) {
        var vm = this;
        var pageId = parseInt($routeParams.pid);

        function init() {
            vm.page = WebsiteService.findPageById(pageId.toString());
        }
        init();
    }

    function NewPageController(){
        var vm = this;
    }
})();