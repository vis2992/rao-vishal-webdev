(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            removeWebsite: removeWebsite
        };
        return api;

        function createWebsite(userId, website){
            var url = "/api/user/" + userId + "/website";
            website.developerId = userId;
            return $http.post(url, website);
        }

        function updateWebsite(websiteId,website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }

        function removeWebsite(wid) {
            var url = "/api/website/" + wid;
            return $http.delete(url);
        }

        function findWebsiteById(wid) {
            var url = "/api/website/" + wid;
            return $http.get(url);
        }

        function findWebsitesForUser(uid) {
            var url = "/api/user/"+ uid +"/website";
            return $http.get(url);
        }
    }
})();