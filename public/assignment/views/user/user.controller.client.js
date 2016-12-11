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

        function login(user) {
            UserService
                .login(user)
                .then(
                    function(response) {
                        var user = response.data;
                        $location.url("/user/"+user._id);
                    });
            // if(username === undefined || password === undefined)
            // {
            //     vm.error = "Enter Username and Password";
            //     return;
            // }
            // var promise = UserService.findUserByCredentials(username,password);
            // promise
            //     .success(function(user){
            //         if(user === '0')
            //             vm.error = "No such user or the username,password does not match";
            //         else
            //             $location.url("user/" + user._id);
            //     })
            //     .error(function (error) {
            //         console.log(error);
            //     });
        }
    }

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;

        var userId = $routeParams.uid;

        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;

        function logout(){
            UserService
                .logout()
                .success(function(){
                    $location.url("/login");
                })
        }


        function init() {
            UserService
                .findCurrentUser(userId)
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

        function register(username, password, confirmPassword)
        {
            UserService
                .register(user)
                .then(
                    function(response) {
                        var user = response.data;
                        $location.url("#/user/"+user._id);
                    });

            // if(username === undefined || username === null)
            //     vm.error = "Username missing!";
            // else if(password === undefined || password === null)
            //     vm.error = "Password missing!";
            //
            // else if(password != confirmPassword)
            // {
            //     vm.error = "Passwords do not match!";
            // }
            //
            // UserService
            //     .createUser(username, password)
            //     .success(function(userObj){
            //         var userId = userObj._id;
            //         $location.url('/user/'+userId);
            //     })
            //     .error(function (error) {
            //         vm.error = "Please choose a different username, this username already exists!"
            //     });
        }

    }
})();