/* global jasmine */

exports.config = {
    onPrepare: function () {
        var reporters = require('jasmine-reporters');
        var junitReporter = new reporters.JUnitXmlReporter({
            savePath: './e2etests',
            consolidateAll: true
        });
        jasmine.getEnv().addReporter(junitReporter);
    },
    capabilities: {
        browserName: 'chrome'
    },
    directConnect: true,
    specs: ['specs/**/*spec.js'],
    baseUrl: 'http://40.115.23.130/admin',
    suites: {
        login: 'specs/login/*.spec.js'
    },
    params: {
        login: {
            user: 'mojjoj@wp.pl',
            password: 'test',
            url: 'login'
        }
    }
};