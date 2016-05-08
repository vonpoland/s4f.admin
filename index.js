'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const config = require('config');
const logger = require('bigscreen-logger');
const bodyParser = require('body-parser');
const poll = require('./lib/poll/router');
const staticFiles = require('./lib/static/router');
const auth = require('./lib/auth/router');
const authService = require('./lib/auth/service');

authService.setupPassport(app);
app.use(bodyParser.json());
app.use('/admin/api/poll', authService.isAuthenticated, poll);
app.use('/admin/api/auth', auth);
app.use('/admin', staticFiles);
app.all('/admin/login', function (req, res) {
    if(req.user) {
        return res.redirect('/admin/dashboard');
    }

    res.sendFile(config.get('index'), {root: __dirname + '/public/partials/admin'});
});

app.all('/admin*', authService.isAuthenticated, function (req, res) {
    res.sendFile(config.get('index'), {root: __dirname + '/public/partials/admin'});
});

app.all('/favicon.ico', function (req, res) {
    res.sendFile('favicon.ico', {root: __dirname + '/'});
});

app.all('*', function (req, res) {
    res.redirect('/admin/login');
});

var server = http.listen(config.get('server.port'), function () {
    var host = server.address().address;
    var port = server.address().port;

    logger.info('Screen-fans listening at http://%s:%s', host, port);
});