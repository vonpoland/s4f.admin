const express = require('express');
var passport = require('passport');
var router = express.Router();
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const logger = require('bigscreen-logger');

router.use(bodyParser.json());

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user)=> {
        if (err || !user) {
            logger.error(err || 'user not found');
            return res.status(HttpStatus.BAD_REQUEST).json({
                errorMessage: 'login failed'
            });
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    errorMessage: 'login failed'
                });
            }

            return res.json(user);
        });
    })(req, res, next);
});

router.post('/logout', function (req, res) {
    req.logOut();
    res.sendStatus(HttpStatus.OK);
});

router.post('/me', (req, res) => {
    if (!req.user) {
        return res.sendStatus(HttpStatus.NOT_FOUND);
    }

    res.json(req.user);
});


module.exports = router;