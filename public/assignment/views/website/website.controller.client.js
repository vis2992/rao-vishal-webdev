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
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var promise = WebsiteService.findWebsitesForUser(userId);
        promise
            .success(function (websites) {
                vm.websites = websites;
                console.log(vm.websites);

            })
            .error(function (error) {
                console.log(error);
            });
    }

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteCurrentWebsite = deleteCurrentWebsite;
        vm.updateCurrentWebsite = updateCurrentWebsite;


        function init() {

            // WebsiteService
            //     .findWebsitesForUser(userId)
            //     .success(function (userWebsites) {
            //         vm.userWebsites = userWebsites;
            //         for(var i in userWebsites)
            //         {
            //             if(websiteId === userWebsites[i]._id)
            //             {
            //                 vm.website =  userWebsites[i];
            //                 break;
            //             }
            //         }
            //     })
            //     .error(function (error) {
            //         console.log(error);
            //     })
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function(website){
                    vm.website = website;
                })
        }
        init();

        function deleteCurrentWebsite(websiteId)
        {
            WebsiteService
                .removeWebsite(websiteId)
                .success(function () {
                    $location.url("/user/"+vm.userId + "/website/");
                })
                .error(function (error) {
                    console.log(error);
                    vm.error = "Sorry! Could not delete the website";
                });
        }

        function updateCurrentWebsite()
        {
            WebsiteService
                .updateWebsite(vm.websiteId, vm.website)
                .success(function () {
                    $location.url("/user/"+vm.userId + "/website/");
                })
                .error(function (error) {
                    console.log(error);
                    vm.error = "Sorry! Could not update the website";
                })
        }
    }

    function NewWebsiteController($routeParams, WebsiteService){
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.userId = userId;
        vm.currentWebsiteId = websiteId;
        vm.createWebsite = createWebsite;

        function init() {
            var userId = $routeParams['uid'];
            vm.userId = userId;
            var promise = WebsiteService.findWebsitesForUser(userId);
            promise
                .success(function (websites) {
                    vm.userWebsites = websites;

                })
                .error(function (error) {
                    console.log(error);
                })
        }
        init();


        function createWebsite()
        {
            if(vm.website === undefined)
            {
                vm.error = "Please enter a Website Name";
                return;
            }

            WebsiteService
                .createWebsite(vm.userId, vm.website)
                .success(function () {
                    $location.url("/user/"+userId + "/website/");
                })
                .error(function (error) {
                    console.log(error);
                    vm.error = "Website with same name exists. Please choose a different name";
                });
        }
    }
})();