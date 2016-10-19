/**
 * Created by vishalrao on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if(user === null) {
                vm.error = "No such user";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;

        var userId = parseInt($routeParams.uid);

        var user = UserService.findUserById(userId + "");

        if(user != null) {
            vm.user = user;
        }
    }

    function RegisterController(UserService){
        var vm = this;

    }
})();