var express = require('express');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

var app = express();


app.use(cookieParser());
app.use(session({ secret: "secret",
                resave: true,
                saveUninitialized: true}));


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());

// require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./assignment/app.js")(app);

app.listen(port, ipaddress);
