const expect = require('expect.js');

import polls from '../../../../public/js/lib/reducers/polls';
import {propertyChange, savePollStart, savePollFailed, savePollSuccess} from '../../../../public/js/lib/poll/actions';

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
});