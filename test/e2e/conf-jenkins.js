/* global jasmine, browser */

exports.config = {
    onPrepare: function () {
        browser.driver.manage().window().setSize(1600, 1000);
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
    baseUrl: 'http://40.115.23.130/admin/',
    suites: {
        login: 'specs/login/*.spec.js'
    },
    params: {
        login: {
            user: 'test@test.pl',
            password: 'test',
            url: 'login'
        },
        interactions: {
            url: 'interaction'
        }
    }
};