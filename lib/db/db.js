const connectionManager = require('bigscreen-db');
const config = require('config');
const logger = require('bigscreen-logger');

exports.Web = connectionManager.connect({
    connectionString: config.get('database.web'),
    schema: ['vote', 'poll'],
    connectionOptions: {
        server: {pollSize: 5}
    }
}, err => {
    if (err) {
        return logger.error('error while connecting to Web db', err);
    }

    logger.info('Connection to Web db successful');
});

exports.Admin = connectionManager.connect({
    connectionString: config.get('database.admin'),
    schema: ['user'],
    connectionOptions: {
        server: {pollSize: 5}
    }
}, err => {
    if (err) {
        return logger.error('error while connecting to Admin db', err);
    }

    logger.info('Connection to Admin db successful');
});

exports.updateOnlyPath = function (path, data) {
    var obj = Object.keys(data).reduce(function (acc, key) {
        acc[path + '.' + key] = data[key];

        return acc;
    }, {});

    return {
        $set: obj
    };
};