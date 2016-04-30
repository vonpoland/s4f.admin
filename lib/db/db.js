const connectionManager = require('bigscreen-db');
const config = require('config');
const logger = require('bigscreen-logger');

exports.Admin = connectionManager.connect({
    connectionString: config.get('database.admin'),
    schema: ['user']
}, err => {
    if (err) {
        return logger.error('error while connecting to Admin db', err);
    }

    logger.info('Connection to Admin db successful');
});

exports.Web = connectionManager.connect({
    connectionString: config.get('database.web'),
    schema: ['poll', 'vote']
}, err => {
    if (err) {
        return logger.error('error while connecting to Web db', err);
    }

    logger.info('Connection to Web db successful');
});