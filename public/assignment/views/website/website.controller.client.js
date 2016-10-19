/**
 * Created by vishalrao on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("EditWebsiteController", EditWebsiteController)
        .controller("NewWebsiteController", NewWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);

        function init() {
            vm.websites = WebsiteService.findWebsitesForUser(vm.userId.toString());
        }
        init();
    }

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        var websiteId = parseInt($routeParams.wid);

        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId+"");
        }
        init();
    }

    function NewWebsiteController(){
        var vm = this;
    }
})();