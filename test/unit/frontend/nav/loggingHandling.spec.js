const expect = require('expect.js');

import navigationReducer from '../../../../public/js/lib/navigation/reducer';
import authReducer from '../../../../public/js/lib/auth/reducer';
import {AUTH} from '../../../../public/js/lib/auth/actions';

describe('Log in user tests', function () {
    it('should return default state when no action performed', function () {
        var result = navigationReducer(undefined, {});

        expect(result).to.eql({user: null});
    });

    it('should return same state when no action is performed', function () {
        var state = {action: true};
        var result = navigationReducer(state, {});

        expect(result).to.eql(state);
    });

    it('should return info that user if fetching', function () {
        var action = {type: AUTH.FETCHING_LOGGED_USER};
        var state = {};
        var result = navigationReducer(state, action);

        expect(result).to.not.equal(state);
        expect(result).to.eql({
            fetching: true
        });
    });

    it('should return info that user if fetched', function () {
        var action = {type: AUTH.LOGGED_USER_FETCHED, user: {name: 'test'}};
        var state = {};
        var result = navigationReducer(state, action);

        expect(result).to.not.equal(state);
        expect(result).to.eql({
            fetching: false,
            user: {name: 'test'}
        });
    });

    it('should clear user after logout', function () {
        var action = {type: AUTH.LOG_OUT_USER_SUCCESS};
        var state = {user: 'andrzej'};
        var result = navigationReducer(state, action);

        expect(result).to.not.equal(state);
        expect(result).to.eql({
            user: null
        });
    });

    it('should set auth to null when user is logged out', function () {
        var action = {type: AUTH.LOG_OUT_USER_SUCCESS};
        var state = {auth: 'some user'};
        var result = authReducer(state, action);

        expect(result).to.not.equal(state);
        expect(result).to.eql({
            auth: null
        });
    });

    it('should set auth to user when user if fetched', function () {
        var action = {type: AUTH.LOGGED_USER_FETCHED, user: {name: 'test'}};
        var state = {};
        var result = authReducer(state, action);

        expect(result).to.not.equal(state);
        expect(result).to.eql({
            auth: {name: 'test'}
        });
    });

    it('should set logging to false when logging is failed ', function () {
        var action = {type: AUTH.LOG_FAILED};
        var state = {logging: true};
        var result = authReducer(state, action);

        expect(result).to.not.equal(state);
        expect(result).to.eql({
            logging: false
        });
    });
});