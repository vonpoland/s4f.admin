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
    directConnect: false,
    specs: ['specs/**/*spec.js'],
    baseUrl: 'https://screen4fans.com/admin/',
    suites: {
        login: 'specs/login/*.spec.js'
    },
    params: {
        login: {
            user: 'test@s4f.pl',
            password: 'test',
            url: '/admin/login'
        },
        interactions: {
            url: '/admin/interaction'
        }
    }
};
