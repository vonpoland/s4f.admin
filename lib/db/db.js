const connectionManager = require('bigscreen-db');
const config = require('config');
const logger = require('bigscreen-logger');
const connectionByUser = require('bigscreen-db').connectionByUser;

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

exports.dbConnectionMiddleware = function (req, res, next) {
    if (req.user) {
        connectionByUser(req.user, {
            schema: ['poll', 'vote'],
            connectionOptions: {
                server: {pollSize: 20}
            }
        }, (err, dbConnection) => {
            if (err) {
                logger.error(err);
            } else {
                req.user._dbConnection = dbConnection;
            }
            next();
        });
    } else {
        next();
    }
};

exports.updateOnlyEditable = function (data) {
    var obj = Object.keys(data).reduce(function (acc, key) {
        acc['editable.' + key] = data[key];

        return acc;
    }, {});

    return {
        $set: obj
    };
};