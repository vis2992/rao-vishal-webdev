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

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        var websiteId = parseInt($routeParams.wid);
        vm.userId = parseInt($routeParams['uid']);

        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId+"");
            vm.websites = WebsiteService.findWebsitesForUser(vm.userId.toString());
        }
        init();

        vm.editWebsite = editWebsite;

        function editWebsite(){
            WebsiteService.updateWebsite(websiteId,vm.website);
            $location.url("/user/"+vm.userId+"/website");
        }

        vm.deleteWebsite = deleteWebsite;

        function deleteWebsite(){
            WebsiteService.deleteWebsite(websiteId+"");
            $location.url("/user/"+vm.userId+"/website");
        }
    }

    function NewWebsiteController($routeParams, WebsiteService){
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);

        // function init() {
        //     vm.websites = WebsiteService.findWebsitesForUser(vm.userId.toString());
        // }
        // init();

        vm.newWebsite = newWebsite;
        function newWebsite(name, description) {
            var id = Math.floor((Math.random() * 100) + 1);
            while(true){
                if(WebsiteService.findWebsiteById(id) === null)
                    break;
                else
                    id = Math.floor((Math.random() * 100) + 1);
            }
            var new_website = {};
            new_website._id = id+"";
            new_website.name = name;
            new_website.description = description;
            WebsiteService.createWebsite(vm.userId, new_website);
        }
    }
})();