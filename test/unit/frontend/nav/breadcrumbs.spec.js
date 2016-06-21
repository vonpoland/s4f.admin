/* global describe, it */
const expect = require('expect.js');

import navigationReducer from '../../../../public/js/lib/navigation/reducer';
import {CHANGE_LOCATION} from '../../../../public/js/lib/poll/actions';
import {getPageInfo} from '../../../../public/js/lib/routing/routing';

describe('Breadcrumbs tests', function () {
    it('should set displayPageInfo to null when route change is on login page', function () {
        var action = {type: CHANGE_LOCATION, payload: {pathname: 'admin/login'}};
        var state = {};
        var result = navigationReducer(state, action);

        expect(result).to.not.equal(state);
        expect(result).to.eql({
            pageInfo: {
                displayPageInfo: false
            }
        });
    });

    it('should set page info when route is on poll', function () {
        var action = {type: CHANGE_LOCATION, payload: {pathname: 'admin/interaction'}};
        var state = {};
        var result = navigationReducer(state, action);

        expect(result).to.not.equal(state);
        expect(result).to.eql({
            pageInfo: {
                displayPageInfo: true,
                breadcrumb: 'Interactions',
                title: 'My Live Interactions',
                description: '',
                active: 'interaction'
            }
        });
    });

    it('should set page info when route is on poll', function () {
        var action = {type: CHANGE_LOCATION, payload: {pathname: 'admin/interaction/poll-test/edit'}};
        var state = {};
        var result = navigationReducer(state, action);

        expect(result).to.not.equal(state);
        expect(result).to.eql({
            pageInfo: {
                displayPageInfo: true,
                breadcrumb: 'Edit interaction',
                title: 'Edit interaction',
                description: 'Edit your interaction details here',
                active: 'interaction'
            }
        });
    });

    it('should set page default - dashboard page when on /admin path', function () {
        var action = {type: CHANGE_LOCATION, payload: {pathname: '/admin'}};
        var state = {};
        var result = navigationReducer(state, action);

        expect(result).to.not.equal(state);
        expect(result).to.eql({
            pageInfo: {
                displayPageInfo: true,
                breadcrumb: 'Dashboard',
                title: 'Dashboard',
                description: '',
                active: 'dashboard'
            }
        });
    });

    describe('#getPageInfo tests', function () {
        it('should get correct nested path', function () {
            var path = 'admin/interaction/test-poll/manage';
            var result = getPageInfo({ pathname: path });

            expect(result).to.eql({
                displayPageInfo: true,
                breadcrumb: 'Manage interaction',
                title: 'Manage interaction',
                description: 'Manage your interaction here',
                active: 'interaction'
            });
        });

        it('should get correct nested path', function () {
            var path = 'admin/interaction/test-poll/results';
            var result = getPageInfo({ pathname: path });

            expect(result).to.eql({
                displayPageInfo: true,
                breadcrumb: 'Interaction results',
                title: 'View interaction results',
                description: 'View interaction results here',
                active: 'interaction'
            });
        });
    });
});