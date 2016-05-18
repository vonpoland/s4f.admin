'use strict';

const R = require('ramda');
const async = require('async');

function getDbPoll(name, callback) {
    this.Poll.findOne({name: {$regex: new RegExp(name, 'i')}}).exec((err, poll) => {
        if (err || !poll) {
            return callback(err || 'poll not found');
        }

        callback(null, poll);
    });
}

function saveWinner(pollName, winner, callback) {
    this.Poll.findOne({name: {$regex: new RegExp(pollName, 'i')}}, (err, poll) => {
        if (err || !poll) {
            return callback(err || 'poll not found cannot save');
        }

        if (!poll.winner) {
            poll.winner = winner;
        }

        poll.save(err => callback(err, poll.winner));
    });
}

function add(options, callback) {
    this.Poll.findOne({name: {$regex: new RegExp(options.pollName, 'i')}}, (err, poll) => {
        if (err || !poll) {
            return callback(err || 'poll not found');
        }

        poll.addVote(options.vote, err => callback(err, poll));
    });
}

function getStatistics(pollName, callback) {
    this.Vote.find({pollName: {$regex: new RegExp(pollName, 'i')}})
        .lean()
        .exec((err, votes) => {
            if (err || !votes) {
                return callback(err || 'VOTE NOT FOUND');
            }

            var grouped = R.groupBy(vote => vote.option)(votes);

            R.forEach(key => grouped[key] = grouped[key].length)(R.keys(grouped));
            callback(null, grouped);
        });
}

function toWebPoll(poll) {
    return {
        id: poll._id,
        name: poll.name,
        startDate: poll.startDate,
        finishDate: poll.finishDate,
        data: poll.data,
        parent: poll.parent,
        winner: poll.winner,
        last: poll.last
    };
}

function getPolls(parent, callback) {
    this.Poll.find()
        .lean()
        .exec((err, polls) => callback(err, polls ? polls.map(toWebPoll) : null));
}

function saveLastScreenOnPoll(lastScreen, poll, callback) {
    if (!poll) {
        return callback('poll not found');
    }

    if (!poll.data.stepTemplates[lastScreen]) {
        return callback('step not found');
    }

    poll.last = lastScreen;
    poll.save(callback);
}

function saveLastScreen(data, callback) {
    async.waterfall([
        getDbPoll.bind(this, data.pollName),
        saveLastScreenOnPoll.bind(this, data.lastScreen)
    ], callback);
}

function getPoll(name, callback) {
    this.Poll.findOne({name: {$regex: new RegExp(name, 'i')}}).lean().exec((err, poll) => {
        if (err || !poll) {
            return callback(err || 'poll not found');
        }

        callback(null, toWebPoll(poll));
    });
}

function voted(user, pollName, callback) {
    this.Poll.findOne({name: pollName}, (err, poll) => {
        if (err) {
            return callback(err);
        }

        var result = poll.votes.filter(vote => vote.userId && (vote.userId.toString() === user.id)).pop();

        callback(null, !!result);
    });
}

function getParticipants(pollName, callback) {
    this.Vote.find({pollName: {$regex: new RegExp(pollName, 'i')}})
        .populate('user')
        .lean()
        .then(votes => votes.map(vote => vote.user))
        .then(users => callback(null, users), callback);
}

function getAnswers(pollName, callback) {
    this.Vote.find({pollName: {$regex: new RegExp(pollName, 'i')}})
        .populate('user')
        .lean()
        .exec(callback);
}

function edit(pollName, data, callback) {
    this.Poll.update({name: {$regex: new RegExp(pollName, 'i')}}, data, (err, poll) => {
        if (err || !poll) {
            return callback(err || 'poll not found cannot save');
        }

        callback(null);
    });
}

exports.voted = voted;
exports.add = add;
exports.getPoll = getPoll;
exports.getStatistics = getStatistics;
exports.getParticipants = getParticipants;
exports.getAnswers = getAnswers;
exports.getPolls = getPolls;
exports.saveLastScreen = saveLastScreen;
exports.edit = edit;