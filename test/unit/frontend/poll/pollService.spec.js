/* global describe, it */

const expect = require('expect.js');

import {mapPropertiesForSinglePoll} from '../../../../public/js/lib/poll/poll.service';

describe('poll service tests', function () {
    it('should set started=true and finished=false flags', function () {
        var poll = mapPropertiesForSinglePoll({
            editable: {
                startDate: '2000-07-26T22:00:00.000Z',
                finishDate: '2040-07-26T22:00:00.000Z'
            }
        });

        expect(poll.isStarted).to.be(true);
        expect(poll.isFinished).to.be(false);
    });

    it('should set started=false and finished=true flags', function () {
        var poll = mapPropertiesForSinglePoll({
            editable: {
                startDate: '2041-07-26T22:00:00.000Z',
                finishDate: '2042-07-26T22:00:00.000Z'
            }
        });

        expect(poll.isStarted).to.be(false);
        expect(poll.isFinished).to.be(false);
    });

    it('should set started=false and finished=true flags', function () {
        var poll = mapPropertiesForSinglePoll({
            editable: {
                startDate: '2041-07-26T22:00:00.000Z',
                finishDate: '2000-07-26T22:00:00.000Z'
            }
        });

        expect(poll.isStarted).to.be(false);
        expect(poll.isFinished).to.be(true);
    });

    it('should set started=false and finished=false flags', function () {
        var poll = mapPropertiesForSinglePoll({
            editable: {
                startDate: '2041-07-26T22:00:00.000Z',
                finishDate: '2066-07-26T22:00:00.000Z'
            }
        });

        expect(poll.isStarted).to.be(false);
        expect(poll.isFinished).to.be(false);
    });
});