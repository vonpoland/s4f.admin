const expect = require('expect.js');

import {poll} from '../../../../public/js/lib/reducers/polls';
import {updatePollStart} from '../../../../public/js/lib/poll/actions';

describe('Poll editor actions', function () {
    it('should check if initial state is correct', function () {
        var modifications = {data: {options: [1, 2, 3]}};
        var result = poll(undefined, updatePollStart(modifications));
        expect(result.modifications).to.eql(modifications);
    });
});