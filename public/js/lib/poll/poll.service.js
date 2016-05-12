export function calculateVotes(poll) {
    if(typeof poll.data === 'undefined') {
        return [];
    }

    return Object.keys(poll.data.votes)
        .map(key => ({ option: key, value: poll.data.votes[key]}))
        .sort((option1, option2) => option2.value - option1.value);
}