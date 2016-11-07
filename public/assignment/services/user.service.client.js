(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser: createUser,
            updateUser: updateUser,
            unregisterUser: unregisterUser
        };
        return api;

        function unregisterUser(uid) {
            var url = "/api/user/" + uid;
            return $http.delete(url);
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function createUser(username, password){
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/user", user);
        }

        function updateUser(user){
            var url = "/api/user/" + user._id;
            $http.put(url, user);
        }


        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }
    }
})();