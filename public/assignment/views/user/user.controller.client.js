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

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;


        vm.userId = parseInt($routeParams.uid);

        var user = UserService.findUserById(vm.userId + "");
        console.log(user);
        if(user != null) {
            vm.user = user;
        }

        vm.ChangeUserData = ChangeUserData;

        function ChangeUserData(firstName, lastName, username){
            vm.user.firstName = firstName;
            vm.user.lastName = lastName;
            vm.user.username = username;
            $location.url("/user/"+vm.userId);
        }
    }

    function RegisterController(UserService, $location){
        var vm = this;
        vm.Register = Register;
        function Register(username, password){
            var id = Math.floor((Math.random() * 100) + 1);
            while(true){
                if(UserService.findUserById(id) === null)
                    break;
                else
                    id = Math.floor((Math.random() * 100) + 1);
            }
            var new_user = {_id: id+"", username: username, password: password, firstName: " ", lastName: " "};
            vm.userId = id;
            vm.user = new_user;
            UserService.createUser(new_user);
            $location.url("/user/" + new_user._id);
        }

    }
})();