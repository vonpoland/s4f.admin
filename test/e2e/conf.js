/* global browser */

exports.config = {
    onPrepare: function () {
        browser.driver.manage().window().setSize(1600, 1000);
    },
    specs: ['specs/**/*spec.js'],
    baseUrl: 'https://screen4fans.com/admin',
    suites: {
        login: 'specs/login/*.spec.js',
        editInteraction: 'specs/interaction/edit.spec.js',
        integration: 'specs/integration/*.spec.js',
        viewResults: 'specs/interaction/viewResults.spec.js'
    },
    jasmineNodeOpts : {
        showColors: true
    },
    params: {
        login: {
            user: 'test@s4f.pl',
            password: 'test',
            url: '/admin/login'
        },
        interactions: {
            pollWithResults: 'test-interaction-question',
            url: '/admin/interaction',
            projectorDerbyLink: 'http://localhost:8888/projector/test-interaction/test-interaction-derby7'
        }
    }
};