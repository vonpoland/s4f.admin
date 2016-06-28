/* global browser */

exports.config = {
    onPrepare: function () {
        browser.driver.manage().window().setSize(1600, 1000);
    },
    specs: ['specs/**/*spec.js'],
    baseUrl: 'http://localhost:8889/admin',
    suites: {
        login: 'specs/login/*.spec.js',
        editInteraction: 'specs/interaction/edit.spec.js'
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