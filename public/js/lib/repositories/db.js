import fetch from 'isomorphic-fetch';

const getPolls = () => fetch('api/poll', {credentials: 'same-origin'});

const changeStep = (parent, pollName, step, stay) => fetch(`/admin/api/poll/${parent}/screen`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({pollName: pollName, step: step, stay: stay})
});

const savePoll = (pollName, modifications) => fetch(`/admin/api/poll/${pollName}`, {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'PUT',
    credentials: 'same-origin',
    body: JSON.stringify(modifications)
});

const getAnswers = pollName => fetch(`/admin/api/poll/${pollName}/answer`, {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    }
});

const getPoll = pollName => fetch(`/admin/api/poll/${pollName}`, {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    }
});

const login = (user, password) => fetch('/admin/api/auth/login', {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({username: user, password: password})
});

const loggedUser = () => fetch('/admin/api/auth/me', {
    credentials: 'same-origin'
});

const logout = () => fetch('/admin/api/auth/logout', {
    method: 'POST',
    credentials: 'same-origin'
});

const db = {
    poll: {getPolls, getAnswers, getPoll, savePoll},
    step: {changeStep},
    auth: {login, loggedUser, logout}
};
export default db;