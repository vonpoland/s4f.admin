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
    jasmineNodeOpts : {
        showColors: true,
        defaultTimeoutInterval : 200000
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
            url: '/admin/interaction',
            projectorDerbyLink: 'https://screen4fans.com/projector/test-interaction/test-interaction-derby7'
        }
    }
};