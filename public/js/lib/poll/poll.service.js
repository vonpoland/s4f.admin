export function calculateVotes(poll) {
    if(typeof poll.data === 'undefined') {
        return [];
    }

    return Object.keys(poll.data.votes)
        .map(key => ({ option: key, value: poll.data.votes[key]}))
        .sort((option1, option2) => option2.value - option1.value);
}

function isLive(poll) {
    var hasStartDate = typeof poll.startDate !== 'undefined';
    var hasFinishedDate = typeof poll.finishDate !== 'undefined';

    if(hasStartDate && hasFinishedDate) {
        var now = moment();

        return moment(poll.startDate) < now && 
                moment(poll.finishDate) > now;
    }
}

export function createPollLink(poll) {
    if(poll.name && poll.parent) {
        return window.bigscreenConfig.frontendConfig.projectorUrl + '/' + poll.parent + '/' + poll.name;
    }
}

export function mapProperties(polls) {
    return polls.map(poll => {
        poll.isLive = isLive(poll);
        return poll;
    });
}