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
    baseUrl: 'http://test.glosuj.mobi/admin/',
    suites: {
        login: 'specs/login/*.spec.js'
    },
    params: {
        login: {
            user: 'test@test.pl',
            password: 'test',
            url: '/admin/login'
        },
        interactions: {
            url: '/admin/interaction'
        }
    }
};