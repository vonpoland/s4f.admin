import fetch from 'isomorphic-fetch';

function getAuthToken() {
    return window.localStorage.getItem('userToken');
}

function forgetToken() {
    window.localStorage.setItem('userToken', '');
}

const getPolls = () => fetch('/admin/api/poll', {
    headers: {
        'x-access-token': getAuthToken(),
        'Content-Type': 'application/json'
    }
});

const changeStep = (parent, pollId, step, stay) => fetch(`/admin/api/poll/${pollId}/screen`, {
    method: 'POST',
    headers: {
        'x-access-token': getAuthToken(),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({pollId: pollId, step: step, stay: stay, parent: parent})
});

const savePoll = (pollName, update, path) => fetch(`/admin/api/poll/${pollName}/${path}`, {
    headers: {
        'x-access-token': getAuthToken(),
        'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(update)
});

const savePollResults = (pollId, resultsName) => fetch(`/admin/api/poll/${pollId}/data/results`, {
    headers: {
        'x-access-token': getAuthToken(),
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({resultsName: resultsName})
});

const clearPollResults = pollId => fetch(`/admin/api/poll/${pollId}/data/results`, {
    headers: {
        'x-access-token': getAuthToken(),
        'Content-Type': 'application/json'
    },
    method: 'DELETE'
});

const deleteResult = (pollId, resultId) => fetch(`/admin/api/poll/${pollId}/data/results/${resultId}`, {
    headers: {
        'x-access-token': getAuthToken(),
        'Content-Type': 'application/json'
    },
    method: 'DELETE'
});

const getAnswers = pollName => fetch(`/admin/api/poll/${pollName}/answer`, {
    headers: {
        'x-access-token': getAuthToken(),
        'Content-Type': 'application/json'
    }
});

const getPoll = pollName => fetch(`/admin/api/poll/${pollName}`, {
    headers: {
        'x-access-token': getAuthToken(),
        'Content-Type': 'application/json'
    }
});

const login = (user, password) => fetch('/admin/api/auth/login', {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({username: user, password: password})
});

const loggedUser = () => fetch('/admin/api/auth/me', {
    headers: {
        'x-access-token': getAuthToken()
    },
    credentials: 'same-origin'
});

const logout = () => {
    forgetToken();
    return Promise.resolve();
};

const db = {
    poll: {getPolls, getAnswers, getPoll, savePoll, savePollResults, clearPollResults, deleteResult},
    step: {changeStep},
    auth: {login, loggedUser, logout}
};
export default db;