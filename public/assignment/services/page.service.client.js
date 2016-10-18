/**
 * Created by vishalrao on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function findUserById(userId) {
            for(var u in users) {
                user = users[u];
                if(user._id === userId) {
                    return user;
                }
            }
            return null;
        }

        function createUser(user){
            if( notempty(user._id) &&
                notempty(user.username) &&
                notempty(user.password) &&
                notempty(user.firstName) &&
                notempty(user.lastName)) {
                users.push(user);
            }
        }

        function notempty(val) {
            return !(val === null || val === undefined || val === "")
        }

        function findUserByUsername(username){
            for(var u in users) {
                user = users[u];
                if(user.username === username) {
                    return user;
                }
            }
        }

        function updateUser(userId, user){
            for(var u in users) {
                User = users[u];
                if(User._id === userId){
                    User.username = user.username;
                    User.firstName = user.firstName;
                    User.lastName = user.lastName;
                    User.password = user.password;
                }
            }
        }

        function deleteUser(userId) {
            users.forEach(function (result, index) {
                if (result["_id"] === userId) {
                    users.splice(index, 1);
                }
            });
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                user = users[u];
                if(    user.username === username
                    && user.password === password) {
                    return user;
                }
            }
            return null;
        }
    }
})();