/**
 * Created by vishalrao on 11/1/16.
 */
module.exports = function(app, model) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    // app.delete('/api/user/:uid', unregisterUser());
    app.get('/api/user', findUserByCredentials);
    app.get('/api/user', findUserByUsername);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.get('/api/checkLoggedin', checkLoggedin);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/assignment/index.html#/user', failureRedirect: '/assignment/index.html#/login'}));

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function checkLoggedin(req,res){
        res.send(req.isAuthenticated() ? req.user: '0');
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var displayName = profile.displayName.split(" ");
                        var newFacebookUser = {
                            username:  displayName[0],
                            firstName: displayName[0],
                            lastName:  displayName[1],
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model
            .userModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    passport.serializeUser(serializeUser);
    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);
    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    passport.use(new LocalStrategy(localStrategy));
    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    // function unregisterUser(req, res) {
    //     var uid = req.params.uid;
    //     model
    //         .userModel
    //         .removeUser(uid)
    //         .then(
    //             function (status) {
    //                 res.send(200);
    //             },
    //             function (error) {
    //                 res.sendStatus(400).send(error);
    //             }
    //
    //         );
    // }

    function updateUser(req, res) {
        var user =  req.body;
        var uid = req.params.uid;
        model
            .userModel
            .updateUser(uid, user)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function createUser(req, res) {
        var user = req.body;
        delete user.confirmPassword;
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser) {
                    res.send(newUser);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            findUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        } else {
            res.json(req.user);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user) {
                        res.send(user);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (users) {
                    if(users){
                        res.json(users[0]);
                    }
                    else{
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserById(req, res) {
        var userId =  req.params.uid;
        model
            .userModel
            .findUserById(userId)
            .then(
                function(user) {
                    if(user){
                        res.send(user);
                    }
                    else {
                        res.send('0');
                    }
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )
    }
};