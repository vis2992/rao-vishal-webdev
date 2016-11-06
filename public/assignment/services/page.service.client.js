/**
 * Created by vishalrao on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page) {
            var url = "/api/website/:websiteId/page";
            return http.post(url, page);
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/"+websiteId+"/page";
            http.get(url);
        }

        function findPageById(pageId) {
            var url = "/api/page/"+pageId;
            http.get(url);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/"+pageId;
            http.put(url, page);
        }

        function deletePage(pageId) {
            var url = "/api/page/"+pageId;
            http.delete(url);
        }

    }
})();