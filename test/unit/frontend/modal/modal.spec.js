/* global describe, it */

const expect = require('expect.js');

import modalReducer from '../../../../public/js/lib/modal/reducer';
import {MODAL} from '../../../../public/js/lib/modal/actions';
import {action} from '../../../../public/js/lib/poll/actions';

describe('Modal actions', function () {
	it('should check if correct state is set after OPEN MODAL start action', function () {
		var result = modalReducer(undefined, action(MODAL.OPEN_MODAL, { title : '1', content: '2'}));

		expect(result.opening).to.eql(true);
		expect(result.opened).to.eql(false);
	});

	it('should check if correct state is set after OPENED action', function () {
		var result = modalReducer(undefined, action(MODAL.OPENED_MODAL));

		expect(result.opening).to.eql(false);
		expect(result.opened).to.eql(true);
		expect(result.closing).to.eql(false);
	});

	it('should check if correct state is set after CLOSED action', function () {
		var result = modalReducer(undefined, action(MODAL.CLOSED_MODAL));

		expect(result.opening).to.eql(false);
		expect(result.opened).to.eql(false);
	});

	it('should check if correct state is set after CLOSED action', function () {
		var result = modalReducer(undefined, action(MODAL.CLOSE_MODAL));

		expect(result.opening).to.eql(false);
		expect(result.opened).to.eql(false);
		expect(result.closing).to.eql(true);
	});
});