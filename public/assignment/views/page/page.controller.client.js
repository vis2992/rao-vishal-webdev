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
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.userId = userId;
        vm.websiteId = websiteId;

        var promise = PageService.findPageByWebsiteId(websiteId);
        promise
            .success(function (websitePages) {
                vm.pages = websitePages.pages;
            })
            .error(function (error) {
                console.log(error);
            });
    }

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deleteCurrentPage = deleteCurrentPage;
        vm.updateCurrentPage = updateCurrentPage;

        function init() {
            PageService.findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                })
        }
        init();

        function deleteCurrentPage() {
            PageService
                .deletePage(vm.pageId)
                .success(function (status) {
                    if(status == '0')
                    {
                        vm.error = "Unable to delete page";
                    }
                    else
                    {
                        $location.url("/user/"+vm.userId + "/website/"+vm.websiteId+"/page");
                    }
                })
                .error(function (error) {
                    console.log(error);
                })
        }

        function updateCurrentPage() {
            PageService
                .updatePage(vm.pageId, vm.page)
                .success(function (status) {
                    if(status == '0') {
                        vm.error = "Unable to update page";
                    }
                    else {
                        $location.url("/user/"+vm.userId + "/website/" + vm.websiteId + "/page");
                    }
                })
                .error(function (error) {
                    console.log(error);

                });
        }
    }

    function NewPageController($routeParams, PageService, $location){
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.createPage = createPage;


        function init() {

            PageService
                .findPageByWebsiteId(websiteId)
                .success(function (websitePages) {
                    vm.websitePages = websitePages;
                })
                .error(function (error) {
                    console.log(error);
                });
        }
        init();

        function createPage()
        {
            if(vm.page === undefined)
            {
                vm.error = "A page name is required";
                return;
            }

            PageService
                .createPage(vm.websiteId, vm.page)
                .success(function (status) {
                    if(status == '0') {
                        vm.error = "Page already exists!";
                    }
                    else {
                        $location.url("/user/"+userId + "/website/" + websiteId + "/page");
                    }

                })
                .error(function (error) {
                    console.log(error);
                });
        }
    }
})();