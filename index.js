'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const config = require('config');
const logger = require('bigscreen-logger');
const bodyParser = require('body-parser');
const poll = require('./lib/poll/router');
const HttpStatus = require('http-status-codes');
const auth = require('./lib/auth/service');
const secure = require('./lib/auth/service').basicAuth;
const staticFiles = require('./lib/static/router');

auth.setupAuth(app);
app.use(bodyParser.json());
app.use('/admin/api/poll', poll);
app.use('/admin', staticFiles);
app.all('/admin/*', secure, function (req, res) {
	res.sendFile(config.get('index'), {root: __dirname + '/public/partials/admin'});
});

app.all('/favicon.ico', function (req, res) {
	res.sendFile('favicon.ico', {root: __dirname + '/'});
});

app.all('*', function (req, res) {
	res.sendStatus(HttpStatus.BAD_REQUEST);
});

var server = http.listen(config.get('server.port'), function () {
	var host = server.address().address;
	var port = server.address().port;

	logger.info('Screen-fans listening at http://%s:%s', host, port);
});