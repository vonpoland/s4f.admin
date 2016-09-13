/* global describe, it */

const expect = require('expect.js');

import polls from '../../../../public/js/lib/poll/reducer';
import {DELETE_PREVIOUS_RESULT, action} from '../../../../public/js/lib/poll/actions';

describe('Poll result actions', function () {
	it('should check if correct state is set after START action', function () {
		var result = polls(undefined, action(DELETE_PREVIOUS_RESULT.START));

		expect(result.poll.removingPreviousResultInProgress).to.eql(true);

		result = polls(undefined, action(DELETE_PREVIOUS_RESULT.FAIL));

		expect(result.poll.removingPreviousResultInProgress).to.eql(false);
	});

	it('should check if correct state is set after SUCCESS action', function () {
		var result = polls(undefined, action(DELETE_PREVIOUS_RESULT.SUCCESS));

		expect(result.poll.removingPreviousResultInProgress).to.eql(false);

		result = polls(undefined, action(DELETE_PREVIOUS_RESULT.START));

		expect(result.poll.removingPreviousResultInProgress).to.eql(true);

		result = polls(undefined, action(DELETE_PREVIOUS_RESULT.FAIL));

		expect(result.poll.removingPreviousResultInProgress).to.eql(false);
	});
});