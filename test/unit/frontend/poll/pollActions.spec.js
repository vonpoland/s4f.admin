const expect = require('expect.js');

import polls from '../../../../public/js/lib/poll/reducer';
import {propertyChange, savePollStart, savePollFailed, savePollSuccess, CHANGE_LOCATION} from '../../../../public/js/lib/poll/actions';

describe('Poll actions', function () {
    it('should check if initial state is correct', function () {
        var result = polls(undefined, {});

        expect(result).to.eql({ poll : { modifications : {}}});
    });

    it('should check if initial state is correct', function () {
        var result = polls(undefined, propertyChange({propertyPath: 'editable.startDate', data: 'newDate'}));
        expect(result.poll.modifications.editable.startDate).to.equal('newDate');
    });

    it('should check if initial state is correct', function () {
        var state = { poll : { modifications : { test: { a: 1 } } }};

        var result = polls(state, propertyChange({propertyPath : 'test.b', data: 2}));

        expect(state.poll.modifications.test).to.not.equal(result.poll.modifications.test);
        expect(result.poll.modifications.test.a).to.equal(1);
        expect(result.poll.modifications.test.b).to.equal(2);
    });

    it('should check if initial state is correct', function () {
        var result = polls(undefined, savePollStart());
        expect(result.poll.isFormLocked).to.equal(true);
    });

    it('should check if initial state is correct', function () {
        var result = polls(undefined, savePollFailed());
        expect(result.poll.isFormLocked).to.equal(false);
    });

    it('should check if initial state is correct', function () {
        var result = polls(undefined, savePollSuccess());
        expect(result.poll.isFormLocked).to.equal(false);
        expect(result.poll.successMessage).to.equal(true);
    });

    it('should set default state when location is changed', function() {
        var state = { polls: [1,2,3], isFetching : true};
        var result = polls(state, {
            type: CHANGE_LOCATION,
            payload: { pathname : '/admin' }
        });

        expect(result.polls).not.to.eql(state.polls);
        expect(typeof(result.polls)).to.be('undefined');
    });

    it('should set default state when location is changed when poll is fetching', function() {
        var state = { polls: [1,2,3], isFetching : false};
        var result = polls(state, {
            type: CHANGE_LOCATION,
            payload: { pathname : '/admin' }
        });

        expect(result.polls).to.eql(state.polls);
    });
});