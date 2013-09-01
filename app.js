#!/usr/bin/env node

var express = require('express');
var app = express();

// Templating engine
var swig = require('swig');

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// MySQL
var mysql = require('mysql');
var db = require('./cfg/db');
var connection = mysql.createConnection(db);

var PostProvider = require('./lib/postprovider');
var postProvider = new PostProvider(connection);

var users = require('./cfg/users');
var UserProvider = require('./lib/usersprovider');
var userProvider = new UserProvider(users)

var InfoboxProvider = require('./lib/infoboxprovider');
var infoboxProvider = new InfoboxProvider(connection);

// Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Register
express.request.postProvider = express.response.postProvider = postProvider;
express.request.userProvider = express.response.userProvider = userProvider;
express.request.infoboxProvider = express.response.infoboxProvider = infoboxProvider;

// TODO: Move into own file
passport.use(new LocalStrategy(
    function(username, password, done) {
        process.nextTick(function () {
            userProvider.findUserByName(username, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, { message: 'Unknown user ' + username });
                }

                if (user.password != password) {
                    return done(null, false, { message: 'Invalid password' });
                }

                return done(null, user);
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    userProvider.findUserById(id, function(err, user) {
        done(err, user);
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); 
    } else {
        res.redirect('/admin/login');
    }
}


// Middleware
app.configure(function() {
    app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'john mayer' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(__dirname + "/public"));
});

/// Route includes
var main = require('./routes/main');
var post = require('./routes/post');

var admin = require('./routes/admin');

// Routes
app.get('/', 
        function (req, res, next) {
            postProvider.countPosts(function(count) {
                postProvider.getPosts(count, function(rows) {
                    req.posts = rows;
                    next();
                });
            });
        },
        main);

app.get('/post/:id(\\d+)',
        function (req, res, next) {
            var id = req.params.id;
            postProvider.getPostById(id, function(row) {
                req.post = row;
                next();
            });
        },
        post);

app.get('/admin', ensureAuthenticated, admin.index);
app.get('/admin/post', ensureAuthenticated, admin.post.get);
app.post('/admin/post', ensureAuthenticated, admin.post.post);

app.get('/admin/login', admin.login);
app.post('/admin/login',
    passport.authenticate('local', { 
        failureRedirect: '/admin/login',
        successRedirect: '/admin'
    }));



// Port
app.listen(80);
