/* global describe, it */

const expect = require('expect.js');

import polls from '../../../../public/js/lib/poll/reducer';
import {
    pollResultsNameChange,
    savePollResultsNameStart,
    savePollResultsNameFinished,
    savePollResultsNameFailed,
    changePollResults,
    pollResultClearStart,
    pollResultClearFinished,
    pollResultClearFailed,
    fetchPollSuccess
} from '../../../../public/js/lib/poll/actions';

describe('View actions', function () {
    it('should enabled button if text is valid', function () {
        var result = polls(undefined, pollResultsNameChange('test'));

        expect(result.poll.isSaveResultsNameButtonEnabled).to.eql(true);
        expect(result.poll.resultsName).to.eql('test');
    });

    it('should disabled button if text is invalid', function () {
        var result = polls(undefined, pollResultsNameChange(' '));

        expect(result.poll.isSaveResultsNameButtonEnabled).to.eql(false);
    });

    it('should lock save button and input when save button is clicked', function () {
        var state = {
            poll: {
                modifications: {},
                id: 'pollId',
                resultsName: 'test',
                isSaveResultsNameButtonEnabled: true
            }
        };

        var result = polls(state, savePollResultsNameStart());

        expect(result.poll.isSaveResultsNameInputDisabled).to.eql(true);
        expect(result.poll.isSaveResultsNameButtonEnabled).to.eql(false);
        expect(result.poll.isClearResultsButtonDisabled).to.eql(true);
    });

    it('should unlock save button and input after successful save', function () {
        var state = {
            poll: {
                modifications: {},
                id: 'pollId',
                resultsName: 'test',
                isSaveResultsNameButtonEnabled: true
            }
        };

        var result = polls(state, savePollResultsNameFinished());

        expect(result.poll.isSaveResultsNameInputDisabled).to.eql(false);
        expect(result.poll.isSaveResultsNameButtonEnabled).to.eql(true);
        expect(result.poll.resultsName).to.eql('');
    });

    it('should unlock save button and input after fail save', function () {
        var state = {
            poll: {
                modifications: {},
                id: 'pollId',
                resultsName: 'test',
                isSaveResultsNameButtonEnabled: true
            }
        };

        var result = polls(state, savePollResultsNameFailed());

        expect(result.poll.isSaveResultsNameInputDisabled).to.eql(false);
        expect(result.poll.isSaveResultsNameButtonEnabled).to.eql(true);
        expect(result.poll.isClearResultsButtonDisabled).to.eql(false);
        expect(result.poll.resultsName).to.eql('');
    });

    it('should change poll results', function () {
        var state = {
            poll: {
                data: {
                    votes: {
                        "orig1": 2
                    },
                    oldResults: [
                        {
                            name: 'test1',
                            results: {
                                "CACCINI": 2,
                                "DUSIGROSZ": 20,
                                "IRON_BELLE": 15
                            }
                        },
                        {
                            name: 'test2',
                            results: {
                                'x': 1,
                                'y': 2
                            }
                        }
                    ]
                }
            }
        };

        state = polls(state, changePollResults('test1'));

        expect(state.poll.votes).to.eql([
            {option: "DUSIGROSZ", value: 20},
            {option: "IRON_BELLE", value: 15},
            {option: "CACCINI", value: 2}
        ]);

        state = polls(state, changePollResults('test2'));

        expect(state.poll.votes).to.eql([
            {option: 'y', value: 2},
            {option: 'x', value: 1}
        ]);

        state = polls(state, changePollResults());

        expect(state.poll.votes).to.eql([
            {option: 'orig1', value: 2}
        ]);
    });

    it('should lock save button when clear form is confirmed', function () {
        var result = polls(undefined, pollResultClearStart());

        expect(result.poll.disableCloseClearResultsModalButton).to.eql(true);
    });

    it('should unlock save button when clear form is done', function () {
        var result = polls(undefined, pollResultClearFinished());

        expect(result.poll.disableCloseClearResultsModalButton).to.eql(false);
    });

    it('should unlock save button when clear form is failed', function () {
        var result = polls(undefined, pollResultClearFailed());

        expect(result.poll.disableCloseClearResultsModalButton).to.eql(false);
    });
});