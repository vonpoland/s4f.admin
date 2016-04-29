import fetch from 'isomorphic-fetch';

const getPolls = parent => fetch('api/poll?parent=' + parent);
const changeStep = (parent, pollName, step, stay) => fetch(`api/poll/${parent}/screen`, {
    method: 'POST',
    headers: {
        Authorization: window.auth,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({pollName: pollName, step: step, stay: stay})
});
const getAnswers = pollName => fetch(`api/poll/${pollName}/answer`, {
    headers: {
        Authorization: window.auth,
        'Content-Type': 'application/json'
    }
});

const getPoll = pollName => fetch(`api/poll/${pollName}`, {
    headers: {
        Authorization: window.auth,
        'Content-Type': 'application/json'
    }
});

const login = (user, password) => fetch('api/auth/login', {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({username: user, password: password})
});

const db = {
    poll: {getPolls, getAnswers, getPoll},
    step: {changeStep},
    auth: {login}
};
export default db;