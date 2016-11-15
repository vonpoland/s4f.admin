/* global browser */

exports.config = {
    onPrepare: function () {
        browser.driver.manage().window().setSize(1600, 1000);
    },
    specs: ['specs/**/*spec.js'],
    baseUrl: 'http://localhost:8889/',
    suites: {
        login: 'specs/login/*.spec.js',
        editInteraction: 'specs/interaction/edit.spec.js',
		editResults: 'specs/interaction/viewResults.spec.js',
        integration: 'specs/integration/*.spec.js',
        viewResults: 'specs/interaction/viewResults.spec.js'
    },
    capabilities: {
        browserName: 'chrome'
    },
    jasmineNodeOpts : {
        showColors: true,
        defaultTimeoutInterval : 200000
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
            projectorDerbyLink: 'http://localhost:8888/test-interaction/test-interaction-derby7'
        }
    }
};