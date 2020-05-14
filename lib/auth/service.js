const crypto = require('crypto');
const logger = require('bigscreen-logger');
const HttpStatus = require('http-status-codes');
const Admin = require('../db/db').Admin;
const jwt = require('jsonwebtoken');
const superSecret = 'app%%(394934AC$$$ADom';
const passwordSuperSecret = '84848@345';


function hasValidToken(req, callback) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token) {
        return callback();
    }

    jwt.verify(token, superSecret, function (err, decoded) {
        if (err) {
            return callback(err);
        } else {
            // if everything is good, save to request for use in other routes
            callback(null, decoded);
        }
    });
}

function isAuthenticated(req, res, next) {
    hasValidToken(req, (err, decoded) => {
        if (err) {
            return res.json({success: false, message: 'Failed to authenticate token.'});
        } else if (decoded) {
            req.user = decoded;
            return next();
        }

        res.sendStatus(HttpStatus.UNAUTHORIZED);
    });
}

function login(data, callback) {
    Admin.User.findOne({
        email: data.username
    }, (err, user) => {
        if (err || !user) {
            return callback(err || 'user not found');
        }

        var password = crypto
            .createHmac('sha256', passwordSuperSecret)
            .update(data.password)
            .digest('hex');

        if (password !== user.password) {
            logger.warn('Wrong password for:', user.name);
            return callback('Wrong password');
        }

        var token = jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            id: user._id,
        }, superSecret, {expiresIn: '10h'});

        callback(null, {token: token, redirect: user.homePage || '/dashboard'});
    });
}

function hasRole(role) {
    var roles = Array.isArray(role) ? role : [role];

    return function (req, res, next) {
        if (req.user && req.user.id && roles.indexOf(req.user.role) >= 0) {
            return next();
        }

        res.sendStatus(HttpStatus.FORBIDDEN);
    };
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.hasValidToken = hasValidToken;
exports.login = login;