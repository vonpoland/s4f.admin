/* global describe, it, before, after */

const httpMocks = require('node-mocks-http');
const expect = require('expect.js');
const events = require('events');
const mockery = require('mockery');
const R = require('ramda');

function buildResponse() {
    return httpMocks.createResponse({eventEmitter: events.EventEmitter});
}

const pollsRepo = [
    {_id: 'testPoll'},
    {_id: 'nextPoll'}
];

function find(params) {
    return pollsRepo.filter(function (poll) {
        return params._id === poll._id;
    }).pop();
}
var dbMock = {
    Web: {
        Poll: {
            findOne: function (params) {
                return {
                    lean: function () {
                        return {
                            exec: function (done) {
                                done(null, find(params));
                            }
                        };
                    }
                };
            },
            update: function (params, data, done) {
                var poll = Object.assign({}, find(params));

                Object.keys(data.$set).forEach(function (key) {
                    var lens = R.lensPath(key.split('.'));
                    poll = R.set(lens, data.$set[key], poll);

                });
                done(null, poll);
            }
        },
        Vote: {}
    }
};

const socketMock = {
    getIo: function () {
        return {}
    }
}

describe('Poll controller tests', function () {
    before(function () {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });
        mockery.registerMock('../db/db', dbMock);
        mockery.registerMock('../channel/service', socketMock);
        this.router = require('../../../../lib/poll/router');
    });

    after(function () {
        mockery.deregisterMock('../db/db');
        mockery.disable();
    });

    it('should return poll if it belongs to user', function (done) {
        const pollId = 'testPoll';
        var response = buildResponse();
        var request = httpMocks.createRequest({
            method: 'GET',
            url: '/testPoll'
        });

        request.user = {polls: [pollId]};
        response.on('end', function () {
            var result = JSON.parse(response._getData());
            expect(result.id).to.be(pollId);
            done();
        });

        this.router.handle(request, response);
    });

    it('should not return poll if it doesn\'t belong to user', function (done) {
        const pollId = 'testPoll';
        var response = buildResponse();
        var request = httpMocks.createRequest({
            method: 'GET',
            url: '/nextPoll'
        });

        request.user = {polls: [pollId]};
        response.on('end', function () {
            var result = response._getData();
            expect(result).to.be('Bad Request');
            done();
        });

        this.router.handle(request, response);
    });

    it('should update poll if it belongs to user', function (done) {
        const pollName = 'testPoll';
        var response = buildResponse();
        var request = httpMocks.createRequest({
            method: 'PUT',
            url: '/testPoll/editable',
            body: {
                option1: 'one',
                option2: 'two'
            }
        });

        request.user = {polls: [pollName]};
        response.on('end', function () {
            var result = response._getData();
            expect(result).to.be('OK');
            done();
        });

        this.router.handle(request, response);
    });

    it('should not update poll if doesn\'t belong to user', function (done) {
        const pollName = 'testPoll';
        var response = buildResponse();
        var request = httpMocks.createRequest({
            method: 'PUT',
            url: '/nextPoll/editable',
            body: {
                option1: 'one',
                option2: 'two'
            }
        });

        request.user = {polls: [pollName]};
        response.on('end', function () {
            var result = response._getData();
            expect(result).to.be('Bad Request');
            done();
        });

        this.router.handle(request, response);
    });

    it('should get error why trying to get answer form other user polls', function (done) {
        const pollName = 'testPoll';
        var response = buildResponse();
        var request = httpMocks.createRequest({
            method: 'GET',
            url: '/nextPoll/answer'
        });

        request.user = {polls: [pollName]};
        response.on('end', function () {
            var result = response._getData();
            expect(result).to.be('Bad Request');
            done();
        });

        this.router.handle(request, response);
    });

    it('should get error why trying to change poll screen form other user polls', function (done) {
        const pollName = 'testPoll';
        var response = buildResponse();
        var request = httpMocks.createRequest({
            method: 'POST',
            url: '/nextPoll/screen',
            body: {
                parent: 'parent'
            }
        });

        request.user = {polls: [pollName]};
        response.on('end', function () {
            var result = response._getData();
            expect(result).to.be('Bad Request');
            done();
        });

        this.router.handle(request, response);
    });
});