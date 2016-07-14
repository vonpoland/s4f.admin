/* global browser */

exports.config = {
    onPrepare: function () {
        browser.driver.manage().window().setSize(1600, 1000);
    },
    specs: ['specs/**/*spec.js'],
    baseUrl: 'http://localhost:8889/admin',
    suites: {
        login: 'specs/login/*.spec.js',
        editInteraction: 'specs/interaction/edit.spec.js',
        integration: 'specs/integration/*.spec.js'
    },
    jasmineNodeOpts : {
        showColors: true,
        defaultTimeoutInterval : 200000
    },
    params: {
        login: {
            user: 'test@s4f.pl',
            password: 'test',
            url: '/admin/login'
        },
        interactions: {
            url: '/admin/interaction',
            projectorDerbyLink: 'http://localhost:8888/projector/test-interaction/test-interaction-derby7'
        }
    }
};