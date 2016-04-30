const passport = require('passport');
const oneHour = 60000 * 60 * 2;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const logger = require('bigscreen-logger');
const HttpStatus = require('http-status-codes');
const Admin = require('../db/db').Admin;

var LocalStrategy = require('passport-local').Strategy;

function isAuthenticated(req, res, next) {
    if (req.user && req.user.id) {
        return next();
    }

    if(req.headers['accept'] && req.headers['accept'].indexOf('text/html') >= 0) {
        return res.redirect('/admin/login');
    }

    res.sendStatus(HttpStatus.UNAUTHORIZED);
}

function hasRole(role) {
    var roles = Array.isArray(role) ? role : [role];

    return function (req, res, next) {
        if (req.user && req.user.id && roles.indexOf(req.user.role) >= 0) {
            return next();
        }

        if(req.headers['accept'] && req.headers['accept'].indexOf('text/html') >= 0) {
            return res.redirect('/admin/login');
        }

        res.sendStatus(HttpStatus.FORBIDDEN);
    };
}

function setupPassport(app) {
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, callback) => Admin.User.findById(id, callback));
    passport.use(new LocalStrategy((username, password, done) => {
            Admin.User.findOne({email: username}, function (err, user) {
                if (err) {
                    logger.error(err);
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {message: 'Incorrect password.'});
                }
                return done(null, user);
            });
        }
    ));

    app.use(session({
        secret: 'keyboard cat',
        saveUninitialized: true,
        resave: true,
        cookie: {maxAge: oneHour},
        store: new MongoStore({
            mongooseConnection: Admin.connection
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}

exports.setupPassport = setupPassport;
exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;