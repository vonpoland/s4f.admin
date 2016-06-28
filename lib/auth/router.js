const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const logger = require('bigscreen-logger');
const service = require('./service');

router.use(bodyParser.json());

router.post('/login', (req, res) => {
    service.login(req.body, (err, data) => {
        if (err) {
            logger.error(err || 'user not found');
            return res.status(HttpStatus.BAD_REQUEST).json({
                errorMessage: 'login failed'
            });
        }

        return res.json(data);

    });
});

router.post('/logout', function (req, res) {
    req.logOut();
    res.sendStatus(HttpStatus.OK);
});

router.get('/me', service.isAuthenticated, (req, res) => {
    if (!req.user) {
        return res.sendStatus(HttpStatus.NOT_FOUND);
    }

    res.json(req.user);
});

module.exports = router;