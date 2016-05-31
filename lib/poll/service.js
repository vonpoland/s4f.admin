'use strict';

const R = require('ramda');
const async = require('async');
const webSchema = require('../db/db').Web;
const Poll = webSchema.Poll;
const Vote = webSchema.Vote;

function getDbPoll(name, callback) {
    Poll.findOne({name: {$regex: new RegExp(name + '$', 'i')}}).exec((err, poll) => {
        if (err || !poll) {
            return callback(err || 'poll not found');
        }

        callback(null, poll);
    });
}

function add(options, callback) {
    Poll.findOne({name: {$regex: new RegExp(options.pollName + '$', 'i')}}, (err, poll) => {
        if (err || !poll) {
            return callback(err || 'poll not found');
        }

        poll.addVote(options.vote, err => callback(err, poll));
    });
}

function getStatistics(pollName, callback) {
    Vote.find({pollName: {$regex: new RegExp(pollName + '$', 'i')}})
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
        editable: poll.editable,
        data: poll.data,
        parent: poll.parent,
        last: poll.last
    };
}

function getPolls(parent, callback) {
    Poll.find()
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
    Poll.findOne({name: {$regex: new RegExp(name + '$', 'i')}}).lean().exec((err, poll) => {
        if (err || !poll) {
            return callback(err || 'poll not found');
        }

        callback(null, toWebPoll(poll));
    });
}

function voted(user, pollName, callback) {
    Poll.findOne({name: pollName}, (err, poll) => {
        if (err) {
            return callback(err);
        }

        var result = poll.votes.filter(vote => vote.userId && (vote.userId.toString() === user.id)).pop();

        callback(null, !!result);
    });
}

function getParticipants(pollName, callback) {
    Vote.find({pollName: {$regex: new RegExp(pollName + '$', 'i')}})
        .populate('user')
        .lean()
        .then(votes => votes.map(vote => vote.user))
        .then(users => callback(null, users), callback);
}

function getAnswers(pollName, callback) {
    Vote.find({pollName: {$regex: new RegExp(pollName + '$', 'i')}})
        .populate('user')
        .lean()
        .exec(callback);
}

function edit(pollName, data, callback) {
    Poll.update({name: {$regex: new RegExp(pollName + '$', 'i')}}, data, (err, poll) => {
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