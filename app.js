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
const frontendConfig = {
    config : { frontendConfig: config.get('frontendConfig'), bigscreenChannel: config.get('bigscreenChannel') }
};

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/partials/admin');
app.use('/api/poll', authService.isAuthenticated, poll);
app.use('/api/auth', auth);
app.use('/', staticFiles);
// app.all('/*', function (req, res) {
//     res.render(config.get('index'), frontendConfig);
// });

app.all('/favicon.ico', function (req, res) {
    res.sendFile('favicon.ico', {root: __dirname + '/'});
});

app.all('*', function (req, res) {
    res.render(config.get('index'), frontendConfig);
});

var server = http.listen(config.get('server.port'), function () {
    var host = server.address().address;
    var port = server.address().port;

    logger.info('Screen-fans listening at http://%s:%s', host, port);
});