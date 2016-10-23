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

    function EditPageController($routeParams, PageService) {
        var vm = this;
        vm.pageId = parseInt($routeParams['pid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.userId = parseInt($routeParams['uid']);



        function init() {
            vm.page = PageService.findPageById(pageId.toString());
        }
        init();

        vm.editPage = editPage;

        function editPage(name, description){
            vm.page.name = name;
            vm.page.description = description;
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        vm.deletePage = deletePage;

        function deletePage(){
            PageService.deletePage(pageId+"");
            $location.url("/user/"+vm.userId+"/website"+vm.websiteId+"/page");
        }
    }

    function NewPageController($routeParams, PageService){
        var vm = this;
        vm.websiteId = parseInt($routeParams['wid']);
        vm.userId = parseInt($routeParams['uid']);

        // function init() {
        //     vm.pages = PageService.findPageByWebsiteId(vm.websiteId.toString());
        // }
        // init();

        vm.newPage = newPage;
        function newPage(name, title) {
            var id = Math.floor((Math.random() * 100) + 1);
            while(true){
                if(PageService.findPageById(id+"") === null)
                    break;
                else
                    id = Math.floor((Math.random() * 100) + 1);
            }
            var new_page = {};
            new_page._id = id+"";
            new_page.name = name;
            new_page.description = title;
            PageService.createPage(vm.websiteId+"", new_page);
        }
    }
})();