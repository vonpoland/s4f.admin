'use strict';

const webSchema = require('../db/db').Web;
const Poll = webSchema.Poll;
const Vote = webSchema.Vote;
const getIO = require('../channel/service').getIo;

function getDbPoll(pollId, callback) {
    Poll.findOne({_id: pollId}).exec((err, poll) => {
        if (err || !poll) {
            return callback(err || 'poll not found');
        }

        callback(null, poll);
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

function getPolls(options, callback) {
    var query = {
        _id: {$in: options.user.polls}
    };

    Poll.find(query)
        .lean()
        .exec((err, polls) => callback(err, polls ? polls.map(toWebPoll) : null));
}

function getPoll(options, callback) {
    var hasPoll = options.user.polls.indexOf(options.id) >= 0;

    if (!hasPoll) {
        return callback('poll not found');
    }

    Poll.findOne({_id: options.id}).lean().exec((err, poll) => {
        if (err || !poll) {
            return callback(err || 'poll not found');
        }

        callback(null, toWebPoll(poll));
    });
}

function getAnswers(options, callback) {
    var hasPoll = options.user.polls.indexOf(options.id) >= 0;

    if (!hasPoll) {
        return callback('poll not found');
    }

    Vote.findOne({_id: options.id})
        .populate('user')
        .lean()
        .exec(callback);
}

function edit(options, data, callback) {
    var hasPoll = options.user.polls.indexOf(options.id) >= 0;

    if (!hasPoll) {
        return callback('trying poll that does not belong to user');
    }

    Poll.update({_id: options.id}, data, (err, poll) => {
        if (err || !poll) {
            return callback(err || 'poll not found cannot save');
        }

        callback(null);
    });
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


function changeScreen(options, callback) {
    var hasPoll = options.user.polls.indexOf(options.id) >= 0;

    if (!hasPoll) {
        return callback('trying change screen on poll that does not belong to user');
    }

    getDbPoll(options.id, (err, poll) => {
        if (err) {
            return callback(err);
        }

        getIO().emit('changeScreen', {
            stay: options.data.stay,
            parent: poll.parent,
            pollName: poll.name,
            step: options.data.step
        });
        saveLastScreenOnPoll(options.data.step, poll, callback);
    });
}
exports.getPoll = getPoll;
exports.getAnswers = getAnswers;
exports.getPolls = getPolls;
exports.edit = edit;
exports.changeScreen = changeScreen;