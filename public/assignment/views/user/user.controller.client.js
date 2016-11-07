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
            if(username === undefined || password === undefined)
            {
                vm.error = "Enter Username and Password";
                return;
            }
            var promise = UserService.findUserByCredentials(username,password);
            promise
                .success(function(user){
                    if(user === '0')
                        vm.error = "No such user or the username,password does not match";
                    else
                        $location.url("user/" + user._id);
                })
                .error(function (error) {
                    console.log(error);
                });
        }
    }

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;

        var userId = parseInt($routeParams.uid);

        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;

        function init() {
            UserService
                .findUserById(userId)
                .success(function(user){
                    console.log(user);
                    if(user != '0') {
                        vm.user = user;
                        console.log(user);
                    }
                })
                .error(function(){

                });
        }
        init();

        function updateUser() {
            UserService.updateUser(vm.user);
        }

        function unregisterUser() {
            UserService
                .unregisterUser(vm.user._id)
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){

                });
        }
    }

    function RegisterController(UserService, $location){
        var vm = this;
        vm.register = register;

        function register(user)
        {
            if(user === undefined)
            {
                vm.error = "All required fields need to be filled!";
            }
            else if(user.username === undefined || user.username === null)
                vm.error = "Username missing!";
            else if(user.password === undefined || user.password === null)
                vm.error = "Password missing!";

            else if(user.password != user.confirmPassword)
            {
                vm.error = "Passwords do not match!";
            }

            UserService
                .createUser(user)
                .success(function(userObj){
                    var userId = userObj._id;
                    $location.url('/user/'+userId);
                })
                .error(function (error) {
                    vm.error = "Please choose a different username, this username already exists!"
                });
        }

    }
})();