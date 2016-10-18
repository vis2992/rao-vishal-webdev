(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
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