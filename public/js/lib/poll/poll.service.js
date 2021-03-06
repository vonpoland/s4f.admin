import moment from 'moment';

function calculateVotes(poll) {
    if (typeof poll.data === 'undefined') {
        return [];
    }

    return Object.keys(poll.data.votes)
        .map(key => ({option: key, value: poll.data.votes[key]}))
        .sort((option1, option2) => option2.value - option1.value);
}

function isLive(poll) {
    if (typeof poll.editable === 'undefined') {
        return false;
    }

    var hasStartDate = typeof poll.editable.startDate !== 'undefined';
    var hasFinishedDate = typeof poll.editable.finishDate !== 'undefined';

    if (hasStartDate && hasFinishedDate) {
        var now = moment();

        return moment(poll.editable.startDate) < now &&
            moment(poll.editable.finishDate) > now;
    }
}

export function isStarted(poll) {
    if (typeof poll.editable === 'undefined' || typeof poll.editable.startDate === 'undefined') {
        return false;
    }

    return moment() > moment(poll.editable.startDate);
}

export function isFinished(poll) {
    if (typeof poll.editable === 'undefined' || typeof poll.editable.finishDate === 'undefined') {
        return false;
    }

    return moment() > moment(poll.editable.finishDate);
}

function calculateData(data) {
	if(!data) {
		return;
	}

	if(Array.isArray(data.oldResults)) {
		data.oldResults = data.oldResults.sort((first, second) => {
			return new Date(first.date) < new Date(second.date);
		})
	}

	return data;
}
export function createPollLink(poll) {
    if (poll.name && poll.parent) {
        return window.bigscreenConfig.frontendConfig.projectorUrl + '/' + poll.parent + '/' + poll.name;
    }
}

export function mapProperties(polls) {
    return polls.map(poll => {
        poll.isLive = isLive(poll);
        return poll;
    });
}

export function livePollCount(polls) {
    if (!Array.isArray(polls)) {
        return 0;
    }

    return polls.filter(poll => poll.isLive).length;
}

export function mapPropertiesForSinglePoll(poll) {
    poll.votes = calculateVotes(poll);
    poll.data = calculateData(poll.data);
    poll.isStarted = isStarted(poll);
    poll.isFinished = isFinished(poll);

    return poll;
}

export function getVotesForPollResults(poll, resultsName) {
    if( typeof resultsName === 'undefined') {
        return calculateVotes(poll);
    }

    return calculateVotes({data: {votes: poll.data.oldResults.filter(result => result.name === resultsName).pop().results}});
}