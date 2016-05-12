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
        var action = {type: CHANGE_LOCATION, payload: {pathname: 'admin/poll'}};
        var state = {};
        var result = navigationReducer(state, action);

        expect(result).to.not.equal(state);
        expect(result).to.eql({
            pageInfo: {
                displayPageInfo: true,
                breadcrumb: 'Your polls',
                title: 'Polls',
                description: 'Information about your polls',
                active: 'poll'
            }
        });
    });

    it('should set page info when route is on poll', function () {
        var action = {type: CHANGE_LOCATION, payload: {pathname: 'admin/poll/poll-test/edit'}};
        var state = {};
        var result = navigationReducer(state, action);

        expect(result).to.not.equal(state);
        expect(result).to.eql({
            pageInfo: {
                displayPageInfo: true,
                breadcrumb: 'Edit poll',
                title: 'Edit poll',
                description: 'Edit your poll details here',
                active: 'poll'
            }
        });
    });

    describe('#getPageInfo tests', function () {
        it('should get correct nested path', function () {
            var path = 'admin/poll/test-poll/manage';
            var result = getPageInfo({ pathname: path });

            expect(result).to.eql({
                displayPageInfo: true,
                breadcrumb: 'Manage poll',
                title: 'Manage poll',
                description: 'Manage your poll here',
                active: 'poll'
            });
        });

        it('should get correct nested path', function () {
            var path = 'admin/poll/test-poll/results';
            var result = getPageInfo({ pathname: path });

            expect(result).to.eql({
                displayPageInfo: true,
                breadcrumb: 'Poll results',
                title: 'View poll results',
                description: 'View poll results here',
                active: 'poll'
            });
        });
    });
});