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
    directConnect: false,
    specs: ['specs/**/*spec.js'],
    baseUrl: 'https://admin.screen4fans.com/',
    suites: {
        login: 'specs/login/*.spec.js'
    },
    params: {
        login: {
            user: 'test@s4f.pl',
            password: 'test',
            url: '/login'
        },
        interactions: {
            pollWithResults: 'kto-wygra',
            url: '/interaction',
            projectorDerbyLink: 'https://screen4fans.com/projector/test-interaction/test-interaction-derby7'
        }
    }
};
