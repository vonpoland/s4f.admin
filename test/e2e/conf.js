exports.config = {
    specs: ['specs/**/*spec.js'],
    baseUrl: 'http://localhost:8889/admin',
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