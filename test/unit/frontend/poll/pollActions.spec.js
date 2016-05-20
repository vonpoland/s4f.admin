const expect = require('expect.js');

import polls from '../../../../public/js/lib/reducers/polls';
import {propertyChange, savePollStart, savePollFailed, savePollSuccess} from '../../../../public/js/lib/poll/actions';

describe('Poll actions', function () {
    it('should check if initial state is correct', function () {
        var result = polls(undefined, {});

        expect(result).to.eql({ poll : { modifications : {}}});
    });

    it('should check if initial state is correct', function () {
        var result = polls(undefined, propertyChange('startDate', 'newDate'));
        expect(result.poll.modifications.startDate).to.equal('newDate');
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